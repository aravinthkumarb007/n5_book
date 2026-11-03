class AudioService {
  private synth: SpeechSynthesis | null = null;
  private japaneseVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioPlayer: HTMLAudioElement | null = null;
  private isVoicesInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
      window.speechSynthesis.addEventListener?.('voiceschanged', () => this.initVoices());
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Look for Japanese voices
    const jaVoice = voices.find(v =>
      v.lang === 'ja-JP' ||
      v.lang === 'ja_JP' ||
      v.lang.toLowerCase().startsWith('ja') ||
      v.name.toLowerCase().includes('japan') ||
      v.name.toLowerCase().includes('kyoko') ||
      v.name.toLowerCase().includes('nanami') ||
      v.name.toLowerCase().includes('ayumi') ||
      v.name.toLowerCase().includes('ichiro') ||
      v.name.toLowerCase().includes('haruka')
    );

    if (jaVoice) {
      this.japaneseVoice = jaVoice;
      this.isVoicesInitialized = true;
    }
  }

  /**
   * Clean Japanese text to remove okurigana markers, furigana brackets,
   * punctuation dots, and hyphens so speech engine speaks natural Japanese.
   */
  public cleanTextForSpeech(rawText: string): string {
    if (!rawText) return '';

    let text = rawText;

    // If text has bracketed reading like 漢字[かんじ] or 漢字(かんじ), extract reading
    const bracketMatch = text.match(/^[一-龯々]+[\[(（]([ぁ-んァ-ヶー]+)[\])）]$/);
    if (bracketMatch && bracketMatch[1]) {
      return bracketMatch[1];
    }

    // Replace inline bracket annotations with just the kana reading
    text = text.replace(/[一-龯々]+[\[(（]([ぁ-んァ-ヶー]+)[\])）]/g, '$1');

    // Remove Kunyomi division dots (e.g. た.べる -> たべる, あ.う -> あう)
    text = text.replace(/([ぁ-んァ-ヶ])\.([ぁ-んァ-ヶ])/g, '$1$2');
    text = text.replace(/\./g, '');

    // Remove prefixes/suffixes markers (e.g. -び -> び, 〜 -> empty, 【】 -> empty)
    text = text.replace(/^[-–—〜~]/, '');
    text = text.replace(/[【】「」『』()（）\[\]]/g, '');

    // Remove English translations or symbols if present in format "日本語 (Japanese)"
    text = text.replace(/[a-zA-Z0-9]/g, '');

    return text.trim() || rawText.trim();
  }

  speak(text: string, onEnd?: () => void, rate: number = 0.9): boolean {
    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return false;
    }

      this.stop();

      // 1. Try SpeechSynthesis if supported and Japanese voice is available
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (!this.synth) {
          this.synth = window.speechSynthesis;
        }

          if (!this.japaneseVoice) {
            this.initVoices();
          }

            // If we have a synth and a recognized Japanese voice (or any voices)
            if (this.synth) {
              try {
                if (this.synth.paused) {
                  this.synth.resume();
                }

                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.lang = 'ja-JP';
                utterance.rate = Math.max(0.6, Math.min(rate, 1.4));
                utterance.pitch = 1.0;

                if (this.japaneseVoice) {
                  utterance.voice = this.japaneseVoice;
                }

                let hasEnded = false;
                const handleEnd = () => {
                  if (hasEnded) return;
                  hasEnded = true;
                  this.currentUtterance = null;
                  if (onEnd) onEnd();
                };

                utterance.onend = handleEnd;
                utterance.onerror = (e) => {
                  console.warn('SpeechSynthesis error, trying audio stream fallback:', e);
                  // Fallback to online TTS audio if SpeechSynthesis failed
                  this.playFallbackAudio(cleanText, onEnd, rate);
                };

                // Store reference on instance to prevent Chromium V8 garbage collection bug
                this.currentUtterance = utterance;
                this.synth.speak(utterance);
                return true;
              } catch (e) {
                console.warn('Speech synthesis exception, using audio fallback:', e);
                return this.playFallbackAudio(cleanText, onEnd, rate);
              }
            }
          }

          // 2. Fallback to audio stream
          return this.playFallbackAudio(cleanText, onEnd, rate);
        }

  private playFallbackAudio(text: string, onEnd?: () => void, rate: number = 0.9): boolean {
    try {
      if (typeof window === 'undefined') return false;

      const encoded = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encoded}`;

      this.audioPlayer = new Audio(url);
      this.audioPlayer.playbackRate = Math.max(0.7, Math.min(rate, 1.3));

      let hasEnded = false;
      const finish = () => {
        if (hasEnded) return;
        hasEnded = true;
        this.audioPlayer = null;
        if (onEnd) onEnd();
      };

      this.audioPlayer.onended = finish;
      this.audioPlayer.onerror = finish;

      const promise = this.audioPlayer.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn('Audio playback error:', err);
          finish();
        });
      }
      return true;
    } catch (err) {
      console.warn('Fallback audio failed:', err);
      if (onEnd) onEnd();
      return false;
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (_) { }
    }
    this.currentUtterance = null;

    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch (_) { }
      this.audioPlayer = null;
    }
  }
}

export const audioService = new AudioService();
export const speakJapanese = (text: string, onEnd?: () => void, rate: number = 0.9): boolean => {
  return audioService.speak(text, onEnd, rate);
};
