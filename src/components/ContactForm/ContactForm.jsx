import { useState } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';


export default function ContactForm({onSubmit}) {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleChange = evt => {
     
     if (evt.target.name === "name") {
         setName(evt.target.value);
        };
     
     if (evt.target.name === "number") {
            setNumber(evt.target.value);
        };
    };
    
 const  handleSubmit = evt => {
    evt.preventDefault();
     const newContact = {
      id: nanoid(),
      name,
      number
    };
    onSubmit(newContact);
    reset();
  };

 const reset = () => {
     setName("");
     setNumber("");
    };
    
  
        return (
    <form onSubmit={handleSubmit} className={css.form}>
    <label className={css.label}>Name
      <input
        onChange={handleChange}
        type="text"
        name="name"
        value={name}
        placeholder={"Enter name"}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces.
         For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        />
    </label>
    <label className={css.label}>Number
      <input
        onChange={handleChange}
        type="tel"
        name="number"
        value={number}
        placeholder={"Enter number"}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes,
         parentheses and can start with +"
        required
      />
    </label>
    <button type="submit">Add contact</button>
    </form>
        )
    }


ContactForm.propTypes = {
  onSubmit: PropTypes.func,
}