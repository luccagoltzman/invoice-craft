declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
    delay?: number;
  }

  interface Aos {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: Aos;
  export default AOS;
}

