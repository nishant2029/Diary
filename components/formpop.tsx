import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormPopupProps {
  onClose: () => void;
  onSubmit: (inputText: string) => void;
}

const FormPopup: React.FC<FormPopupProps> = ({ onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      alert('Please enter something before submitting.');
      return;
    }
    onSubmit(inputValue); // Pass inputValue to parent component
    setInputValue(''); // Reset input field
    onClose(); // Close the form popup
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="form-popup">
      <form onSubmit={handleSubmit}>
        <label>
          Enter additional information:
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type something..."
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPopup;
