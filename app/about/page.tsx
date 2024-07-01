"use client"
import React, { useState } from 'react';
import FormPopup from '@/components/formpop'; // Adjust the import path based on your project structure

const Page: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [aboutContent, setAboutContent] = useState<string>(`
    Hi, I'm Arohi, but most people call me Pari. I'm 14 years old and currently in the 8th standard at Kendriya Vidyalaya Maithon. I live in Maithon with my wonderful family.

    I have a lovely elder sister named Antra Yadav. My mother's name is Shila Rani, and she is incredibly caring. My father's name is Ashok Yadav, and he is very supportive. Although we live in Maithon, our hometown is Siwan in Bihar, which holds a special place in our hearts.

    At school, I enjoy my studies and take part in various activities. I love learning new things and spending time with my family. My nickname, Pari, means "fairy" in Hindi, and I think it suits me because I always try to bring a bit of magic and positivity into everything I do!
  `);

  const handleAddMoreAbout = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = (inputText: string) => {
    // Append inputText to existing aboutContent
    const newAboutContent = `${aboutContent}\n\n${inputText}`;
    setAboutContent(newAboutContent);
  };

  return (
    <div className="about-page">
      <div className="about">
        <h1 className="stylish-heading">About Me</h1>
        <p>{aboutContent}</p>
        <button className='rainbow-button' onClick={handleAddMoreAbout}>Add More About Me</button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <FormPopup onClose={handleCloseForm} onSubmit={handleSubmitForm} />
        </div>
      )}
    </div>
  );
};

export default Page;
