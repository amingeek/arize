import { useState } from 'react';

export default function Chat({ initialResponse }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (initialResponse) {
      setMessages([{ text: initialResponse, isUser: false }]);
    }
  }, [initialResponse]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);

      // ارسال درخواست به API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMessage = { text: data.response, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
      setInput('');
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.isUser ? 'right' : 'left', margin: '10px' }}>
            <p style={{ background: msg.isUser ? '#e3f2fd' : '#f5f5f5', padding: '10px', borderRadius: '10px', display: 'inline-block' }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
          ارسال
        </button>
      </div>
    </div>
  );
}