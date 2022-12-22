import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import {
  Container,
  Section,
  MainTitle,
  SecondaryTitle,
  Wrapper,
} from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onContactAdd = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts!`);
    } else {
      setContacts([...contacts, { id: nanoid(10), name, number }]);
    }
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  // const visibleContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase(contact))
  // );

  // const visibleContacts = getVisibleContacts();

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Section>
        <MainTitle>Phonebook</MainTitle>
        <Form onSubmit={onContactAdd} />
      </Section>

      <Section>
        <SecondaryTitle>Contacts</SecondaryTitle>
        <Wrapper>
          <Filter value={filter} onChange={onChangeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={onDeleteContact}
          />
        </Wrapper>
      </Section>
    </Container>
  );
}
