import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email",
    html: `
      <h1>Verify your email</h1>
      <img src="https://i.pinimg.com/236x/51/5a/51/515a51b57be229972666fd50e1f97fdd.jpg"  
        style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover; object-position: center;"  
      />
      <p><a href="${confirmLink}">Click here to confirm email</a></p>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <img src="https://i.pinimg.com/236x/51/5a/51/515a51b57be229972666fd50e1f97fdd.jpg"  
        style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover; object-position: center;"  
      />
      <p><a href="${resetLink}">Click here to reset your password</a></p>
    `,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA code",
    html: `
    <img src="https://i.pinimg.com/236x/51/5a/51/515a51b57be229972666fd50e1f97fdd.jpg"  
    style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover; object-position: center;"  
    />
    <h1>Your 2FA code : ${token}</h1>
  `,
  });
};
