import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  const msg = {
    to: email, // Change to your recipient
    from: "attendancesystemcite@gmail.com", // Change to your verified sender
    subject: "ATS Login Credentials",
    text: "Here's you account credentials",
    html: `<p>email: <strong>${email}</strong></p>
           <p>password: <strong>${password}</strong></p>`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      res.status(200).json({
        statusCode: response[0].statusCode,
        headers: response[0].headers,
      });
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
