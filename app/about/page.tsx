// app/about/page.tsx
"use client"
import React, { useState, useEffect } from 'react';
import FormPopup from '@/components/formpop';

const Page: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [aboutContent, setAboutContent] = useState<string>('');

  // Fetch content from the database
  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/api/about/getContent');
      const data = await response.json();
      setAboutContent(data?.content || '');
    };
    fetchContent();
  }, []);

  const handleAddMoreAbout = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = async (inputText: string) => {
    // Update content in the database
    const newAboutContent = `${aboutContent}\n\n${inputText}`;
    const response = await fetch('/api/about/updateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newAboutContent }),
    });

    if (response.ok) {
      setAboutContent(newAboutContent);
    }
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
