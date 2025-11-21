import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredAstrologers } from '../data/astrologers';
import { ArrowRight, ArrowLeft } from '../components/icons';

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const astrologer = featuredAstrologers.find((a) => a.id === parseInt(id));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const isFirstMessagesEffectRun = useRef(true);

  useEffect(() => {
    if (isFirstMessagesEffectRun.current) {
      isFirstMessagesEffectRun.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'User',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate astrologer response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: astrologer.name,
          text: 'Thank you for your message. Let me check on that for you.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1500);
  };

  if (!astrologer) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Astrologer Not Found</h1>
        <p className="text-gray-600">The astrologer you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100">
      <div className="bg-white shadow-sm p-4 flex items-center border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <img className="w-10 h-10 rounded-full mr-3" src={astrologer.image} alt={astrologer.name} />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{astrologer.name}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${
                msg.sender === 'User' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span
                className={`block text-xs mt-1 ${msg.sender === 'User' ? 'text-indigo-200' : 'text-gray-500'}`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="bg-white p-4 border-t border-gray-200 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="ml-3 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
