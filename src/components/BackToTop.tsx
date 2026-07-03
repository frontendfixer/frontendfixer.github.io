import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      setTop(entries[0].boundingClientRect.top);
      if (top <= 0) {
        return setVisible(true);
      } else setVisible(false);
    });
    window.addEventListener('scroll', () => {
      intersectionObserver.observe(document.querySelectorAll('section')[1]);
    });
  }, [top]);

  return (
    <div
      className="animate-slideLeft fixed right-0 bottom-6 z-50 w-14 rounded-l-full bg-red-500 shadow-lg"
      hidden={!visible}
    >
      <button
        onClick={handleClick}
        className="animate-fadeIn grid h-10 w-10 place-content-center rounded-full p-2 text-2xl text-white"
      >
        <FontAwesomeIcon icon={faArrowCircleUp} />
      </button>
    </div>
  );
};

export default BackToTop;
