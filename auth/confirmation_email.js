const node_mailer = require("nodemailer");

async function send_email(){
    const testAccount = await nodemailer.createTestAccount();

    const transport = node_mailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        }
    });
    const info = await transport.sendMail({
        from: "test@gmail.com", // sender address
        to: "test@gmail.com", // list of receivers
        subject: "Confirmation email", // Subject line
        text: "click on this link to confirm your email", // plain text body
        html: "<a href:'google.com'> click me </a>"
    })
    return info;
}

module.exports = send_email;