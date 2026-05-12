const XP_AUDIO_MASTER_VOLUME = 0.85;

export const XP_SOUNDS = {
  startup: {
    src: "/sounds/Windows XP Startup.wav",
    volume: 0.6,
  },
  menuCommand: {
    src: "/sounds/Windows XP Menu Command.wav",
    volume: 0.28,
  },
  minimize: {
    src: "/sounds/Windows XP Minimize.wav",
    volume: 0.25,
  },
} as const satisfies Record<string, { src: string; volume: number }>;

export type XpSoundId = keyof typeof XP_SOUNDS;

type PlayXpSoundOptions = {
  once?: boolean;
  queueUntilUnlocked?: boolean;
  overlap?: boolean;
};

const audioElements = new Map<string, HTMLAudioElement>();
const playedOnceSoundIds = new Set<XpSoundId>();
const queuedSounds: Array<{ id: XpSoundId; options: PlayXpSoundOptions }> = [];

let isAudioUnlocked = false;
let isXpAudioMuted = false;

const muteListeners = new Set<() => void>();

const notifyMuteListeners = () => {
  muteListeners.forEach((listener) => {
    listener();
  });
};

export const getXpAudioMuted = () => isXpAudioMuted;

export const subscribeXpAudioMute = (listener: () => void) => {
  muteListeners.add(listener);

  return () => {
    muteListeners.delete(listener);
  };
};

export const setXpAudioMuted = (muted: boolean) => {
  if (isXpAudioMuted === muted) {
    return;
  }

  isXpAudioMuted = muted;

  if (muted) {
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    queuedSounds.length = 0;
  }

  notifyMuteListeners();
};

export const toggleXpAudioMuted = () => {
  setXpAudioMuted(!isXpAudioMuted);
};

const getEffectiveVolume = (soundId: XpSoundId) =>
  XP_SOUNDS[soundId].volume * XP_AUDIO_MASTER_VOLUME;

const createAudioElement = (soundId: XpSoundId) => {
  const audio = new Audio(XP_SOUNDS[soundId].src);
  audio.preload = "auto";
  return audio;
};

const getAudioElement = (soundId: XpSoundId) => {
  const { src } = XP_SOUNDS[soundId];
  const existingAudio = audioElements.get(src);

  if (existingAudio) {
    return existingAudio;
  }

  const audio = createAudioElement(soundId);
  audioElements.set(src, audio);

  return audio;
};

const playAudio = async (
  audio: HTMLAudioElement,
  soundId: XpSoundId,
  options: PlayXpSoundOptions,
) => {
  const { once = false, queueUntilUnlocked = true } = options;

  if (isXpAudioMuted) {
    return;
  }

  if (once && playedOnceSoundIds.has(soundId)) {
    return;
  }

  if (!isAudioUnlocked) {
    if (!queueUntilUnlocked) {
      return;
    }

    const isAlreadyQueued = queuedSounds.some(
      (queuedSound) => queuedSound.id === soundId,
    );

    if (!isAlreadyQueued) {
      queuedSounds.push({ id: soundId, options });
    }

    return;
  }

  audio.currentTime = 0;
  audio.volume = getEffectiveVolume(soundId);

  try {
    await audio.play();

    if (once) {
      playedOnceSoundIds.add(soundId);
    }
  } catch {
    if (!queueUntilUnlocked) {
      return;
    }

    const isAlreadyQueued = queuedSounds.some(
      (queuedSound) => queuedSound.id === soundId,
    );

    if (!isAlreadyQueued) {
      queuedSounds.push({ id: soundId, options });
    }
  }
};

export const playXpSound = async (
  soundId: XpSoundId,
  options: PlayXpSoundOptions = {},
) => {
  const { overlap = false } = options;

  if (overlap) {
    await playAudio(createAudioElement(soundId), soundId, options);
    return;
  }

  await playAudio(getAudioElement(soundId), soundId, options);
};

export const playXpClickSound = () => {
  void playXpSound("menuCommand", { overlap: true });
};

const flushQueuedSounds = () => {
  const pendingSounds = [...queuedSounds];
  queuedSounds.length = 0;

  for (const pendingSound of pendingSounds) {
    void playXpSound(pendingSound.id, pendingSound.options);
  }
};

const markAudioUnlocked = () => {
  if (isAudioUnlocked) {
    return;
  }

  isAudioUnlocked = true;
  flushQueuedSounds();
};

export const unlockXpAudio = () => {
  if (isAudioUnlocked) {
    return;
  }

  const audio = getAudioElement("startup");
  const previousVolume = audio.volume;

  audio.volume = 0;

  void audio
    .play()
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = previousVolume;
      markAudioUnlocked();
    })
    .catch(() => {
      audio.volume = previousVolume;
    });
};
