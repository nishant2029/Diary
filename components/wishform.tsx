// components/formpopup.tsx
import React, { useState } from 'react';

interface WishFormProps {
  onClose: () => void;
  onSubmit: (inputText: string) => void;
}

const FormPopup: React.FC<WishFormProps> = ({ onClose, onSubmit }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(inputText);
    onClose();
  };

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit}>
        <label>
        <textarea placeholder="Add Information..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default FormPopup;
