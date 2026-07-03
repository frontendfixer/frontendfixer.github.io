import { useSelector } from 'react-redux';

import sendIcon from '#assets/images/message_send.svg';
import { RootState } from '#store/store';

const MessageSent = () => {
  const {
    form: {
      data: { name },
    },
  } = useSelector((state: RootState) => state);

  return (
    <div className="animate-fadeIn grid h-full place-content-center pb-8">
      <img src={sendIcon} alt="" aria-hidden className="h-60 w-60" />
      <div className="flex flex-col items-center gap-2">
        <h2 className="-mt-8 flex flex-col items-center text-4xl font-bold text-white">
          Thank you!
          <span className="text-white-full text-3xl font-bold capitalize">
            {name}
          </span>
        </h2>
        <p className="text-xl dark:text-white">We will get to you soon.</p>
      </div>
    </div>
  );
};

export default MessageSent;
