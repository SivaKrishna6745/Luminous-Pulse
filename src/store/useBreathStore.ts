import { create } from 'zustand';

interface BreathStore {
    inhaleCount: number;
    inhaleHoldCount: number;
    exhaleCount: number;
    exhaleHoldCount: number;
}

const useBreathStore = create<BreathStore>(() => ({
    inhaleCount: 0,
    inhaleHoldCount: 0,
    exhaleCount: 0,
    exhaleHoldCount: 0,
}));

export default useBreathStore;
