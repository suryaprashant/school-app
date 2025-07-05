export const getVerificationEmailTemplate = (verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f6f9fc;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h2 {
          color: green;
        }
        a.verify-button {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 20px;
          background-color: green;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        p.small {
          font-size: 0.85rem;
          color: #777;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification - TC-SA</h2>
        <p>Hello,</p>
        <p>Thank you for registering with TC-SA. Please click the button below to verify your email address:</p>
        <a class="verify-button" href="${verificationUrl}">Verify My Email</a>
        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p class="small">This verification link will expire in 15 minutes. If you did not create an account, please ignore this email.</p>
        <p class="small">- The TC-SA Team</p>
      </div>
    </body>
    </html>
  `;
};

export const getEmailVerifiedTemplate = () => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verified</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0fdf4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .message {
      text-align: center;
      background: white;
      padding: 2rem 3rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .message h1 {
      color: green;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>Email Verified!</h1>
    <p>Thank you. Your email has been successfully verified.</p>
  </div>
</body>
</html>
`
};

export const getEmailAlreadyVerifiedTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Already Verified</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0fdf4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .message {
      text-align: center;
      background: white;
      padding: 2rem 3rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .message h1 {
      color: #2e7d32;
    }
    .message p {
      color: #555;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>Email Already Verified</h1>
    <p>This email address has already been verified. You can safely close this window or return to the app.</p>
  </div>
</body>
</html>
`
};

export const getLinkExpired = () => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Link Expired</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #fff5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .message {
      text-align: center;
      background: #ffffff;
      padding: 2rem 3rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .message h1 {
      color: #d32f2f;
      margin-bottom: 1rem;
    }
    .message p {
      color: #555;
    }
    .message a {
      display: inline-block;
      margin-top: 1.5rem;
      text-decoration: none;
      background-color: #d32f2f;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>⏰ Link Expired</h1>
    <p>Sorry, this email verification link has expired or is no longer valid.</p>
  </div>
</body>
</html>
`
};

export const getOtpEmailTemplate = (otpCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Your OTP Code</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f6f9fc;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h2 {
          color: green;
        }
        .otp-code {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          background-color: #f0f0f0;
          padding: 12px 20px;
          border-radius: 6px;
          display: inline-block;
          margin: 20px 0;
          letter-spacing: 3px;
        }
        p.small {
          font-size: 0.85rem;
          color: #777;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>OTP Verification - TC-SA</h2>
        <p>Hello,</p>
        <p>Use the following One-Time Password (OTP) to proceed with your request:</p>
        <div class="otp-code">${otpCode}</div>
        <p class="small">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        <p class="small">- The TC-SA Team</p>
      </div>
    </body>
    </html>
  `;
};
