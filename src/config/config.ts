export const PRESETS = {
    box: { label: 'Box (Default)', inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 },
    sleep: { label: 'Sleep (4-7-8)', inhale: 4, holdIn: 7, exhale: 8, holdOut: 0 },
    balance: { label: 'Balance (5-5-5-5)', inhale: 5, holdIn: 5, exhale: 5, holdOut: 5 },
};

export const SOUND_FREQUENCIES = {
    Inhale: { start: 107, end: 137 },
    'Hold Full': { start: 137, end: 137 },
    Exhale: { start: 137, end: 107 },
    'Hold Empty': { start: 107, end: 107 },
};
