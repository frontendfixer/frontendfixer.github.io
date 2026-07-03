import { Duration, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

import Button from '#components/Button';
import Countdown from '#components/CountDown';

const Weeding = () => {
  const [password, setPassword] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [duration, setDuration] = useState<Duration | null>(null);
  const [weedingDate] = useState(new Date(import.meta.env.VITE_WEEDING_DATE));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const duration = intervalToDuration({
        start: weedingDate,
        end: now,
      });

      setDuration(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, [weedingDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const secret = import.meta.env.VITE_SECRET;
    if (password === secret) {
      setIsSecret(true);
    } else {
      setErrorMessage('Oh no! Wrong key. Try again!');
      setIsSecret(false);
    }
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (errorMessage) {
      timeoutId = setTimeout(() => setErrorMessage(''), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  return (
    <div className="grid h-dvh w-screen place-items-center bg-purple-400 p-6">
      <div className="w-full max-w-(--breakpoint-sm) rounded-xl bg-purple-500 p-6 shadow-xl">
        {!isSecret ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg bg-purple-200 p-2 text-center text-5xl font-bold text-purple-800 outline-hidden placeholder:text-purple-400"
              placeholder="SECRET"
            />
            <Button
              fullWidth
              className="h-14 bg-purple-900 hover:bg-purple-700 active:bg-purple-700"
            >
              Enter
            </Button>
            {errorMessage && (
              <div className="text-center text-xl font-bold text-purple-900">
                {errorMessage}
              </div>
            )}
          </form>
        ) : (
          <div className="grid h-[300px] text-5xl font-bold text-purple-800">
            <ConfettiExplosion particleCount={500} duration={5000} force={1} />
            {duration && (
              <div className="text-center">
                <h3 className="mb-5 text-5xl text-white">Days Past</h3>
                <Countdown duration={duration} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weeding;
