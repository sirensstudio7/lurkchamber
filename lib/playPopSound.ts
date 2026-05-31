const POP_SOUND_SRC = "/sounds/pops.mp3";
const POP_VOLUME = 0.55;

let warmedUp = false;

/** Warm up the clip so the first click plays immediately. */
export function preloadPopSound() {
  if (typeof window === "undefined" || warmedUp) return;
  warmedUp = true;
  const audio = new Audio(POP_SOUND_SRC);
  audio.preload = "auto";
  audio.volume = POP_VOLUME;
  void audio.load();
}

/** Short UI pop — call from a click handler (user gesture). */
export function playPopSound() {
  if (typeof window === "undefined") return;

  const audio = new Audio(POP_SOUND_SRC);
  audio.volume = POP_VOLUME;
  void audio.play().catch(() => {});
}
