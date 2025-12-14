interface ButtonProps {
    className?: string;
    label: React.ReactNode | string;
    onClick: () => void;
}

const Button = ({ className, label = '', onClick }: ButtonProps) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
