import { CircleStop, Pause, Play, Volume2 } from 'lucide-react';
import './App.css';
import Button from './components/Button';
import Pulsar from './components/Pulsar';

function App() {
    return (
        <div className="flex items-center flex-col gap-20">
            <h1 className="text-3xl font-bold">Luminous Pulse</h1>
            <Pulsar />
            <div className="flex justify-center gap-30">
                <Button label={<Play />} onClick={() => {}} />
                <Button label={<Pause />} onClick={() => {}} />
                <Button label={<CircleStop />} onClick={() => {}} />
                <Button label={<Volume2 />} onClick={() => {}} />
            </div>
        </div>
    );
}

export default App;
