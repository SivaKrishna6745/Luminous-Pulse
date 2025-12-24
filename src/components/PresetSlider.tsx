interface PresetSliderProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PresetSlider = ({ label, onChange }: PresetSliderProps) => {
    return (
        <div className="flex justify-between px-5">
            <label htmlFor="inhale-slider">{label}</label>
            <input type="range" name="slider" id="inhale-slider" min="0" max="15" value={0} onChange={onChange} />
        </div>
    );
};

export default PresetSlider;
