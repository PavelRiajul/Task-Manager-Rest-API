// Rest Api project

//Rest Api develope korbo --> Express.js / Mongodb use kore.
// kiso npm package use korbo.


//Requerment:
//1-> user registration  --> email, firstName,lastName,mobile,password
//-> akhon user registration hoye gelo , user er email address ta ke primary key hisabe use korbo.ba user er akta uniq identiti hisabe use korbo.porobortite user forget password korok ba OTP generate korok ba user er Token generate korok  ,oi somoy amra user er email address ta ke kajee lagabo.

//2-> user login  --> email,password
//-> prorobortite user jokhon login korbe , login korar somoy , ragistration korar somoy user jokhon email,password deyese, sei email,password use kore se login korbe.
// user ke jokhon amra login korate jacchi, login er binimoye user ki akta JWT Token debo.karon logon poroborti joto operation thakbe ae operation golo gotanor jonno user oi jwt Token ta deye kaj korbe.
//user er kas theke email,password ta nebo reqBody er maddome nilam.

// are user login korar por poree amra oi user er jonno amra akta bearr Token/JWT Token generate korbo.jei Token ta deye poroborti jei kajkormo golo ase sei kaj golo cholte thakbe.akhon poroborti ki ki kajkormo cholte thakbe.
//1-> user profile update korte parbe.


//..................................
// userController --> userController er bitore  korbo user password reset kora, oi user ke login korano registration korano  Token issu korano theke soro kore joto kajkormo ase sob amra user controller er bitore korbo.

//are user login korar pore je function golo pabe ba features golo pabe sei function golo ba features golor jonno amra jei API ta use korbo --- taskController
//taskController -->

//middleware----AuthverifyMiddleware --> user Authenticate ki na sei ta verify korar jonno amra aekhane akta AuthverifyMiddleware create kore neyesi.

//models ----aekhane user er jonno amra 3 ta model create kore neyesi
//1->OTPModel ---- user verification korar jonno  user ke email address deye OTP pathabo.
//2->TaskModel ----- User er task manage korbo
//3->UsersModel ---- user ke login registration korabo

//utility ----- sendEmailUtility ---->  model er bitore jehe to user ki OTP pathanor akta bisoe royese  tar jonno amader ke Mail pathate hobe , sei Email pathanor jonno amra besh kiso settings create kore nebo . jegolo amra rekhe deyesi sendEmailUtility file er bitore.


//***** */
 // Rest-Api develop korar  jonno kono frontend thake na , frontend neye tader kono matha betha thakee na.karon oi fronted akta web-application hote pare, akta decktop application hote pare, mobile application hote pare.b2b
 //jokhon amra backend develope korbo tokhon fronted a ki hobe that is not consern. my consern is functionality, my consern is Backend.
 //feature golo test korbo Postman deye .
 //Backend developer er chinta thakbe --> backend er API neye,  route neye , controller neye, database neye,model neye are postman neye. 



 //***** */
 // taskController and UserController method golo complete korar pore amader ke routing in point create korte hobe.


 //**** */
 //Jokhon amra production grede kaj korbo ,tokhon sob somoy mone rakhbo akta project kokhono scrach/new theke hoy na , tar jonno akta boilerplate thakee . ae boilarplate theke kinto akta project er soro hoy.
 //jokhon ee kono project amra kori akbare create a new project theke je amra kora soro kori  that is not .ae jonno amader boilar plate create kora thake.ba agge theke baneye rakhbo.
 //tahole ae project ta ta ki jodi ami akta boilarplate hisabe rekhe dei , ae khane amar routing,configaration,middleware,controller beshi kiso configar koraee thaktase.  Than ami jei project korbo , sei project er features golo includ kore amar akta rest api ami create korte parbo.

 //*** */
 // developer ra free time a arokom kiso boilarplat banaya banaya rekheye dei. pore je kono project er jonno just featurs add korlee hobe.
 //Ecommerce er boilarplate
 //Task manager er boilar plate
 // Enventory managment system er boiler plate
 // bivinno project er jonno amra agee thekee boilar plate banaya rakhte pari.



 /////////////////////////////////////////////////////////////////////////
 //* amra ki ki korlam
 //1-> User manage  -> Ragistration, login, mailverification, otp, otp verification, user password reset, profile update, profile deteils,Create Token, Decode Token, Email Sinding,

 //2-> Auth Middleware --> Token verify, Header Manupualte, 401 unAuth 

 //3-> task ---> Token identity dore  --> create, Dekete,Update, List, Counting

 //4->Postman --- postman deye Api testing shikhlam , Rest Api Documentation create.

