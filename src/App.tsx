import { CircleStop, Pause, Play, Settings, Volume2, VolumeX } from 'lucide-react';
import './App.css';
import Button from './components/Button';
import Pulsar from './components/Pulsar';
import useBreathingEngine from './hooks/useBreathingEngine';
import { useEffect, useState } from 'react';
import SettingsModal from './components/SettingsModal';
import { AnimatePresence, motion } from 'framer-motion';
import useAudioEngine from './hooks/useAudioEngine';
import useWakeLock from './hooks/useWakeLock';

function App() {
    const { currentPhase, toggle, isActive, reset, progress, timeLeft, activeDuration } = useBreathingEngine();
    const [isMute, setIsMute] = useState(false);
    const { initialize, playPhase, stop } = useAudioEngine(isMute);
    useWakeLock(isActive);
    const [modalOpen, setModalOpen] = useState(false);

    function volume() {
        setIsMute((prev) => !prev);
    }

    function openSettings() {
        setModalOpen(true);
    }

    function closeSettings() {
        setModalOpen(false);
    }

    function handleToggle() {
        if (!isActive) initialize();
        toggle();
    }

    useEffect(() => {
        if (isActive) playPhase(currentPhase, activeDuration / 1000);
        else stop();
    }, [currentPhase, activeDuration, isActive, playPhase, stop]);

    return (
        <div className="relative">
            <div className="flex flex-col items-center gap-36">
                <h1 className="text-3xl font-bold">Luminous Pulse</h1>
                <Pulsar phase={currentPhase} progress={progress} timeLeft={timeLeft} />
                <div className="flex justify-center gap-10 md:gap-20">
                    <Button
                        className={isActive ? 'bg-yellow-300' : 'bg-green-300'}
                        label={isActive ? <Pause /> : <Play />}
                        onClick={() => handleToggle()}
                    />
                    <Button className="bg-red-300" label={<CircleStop />} onClick={() => reset()} />
                    <Button
                        className="bg-orange-300"
                        label={isMute ? <VolumeX /> : <Volume2 />}
                        onClick={() => volume()}
                    />
                </div>
            </div>
            <div className="absolute top-1 right-0 cursor-pointer" onClick={openSettings}>
                <Settings size={32} />
            </div>

            {/* Overlay */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={closeSettings}
                    />
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>{modalOpen && <SettingsModal onClose={closeSettings} />}</AnimatePresence>
        </div>
    );
}

export default App;
