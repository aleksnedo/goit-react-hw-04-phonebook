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

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onContactAdd = ({ name, number }) => {
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

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // const visibleContacts = getVisibleContacts();

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

// export class oldApp extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(savedContacts);

//     if (savedContacts !== null) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   onContactAdd = data => {
//     const newContact = {
//       id: nanoid(10),
//       name: data.name,
//       number: data.number,
//     };

//     if (this.state.contacts.find(contact => contact.name === newContact.name)) {
//       return alert(`${newContact.name} is already in contacts!`);
//     }

//     this.setState(({ contacts }) => ({
//       contacts: [...contacts, newContact],
//     }));
//   };

//   onDeleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   onChangeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Container>
//         <Section>
//           <MainTitle>Phonebook</MainTitle>
//           <Form onSubmit={this.onContactAdd} />
//         </Section>

//         <Section>
//           <SecondaryTitle>Contacts</SecondaryTitle>
//           <Wrapper>
//             <Filter value={this.state.filter} onChange={this.onChangeFilter} />
//             <ContactList
//               contacts={visibleContacts}
//               onDeleteContact={this.onDeleteContact}
//             />
//           </Wrapper>
//         </Section>
//       </Container>
//     );
//   }
// }
