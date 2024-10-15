import React from "react";

interface CustomPopupProps {
  showPopup: boolean;
  popupMessage: string;
  onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ showPopup, popupMessage, onClose }) => {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">{popupMessage}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
