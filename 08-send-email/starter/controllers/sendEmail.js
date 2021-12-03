const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')

const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ulises.bergstrom73@ethereal.email',
            pass: '2Fp6tASVTu5ygB6vqG'
        }
     });
     let info = await transporter.sendMail({
         from: '"codernineteen" <codernineteen@gmail.com>',
         to: 'stranger@gmail.com',
         subject: 'hello',
         html:'<h2>Sending Email with nodemailer</h2>'
     })

     res.json(info);
}

const sendEmail = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'testforsmtp1010@gmail.com',
        from: 'wjsdPcks34@gmail.com',
        subject: 'Hey! check this out',
        text: 'Sending with SendGrid is Fun',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    try {
        const info = await sgMail.send(msg);
        console.log('email sent')
        res.json(info)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail