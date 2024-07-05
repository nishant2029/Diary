"use client";
// app/contact/page.tsx
import React, { useState, useEffect } from 'react';
import FormPopup from '@/components/wishform';
import axios from 'axios';

interface Wish {
  _id: string;
  wishcontent: string;
}

const ContactPage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch contacts from the database
  useEffect(() => {
    const fetchWishes = async () => {
      const response = await axios.get('/api/wishes/wishes');
      setWishes(response.data);
    };
    fetchWishes();
  }, []);

  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = async (wishcontent:string) => {
    const newWish = { wishcontent };
    const response = await axios.post('/api/wishes/wishes', newWish);

    if (response.status === 201) {
      setWishes((prevWishes) => [...prevWishes, response.data]);
    }
  };

  return (
    <div className="wishes-page">
      <div className='container'>

      <div className="wish-list">
        <h1 className="stylish-heading">Wish List</h1>
        <ul>
          {wishes.map((wish) => (
            <li key={wish._id}>
              {wish.wishcontent}
            </li>
          ))}
        </ul>
        <button className='rainbow-button' onClick={handleAddContact}>Add Wish</button>
      </div>
      </div>

      {showForm && (
        <div className="form-overlay">
          <FormPopup onClose={handleCloseForm} onSubmit={handleSubmitForm} />
        </div>
      )}
    </div>
  );
};

export default ContactPage;
