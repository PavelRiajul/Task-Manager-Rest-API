const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => { // akta email pathanor jonno 1st a amder lagee --- 1->EmailTo(email ta ami kake pathabo) --2->EmailText() -- 3->EmailSubject()
//ae maigl pathanor jonno amar akta smtp(cradantial) configuration lagbe.
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com', // <--sei cradential ta holo 
        port: 25,
        secure: false, // security false kore deya ase mane mail sobai pathate parbe
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'         // host mail server er use & pass
        },tls: {
            rejectUnauthorized: false
        },
    });


//jei mail pathabo , sei mail er jonno akta object create korte hobe. jei object er bitore thakbe --1-> from:kothai theke ami sei mail ta pathacchi .
    let mailOptions = {
        from: 'Task Manager MERN <info@teamrabbil.com>', // ae khan theke mail ta patacchi
        to: EmailTo,  // kake mail pathabo
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions) // transpoter theke sendmail function ta ke call korbo.

}
module.exports=SendEmailUtility