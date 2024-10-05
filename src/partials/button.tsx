import classNames from "classNames";

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  className,
  onClick,
}) => {
  const componentClass = classNames("btn", className);

  return (
    <button className={componentClass} onClick={onClick}>
      <span className="btn-icon">{icon}</span>
      <span className="btn-label">{text}</span>
    </button>
  );
};
