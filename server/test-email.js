// test-email.js
require('dotenv').config();
const { Resend } = require('resend');

async function testEmail() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('Using Resend API key:', process.env.RESEND_API_KEY.substring(0, 5) + '...');
    
    const testEmail = 'abdulsammadk5@gmail.com'; // Replace with your actual email address
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use a verified domain with Resend
      to: testEmail, 
      subject: 'Test Email from Travel Pakistan',
      html: '<p>This is a test email to verify the Resend API is working correctly.</p>',
    });
    
    if (error) {
      console.error('Test email failed:', error);
    } else {
      console.log('Test email sent successfully:', data);
    }
  } catch (error) {
    console.error('Error in test email function:', error);
  }
}

testEmail();