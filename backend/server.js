const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
    mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/', (req, res) => {
    const { message } = req.body;
    console.log(req);
    console.log('hello');
    mailgun().messages().send({
        from: 'GT Streamlined <gt.streamlined1@gmail.com>',
        to: `GT Streamlined <gt.streamlined1@gmail.com>`,
        subject: `<p>New Email Submission</p>`,
        text: `<p>${message}</p>`,
    },
    (error, body) => {
        if (error) {
            console.log(error);
            res.status(500).send({message: 'Error in sending email'})
        } else {
            console.log(body);
            res.send({message: 'Email sent successfully'})
        }
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})