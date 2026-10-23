
import "server-only";
import {
  MailerSend,
  EmailParams,
  Sender,
  Recipient,
} from "mailersend";

interface VerificationEmailParams {
  to: string;
  url: string;
  name: string;
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export async function sendVerificationEmail({
  to,
  url,
  name,
}: VerificationEmailParams) {
  const apiKey = process.env.MAILERSEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("MailerSend is not configured");
  }

  const mailerSend = new MailerSend({ apiKey });

  const sender = new Sender(from, "Mi Aplicación");
  const recipients = [new Recipient(to, name)];

  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(url);

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject("Verifica tu dirección de correo")
    .setHtml(`
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b">
        <h1>¡Hola, ${safeName}!</h1>
        <p>Confirma tu dirección de correo para activar tu cuenta.</p>
        <p>
          <a href="${safeUrl}"
             style="display:inline-block;padding:12px 20px;background:#18181b;color:#fff;text-decoration:none;border-radius:8px">
            Verificar mi correo
          </a>
        </p>
        <p>Si no creaste una cuenta, puedes ignorar este mensaje.</p>
      </div>
    `)
    .setText(
      `Hola, ${name}. Verifica tu correo aquí: ${url}`,
    );

  try {
    return await mailerSend.email.send(emailParams);
  } catch (error) {
    console.error("MailerSend verification email failed:", error);
    throw new Error("Could not send verification email");
  }
}
