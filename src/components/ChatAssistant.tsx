
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Send } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here would go the logic to send the message to the chatbot
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-40 bg-agro-green-dark text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-pulse-gentle touch-target"
          aria-label="Open assistant"
        >
          <Mic className="w-8 h-8" />
        </button>
      )}
      
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-full max-w-[350px] bg-white rounded-2xl shadow-xl animate-fade-in">
          <div className="p-4 bg-agro-green-dark rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5 text-agro-green-dark" />
              </div>
              <h3 className="text-white font-medium">Farm Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:bg-white/10 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="p-4 h-[300px] overflow-y-auto bg-agro-green-light/5">
            <div className="flex flex-col space-y-3">
              <div className="bg-agro-green-light/10 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-agro-brown-dark">Hello! I'm your farm assistant. How can I help you today?</p>
              </div>
              
              <div className="bg-agro-yellow/10 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                <p className="text-agro-brown-dark">What crops should I grow this season?</p>
              </div>
              
              <div className="bg-agro-green-light/10 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-agro-brown-dark">Based on your location and current weather, wheat, barley, and mustard would be good options. Would you like more detailed information?</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center gap-2">
            <button
              type="button"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-agro-orange flex items-center justify-center text-white"
            >
              <Mic className="w-5 h-5" />
            </button>
            
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-grow p-2 border border-agro-green-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green-light"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-agro-green-dark flex items-center justify-center text-white disabled:opacity-50"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
