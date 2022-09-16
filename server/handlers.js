const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    const NODEMAILERU = process.env.NODEMAILERU
    const NODEMAILERP = process.env.NODEMAILERP
    const NODEMAILERHOST = process.env.NODEMAILERHOST;
    const NODEMAILERPORT = process.env.NODEMAILERPORT;
    let transporter = nodemailer.createTransport({
        host: NODEMAILERHOST,
        port: NODEMAILERPORT,
        secure: true,
        auth: {
            user: NODEMAILERU,
            pass: NODEMAILERP,
        },
    });

    if (req.body.to === undefined
        || req.body.subject === undefined
        || req.body.text === undefined
        || req.body.html === undefined) {

        res.status(400).json({ message: "Missing information (Either the recipient, the subject, the text, or the html", data: req.body })
        return;
    }

    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: NODEMAILERU,
            to: req.body.to,
            cc: req.body.cc,
            bcc: req.body.bcc,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html,
        });

        res.status(200).json({ status: 200, message: "Sent!", data: info });

    } catch (err) {

        res.status(500).json({ status: 500, message: "An error occurred", data: err });

    } finally {
        return;
    }

};

module.exports = { sendMail };