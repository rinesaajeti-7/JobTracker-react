// /Users/rinesa/react-project/react-project/src/pages/AIAssistant.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './aiassistant.css';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, id: number}>>([
    { text: "Hello! 👋 I'm your Job Assistant AI. How can I help with your career journey today?", isUser: false, id: 1 }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(2);
  const navigate = useNavigate();
  const { user } = useAuth();

  const COHERE_API_KEY = "";

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const addMessage = (text: string, isUser: boolean = false) => {
    const newMessage = {
      text,
      isUser,
      id: messageIdCounter.current++
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    const question = inputText.trim();
    if (!question || isLoading) return;

    addMessage(question, true);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch("https://api.cohere.com/v2/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${COHERE_API_KEY}`
        },
        body: JSON.stringify({
          model: "command-a-03-2025",
          messages: [{ role: "user", content: question }],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `API Error: ${res.status}`);
      }

      if (data.message?.content?.[0]?.text) {
        addMessage(data.message.content[0].text);
      } else {
        throw new Error("API response not in expected format");
      }
    } catch (err) {
      console.error('Chat error:', err);
      addMessage("❌ Oops! Something went wrong. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([{ text: "Hello! 👋 I'm your Job Assistant AI. How can I help with your career journey today?", isUser: false, id: 1 }]);
    messageIdCounter.current = 2;
  };

  return (
    <div className="ai-assistant-page">
      <div className="ai-assistant-container">
        {/* Page Header */}
        <div className="ai-header">
          <div className="ai-avatar">
            <i className="fas fa-robot"></i>
          </div>
          <h1 className="ai-title">🤖 Job Assistant AI</h1>
          <p className="ai-subtitle">
            Your intelligent companion for job search and career development
          </p>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-header-left">
                <div className="chat-icon">
                  <i className="fas fa-comments"></i>
                </div>
                <div className="chat-header-text">
                  <h2>Live Chat Assistant</h2>
                  <p>Ask anything about jobs, applications, or career advice</p>
                </div>
              </div>
              <button
                onClick={handleClearChat}
                className="clear-chat-btn"
              >
                <i className="fas fa-trash-alt"></i>
                Clear Chat
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="messages-area"
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-wrapper ${message.isUser ? 'user' : 'ai'}`}
              >
                <div className="message-content">
                  {!message.isUser && (
                    <div className="message-sender">
                      <div className="ai-avatar-small">
                        <i className="fas fa-robot"></i>
                      </div>
                      <span className="sender-name">AI Assistant</span>
                    </div>
                  )}
                  <div className={`message-bubble ${message.isUser ? 'user' : 'ai'}`}>
                    {message.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  {message.isUser && (
                    <div className="message-time">You</div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="loading-message">
                <div className="loading-content">
                  <div className="message-sender">
                    <div className="ai-avatar-small">
                      <i className="fas fa-robot"></i>
                    </div>
                    <span className="sender-name">AI Assistant</span>
                  </div>
                  <div className="loading-bubble">
                    <div className="loading-dots">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="input-area">
            <div className="input-container">
              <div className="input-wrapper">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question here... (e.g., 'How to prepare for a tech interview?')"
                  disabled={isLoading}
                  className="chat-input"
                />
                <div className="input-icon">
                  <i className="fas fa-pen"></i>
                </div>
              </div>
              <button 
                onClick={sendMessage}
                disabled={isLoading || !inputText.trim()}
                className="send-btn"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="quick-suggestions">
              <p className="suggestions-title">
                Try asking:
              </p>
              <div className="suggestions-grid">
                {[
                  "How to write a great cover letter?",
                  "Best interview preparation tips",
                  "Resume optimization strategies",
                  "Salary negotiation advice"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(suggestion)}
                    className="suggestion-btn"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon search">
                <i className="fas fa-search"></i>
              </div>
              <div>
                <h3 className="feature-title">Smart Job Search</h3>
                <p className="feature-desc">Find opportunities matching your skills</p>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon document">
                <i className="fas fa-file-alt"></i>
              </div>
              <div>
                <h3 className="feature-title">Document Help</h3>
                <p className="feature-desc">Resume & cover letter optimization</p>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon insights">
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <h3 className="feature-title">Career Insights</h3>
                <p className="feature-desc">Market trends & salary data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <div className="tips-content">
            <div className="tips-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div className="tips-main">
              <div className="tips-header">
                <h3 className="tips-title">
                  💡 Get the Most from Your AI Assistant
                </h3>
                <p className="tips-subtitle">
                  Follow these tips for better results
                </p>
              </div>
              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-header">
                    <i className="fas fa-check-circle tip-icon"></i>
                    <h4 className="tip-title">Be Specific</h4>
                  </div>
                  <p className="tip-text">
                    Ask detailed questions for more accurate and helpful responses
                  </p>
                </div>
                <div className="tip-card">
                  <div className="tip-header">
                    <i className="fas fa-briefcase tip-icon"></i>
                    <h4 className="tip-title">Share Context</h4>
                  </div>
                  <p className="tip-text">
                    Mention your industry, experience level, and goals for personalized advice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;