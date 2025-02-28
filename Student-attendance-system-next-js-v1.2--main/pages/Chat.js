import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Chat from '../components/Chat';

export default function ChatPage() {
  const router = useRouter();
  const { topic } = router.query;
  const [initialResponse, setInitialResponse] = useState('');

  useEffect(() => {
    if (topic) {
      // ارسال درخواست اولیه به API
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: topic }),
      })
        .then((res) => res.json())
        .then((data) => setInitialResponse(data.response))
        .catch((error) => console.error('Error:', error));
    }
  }, [topic]);

  if (!topic) {
    return <p>لطفاً موضوعی را انتخاب کنید.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>چت با ربات: {topic}</h1>
      <Chat initialResponse={initialResponse} />
    </div>
  );
}