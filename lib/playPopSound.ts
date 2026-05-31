const POP_SOUND_SRC = "/sounds/pops.mp3";
const NAV_POP_SOUND_SRC = "/sounds/pop-1.wav";
const FAQ_POP_SOUND_SRC = "/sounds/pop-2.wav";
const POP_VOLUME = 0.55;

const warmedUp = new Set<string>();

function warmUpSound(src: string) {
  if (typeof window === "undefined" || warmedUp.has(src)) return;
  warmedUp.add(src);
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = POP_VOLUME;
  void audio.load();
}

/** Warm up the clip so the first click plays immediately. */
export function preloadPopSound() {
  warmUpSound(POP_SOUND_SRC);
}

export function preloadNavPopSound() {
  warmUpSound(NAV_POP_SOUND_SRC);
}

export function preloadFaqPopSound() {
  warmUpSound(FAQ_POP_SOUND_SRC);
}

function playSound(src: string) {
  if (typeof window === "undefined") return;

  const audio = new Audio(src);
  audio.volume = POP_VOLUME;
  void audio.play().catch(() => {});
}

/** Short UI pop — call from a click handler (user gesture). */
export function playPopSound() {
  playSound(POP_SOUND_SRC);
}

/** Header navigation pop — call from nav link clicks. */
export function playNavPopSound() {
  playSound(NAV_POP_SOUND_SRC);
}

/** FAQ accordion pop — call from accordion trigger clicks. */
export function playFaqPopSound() {
  playSound(FAQ_POP_SOUND_SRC);
}
