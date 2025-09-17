import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatWindow.scss";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [sessionId, setSessionId] = useState(() =>
    localStorage.getItem("sessionId")
  );
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (sessionId) {
        setIsLoadingHistory(true);
        try {
          const response = await axios.get(
            `http://localhost:3001/api/history/${sessionId}`
          );
          if (response.data.messages.length > 0) {
            setMessages(response.data.messages);
          } else {
            setMessages([
              {
                id: "initial",
                text: "Hello! Ask me anything about the latest news.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString(),
              },
            ]);
          }
        } catch (error) {
          console.error("Failed to fetch history", error);
          setMessages([
            {
              id: "initial",
              text: "Hello! Ask me anything about the latest news.",
              sender: "bot",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        } finally {
          setIsLoadingHistory(false);
        }
      } else {
        setMessages([
          {
            id: "initial",
            text: "Hello! Ask me anything about the latest news.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    };
    fetchHistory();
  }, [sessionId]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        query: currentInput,
        sessionId: sessionId, // Send the current session ID
      });

      const newSessionId = response.data.sessionId;
      if (!sessionId) {
        localStorage.setItem("sessionId", newSessionId);
        setSessionId(newSessionId);
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.data.answer,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response from backend:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Sorry, I ran into an error.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!sessionId) return;
    try {
      await axios.post(`http://localhost:3001/api/clear/${sessionId}`);
      localStorage.removeItem("sessionId");
      setSessionId(null);
      setMessages([
        {
          id: "initial",
          text: "Session reset. Hello!",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Failed to reset session", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <div className="header-left">
          <h2>Chat History</h2>
          {sessionId && (
            <span className="session-indicator">
              Session: {sessionId.substring(0, 8)}...
            </span>
          )}
        </div>
        <div className="header-right">
          {isLoadingHistory && (
            <span className="loading-indicator">Loading history...</span>
          )}
          <button className="reset-button" onClick={handleReset}>
            Reset Session
          </button>
        </div>
      </div>
      <div className="chat-window">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                {message.timestamp && (
                  <span className="message-timestamp">{message.timestamp}</span>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot typing-indicator">
              <p>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
