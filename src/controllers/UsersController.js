const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");


// Registration
//*User Registration korabo
exports.registration= async (req, res)=>{
   let reqBody=req.body
    try{

        let result= await UsersModel.create(reqBody); // data create korar somoy UserModel er bitore .create method ke call korbo.create er bitor reqBody ta debo. reBody ta deye jokhon amra database operation chalabo tokhon amder akta jinish  mathai  rakhte hobe, seta hocche  (try,catch block) 
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


//Login
//* User ke login korabo
exports.login=async (req,res)=>{

    try{
        let reqBody=req.body;
        let result= await UsersModel.find(reqBody).count();
        if(result===1){
            //login success --> ( login success hole oi user er email address ta deye jwt token generate/create korte hobe)
            // Create Token
            let Payload={ // jokhon token create korbo tokhon payLoad name akta variable nebo
                exp:Math.floor(Date.now()/1000)+(24*60*60), //exp(experi duration) name amar oi token ta kottokhon projonto jibito thakbe. (Date.now(dele current timestam ta pae/1000 deye vag role pabo second a ))
                data:reqBody['email']  // ae token er bitore user er email address ta rekhe dete hobe.user er akta identiti rekhe dete hobe.poro project a user er identit holo oi email address ta.reqBody theke user er email adress ta pabo
            }
            let token=jwt.sign(Payload,"SecretKey123456789"); //(jwt sign deye tokenencrypt korsi) token create jwt function theke sign name akta function ase seta call korte hobe.ae sign function parameter holo 2 ta 1-->payload  2-->ami jei token ta create kortesi sei token ta create korar somoy akta secrect (key) deye deya.akhon ae je token create korar somoy amra secrect key dilam ae secrect key jeta deye amra token create kori seta deyee amra porobortite token verify kori.
            //ae token ta deye postman a jokhon khusi ae token use kore kaj korte parbo.
            res.status(200).json({status:"success",data:token})

        }
        else{
            // Login fail
            res.status(200).json({status:"fail",data:"No User Found"})
        }
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}



//*profileUpdate korbo
// user profile detail paowar process jeta. user profile update o same seita.
//profile ta o akta login poroborti gotona.
//profile update a o amra same Authverificationmiddleware ta use korsi. jei Authmiddleware  user er token verify kore .and sei token er decode er maddome hedar er modde email address ta ke jokto/add kore dei.jei email address ta header theke pic/recive koresi
exports.profileUpdate=async (req, res) => {

    try{
        let email = req.headers['email']; //header theke email address recive
        let reqBody = req.body; // profile update korar somoy user updeted jei tottho golo debe sego reqBody theke amra pic korbo
        let result=await UsersModel.updateOne({email: email}, reqBody) // kon user er profile ta amra update korbo setar jonno oi user er email address ta lagbe . oi emaill address maching dore oi user er tottho ta reqBody theke neye update korbe.
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

//* profileDetailes method ta deye  user er profile er detaile user ke dekhabo.
//user er profile er detail user jokhon dekhte jabe, tokhon user er kas theke amra Token nebo.amni amni to user ke profile er detaile ta dekhte debo na. user profile er detaile ta kokhon dekhbe, jokhon  se login korte parbe, tokhon dekhte parbe tar agee to se dekhte pabe na.se jonno amra korbo ki login poroborti jotogolo gotona gotbe prottekta gotonar jonne  je header ase sei header a user jei token thakbe sei token ta amra user er kas theke nebo.
//login poroborti  gotonar jonno amra Authmiddleware middleware create kore neyechi.jei middleware er kaj hocche user er header a token ase ki na and jwt sei token ta ke verify korte pare ki na sei ta ke check kora.
exports.profileDetails=async (req,res)=>{
   try { // user er jei email address ta paesi login korar somoy , sei email ta deye amra korbo ki oi user er jei profile detail ta ase sei profile detaile ta ke amra find/check korbo.user ki email address deue find korbo.
       let email= req.headers['email'];
       let result= await UsersModel.find({email:email});
       res.status(200).json({status:"success",data:result})
   }
   catch (e) {
       res.status(200).json({status:"fail",data:e})
   }
}



//*(user jodi password vole jai tokhon amra forget password a jabo.tahole forget password er 1st step holo --user er Email address ta ke verify kora. je jei user amar password reset korte chacche , sei user er email address ta amar system/software a ase kina seta ke check kore dekha ) RecoverVerifyEmail - Jokhon user password verufy korte jacche ba user jokhno forget password a jacche , user forget password a gele user er kas theke akta email address neye sei email address a amra akta pin patheye decchi to user er kas theke sei email address ta neye user er kase akta verification code OTP amra pathaya debo 
exports.RecoverVerifyEmail=async (req,res)=>{
    //user jokhon password reset korar jonno ashbe  tokhon user er email ta ke 1st a recive korbo.recive kore dekhbo oi email a asolee kono user ase ki na. seta test korar sohoj process holo  oi email address ta ke deye akta user er counting deya.
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000); // 6 digit number jabar jonno random number
    let EmailText="Your Verification Code is ="+OTPCode
    let EmailSubject="Task manager verification code"

    let result= await UsersModel.find({email:email}).count(); // counting  reqparams re maddome jei email ta ke neye ashlam  sei email ta deye amra akta simple counting check dilam je oi user ase kina.
    if(result===1){ // 1 hole oi 1 ta  user jodi thake oi email er agniste tahole oi user ase.
        // Verification Email  
        //jodi kono user ke pawa jai oi email address er agniste . tahole oi user er email address a amake akta  email pathate hobe jei email er bitore akta verification code thakbe.and porobortite sei verification code tar maddome amra korbo ki  oi user ke amra verify korbo .akhon sei verfication code er mail ta amra pathabo (nodemailer package) er maddome.
        // ae verification email pathanor jonno amader akta email utility lagbe.akhon ae email utiliy er bitore email pathanor jonno  besh kiso settings ase.
       await SendEmailUtility(email,EmailText,EmailSubject); // mail cholege
       await OTPModel.create({email:email,otp:OTPCode}) // oi user er jonno akta otp create korbo
       res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})

    }
    else{ 
        res.status(200).json({status:"fail",data:"No User Found"})
    }
// jei email address ta deye registration korsi, oi email address tai kinto lagbe.are oi email address ee amar email address ta jabe.
}



//*RecoverVerifyOTP -- jei OTp ta user ke amra pathalam , sei OTP ta user er kas theke amra verify koraya nebo. OTP thik ase kina.sekhetre user er email address  and OTP check kore amra dekhbo  otp thik ase kina
exports.RecoverVerifyOTP=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0; // false
    let statusUpdate=1; // otp thik ase true

    //aekhane o amra akta counting debo.counting hobe 1->email adress er opor base kore. 2->  user je otp code ta dese sei otp code tar opor base kore. oi email address a jei otp code ta amra desi and status ta 0 kina  0 mane se oi otp ta use kore nae.deye aktacounting debo.
    let result= await OTPModel.find({email:email,otp:OTPCode,status:status}).count();
    // Time Validation 2 min  ( ami ae khane time validation desi na)
    if(result===1){
        await OTPModel.updateOne({email:email,otp:OTPCode,status:status}, {status:statusUpdate})//  or status ta ke change kore debo amra. amra korbo ki otp jei verify kore felsi verification complete hoye gele amra or status ta ke update kore debo.update kore dele oi otp code ta porobortite user are use korte parbe na.
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }

}


//* RecoverResetPass  -- Jodi user OTP verify korte pare tahole oi user ke amra korbo ki RecoverResetPass namee akta method create kore neyesi , jei method er bitore user ke password reset korar akta sojog kore debo.
//otp verify korle status 1 korle . er pore se password reset korte parbe.
//aekhane security er akta boro bisoe ase. aekhane.
exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();//amra abar check debo user asole otp verify korse kina. OTPModel a geye abar check debo.
    if(result===1){ // verify jodi pai 1 tahole user verify hoise. tahole verify jodi hoiya thake . profile jerokom update korsilam amra email address dore. oirokom amra korbo ki   UserModel theke email address dore khali password ta update kore debo.password ta new password deye update kore debo.
        let result=await UsersModel.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(200).json({status:"fail",data:"Invalid Verification"})
    }
}


























