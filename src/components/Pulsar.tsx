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
            className="h-40 md:h-60 w-40 md:w-60 rounded-full border-white/30 border flex justify-center items-center"
            animate={{
                scale: getScale(),
                opacity: phase === 'Exhale' || phase === 'Hold Empty' ? 0.8 : 1,
            }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
            <motion.div
                className="rounded-full pulsar w-25 md:w-50 h-25 md:h-50 bg-linear-to-br from-cyan-400 to-teal-300 flex flex-col justify-center items-center z-10"
                animate={{
                    boxShadow:
                        phase === 'Inhale' || phase === 'Hold Full'
                            ? '0 0 50px 10px rgba(34, 211, 238, 0.8), 0 0 100px 30px rgba(34, 211, 238, 0.3)'
                            : '0 0 20px 5px rgba(34, 211, 238, 0.5), 0 0 40px 10px rgba(34, 211, 238, 0.1)',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <p className="text-white text-xl md:text-3xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {phase}
                </p>
                <p className="text-white text-lg md:text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {Math.ceil(timeLeft / 1000)}s
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Pulsar;
