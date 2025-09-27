import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prakashswami150569@gmail.com',       // your email
        pass: 'vrrcgdzipkqqhcie'           // app password from Gmail
    }
});