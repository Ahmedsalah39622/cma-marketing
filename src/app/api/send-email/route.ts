import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Log environment variables (without password)
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Password exists:', !!process.env.EMAIL_PASSWORD);

    const { name, email, message, to } = await request.json();
    
    // Log request data (for debugging)
    console.log('Received form data:', { name, email, to });

    // Validate required fields
    if (!name || !email || !message || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Novix Web Contact" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `,
    };

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { error: 'Email server configuration error' },
        { status: 500 }
      );
    }

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return NextResponse.json({ 
        message: 'Email sent successfully',
        messageId: info.messageId 
      }, { status: 200 });
    } catch (sendError: unknown) {
      let errorMsg: string;
      if (typeof sendError === 'object' && sendError !== null && 'message' in sendError && typeof (sendError as { message?: unknown }).message === 'string') {
        errorMsg = (sendError as { message: string }).message;
      } else {
        errorMsg = String(sendError);
      }
      console.error('Send error:', errorMsg);
      return NextResponse.json(
        { error: `Failed to send email: ${errorMsg}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    let errorMsg: string;
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
      errorMsg = (error as { message: string }).message;
    } else {
      errorMsg = String(error);
    }
    console.error('General error:', errorMsg);
    return NextResponse.json(
      { error: `Server error: ${errorMsg}` },
      { status: 500 }
    );
  }
}