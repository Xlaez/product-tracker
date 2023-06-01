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
};

const sendEmail = async (to, subject, text) => {
  const msg = { from: process.env.EMAIL_FROM, to, subject, text };
  await transport.sendMail(msg);
};

const sendMail = async (to, code, subject) => {
  let text = "";
  if (subject === "Verify Your Email") {
    text = emailTexts.verifyMail(code);
  } else if (subject === "Reset Password") {
    text = emailTexts.passwordReset(code);
  } else if (subject === "Update Email") {
    text = emailTexts.emailReset(code);
  }

  await sendEmail(to, subject, text);
};

module.exports = sendMail;
