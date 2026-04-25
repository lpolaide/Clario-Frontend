import { google } from "googleapis";

export default async function handler(req, res) {
  const redirectUri = "http://localhost:5173";

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    redirectUri
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    prompt: "consent"
  });

  res.status(200).json({ url });
}
