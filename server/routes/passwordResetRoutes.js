// passwordResetRoutes.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const crypto = require("crypto");
const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for password reset
const createPasswordResetEmail = (resetToken, userEmail) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
  
  return {
    from: 'MapMyTrip <noreply@resend.dev>', // Using resend.dev domain (free tier)
    to: userEmail,
    subject: 'Reset Your MapMyTrip Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - MapMyTrip</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 300;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
              font-size: 16px;
            }
            .content {
              padding: 40px 30px;
            }
            .mountain-icon {
              font-size: 48px;
              text-align: center;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              margin-bottom: 30px;
              text-align: center;
              color: #666;
            }
            .reset-button {
              display: block;
              width: 200px;
              margin: 30px auto;
              padding: 15px 30px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              border-radius: 50px;
              text-align: center;
              font-weight: 600;
              font-size: 16px;
              transition: transform 0.2s ease;
            }
            .reset-button:hover {
              transform: translateY(-2px);
            }
            .security-info {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 30px 0;
              border-left: 4px solid #667eea;
            }
            .security-info h3 {
              margin: 0 0 10px 0;
              color: #667eea;
              font-size: 18px;
            }
            .security-info p {
              margin: 5px 0;
              font-size: 14px;
              color: #666;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px 30px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .footer p {
              margin: 5px 0;
            }
            .link-fallback {
              word-break: break-all;
              color: #667eea;
              text-decoration: none;
              font-size: 14px;
              margin-top: 20px;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏔️ MapMyTrip</h1>
              <p>Explore Pakistan's Northern Beauty</p>
            </div>
            
            <div class="content">
              <div class="mountain-icon">🔐</div>
              
              <div class="message">
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your password for your MapMyTrip account. Click the button below to create a new password:</p>
              </div>
              
              <a href="${resetUrl}" class="reset-button">Reset My Password</a>
              
              <div class="security-info">
                <h3>🛡️ Security Information</h3>
                <p><strong>This link will expire in 1 hour</strong> for your security.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
                <p>Your current password will remain unchanged until you create a new one.</p>
              </div>
              
              <p style="text-align: center; color: #999; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <a href="${resetUrl}" class="link-fallback">${resetUrl}</a>
            </div>
            
            <div class="footer">
              <p><strong>MapMyTrip</strong> - Your Gateway to Pakistan's Northern Adventures</p>
              <p>Discover Hunza, Skardu, Gilgit, and more breathtaking destinations</p>
              <p style="margin-top: 15px; font-size: 12px; color: #999;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      MapMyTrip - Password Reset Request
      
      Hi there!
      
      We received a request to reset your password for your MapMyTrip account.
      
      To reset your password, please click on the following link:
      ${resetUrl}
      
      This link will expire in 1 hour for your security.
      
      If you didn't request this password reset, please ignore this email. Your current password will remain unchanged.
      
      Happy travels!
      MapMyTrip Team
      
      ---
      MapMyTrip - Your Gateway to Pakistan's Northern Adventures
      Discover Hunza, Skardu, Gilgit, and more breathtaking destinations
    `
  };
};

// Step 1: Request password reset
router.post("/request-reset", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether a user exists for security reasons
      return res.json({ 
        message: "If your email exists in our system, you will receive a password reset link within a few minutes." 
      });
    }
    
    // Generate a reset token (random string)
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // Set token expiration (1 hour from now)
    const resetExpires = Date.now() + 3600000; // 1 hour
    
    // Update user with reset token and expiration
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();
    
    // Send email with reset link
    try {
      const emailData = createPasswordResetEmail(resetToken, email);
      const emailResult = await resend.emails.send(emailData);
      
      console.log(`Password reset email sent to ${email}:`, emailResult);
      
      // Return success message (same whether user exists or not)
      res.json({ 
        message: "If your email exists in our system, you will receive a password reset link within a few minutes.",
        success: true
      });
      
    } catch (emailError) {
      console.error("Error sending reset email:", emailError);
      
      // Clear the reset token if email failed to send
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      // Return generic error (don't reveal email sending failed)
      res.status(500).json({ 
        error: "There was an issue processing your request. Please try again later." 
      });
    }
    
  } catch (error) {
    console.error("Password reset request error:", error);
    res.status(500).json({ 
      error: "There was an issue processing your request. Please try again later." 
    });
  }
});

// Step 2: Verify reset token and set new password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }
    
    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    
    // Find user with matching reset token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        error: "Password reset token is invalid or has expired. Please request a new reset link." 
      });
    }
    
    // FIXED: Let the User model handle password hashing
    // Don't manually hash here - the User model's pre-save middleware will handle it
    user.password = newPassword;
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    // Save the updated user (pre-save middleware will hash the password)
    await user.save();
    
    console.log(`Password successfully reset for user: ${user.email}`);
    
    res.json({ 
      message: "Password has been reset successfully. You can now log in with your new password.",
      success: true 
    });
    
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ 
      error: "There was an issue resetting your password. Please try again." 
    });
  }
});

// Step 3: Verify token validity (used to check if token is valid before showing password reset form)
router.get("/verify-token/:token", async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({ valid: false, error: "Token is required" });
    }
    
    // Find user with matching reset token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        valid: false, 
        error: "Password reset token is invalid or has expired" 
      });
    }
    
    res.json({ 
      valid: true,
      message: "Token is valid" 
    });
    
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ 
      valid: false, 
      error: "Error verifying token" 
    });
  }
});

module.exports = router;