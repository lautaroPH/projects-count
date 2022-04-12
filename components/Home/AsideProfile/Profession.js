const Profession = ({ profession }) => {
  return (
    <p className="text-center text-gray-500 dark:text-gray-300">
      {profession ? profession : 'Profesion'}
    </p>
  );
};

export default Profession;
