import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];


const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};


const contactsSlice = createSlice({
  name: 'contacts',
    initialState: { items: contactList, filter: '' },
  
    reducers: {
       
    addContact(state, actions) {
        state.items.push(actions.payload);
    },
        
    deleteContact(state, actions) {
      state.items = state.items.filter(item => item.id !== actions.payload);
    },
    
    setContact(state, actions) {
      state.filter = actions.payload;
    },
  },
});

export const contactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
);

export const { addContact, deleteContact, setContact } = contactsSlice.actions;