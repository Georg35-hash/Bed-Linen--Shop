const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  if (!req.body || !req.body.email) {
    return res.status(400).json({ message: 'Email is succssed' });
  } else {
    console.log('📥 Form sended:', req.body);
  }

  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"СontactForm" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Connection request',
      html: `
        <h3>New letter from Bed Linen Shop</h3>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    console.log('📤The form has been sent to:', mailOptions.to);

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Letter is sended:', info.response);
    res.status(200).json({ message: 'Email is sucssed sended' });
  } catch (error) {
    console.error('❌ Error per sent:', error?.message || error);
    res.status(500).json({
      message: 'Server error per sending',
    });
  }
};
module.exports = sendContactEmail;
