import { motion } from 'framer-motion';
import type { BreathPhase } from '../types';

interface pulsarProps {
    phase: BreathPhase;
    progress: number;
    timeLeft: number;
}

const Pulsar = ({ phase = 'Inhale', timeLeft = 0, progress }: pulsarProps) => {
    const getScale = () => {
        switch (phase) {
            case 'Inhale':
                return 1 + 0.5 * (progress / 100);
            case 'Hold Full':
                return 1.5;
            case 'Exhale':
                return 1.5 - 0.5 * (progress / 100);
            case 'Hold Empty':
                return 1.0;
            default:
                return 1.0;
        }
    };

    return (
        <motion.div
            className="h-40 md:h-60 w-40 md:w-60 rounded-full border-white border flex justify-center items-center"
            animate={{
                scale: getScale(),
                opacity: phase === 'Exhale' || phase === 'Hold Empty' ? 0.8 : 1,
            }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
            <div className="rounded-full pulsar w-25 md:w-40 h-25 md:h-40 bg-linear-to-br from-neon-cyan to-neon-mint shadow-[0_0_60px_-10px_rgba(34,211,238,0.6)] flex flex-col justify-center items-center">
                <p className="text-white text-xl md:text-3xl font-bold">{phase}</p>
                <p className="text-white text-lg md:text-2xl font-bold">{Math.ceil(timeLeft / 1000)} s</p>
            </div>
        </motion.div>
    );
};

export default Pulsar;
