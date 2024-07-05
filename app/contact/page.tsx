"use client";
// app/contact/page.tsx
import React, { useState, useEffect } from 'react';
// import FormPopup from '@/components/FormPopup';
import FormPopup from '@/components/formpopup';
import axios from 'axios';

interface Contact {
  _id: string;
  name: string;
  content: number;
}

const ContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch contacts from the database
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('/api/contacts/contacts');
      setContacts(response.data);
    };
    fetchContacts();
  }, []);

  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitForm = async (name: string, contactNumber: string) => {
    const newContact = { name, content: contactNumber };
    const response = await axios.post('/api/contacts/contacts', newContact);

    if (response.status === 201) {
      setContacts((prevContacts) => [...prevContacts, response.data]);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-list">
        <h1 className="stylish-heading">Contact List</h1>
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.name}: {contact.content}
            </li>
          ))}
        </ul>
        <button className='rainbow-button' onClick={handleAddContact}>Add Contact</button>
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
