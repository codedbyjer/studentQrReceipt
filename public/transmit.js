export async function sendEmailWithQRCode(email, qrCodeUrl, fullName, selectedEventName) {
    const subject = "Your QR Code";
    const text = `Good Day! ${fullName},

        This is an automated message to confirm that your data submission for the event ${selectedEventName} has been successfully received.
Attached to this email is a unique QR code that serves as your receipt for the submitted data. Please keep this QR code for your records.
Thank you for your participation. Should you have any questions or concerns, feel free to contact us on our email (solecraft577@gmail.com)`;

    try {
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, subject, text, qrCodeUrl })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Email sent successfully:', result);
        } else {
            console.error('Error sending email:', result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}