//this is booking 

const { Resend } = require('resend');

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

const notificationService = {
  sendBookingConfirmationEmail: async (booking, email) => {
    try {
      console.log(`Sending confirmation email to ${email}`);
      
      // Handle multilingual destination name
      let destinationName = 'your destination';
      if (booking.destination) {
        if (typeof booking.destination.name === 'object') {
          destinationName = booking.destination.name.en || 'your destination';
        } else {
          destinationName = booking.destination.name || 'your destination';
        }
      }

      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: 'Map My Trip <noreply@resend.dev>', // Use resend.dev domain for free tier
        to: [email],
        subject: `🎉 Your Trip to ${destinationName} is Confirmed!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #4a6741 0%, #6b8e5a 100%); padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                  🏔️ Map My Trip Pakistan
                </h1>
                <p style="color: #e8f5e8; margin: 10px 0 0 0; font-size: 16px;">
                  Explore the Beauty of Northern Pakistan
                </p>
              </div>
              
              <!-- Success Message -->
              <div style="padding: 30px 20px; text-align: center; background-color: #f8fff8; border-bottom: 3px solid #4a6741;">
                <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
                <h2 style="color: #4a6741; margin: 0; font-size: 24px;">Booking Confirmed!</h2>
                <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">
                  Get ready for an amazing adventure to <strong>${destinationName}</strong>! 
                </p>
              </div>
              
              <!-- Booking Details -->
              <div style="padding: 30px 20px;">
                <h3 style="color: #4a6741; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">
                  📋 Your Booking Details
                </h3>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #4a6741;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">🆔 Booking ID:</td>
                      <td style="padding: 8px 0; color: #333; font-family: monospace; background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${booking._id}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">📅 Travel Date:</td>
                      <td style="padding: 8px 0; color: #333;">${new Date(booking.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">⏰ Duration:</td>
                      <td style="padding: 8px 0; color: #333;">${booking.bookingDetails?.duration || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">👥 Travelers:</td>
                      <td style="padding: 8px 0; color: #333;">${booking.bookingDetails?.travelers || 1} ${(booking.bookingDetails?.travelers || 1) === 1 ? 'Person' : 'People'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">🏨 Accommodation:</td>
                      <td style="padding: 8px 0; color: #333;">${booking.bookingDetails?.accommodation || 'Standard'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">💰 Total Amount:</td>
                      <td style="padding: 8px 0; color: #4a6741; font-weight: bold; font-size: 18px;">PKR ${booking.price?.toLocaleString() || 0}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-weight: 600;">🧾 Transaction ID:</td>
                      <td style="padding: 8px 0; color: #333; font-family: monospace; background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${booking.transactionId || 'Processing...'}</td>
                    </tr>
                  </table>
                </div>
              </div>
              
              <!-- What's Next -->
              <div style="padding: 0 20px 30px 20px;">
                <h3 style="color: #4a6741; margin: 0 0 15px 0; font-size: 18px;">🎒 What's Next?</h3>
                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px;">
                  <ul style="margin: 0; padding-left: 20px; color: #856404;">
                    <li style="margin-bottom: 8px;">Check your email for additional trip details</li>
                    <li style="margin-bottom: 8px;">Our team will contact you 24-48 hours before your trip</li>
                    <li style="margin-bottom: 8px;">Keep your booking ID handy for future reference</li>
                    <li>Pack your bags and get ready for adventure!🎒</li>
                  </ul>
                </div>
              </div>
              
              <!-- Contact Information -->
              <div style="background-color: #f8f9fa; padding: 20px; margin: 0 20px 30px 20px; border-radius: 8px; text-align: center;">
                <h4 style="color: #4a6741; margin: 0 0 10px 0;">Need Help?</h4>
                <p style="margin: 0; color: #666; font-size: 14px;">
                  📞 Customer Support: +92-XXX-XXXXXXX<br>
                  📧 Email: support@mapmytrip.pk<br>
                  🕒 Available 24/7 for your assistance
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #4a6741; padding: 20px; text-align: center;">
                <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: bold;">
                  Thank you for choosing Map My Trip Pakistan! 🇵🇰
                </p>
                <p style="color: #b8d4b8; margin: 5px 0 0 0; font-size: 14px;">
                  Discover the breathtaking beauty of Pakistan's northern areas
                </p>
                <div style="margin-top: 15px;">
                  <span style="color: #b8d4b8; font-size: 12px;">
                    © 2024 Map My Trip Pakistan. All rights reserved.
                  </span>
                </div>
              </div>
              
            </div>
          </body>
          </html>
        `,
        // Also include text version for better deliverability
        text: `
🎉 Your Trip to ${destinationName} is Confirmed!

Dear Traveler,

We're excited to confirm your amazing trip to ${destinationName}!

📋 BOOKING DETAILS:
🆔 Booking ID: ${booking._id}
📅 Travel Date: ${new Date(booking.date).toLocaleDateString()}
⏰ Duration: ${booking.bookingDetails?.duration || 'Not specified'}
👥 Travelers: ${booking.bookingDetails?.travelers || 1}
🏨 Accommodation: ${booking.bookingDetails?.accommodation || 'Standard'}
💰 Payment Amount: PKR ${booking.price?.toLocaleString() || 0}
🧾 Transaction ID: ${booking.transactionId || 'Processing...'}

🎒 WHAT'S NEXT?
• Check your email for additional trip details
• Our team will contact you 24-48 hours before your trip
• Keep your booking ID handy for future reference
• Pack your bags and get ready for adventure!

📞 Need Help?
Customer Support: +92-XXX-XXXXXXX
📧 Email: support@mapmytrip.pk
🕒 Available 24/7 for your assistance

Thank you for choosing Map My Trip Pakistan! 🇵🇰
Discover the breathtaking beauty of Pakistan's northern areas.

© 2024 Map My Trip Pakistan. All rights reserved.
        `
      });

      if (error) {
        console.error('Resend API error:', error);
        return false;
      }

      console.log('Email sent successfully with Resend!', data);
      return true;
      
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  },
  
  // Keep your existing SMS function
  sendBookingConfirmationSMS: async (phoneNumber, booking) => {
    try {
      console.log(`SMS notification would be sent to ${phoneNumber}`);
      // This is a placeholder for actual SMS service integration
      return true;
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      return false;
    }
  }
};

module.exports = notificationService;