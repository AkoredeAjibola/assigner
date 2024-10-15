// CustomPopup.tsx
import React from 'react';

// Define CustomPopupProps to include showPopup, popupMessage, and onClose
interface CustomPopupProps {
  showPopup: boolean;
  popupMessage: string;
  onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ showPopup, popupMessage, onClose }) => {
  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{popupMessage}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default CustomPopup;
