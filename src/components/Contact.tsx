import { useSelector } from 'react-redux';

import connectImg from '#assets/images/connect1.svg';
import { RootState } from '#store/store';

import ContactForm from './ContactForm';
import MessageSent from './MessageSent';

const Contact = () => {
  const { form } = useSelector((state: RootState) => state);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="flex items-center">
        <img
          src={connectImg}
          alt=""
          className="mx-auto h-64 w-64 sm:h-96 sm:w-96"
        />
      </div>
      <div className="bg-secondary/40 rounded-xl sm:max-w-lg">
        {form.status !== 'completed' ? <ContactForm /> : <MessageSent />}
      </div>
    </div>
  );
};

export default Contact;
