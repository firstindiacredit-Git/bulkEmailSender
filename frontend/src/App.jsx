import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();

    const emailArray = emails.split(',').map(email => email.trim());

    try {
      const response = await axios.post('http://localhost:5000/send-email', {
        emails: emailArray,
        subject: subject,
        message: message
      });

      if (response.data.success) {
        alert('Emails sent successfully!');

        window.location.reload();
      } else {
        setStatusMessage('Failed to send emails.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage('Error occurred while sending emails.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Send Gmail to Multiple Recipients</h1>
        <form onSubmit={sendEmail}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Emails (comma-separated)</label>
            <textarea
              type="text"
              rows='5'
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              required
              placeholder="Enter email addresses"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter email subject"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Enter your message"
              rows="5"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Emails
          </button>
        </form>

        {statusMessage && (
          <div className="mt-4 text-center text-lg text-red-500">{statusMessage}</div>
        )}
      </div>
    </div>
  );
}

export default App;
