interface PresetSliderProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    duration: number;
}

const PresetSlider = ({ label, onChange, duration }: PresetSliderProps) => {
    return (
        <div className="flex justify-between items-center px-5">
            <label htmlFor="inhale-slider">{label}</label>
            <input
                type="range"
                name="slider"
                id="inhale-slider"
                min="0"
                max="15"
                value={duration}
                onChange={onChange}
                className="neon-slider"
            />
            <span className="w-10">{duration}s</span>
        </div>
    );
};

export default PresetSlider;
