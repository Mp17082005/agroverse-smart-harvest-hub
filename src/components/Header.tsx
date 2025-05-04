
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Mic } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🌐' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🌾' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLang = (lang: typeof languages[0]) => {
    setCurrentLang(lang);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-agro-green-light flex items-center justify-center">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold text-agro-green-dark hidden sm:block">AgroVerse</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button 
              variant="outline"
              onClick={toggleMenu}
              className="flex items-center gap-2 touch-target px-4 py-2 border-2 border-agro-green-light"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.name}</span>
              <Globe className="w-5 h-5" />
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50 animate-fade-in">
                <ul className="py-1">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => changeLang(lang)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-agro-green-light/10 transition-colors"
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-agro-orange/10 transition-colors"
                    >
                      <Mic className="w-5 h-5 text-agro-orange" />
                      <span>Voice Select</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <button 
            className="w-10 h-10 bg-agro-green-light rounded-full flex items-center justify-center text-white shadow-md touch-target"
            aria-label="Voice assistant"
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
