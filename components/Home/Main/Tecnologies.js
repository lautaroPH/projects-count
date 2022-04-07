const Tecnologies = ({ tecnologiesArray }) => {
  return (
    <div className="flex flex-wrap my-3">
      {tecnologiesArray.map((tecnologie, i) => (
        <div key={i}>
          {tecnologie.length > 0 && (
            <p
              className="rounded-full shadow dark:shadow-gray-800 border text-violet-700 font-mono border-gray-300 bg-gray-200 
        dark:bg-[#282C34] dark:border-[#46484e] px-3 py-[3px] mr-1 dark:text-gray-200 mb-2"
            >
              {tecnologie.trim()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tecnologies;
