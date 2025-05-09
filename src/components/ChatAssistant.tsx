
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { recordAudio, transcribeAudio } from '@/utils/speechRecognitionService';
import { toast } from '@/hooks/use-toast';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ta', name: 'Tamil' },
  { code: 'ml', name: 'Malayalam' }
];

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your farm assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('hi'); // Default to Hindi
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      isUser
    };
    
    setMessages(prev => [...prev, newMessage]);
    setTimeout(scrollToBottom, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(message, true);
      
      // Simulate response (in a real app, this would call an API)
      setTimeout(() => {
        respondToMessage(message);
      }, 1000);
      
      setMessage('');
    }
  };
  
  const respondToMessage = (userMessage: string) => {
    // This is a simple rule-based response system
    // In a real app, this would call a backend API
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('crop') || lowerMsg.includes('grow') || lowerMsg.includes('plant')) {
      addMessage("Based on your location and current weather, wheat, barley, and mustard would be good options. Would you like more detailed information?", false);
    } 
    else if (lowerMsg.includes('weather') || lowerMsg.includes('rain') || lowerMsg.includes('forecast')) {
      addMessage("The weather forecast shows sunny conditions for the next 3 days with a possibility of light rain on the weekend. Temperature range: 25-32°C.", false);
    }
    else if (lowerMsg.includes('market') || lowerMsg.includes('price') || lowerMsg.includes('sell')) {
      addMessage("Current market prices in your area: Wheat ₹2200/quintal, Rice ₹1950/quintal, Cotton ₹6100/quintal. Would you like to connect with buyers?", false);
    }
    else if (lowerMsg.includes('fertilizer') || lowerMsg.includes('disease') || lowerMsg.includes('pest')) {
      addMessage("For common crop diseases in your area, I recommend using neem oil spray for pest control. For nutrient deficiencies, consider using NPK 14-14-14 fertilizer. Would you like specific advice for your crop?", false);
    }
    else {
      addMessage("Thank you for your message. How else can I assist you with your farming needs today?", false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    
    setIsRecording(true);
    toast({
      title: "Recording started",
      description: "Please speak clearly...",
    });
    
    try {
      const audioBlob = await recordAudio(10000); // 10 seconds max
      
      if (audioBlob) {
        setIsRecording(false);
        setIsProcessing(true);
        
        toast({
          title: "Processing speech",
          description: "Converting your speech to text...",
        });
        
        const result = await transcribeAudio(audioBlob, {
          language_code: language
        });
        
        setIsProcessing(false);
        
        if (result.success && result.text) {
          setMessage(result.text);
          
          // Auto-submit if we got text
          addMessage(result.text, true);
          setTimeout(() => {
            respondToMessage(result.text);
          }, 1000);
        } else {
          toast({
            variant: "destructive",
            title: "Transcription failed",
            description: "Please try again or type your message.",
          });
        }
      } else {
        setIsRecording(false);
        toast({
          variant: "destructive",
          title: "Recording failed",
          description: "Could not access microphone. Please check permissions.",
        });
      }
    } catch (error) {
      setIsRecording(false);
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during recording. Please try again.",
      });
      console.error("Recording error:", error);
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
            <div className="flex items-center gap-2">
              <select
                className="bg-white/10 text-white text-sm rounded-md px-2 py-1 border-none outline-none"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
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
          </div>
          
          <div className="p-4 h-[300px] overflow-y-auto bg-agro-green-light/5">
            <div className="flex flex-col space-y-3">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`${msg.isUser 
                    ? 'bg-agro-yellow/10 rounded-lg rounded-tr-none max-w-[80%] ml-auto' 
                    : 'bg-agro-green-light/10 rounded-lg rounded-tl-none max-w-[80%]'
                  } p-3`}
                >
                  <p className="text-agro-brown-dark">{msg.text}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center gap-2">
            <button
              type="button"
              className={`flex-shrink-0 w-10 h-10 rounded-full ${
                isRecording 
                  ? 'bg-red-500 animate-pulse' 
                  : isProcessing 
                    ? 'bg-amber-500' 
                    : 'bg-agro-orange'
              } flex items-center justify-center text-white`}
              onClick={toggleRecording}
              disabled={isProcessing}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5" />
              ) : isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-grow p-2 border border-agro-green-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-green-light"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isRecording || isProcessing}
            />
            
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-agro-green-dark flex items-center justify-center text-white disabled:opacity-50"
              disabled={!message.trim() || isRecording || isProcessing}
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
