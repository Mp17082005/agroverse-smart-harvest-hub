
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard = ({ icon, title, description, onClick }: FeatureCardProps) => {
  return (
    <button
      onClick={onClick}
      className="feature-card w-full max-w-xs mx-auto touch-target"
    >
      <div className="w-20 h-20 mb-4 flex items-center justify-center bg-agro-green-light/10 rounded-full text-agro-green-dark">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-agro-brown-dark">{title}</h3>
      <p className="text-agro-brown-light">{description}</p>
    </button>
  );
};

export default FeatureCard;
