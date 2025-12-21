import { CircleStop, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import './App.css';
import Button from './components/Button';
import Pulsar from './components/Pulsar';
import useBreathingEngine from './hooks/useBreathingEngine';
import { useState } from 'react';

function App() {
    const { currentPhase, toggle, isActive, reset, progress, timeLeft } = useBreathingEngine();
    const [isMute, setIsMute] = useState(false);

    function volume() {
        setIsMute((prev) => !prev);
    }

    return (
        <div className="flex flex-col items-center gap-30">
            <h1 className="text-3xl font-bold">Luminous Pulse</h1>
            <Pulsar phase={currentPhase} progress={progress} timeLeft={timeLeft} />
            <div className="flex justify-center gap-20">
                <Button
                    className={isActive ? 'bg-yellow-300' : 'bg-green-300'}
                    label={isActive ? <Pause /> : <Play />}
                    onClick={() => toggle()}
                />
                <Button className="bg-red-300" label={<CircleStop />} onClick={() => reset()} />
                <Button className="bg-orange-300" label={isMute ? <VolumeX /> : <Volume2 />} onClick={() => volume()} />
            </div>
        </div>
    );
}

export default App;
