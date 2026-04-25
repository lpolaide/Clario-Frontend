import { google } from "googleapis";

export default async function handler(req, res) {
  const code = req.query.code;
  const redirectUri = "http://localhost:5173";

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    redirectUri
  );

  const { tokens } = await oauth2Client.getToken(code);

  res.status(200).json({ tokens });
}
