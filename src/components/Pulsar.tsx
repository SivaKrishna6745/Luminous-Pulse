import { motion, type Variants } from 'framer-motion';
import type { BreathPhase } from '../types';

interface pulsarProps {
    phase: BreathPhase;
    progress?: number;
    timeLeft: number;
    duration: number;
}

const variantsMap: Variants = {
    Inhale: { scale: 1.5 },
    'Hold Full': { scale: 1.5 },
    Exhale: { scale: 1.0 },
    'Hold Empty': { scale: 1.0 },
};

const Pulsar = ({ phase = 'Inhale', timeLeft = 0, duration }: pulsarProps) => {
    return (
        <motion.div
            className="h-60 w-60 rounded-full border-white border flex justify-center items-center"
            variants={variantsMap}
            animate={phase}
            transition={{ duration: duration / 1000, ease: 'easeInOut' }}
        >
            <div className="rounded-full pulsar w-40 h-40 bg-linear-to-br from-neon-cyan to-neon-mint shadow-[0_0_60px_-10px_rgba(34,211,238,0.6)] flex flex-col justify-center items-center">
                <p className="text-white text-3xl font-bold">{phase}</p>
                <p className="text-white text-2xl font-bold">{Math.ceil(timeLeft / 1000)} s</p>
            </div>
        </motion.div>
    );
};

export default Pulsar;
