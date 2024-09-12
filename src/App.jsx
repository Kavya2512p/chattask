import React, { useState, useEffect } from 'react';
import Chat from './component/Chat';
import Chatrec from './component/Chatrec';

function App() {
  const [messages, setMessages] = useState([]);

  // Load messages from localStorage when the app loads
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Chat messages={messages} setMessages={setMessages} />
      <Chatrec messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default App;
