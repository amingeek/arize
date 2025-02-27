import { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3000/respond", {  // تغییر مسیر API اینجا
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: "your-session-id", answer: input }),
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
    </Box>
  );
};

export default ChatBot;
