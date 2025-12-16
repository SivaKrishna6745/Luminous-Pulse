import { create } from 'zustand';

interface BreathStore {
    inhaleDuration: number;
    inhaleHoldDuration: number;
    exhaleDuration: number;
    exhaleHoldDuration: number;
    setInhaleDuration: (inhaleSeconds: number) => void;
    setInhaleHoldDuration: (inhaleHoldSeconds: number) => void;
    setExhaleDuration: (exhaleSeconds: number) => void;
    setExhaleHoldDuration: (exhaleHoldSeconds: number) => void;
}

const useBreathStore = create<BreathStore>((set) => ({
    inhaleDuration: 4,
    inhaleHoldDuration: 4,
    exhaleDuration: 4,
    exhaleHoldDuration: 4,
    setInhaleDuration: (inhaleSeconds: number) => set({ inhaleDuration: inhaleSeconds }),
    setInhaleHoldDuration: (inhaleHoldSeconds: number) => set({ inhaleHoldDuration: inhaleHoldSeconds }),
    setExhaleDuration: (exhaleSeconds: number) => set({ exhaleDuration: exhaleSeconds }),
    setExhaleHoldDuration: (exhaleHoldSeconds: number) => set({ exhaleHoldDuration: exhaleHoldSeconds }),
}));

export default useBreathStore;
