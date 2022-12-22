import PropTypes from 'prop-types';
import { Item, Name, Number, Button } from './Contact.styled';

const Contact = ({ contact: { id, name, number }, onDeleteContact }) => {
  return (
    <Item>
      <Name>
        {name}: <Number>{number}</Number>
      </Name>
      <Button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </Button>
    </Item>
  );
};

Contact.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contact;
