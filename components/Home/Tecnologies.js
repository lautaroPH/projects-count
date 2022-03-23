const Tecnologies = ({ tecnologiesArray }) => {
  return (
    <div className="flex my-3">
      {tecnologiesArray.map((tecnologie, i) => (
        <p
          className="rounded-full shadow-md dark:shadow-gray-800 border text-violet-700 font-mono border-gray-300 bg-gray-200 
        dark:bg-[#282C34] dark:border-[#46484e] px-3 py-[3px] mr-1 dark:text-gray-200 mb-2"
          key={i}
        >
          {tecnologie.trim()}
        </p>
      ))}
    </div>
  );
};

export default Tecnologies;
