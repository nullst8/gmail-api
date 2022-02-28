import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();

const CLIENT_ID = String(process.env.CLIENT_ID);
const SECRET_KEY = String(process.env.SECRET_KEY);
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = String(process.env.RT);

const oAuthClient = new google.auth.OAuth2(CLIENT_ID, SECRET_KEY, REDIRECT_URI);
oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessTok = oAuthClient.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: String(process.env.MAIL_ID),
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    refreshToken: REFRESH_TOKEN,
    accessToken: String(accessTok),
  },
} as SMTPTransport.Options);

const options = {
  from: `anonymous <${process.env.MAIL_ID}>`,
  to: String(process.env.RECEIVER),
  subject: "Test",
};

transporter.sendMail(options, (err, res) => {
  err ? console.log(err) : console.log(res);
  transporter.close();
});
