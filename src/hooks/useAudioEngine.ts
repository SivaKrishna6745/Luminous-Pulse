import { useEffect, useRef } from 'react';
import { SOUND_FREQUENCIES } from '../config/config';
import type { BreathPhase } from '../types';

const useAudioEngine = (isMute: boolean) => {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const primaryOscillatorRef = useRef<OscillatorNode | null>(null);
    const secondaryOscillatorRef = useRef<OscillatorNode | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const initialize = () => {
        if (audioCtxRef.current) return;
        audioCtxRef.current = new AudioContext();

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.value = 0;
        gainRef.current = gainNode;

        const masterGainNode = audioCtxRef.current.createGain();
        masterGainNode.gain.value = 1;
        gainNode.connect(masterGainNode);
        masterGainNode.connect(audioCtxRef.current.destination);
        masterGainRef.current = masterGainNode;

        const oscillatorNodeOne = audioCtxRef.current.createOscillator();
        oscillatorNodeOne.type = 'sine';
        oscillatorNodeOne.connect(gainNode);
        primaryOscillatorRef.current = oscillatorNodeOne;
        oscillatorNodeOne.start();

        const oscillatorNodeTwo = audioCtxRef.current.createOscillator();
        oscillatorNodeTwo.type = 'sine';
        oscillatorNodeTwo.detune.value = 8;
        oscillatorNodeTwo.connect(gainNode);
        secondaryOscillatorRef.current = oscillatorNodeTwo;
        oscillatorNodeTwo.start();
    };

    const playPhase = (phase: BreathPhase, duration: number) => {
        if (
            !audioCtxRef.current ||
            !primaryOscillatorRef.current ||
            !secondaryOscillatorRef.current ||
            !gainRef.current
        )
            return;
        const now = audioCtxRef.current?.currentTime;
        const currentSoundFrequency = SOUND_FREQUENCIES[phase];
        const { start, end } = currentSoundFrequency;

        primaryOscillatorRef.current?.frequency.cancelScheduledValues(now);
        primaryOscillatorRef.current?.frequency.setValueAtTime(start, now);
        primaryOscillatorRef.current?.frequency.linearRampToValueAtTime(end, now + duration);

        secondaryOscillatorRef.current?.frequency.cancelScheduledValues(now);
        secondaryOscillatorRef.current?.frequency.setValueAtTime(start, now);
        secondaryOscillatorRef.current?.frequency.linearRampToValueAtTime(end, now + duration);

        gainRef.current?.gain.setValueAtTime(gainRef.current?.gain.value, now);
        gainRef.current?.gain.linearRampToValueAtTime(0.1, now + 0.1);
    };

    const stop = () => {
        if (!gainRef.current || !audioCtxRef.current) return;
        const now = audioCtxRef.current?.currentTime;

        gainRef.current?.gain.cancelScheduledValues(now);
        gainRef.current?.gain.setValueAtTime(gainRef.current?.gain.value, now);
        gainRef.current?.gain.linearRampToValueAtTime(0, now + 0.5);
    };

    useEffect(() => {
        if (!masterGainRef.current || !audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);

        if (isMute) {
            masterGainRef.current.gain.setTargetAtTime(0, now, 0.1);
        } else {
            masterGainRef.current.gain.setTargetAtTime(1, now, 0.1);
        }
    }, [isMute]);

    return {
        initialize,
        playPhase,
        stop,
    };
};

export default useAudioEngine;
