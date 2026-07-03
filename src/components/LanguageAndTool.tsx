import AppsIcon from '#assets/images/icons/apps.svg?react';
import BlocksIcon from '#assets/images/icons/blocks.svg?react';
import CodeIcon from '#assets/images/icons/code.svg?react';
import { frameworks, languages, tools } from '#data/Skills';

const LanguageAndTool = () => {
  return (
    <div className="dark:bg-dark-700 mx-auto -mt-20 flex w-full flex-col overflow-hidden rounded-3xl bg-white p-3 shadow-lg md:w-[96%] md:flex-row md:p-4 lg:p-6">
      <div className="border-dark-300 mb-4 flex flex-col border-b-2 border-dashed pb-4 md:mr-4 md:mb-0 md:w-1/3 md:border-r-2 md:border-b-0 md:pr-4 md:pb-0 lg:w-[50%]">
        <div className="mx-auto mb-5 rounded-full bg-blue-300 p-4">
          <CodeIcon className="h-12 w-12" />
        </div>
        <h3 className="text-dark-900 text-center text-xl font-bold md:text-3xl dark:text-gray-50">
          Languages
        </h3>
        <div className="justify-items-between mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {languages.map(({ id, name, Icon }) => (
            <div
              key={id}
              className="text-dark flex items-center justify-between rounded-lg bg-gray-500/30 px-4 py-2 transition-all duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md dark:bg-white"
            >
              <Icon className="h-12 w-12" />
              <h3 className="ml-auto text-xl font-medium">{name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="border-dark-300 mb-4 flex flex-col border-b-2 border-dashed pb-4 md:mr-4 md:mb-0 md:w-1/3 md:border-r-2 md:border-b-0 md:pr-4 md:pb-0 lg:w-[25%]">
        <div className="mx-auto mb-5 rounded-full bg-blue-300 p-4">
          <BlocksIcon className="h-12 w-12" />
          {/* <img src={toolsIcon} alt="" aria-hidden className="h-12 w-12" /> */}
        </div>
        <h3 className="text-dark-900 text-center text-xl font-bold md:text-3xl dark:text-gray-50">
          Frameworks
        </h3>
        <div className="justify-items-between mt-4 grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
          {frameworks.map(({ id, name, Icon }) => (
            <div
              key={id}
              className="text-dark flex items-center justify-between gap-2 rounded-lg bg-gray-500/30 p-4 transition-all duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md lg:flex-col lg:gap-4 dark:bg-white"
            >
              <Icon className="h-12 w-12" />
              <h3 className="text-xl font-medium">{name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:w-1/3 lg:w-[25%]">
        <div className="mx-auto mb-5 rounded-full bg-blue-300 p-4">
          <AppsIcon className="h-12 w-12" />
          {/* <img src={toolsIcon} alt="" aria-hidden className="h-12 w-12" /> */}
        </div>
        <h3 className="text-dark-900 text-center text-xl font-bold md:text-3xl dark:text-gray-50">
          Tools
        </h3>
        <div className="justify-items-between mt-4 grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
          {tools.map(({ id, name, Icon }) => (
            <div
              key={id}
              className="text-dark flex items-center justify-between gap-2 rounded-lg bg-gray-500/30 p-4 transition-all duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md lg:flex-col lg:gap-4 dark:bg-white"
            >
              <Icon className="h-12 w-12" />
              <h3 className="text-xl font-medium">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageAndTool;
