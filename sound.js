function generateFrequencies(baseFrequency = 440) {
    const SEMITONES = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
    ];
    const frequencies = {};

    for (let octave = 0; octave <= 8; octave++) {
        SEMITONES.forEach((note, i) => {
            const noteName = `${note}${octave}`;
            const semitoneOffset = (octave - 4) * 12 + i - 9; // A4を基準
            frequencies[noteName] = +(
                baseFrequency * Math.pow(2, semitoneOffset / 12)
            ).toFixed(2);
        });
    }
    return frequencies;
}

const ALL_NOTES_FREQUENCY = generateFrequencies();

function Note(sound, duration = 0.5, type = "triangle") {
    this.type = type;
    this.duration = duration;
    this.sound = ALL_NOTES_FREQUENCY[sound];
}

function play(melody) {
    const audioContext = new window.AudioContext();
    const startTime = audioContext.currentTime;
    let currentTime = startTime;

    // 各音をスケジュール
    melody.forEach((frequency, index) => {
        if (frequency.sound == null) {
            // 休止の場合は、音を再生せずに時間だけ進める
            currentTime += frequency.duration;
            return;
        }

        const oscillator = audioContext.createOscillator();
        oscillator.type = frequency.type; // 波形タイプ
        oscillator.frequency.setValueAtTime(frequency.sound, currentTime); // スケジュール時刻を設定
        oscillator.connect(audioContext.destination);

        // 音を再生・停止
        oscillator.start(currentTime);
        oscillator.stop(currentTime + frequency.duration);

        currentTime += frequency.duration;
    });
}
