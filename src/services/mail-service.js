const nodemailer = require("nodemailer");
const ApiError = require("../exceptions/api-error");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mrfixer59@gmail.com",
        pass: "NoloveNopaine",
      },
    });
    this.sendActivationMail = this.sendActivationMail.bind(this);
  }
  mailDetails(to, link) {
    return {
      from: "Todo App Support <mrfixer59@gmail.com>",
      to,
      subject: "Todo app account activation",
      text: "",
      html: `
        <div>
        <h1>activate your account to create your first todoList</h1>
        <a href='${link}'>activation link</a>
        </div>
        `,
    };
  }

  sendActivationMail(to, link) {
    try {
      this.transporter.sendMail(this.mailDetails(to, link));
    } catch (e) {
      throw new ApiError.serverError();
    }
  }
}
module.exports = new MailService();
