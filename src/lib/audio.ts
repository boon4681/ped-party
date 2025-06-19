export const createPlayTick = (volume: number) => {
    const sound = "Tick-DeepFrozenApps-397275646.mp3"
    return () => {
        const audio = new Audio(`/assets/audio/${sound}`)
        audio.volume = volume
        audio.oncanplaythrough = audio.play
    }
}

export const createPlayMomoCoin = (volume: number) => {
    const sound = "momo-coin2.wav"
    return () => {
        const audio = new Audio(`/assets/audio/${sound}`)
        audio.volume = volume
        audio.oncanplaythrough = audio.play
    }
}