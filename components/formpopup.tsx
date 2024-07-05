// components/FormPopup.tsx
import React, { useState } from 'react';

interface FormPopupProps {
  onClose: () => void;
  onSubmit: (name: string, contactNumber: string) => void;
}

const FormPopup: React.FC<FormPopupProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contactNumber) {
      onSubmit(name, contactNumber);
      onClose();
    }
  };

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number:</label>
          <input
            type="string"
            value={contactNumber}
            onChange={(e) => setContactNumber((e.target.value))}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default FormPopup;
