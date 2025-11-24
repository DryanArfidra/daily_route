import React from 'react';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 safe-area-bottom"
      style={{ zIndex: 40 }}
    >
      +
    </button>
  );
};

export default FloatingButton;