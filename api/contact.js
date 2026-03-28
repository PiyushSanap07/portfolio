// Vercel serverless function for contact form
// Deploy with `vercel` CLI or connect GitHub repo to Vercel

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Sanitize inputs
  const sanitize = (str) => str?.replace(/[<>]/g, '').trim() || '';

  const data = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone || ''),
    subject: sanitize(subject || 'No subject'),
    message: sanitize(message),
  };

  try {
    // Option 1: Using Resend (recommended)
    // Uncomment and add RESEND_API_KEY to environment variables
    /*
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'piyushsanapnsk@gmail.com',
        subject: `Portfolio Contact: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Email sending failed');
    }
    */

    // For now, log the data (replace with email service)
    console.log('Contact form submission:', data);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
