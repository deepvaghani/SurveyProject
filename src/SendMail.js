const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "deepvaghani58@gmail.com",
        pass: "rjfdwhhwedphlpmn",
    },
});

// Create a function to send the email
async function sendEmail(to, subject, message) {
    try {
        // Send the email
        const info = await transporter.sendMail({
            from: "Deep Vaghani",
            to: to,
            subject: subject,
            html: message
        });

        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Call the function to send an email
sendEmail("deepvaghani2003@gmail.com", "Thank you for finishing survey", `
<!DOCTYPE html>
<html>
<head>
  <title>Survey Form</title>
  <style>
    label {
      display: block;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Survey Form</h1>
  <form action="mailto:your-email@example.com" method="post" enctype="text/plain">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required>

    <label for="gender">Gender:</label>
    <select id="gender" name="gender" required>
      <option value="">-- Select One --</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <label for="feedback">Feedback:</label>
    <textarea id="feedback" name="feedback" rows="5" required></textarea>

    <input type="submit" value="Submit">
  </form>
</body>
</html>
`);
