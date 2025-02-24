// pages/index.tsx
import Layout from '../components/Layout';
import ChatBot from '../components/ChatBot'; // کامپوننت چت بات شما

export default function Home() {
  return (
    <Layout isLoggedIn={true}>
      <ChatBot />
    </Layout>
  );
}