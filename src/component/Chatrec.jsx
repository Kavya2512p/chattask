import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineSend } from 'react-icons/ai';
import { BsChatSquareDots } from 'react-icons/bs';
import { MdBackup } from 'react-icons/md';

const Chatrec = ({ messages, setMessages }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [deletedMessages, setDeletedMessages] = useState([]);

    useEffect(() => {
        const savedDeletedMessages = localStorage.getItem('deletedMessages');
        if (savedDeletedMessages) {
            setDeletedMessages(JSON.parse(savedDeletedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('deletedMessages', JSON.stringify(deletedMessages));
    }, [deletedMessages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const newMessage = {
            text: inputMessage,
            timestamp: new Date().toLocaleTimeString(),
            sender: 'chatrec-user',
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
        setTimeout(() => {
            receiveMessage();
        }, 1000);
    };

    const receiveMessage = () => {
        setMessages((prevMessages) => [...prevMessages]);
    };

    const clearMessagesFromState = () => {
        setDeletedMessages([...deletedMessages, ...messages]); // Store the deleted messages
        setMessages([]); // Clear chat state
    };

    const restoreDeletedMessages = () => {
        if (deletedMessages.length > 0) {
            setMessages([...messages, ...deletedMessages]);
            setDeletedMessages([]); // Clear deleted messages after restoring
        }
    };
    return (
        <div className="flex flex-col lg:w-1/2 h-full bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-300 p-2 sm:p-4 font-poppins transition-all duration-500 ease-in-out">
            <div className="relative bg-gradient-to-r from-orange-600 to-yellow-500 text-white p-2 sm:p-4 text-center text-lg sm:text-xl font-bold shadow-lg rounded-lg">
                <BsChatSquareDots className="inline mr-2" /> Chat 1
                {/* Clear Chat Button */}
                <button
                    onClick={clearMessagesFromState}
                    className="absolute top-2 right-12 text-white hover:text-red-500 transition-all duration-300 ease-in-out focus:outline-none"
                    title="Clear Chat"
                >
                    <AiOutlineDelete className="text-2xl" />
                </button>

                {/* Backup Button */}
                <button
                    onClick={restoreDeletedMessages}
                    className="absolute top-2 right-2 text-white hover:text-green-500 transition-all duration-300 ease-in-out focus:outline-none"
                    title="Restore Deleted Messages"
                >
                    <MdBackup className="text-2xl" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-2 sm:p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 transition-all duration-300 ease-in-out">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'chatrec-user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end space-x-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 flex items-center justify-center">
                                <img
                                    src={message.sender === 'user' ? '../../public/images/client2.jpg' : '../../public/images/client1.jpg'}
                                    alt="avatar"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div className={`max-w-[75%] p-2 sm:p-3 rounded-xl shadow-md transition-transform duration-300 ease-in-out transform ${message.sender === 'user' ? 'bg-gray-300 text-black' : 'bg-green-500 text-white'}`}>
                                <p>{message.text}</p>
                                <span className="block text-xs sm:text-sm text-gray-500 mt-2">{message.timestamp}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-2 sm:p-4 flex items-center space-x-2 sm:space-x-4 shadow-lg rounded-lg mt-2 sm:mt-4">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm font-light text-gray-700 transition-transform duration-300 ease-in-out"
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-transform duration-300 ease-in-out flex items-center space-x-1"
                >
                    <AiOutlineSend className="text-lg" /> <span>Send</span>
                </button>
            </div>
        </div>
    );
};

export default Chatrec;
