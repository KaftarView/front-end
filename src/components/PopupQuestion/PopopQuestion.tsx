import React from 'react';  
import './PopupQuestion.css'; 

interface ModalProps {  
  isVisible: boolean;  
  message : string;
  onConfirm: () => void;  
  onCancel: () => void;  
}  

const PopupQuestion: React.FC<ModalProps> = ({ isVisible, message, onConfirm, onCancel }) => {  
  if (!isVisible) return null;  

  return (  
    <div className="po-qu-overlay">  
      <div className="po-qu-content">  
        <h5>{message}</h5>  
        <div className="po-qu-actions">  
          <button onClick={onConfirm}>بله</button>  
          <button onClick={onCancel}>خیر</button>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default PopupQuestion;  