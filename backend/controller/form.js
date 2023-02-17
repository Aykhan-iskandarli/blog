const sgMail = require('@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.contactForm = (req, res) => {
    const { email, name, message } = req.body;
try {
    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        console.log(sent,"sent")
        return res.json({
            success: true
        });
    });
} catch (err) {
    return res.status(400).json({
        error: errorHandler(err),
      });
}
};
