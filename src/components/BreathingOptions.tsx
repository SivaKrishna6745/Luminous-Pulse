interface BreathingOptionsProps {
    value: string;
    selected: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const BreathingOptions = ({ value, selected, onChange, label }: BreathingOptionsProps) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
                name="breathing-options"
                id="box-radio"
                value={value}
                checked={selected === value}
                onChange={onChange}
            />
            <label htmlFor="box-radio">{label}</label>
        </div>
    );
};

export default BreathingOptions;
