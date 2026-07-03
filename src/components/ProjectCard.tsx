import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { ProjectType } from '#data/Projects';

import ImageModal from './ImageModal';

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [openModal, setOpenModal] = useState(false);

  const handelImageClick = () => {
    setOpenModal(!openModal);
  };
  const handelClose = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="bg-white-full dark:bg-dark-700 overflow-hidden rounded-xl shadow-md">
      <>
        <a
          onClick={handelImageClick}
          className="cursor-pointer transition-all duration-500"
          aria-label="open image with live link and repo url"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full max-h-[350px] max-w-full object-cover"
          />
          {openModal && <ImageModal onClick={handelClose} project={project} />}
        </a>
      </>

      <div className="bg-white-full dark:bg-dark/10 flex flex-col justify-between p-4">
        <h3 className="text-dark-900 text-center font-serif text-xl font-bold dark:text-white">
          {project.title}
        </h3>
        <div className="mx-auto my-2 w-full rounded-md bg-slate-400/20 pt-2 pb-3">
          <h4 className="mb-2 text-center text-sm font-medium capitalize dark:text-white">
            Coding done with
          </h4>
          <div className="mx-3 flex flex-wrap gap-2">
            {project.development.language
              ?.filter(el => el !== 'HTML' && el !== 'CSS')
              .map((el, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    borderRadius: '4px',
                    backgroundColor: `hsl(${Math.floor(
                      Math.random() * 360,
                    )},96%,80%)`,
                    paddingInline: '10px',
                    paddingBlock: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  #{el}
                </span>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary-500 flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-white transition-colors duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faEye} />
            <span>See Live</span>
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dark-900 hover:bg-dark-700 flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-white transition-colors duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
