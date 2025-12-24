interface BreathingOptionsProps {
    selected: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const BreathingOptions = ({ selected, onChange, label }: BreathingOptionsProps) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
                name="breathing-options"
                id="box-radio"
                value="box"
                checked={selected === 'box'}
                onChange={onChange}
            />
            <label htmlFor="box-radio">{label}</label>
        </div>
    );
};

export default BreathingOptions;
