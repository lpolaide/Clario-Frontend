import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function GmailCallback() {
  const [params] = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;

    fetch(`/api/gmail/callback?code=${code}`)
      .then(res => res.json())
      .then(data => {
        console.log("TOKENS:", data.tokens);
      });
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Connecting Gmail…</h1>
      <p className="text-gray-600">Please wait while we verify your account.</p>
    </div>
  );
}
