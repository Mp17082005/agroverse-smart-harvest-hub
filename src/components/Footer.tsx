
const Footer = () => {
  return (
    <footer className="bg-agro-green-dark/90 text-white mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-agro-green-dark text-xl font-bold">A</span>
              </div>
              <h2 className="text-xl font-bold">AgroVerse</h2>
            </div>
            <p className="text-sm mt-2 text-agro-green-light">Smart farming solutions for everyone</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <h3 className="font-semibold mb-2">Help & Support</h3>
              <ul className="space-y-1 text-sm">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>User Guide</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm">
                <li>Crop Suggestions</li>
                <li>Disease Detection</li>
                <li>Market Analysis</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20 text-center text-sm">
          <p>&copy; 2025 AgroVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
