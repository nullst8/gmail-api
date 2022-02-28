"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CLIENT_ID = String(process.env.CLIENT_ID);
const SECRET_KEY = String(process.env.SECRET_KEY);
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = String(process.env.RT);
const oAuthClient = new googleapis_1.google.auth.OAuth2(CLIENT_ID, SECRET_KEY, REDIRECT_URI);
oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessTok = oAuthClient.getAccessToken();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: String(process.env.MAIL_ID),
        clientId: CLIENT_ID,
        clientSecret: SECRET_KEY,
        refreshToken: REFRESH_TOKEN,
        accessToken: String(accessTok),
    },
});
const options = {
    from: `anonymous <${process.env.MAIL_ID}>`,
    to: String(process.env.RECEIVER),
    subject: "Test",
};
transporter.sendMail(options, (err, res) => {
    err ? console.log(err) : console.log(res);
    transporter.close();
});
//# sourceMappingURL=index.js.map