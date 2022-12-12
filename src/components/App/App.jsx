import { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onContactAdd = data => {
    const newContact = {
      id: nanoid(10),
      name: data.name,
      number: data.number,
    };

    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts!`);
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Section>
          <MainTitle>Phonebook</MainTitle>
          <Form onSubmit={this.onContactAdd} />
        </Section>

        <Section>
          <SecondaryTitle>Contacts</SecondaryTitle>
          <Wrapper>
            <Filter value={this.state.filter} onChange={this.onChangeFilter} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </Wrapper>
        </Section>
      </Container>
    );
  }
}
