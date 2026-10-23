
import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface VerificationEmailParams {
  to: string;
  url: string;
  name: string;
}

export async function sendVerificationEmail({
  to,
  url,
  name,
}: VerificationEmailParams) {
  const from = process.env.EMAIL_FROM;

  if (!process.env.RESEND_API_KEY || !from) {
    throw new Error("Email provider is not configured");
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: "Verifica tu dirección de correo",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h1>¡Hola, ${escapeHtml(name)}!</h1>
        <p>Confirma tu dirección de correo para activar tu cuenta.</p>
        <p>
          <a href="${escapeHtml(url)}"
             style="display:inline-block;padding:12px 20px;
                    background:#171717;color:#fff;
                    text-decoration:none;border-radius:8px">
            Verificar mi correo
          </a>
        </p>
        <p>Si no creaste una cuenta, puedes ignorar este mensaje.</p>
      </div>
    `,
    text: `Hola, ${name}. Verifica tu correo aquí: ${url}`,
  });

  if (error) {
    console.error("Verification email failed", {
      name: error.name,
      message: error.message,
    });

    throw new Error("Could not send verification email");
  }

  return data;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}
