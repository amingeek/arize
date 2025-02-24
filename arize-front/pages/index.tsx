import Layout from "../components/Layout";
import ChatBot from "../components/ChatBot";

export default function Home() {
  return (
    <Layout isLoggedIn={true}> {/* مقدار isLoggedIn را همیشه true بگذار */}
      <ChatBot />
    </Layout>
  );
}
