import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini, isProductRelatedQuestion } from '../../services/ChatbotService';
import MessageRenderer from './MessageRenderer';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: 'Xin chào! Tôi là trợ lý ảo của cửa hàng đặc sản Miền Trung. Tôi có thể giúp bạn tìm hiểu về các sản phẩm, giá cả, voucher giảm giá và khuyến mãi. Bạn cần hỗ trợ gì không?',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll to bottom khi có tin nhắn mới
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input khi mở chatbot
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Kiểm tra xem câu hỏi có liên quan đến sản phẩm không
            if (!isProductRelatedQuestion(inputMessage)) {
                const botResponse = {
                    role: 'bot',
                    content: 'Xin lỗi, tôi chỉ có thể trả lời các câu hỏi liên quan đến sản phẩm, voucher và dịch vụ của cửa hàng đặc sản Miền Trung. Bạn có muốn hỏi về sản phẩm hoặc voucher nào của chúng tôi không?',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
                setIsLoading(false);
                return;
            }

            // Lấy lịch sử hội thoại (chỉ lấy 10 tin nhắn gần nhất để tránh quá dài)
            const conversationHistory = messages.slice(-10).map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            }));

            const response = await sendMessageToGemini(inputMessage, conversationHistory);
            
            const botResponse = {
                role: 'bot',
                content: response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorResponse = {
                role: 'bot',
                content: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <>
            {/* Floating Chat Button */}
            <div className="chatbot-container">
                <button 
                    className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
                    onClick={toggleChat}
                    aria-label="Open chatbot"
                >
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    )}
                </button>

                {/* Chat Window */}
                {isOpen && (
                    <div className="chatbot-window">
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-info">
                                <div className="chatbot-avatar">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Trợ lý ảo</h4>
                                    <span>Đặc sản Miền Trung</span>
                                </div>
                            </div>
                            <button 
                                className="chatbot-close"
                                onClick={toggleChat}
                                aria-label="Close chatbot"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
                                >
                                    <div className="message-content">
                                        {message.role === 'bot' ? (
                                            <MessageRenderer content={message.content} />
                                        ) : (
                                            <p>{message.content}</p>
                                        )}
                                        <span className="message-time">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Loading indicator */}
                            {isLoading && (
                                <div className="message bot-message">
                                    <div className="message-content">
                                        <div className="typing-indicator">
                                            <div className="typing-dot"></div>
                                            <div className="typing-dot"></div>
                                            <div className="typing-dot"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chatbot-input">
                            <div className="input-wrapper">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu hỏi về sản phẩm..."
                                    disabled={isLoading}
                                />
                                <button 
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || isLoading}
                                    aria-label="Send message"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatBot; 