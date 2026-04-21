// /api/sendMessage.js - Vercel serverless function for secure messaging
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, recipient } = req.body;
  const apiKey = process.env.LAYER_V_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Placeholder: Replace with actual LayerV API call
    // Example: Send secure message via LayerV
    const response = await fetch('https://api.layer-v.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        to: recipient,
        encrypted: true, // Assuming LayerV handles encryption
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const result = await response.json();
    res.status(200).json({ success: true, messageId: result.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
}