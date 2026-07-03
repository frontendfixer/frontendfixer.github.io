import emailjs from '@emailjs/browser';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { cn } from '#/lib/cn';
import { setFormData, setFormStatus } from '#store/reducer/FormSlice';
import { AppDispatch, RootState } from '#store/store';

import Button from './Button';
import Spinner from './Spinner';

const ContactForm = () => {
  const initialState = { name: '', email: '', message: '' };
  const [inputs, setInputs] = useState(initialState);
  const formEl = useRef<HTMLFormElement>(null);

  const { form } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const errors: { name: string; errorMessage: string }[] = [];
  const validationSchema = [
    {
      name: 'name',
      valid: validator.isLength(inputs.name, { min: 1 }),
      error: 'Name must be between 4-20 characters',
    },
    {
      name: 'email',
      valid: validator.isEmail(inputs.email),
      error: 'Enter valid email',
    },
    {
      name: 'message',
      valid: validator.isLength(inputs.message, { min: 20 }),
      error: 'Message must be at least 20 characters',
    },
  ];
  validationSchema.forEach(check => {
    if (!check.valid) {
      return errors.push({ name: check.name, errorMessage: check.error });
    }
    errors.filter(err => err.name === check.name);
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length > 0) return;
    dispatch(setFormData(inputs));
    dispatch(setFormStatus('loading'));
    if (formEl.current == null) throw new Error();

    const res = await emailjs.sendForm(
      'service_qdjdol9',
      'template_lobv7nq',
      formEl.current,
      'G0MWsjYi9pbxnAwfJ',
    );
    if (res.status === 200) {
      return dispatch(setFormStatus('completed'));
    }
    return dispatch(setFormStatus('rejected'));
  };

  return (
    <form
      ref={formEl}
      className="flex flex-col gap-4 px-4 py-8"
      onSubmit={handelSubmit}
    >
      <div className="input__group">
        <input
          type="text"
          id="name"
          value={inputs.name}
          name="name"
          onChange={handleChange}
          required
        />
        <label
          htmlFor="name"
          className={cn(inputs.name.length > 0 && 'active')}
        >
          Enter your Name
        </label>
      </div>
      <div className="input__group">
        <input
          type="email"
          name="email"
          id="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="email"
          className={cn(inputs.email.length > 0 && 'active')}
        >
          Enter Your Email
        </label>
      </div>
      <div className="input__group">
        {!validator.isLength(inputs.message, { min: 20 }) ? (
          <span className="pointer-events-none absolute right-2 bottom-1 text-[12px] text-red-400">
            Message should be at least 20 characters
          </span>
        ) : (
          ''
        )}
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={5}
          value={inputs.message}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="message"
          className={cn(inputs.message.length > 0 && 'active')}
        >
          Message
        </label>
      </div>
      {form.status === 'rejected' ? (
        <span className="animate-slideUp -mt-6 block text-center text-sm font-medium text-red-700">
          Network error. Please try again!
        </span>
      ) : (
        ''
      )}
      <Button fullWidth buttonType="secondary">
        {form.status === 'loading' ? (
          <Spinner size={6} />
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>Message</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
