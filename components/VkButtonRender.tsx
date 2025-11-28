import React from 'react';
import { VkButton } from '../types';
import { ExternalLink, MessageCircle, MapPin } from 'lucide-react';

interface Props {
  button: VkButton;
  onClick: () => void;
}

const VkButtonRender: React.FC<Props> = ({ button, onClick }) => {
  // Map VK colors to Tailwind classes
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'primary': // Blue in VK, usually white text
        return 'bg-[#5181b8] text-white hover:bg-[#4672a3]';
      case 'positive': // Green
        return 'bg-[#4bb34b] text-white hover:bg-[#429d42]';
      case 'negative': // Red
        return 'bg-[#e64646] text-white hover:bg-[#d13f3f]';
      case 'secondary': // White/Gray
      default:
        return 'bg-white text-[#5181b8] border border-[#5181b8]/30 hover:bg-gray-50';
    }
  };

  const getIcon = () => {
    if (button.action.type === 'open_link') return <ExternalLink size={14} className="ml-1" />;
    if (button.action.type === 'location') return <MapPin size={14} className="ml-1" />;
    return null;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${getColorClasses(button.color)}`}
    >
      <span className="truncate">{button.action.label}</span>
      {getIcon()}
    </button>
  );
};

export default VkButtonRender;