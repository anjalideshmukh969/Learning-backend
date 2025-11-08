const sendMail = require("../services/mail.service");

const mailController = async (req, res) => {
    try {
        let {to,text} = req.body;

          // Basic validation
        if (!to || !text) {
          return res.status(400).json({
          success: false,
           message: "Recipient email and message text are required.",
       });
      }

        let response = await sendMail(to, "Test Mail from HM", text);
        return res.status(200).json({
            message: "Mail sent successfully",
            info: response,
        });
    } catch (error) {
        console.error("Error sending mail:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send mail.",
      error: error.message,
    });
    }
}
module.exports = mailController;