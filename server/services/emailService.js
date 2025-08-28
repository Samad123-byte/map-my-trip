//this is customTour

// services/emailService.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendCustomTourConfirmation = async (tourData) => {
  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c5530; margin: 0; font-size: 28px;">🏔️ Map My Trip</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Explore Pakistan's Northern Beauty</p>
          </div>

          <!-- Confirmation Message -->
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #28a745;">
            <h2 style="color: #28a745; margin: 0 0 10px 0; font-size: 24px;">✅ Tour Request Confirmed!</h2>
            <p style="color: #2c5530; margin: 0; font-size: 16px;">
              Thank you for choosing Map My Trip! Your custom tour request has been successfully submitted and confirmed.
            </p>
          </div>

          <!-- Tour Details -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #2c5530; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">
              🎯 Your Tour Details
            </h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold; width: 40%;">
                  📍 Destinations:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                  ${tourData.preferredDestinations.join(', ')}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">
                  📅 Travel Dates:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                  ${new Date(tourData.startDate).toLocaleDateString('en-PK', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} - ${new Date(tourData.endDate).toLocaleDateString('en-PK', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">
                  👥 Travelers:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                  ${tourData.numberOfTravelers} ${tourData.numberOfTravelers === 1 ? 'person' : 'people'}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">
                  💰 Budget:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                  PKR ${tourData.budget.toLocaleString('en-PK')}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">
                  🏨 Accommodation:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                  ${tourData.accommodationPreference}
                </td>
              </tr>
              ${tourData.activities && tourData.activities.length > 0 ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">
                  🎯 Activities:
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
                  ${tourData.activities.join(', ')}
                </td>
              </tr>
              ` : ''}
              ${tourData.specialRequirements ? `
              <tr>
                <td style="padding: 12px 0; color: #666; font-weight: bold;">
                  📝 Special Requirements:
                </td>
                <td style="padding: 12px 0; color: #333;">
                  ${tourData.specialRequirements}
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <!-- What's Next -->
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2c5530; margin: 0 0 15px 0; font-size: 18px;">🚀 What Happens Next?</h3>
            <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 8px;">Our travel experts will review your requirements</li>
              <li style="margin-bottom: 8px;">We'll create a personalized itinerary for your Pakistan adventure</li>
              <li style="margin-bottom: 8px;">You'll receive a detailed quote within 24-48 hours</li>
              <li>Our team will contact you to finalize the arrangements</li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div style="text-align: center; padding: 20px; background-color: #2c5530; border-radius: 8px; color: white;">
            <h3 style="margin: 0 0 15px 0; color: white;">📞 Need Help?</h3>
            <p style="margin: 0 0 10px 0; font-size: 16px;">
              Our team is here to make your dream trip a reality!
            </p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              Contact us anytime for questions about your booking
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is an automated confirmation from Map My Trip<br>
              Thank you for choosing us to explore Pakistan's beautiful northern areas!
            </p>
          </div>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'Map My Trip <onboarding@resend.dev>', // Using Resend's sandbox domain
      to: [tourData.email],
      subject: `🏔️ Tour Confirmed - Your Pakistan Adventure Awaits! | Map My Trip`,
      html: emailContent,
    });

    console.log('Confirmation email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Admin notification email
const sendAdminNotification = async (tourData) => {
  try {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c5530;">🆕 New Custom Tour Request - Map My Trip</h2>
        
        <div style="background-color: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${tourData.name}</p>
          <p><strong>Email:</strong> ${tourData.email}</p>
          <p><strong>Phone:</strong> ${tourData.phone}</p>
        </div>

        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Tour Requirements</h3>
          <p><strong>Destinations:</strong> ${tourData.preferredDestinations.join(', ')}</p>
          <p><strong>Dates:</strong> ${new Date(tourData.startDate).toLocaleDateString()} - ${new Date(tourData.endDate).toLocaleDateString()}</p>
          <p><strong>Travelers:</strong> ${tourData.numberOfTravelers}</p>
          <p><strong>Budget:</strong> PKR ${tourData.budget.toLocaleString()}</p>
          <p><strong>Accommodation:</strong> ${tourData.accommodationPreference}</p>
          ${tourData.activities && tourData.activities.length > 0 ? `<p><strong>Activities:</strong> ${tourData.activities.join(', ')}</p>` : ''}
          ${tourData.specialRequirements ? `<p><strong>Special Requirements:</strong> ${tourData.specialRequirements}</p>` : ''}
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Request submitted on: ${new Date(tourData.createdAt).toLocaleString('en-PK')}
        </p>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'Map My Trip <onboarding@resend.dev>',
      to: ['admin@mapmytrip.com'], // Replace with your admin email
      subject: `New Custom Tour Request - ${tourData.name}`,
      html: emailContent,
    });

    console.log('Admin notification sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendCustomTourConfirmation,
  sendAdminNotification
};