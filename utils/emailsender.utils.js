const nodemailer = require("nodemailer");
const { email } = require("../config/index.config.js");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: email.type,
    user: email.user,
    pass: email.pass,
  },
});

const emailTexts = {
  verifyMail: (code) => `Dear user

    To verify your email, here is your six digits code ${code}.
    This code expires in 10 minutes.
    If you did not create an account with us then ignore this email. 
    `,
  emailReset: (code) => `Dear user

    To change your email, here is your six digits code ${code}.
    This code expires in 10 minutes.
    If you did not make this request ignore this email. 
    `,
  passwordReset: (code) => `Dear user
    
    To reset your password, here is your six digits code ${code}.
    This code expires in 10  minutes.
    If you did not make this request ignore this email. 

    `,
  accountCreated: (link) => `
    <h2>Dear user</h2>
    <p>Your account has been created for the TNT site,
    you are an admin and can now visit the dashboard to add products</p>
    <a href=${link}>Go To Dashboard</a>
    `,
};

const sendEmail = async (to, subject, text, type) => {
  let msg = { from: process.env.EMAIL_FROM, to, subject, text };
  if (type === "html")
    msg = { from: process.env.EMAIL_FROM, to, subject, html: text };
  await transport.sendMail(msg);
};

const sendMail = async (to, code, subject) => {
  let text = "";
  let html = "";
  if (subject === "Verify Your Email") {
    text = emailTexts.verifyMail(code);
  } else if (subject === "Reset Password") {
    text = emailTexts.passwordReset(code);
  } else if (subject === "Update Email") {
    text = emailTexts.emailReset(code);
  } else if (subject === "Account Created") {
    html = emailTexts.accountCreated("https://wwwtnt.net/dashboard.html");
  }

  await sendEmail(
    to,
    subject,
    text !== "" ? text : html,
    text !== "" ? "text" : "html"
  );
};

module.exports = sendMail;
