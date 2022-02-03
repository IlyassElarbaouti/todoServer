const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mrfixer59@gmail.com",
        pass: "NoloveNopaine",
      },
    });
    this.sendActivationMail = this.sendActivationMail.bind(this)
  }
  mailDetails(to, link) {
    return {
      from: "mrfixer59@gmail.com",
      to,
      subject: "activate your account" + process.env.API_URL,
      text: "",
      html: `
        <div>
        <h1>for account activation</h1>
        <a href='${link}'>${link}</a>
        </div>
        `,
    };
  }

  sendActivationMail(to, link) {
    this.transporter.sendMail(this.mailDetails(to, link), function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    })
  };
}
module.exports = new MailService();
