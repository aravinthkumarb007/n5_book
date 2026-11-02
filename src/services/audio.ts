class AudioService {
  private synth: SpeechSynthesis | null = null;
  private japaneseVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja'));
    if (jaVoice) {
      this.japaneseVoice = jaVoice;
    }
  }

  speak(text: string, onEnd?: () => void, rate: number = 0.9): boolean {
    if (!this.synth) return false;

    try {
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      if (this.japaneseVoice) {
        utterance.voice = this.japaneseVoice;
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      if (onEnd) onEnd();
      return false;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const audioService = new AudioService();
export const speakJapanese = (text: string, onEnd?: () => void, rate: number = 0.9): boolean => {
  return audioService.speak(text, onEnd, rate);
};

