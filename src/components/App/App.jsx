import { useState, useEffect } from "react";
import css from './App.module.css';
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter"

const contactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];


export function App() {

  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem("contacts")) ?? contactList);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);


  const onSubmit = data => {
    const contactNames = contacts.map(contact => contact.name);
 

    if (contactNames.includes(data.name)) {
      alert(`${data.name} is already in contacts.`);
    } else {
      setContacts(state => [...state, data]);
    }
  };

  const  deleteContacts = contactId => {
      setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const changeFilter = evt => setFilter(evt.target.value);
    
    
 const filterContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


       const filteredContacts = filterContact();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onSubmit} />
        <h2>Contacts</h2>
        
        <Filter value={filter} onChange={changeFilter} />
         <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContacts}
        />
    </div>
      
    )
  
};