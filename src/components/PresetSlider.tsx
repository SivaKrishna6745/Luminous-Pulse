interface PresetSliderProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    duration: number;
}

const PresetSlider = ({ label, onChange, duration }: PresetSliderProps) => {
    return (
        <div className="grid grid-cols-[1fr_2fr_0.5fr] md:grid-cols-[1fr_3fr_1fr] gap-2 md:gap-4 items-center">
            <label htmlFor="inhale-slider" className="place-self-start whitespace-nowrap">
                {label}
            </label>
            <input
                type="range"
                name="slider"
                id="inhale-slider"
                min="0"
                max="15"
                value={duration}
                onChange={onChange}
                className="neon-slider self-stretch"
            />
            <span className="w-10 place-self-end">{duration}s</span>
        </div>
    );
};

export default PresetSlider;
