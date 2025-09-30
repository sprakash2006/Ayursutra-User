import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,       // your email
        pass: process.env.PASSCODE          // app password from Gmail
    }
});