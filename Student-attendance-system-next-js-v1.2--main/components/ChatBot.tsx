import { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Typography, Paper, List, ListItem, ListItemText, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [topic, setTopic] = useState("");
  const [isChatActive, setIsChatActive] = useState(false); // وضعیت فعال‌سازی چت
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartChat = async () => {
    if (!topic.trim()) return;
  
    try {
      const response = await fetch("http://localhost:3001/api/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          sessionId: "12345",  // اضافه کردن sessionId
          topic 
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        setIsChatActive(true); // فعال‌سازی چت
        setMessages([{ sender: "bot", text: data.message }]); // نمایش پیام خوش‌آمدگویی
      } else {
        alert("خطا در شروع چت: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("خطا در ارتباط با سرور");
    }
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3001/api/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: "12345", answer: input }),
      });

      const data = await response.json();
      if (data.question) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.question }]);
      } else if (data.petition) {
        setMessages((prev) => [...prev, { sender: "bot", text: `عریضه نهایی: ${data.petition}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "خطا در ارسال پیام به سرور" }]);
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 1000,
        height: "600px",
        margin: "0 auto",
        p: 2,
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
        چت‌بات تعاملی 🤖
      </Typography>

      {!isChatActive ? (
        // نمایش فیلد topic و دکمه شروع چت
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="موضوع چت را وارد کنید..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            sx={{ bgcolor: "white", borderRadius: 2, width: "400px" }}
          />
          <Button variant="contained" onClick={handleStartChat}>
            شروع چت
          </Button>
        </Box>
      ) : (
        // نمایش چت‌بات
        <>
          <Paper sx={{ flex: 1, overflowY: "auto", p: 2, borderRadius: 3, bgcolor: "#f9f9f9", width: "100%" }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      bgcolor: msg.sender === "user" ? "#2196f3" : "#e0e0e0",
                      color: msg.sender === "user" ? "white" : "black",
                      borderRadius: 2,
                      p: 1.5,
                      maxWidth: "70%",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Paper>

          <Box sx={{ display: "flex", alignItems: "center", mt: 3, width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="پیام خود را بنویسید..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
            <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 2 }}>
              <SendIcon sx={{ fontSize: "28px" }} />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatBot;