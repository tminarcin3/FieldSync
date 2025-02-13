interface ButtonProps {
  message: string;
  title: string;
  className: string;
  handleClick: () => void;
}

const Button = ({ message, title, className, handleClick }:ButtonProps) => {
  return (
    <>
      {message && message.length > 0 && (
        <p>{message}</p>
      )}
      
      <button className={className} onClick={handleClick}>
        {title}
      </button>
    </>
  );
};

export default Button;