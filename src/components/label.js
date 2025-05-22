const Label = (props) => {
  return (
    <label
      {...props}
      className={`block text-gray-700 dark:text-gray-300 ${props.className}`}
    ></label>
  );
};

export default Label;
