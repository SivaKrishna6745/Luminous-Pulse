import { X } from 'lucide-react';
import { useState } from 'react';
import useBreathStore from '../store/useBreathStore';
import BreathingOptions from './BreathingOptions';
import PresetSlider from './PresetSlider';
import { type PresetKey } from '../types';
import { PRESETS } from '../config/config.ts';
import useBreakpoint from '../hooks/useBreakpoint.ts';
import { motion } from 'framer-motion';

interface SettingsModalProps {
    onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
    const store = useBreathStore();
    const { isMobile } = useBreakpoint();
    const [config, setConfig] = useState({
        inhale: store.inhaleDuration,
        holdIn: store.inhaleHoldDuration,
        exhale: store.exhaleDuration,
        holdOut: store.exhaleHoldDuration,
    });
    const [selected, setSelected] = useState('box');

    const handlePresetChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPreset: PresetKey = e.target.value as 'box' | 'sleep' | 'balance';
        setSelected(selectedPreset);
        setConfig({
            inhale: PRESETS[selectedPreset].inhale,
            holdIn: PRESETS[selectedPreset].holdIn,
            exhale: PRESETS[selectedPreset].exhale,
            holdOut: PRESETS[selectedPreset].holdOut,
        });
    };

    const handleSlider = (field: string, value: string) => {
        setConfig({ ...config, [field]: parseInt(value) });
    };

    const handleSave = () => {
        store.setInhaleDuration(config.inhale);
        store.setInhaleHoldDuration(config.holdIn);
        store.setExhaleDuration(config.exhale);
        store.setExhaleHoldDuration(config.holdOut);
        onClose();
    };

    const variants = {
        hidden: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
        visible: { y: 0, x: 0 },
        exit: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
    };

    const modalClasses = isMobile
        ? 'bottom-0 left-0 w-full h-[85vh] border-t px-6'
        : 'top-0 right-0 h-full w-[50%] lg:w-[40%] xl:w-[30%] border-l px-10';

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed z-50 text-lg bg-slate-900/80 backdrop-blur-md shadow-2xl border-white/10 rounded-md py-5 transform transition-all duration-300 ease-out scale-100 opacity-100 ${modalClasses}`}
        >
            <div className="flex justify-between items-center relative my-5">
                <h1 className="text-3xl">Breathing Pattern</h1>
                <X size={32} onClick={onClose} />
            </div>
            <div className="flex flex-col px-5">
                <BreathingOptions
                    value="box"
                    selected={selected}
                    onChange={handlePresetChanged}
                    label="Default (4-4-4-4)"
                />
                <BreathingOptions
                    value="sleep"
                    selected={selected}
                    onChange={handlePresetChanged}
                    label="Sleep (4-7-8-0)"
                />
                <BreathingOptions
                    value="balance"
                    selected={selected}
                    onChange={handlePresetChanged}
                    label="Balance (5-5-5-5)"
                />
            </div>
            <div className="sliders flex flex-col mt-10 gap-2">
                <PresetSlider
                    label="Inhale"
                    onChange={(e) => handleSlider('inhale', e.target.value)}
                    duration={config.inhale}
                />
                <PresetSlider
                    label="Hold In"
                    onChange={(e) => handleSlider('holdIn', e.target.value)}
                    duration={config.holdIn}
                />
                <PresetSlider
                    label="Exhale"
                    onChange={(e) => handleSlider('exhale', e.target.value)}
                    duration={config.exhale}
                />
                <PresetSlider
                    label="Hold Out"
                    onChange={(e) => handleSlider('holdOut', e.target.value)}
                    duration={config.holdOut}
                />
            </div>
            <button
                type="button"
                onClick={handleSave}
                className="px-8 py-2 bg-blue-600 text-gray-200 rounded-md cursor-pointer mt-5 text-xl"
            >
                Save
            </button>
        </motion.div>
    );
};

export default SettingsModal;
