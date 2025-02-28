export default async function handler(req, res) {
    const { message } = req.body;
  
    try {
      // ارسال درخواست به API خارجی
      const apiResponse = await fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await apiResponse.json();
  
      res.status(200).json({ response: data.response });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ response: 'خطا در ارتباط با سرور' });
    }
  }