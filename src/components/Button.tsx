interface ButtonProps {
    className?: string;
    label: React.ReactNode | string;
    onClick: () => void;
}

const Button = ({ className, label = '', onClick }: ButtonProps) => {
    return (
        <button className={`btn cursor-pointer rounded-3xl px-8 py-2 text-black ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
