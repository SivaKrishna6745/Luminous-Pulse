import { useState, useEffect, useRef, useMemo } from 'react';
import useBreathStore from '../store/useBreathStore';
import { type BreathPhase } from '../types';

const phaseCycle: BreathPhase[] = ['Inhale', 'Hold Full', 'Exhale', 'Hold Empty'];

const useBreathingEngine = () => {
    const { inhaleDuration, inhaleHoldDuration, exhaleDuration, exhaleHoldDuration } = useBreathStore();
    const durationMap: Record<BreathPhase, number> = useMemo(
        () => ({
            Inhale: inhaleDuration,
            'Hold Full': inhaleHoldDuration,
            Exhale: exhaleDuration,
            'Hold Empty': exhaleHoldDuration,
        }),
        [inhaleDuration, inhaleHoldDuration, exhaleDuration, exhaleHoldDuration]
    );

    const [phaseIndex, setPhaseIndex] = useState(0);
    const currentPhase = phaseCycle[phaseIndex];
    const activeDuration = durationMap[currentPhase];
    const [timeLeft, setTimeLeft] = useState(activeDuration);
    const [isActive, setIsActive] = useState(false);

    const startTimeRef = useRef(0);
    const timeLeftRef = useRef(0);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        if (!isActive) return;
        startTimeRef.current = Date.now() - (activeDuration - timeLeftRef.current);
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = activeDuration - elapsed;
            setTimeLeft(remaining);
            if (remaining <= 0) {
                const nextPhaseIndex = (phaseIndex + 1) % phaseCycle.length;
                const nextPhase = phaseCycle[nextPhaseIndex];
                setTimeLeft(durationMap[nextPhase]);
                setPhaseIndex(nextPhaseIndex);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isActive, activeDuration, phaseIndex, durationMap]);

    const toggle = () => setIsActive((prev) => !prev);
    const reset = () => {
        setIsActive(false);
        setTimeLeft(durationMap[phaseCycle[0]]);
        setPhaseIndex(0);
    };
    const progress = ((activeDuration - timeLeft) / activeDuration) * 100;

    return {
        currentPhase,
        timeLeft,
        progress,
        isActive,
        toggle,
        reset,
        duration: durationMap[currentPhase],
    };
};

export default useBreathingEngine;
