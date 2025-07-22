const mailResetPassword = (otp) => {
    // Kiểm tra đầu vào
    if (!otp || typeof otp !== "string") {
        throw new Error("Invalid or missing OTP");
    }

    // Trả về chuỗi HTML hoàn chỉnh
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your MovieApp Password</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; }
        a { text-decoration: none; }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .btn { padding: 10px 20px !important; font-size: 14px !important; }
          .otp-code { font-size: 24px !important; }
        }
      </style>
    </head>
    <body style="background-color: #1a1a1a;">
      <!-- Container chính -->
      <table role="presentation" class="container" style="max-width: 600px; width: 100%; margin: 20px auto; background-color: #262626; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);">
        <!-- Header -->
        <tr>
          <td style="background-color: #c70000; padding: 20px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
            <h1 style="color: #ffffff; font-size: 26px; margin: 0; font-weight: 700;">MovieApp</h1>
            <p style="color: #e0e0e0; font-size: 14px; margin: 5px 0 0;">Your Ultimate Movie Experience</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding: 30px; text-align: center;">
            <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 20px; font-weight: 600;">Reset Your MovieApp Password</h2>
            <p style="color: #b3b3b3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              You’ve requested to reset your password for your MovieApp account. 
              Use the OTP code below to reset your password. This code expires in 10 minutes, so act quickly!
            </p>
            <div class="otp-code" style="display: inline-block; padding: 15px 25px; background-color: #333333; color: #ffffff; font-size: 28px; font-weight: 700; border-radius: 8px; letter-spacing: 2px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #b3b3b3; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
              Copy this code and enter it in the MovieApp password reset page to continue.
            </p>
            <p style="color: #b3b3b3; font-size: 14px; line-height: 1.6; margin: 10px 0 0;">
              Didn’t request this? Please ignore this email or contact our 
              <a href="mailto:support@movieapp.com" style="color: #c70000; font-weight: 600;">support team</a>.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color: #1a1a1a; padding: 20px; text-align: center; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
            <p style="color: #b3b3b3; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} MovieApp. All rights reserved.
            </p>
            <p style="color: #b3b3b3; font-size: 12px; margin: 10px 0 0;">
              <a href="${
                  process.env.CLIENT_URL
              }/privacy" style="color: #c70000; text-decoration: none;">Privacy Policy</a> | 
              <a href="${
                  process.env.CLIENT_URL
              }/terms" style="color: #c70000; text-decoration: none;">Terms of Service</a> | 
              <a href="${
                  process.env.CLIENT_URL
              }/contact" style="color: #c70000; text-decoration: none;">Contact Us</a>
            </p>
            <p style="color: #b3b3b3; font-size: 12px; margin: 10px 0 0;">
              Follow us: 
              <a href="https://facebook.com/movieapp" style="color: #c70000; text-decoration: none; margin: 0 5px;">Facebook</a> | 
              <a href="https://instagram.com/movieapp" style="color: #c70000; text-decoration: none; margin: 0 5px;">Instagram</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
};

// Xuất hàm
module.exports = { mailResetPassword };
