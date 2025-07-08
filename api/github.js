export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Webhook payload:', req.body);
    res.status(200).json({ message: 'Webhook received!' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

