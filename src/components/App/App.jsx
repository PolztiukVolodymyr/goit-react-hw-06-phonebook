import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  deleteContact,
  setContact,
} from "../../redux/ContactsSlice";

import css from './App.module.css';
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter"

export function App() { 

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const onSubmit = data => {
      
    const contactNames = contacts.map(contact => contact.name);

    if (contactNames.includes(data.name)) {
      alert(`${data.name} is already in contacts.`);
    } else {
      dispatch(addContact(data));
    }
  };

     const  deleteContacts = contactId => {
      dispatch(deleteContact(contactId));
  };

  const changeFilter = evt => {
    dispatch(setContact(evt.target.value));
  };

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

}
