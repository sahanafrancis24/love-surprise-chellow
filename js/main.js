const loveConfig = {
  names: "Sahana ❤️ Bharath",
  firstMeetAnswer: "school",
  foodAnswer: "pizza",
  miniQuizAnswer: "ring",
  paths: {
    indexBg: "images/index-bg.jpeg",
    page1Bg: "images/page1-bg.jpeg",
    page2Photo: "images/page2-photo.jpeg",
    page3Photo: "images/page3-photo.jpeg",
    page4Special: "images/page4-special.jpeg",
    page5Photo: "images/page5-photo.jpeg",
    proposalBg: "images/proposal-bg.jpeg",
    finalBg: "images/final-bg.jpeg",
    couplePhoto: "images/couple-photo.jpeg",
    bgMusic: "music/bg.mpeg",
    heartbeat: "music/heartbeat.mp3"
  },
  customMessages: {
    indexTitle: "A Journey of Us 💕",
    indexSubtitle: "Every memory has a heartbeat...",
    beginButton: "Begin The Journey 💌",
    loadingText: "Loading Our Memories... ❤️",
    page1Question: "Where did we first meet? 💞",
    page1Success: "Yesss... you remember ummmaaaahhh....💋😌❤️",
    page1Fail: "Hmm... think again chelloww 😄",
    page2Question: "Do you remember this day? ✨",
    page2NoMessage: "Adichi mandaya odachirven😒",
    page3Question: "What I gave you that day? 🥹🤍",
    page3Success: "Hehe correct bujukiiii 😘💙",
    page5Line: "Every moment with you became my favourite memory...",
    proposalLine: "Will You Be Mine Forever? 💍💙",
    noHint: "YOU CAN GIVE 5 NO'S",
    noMessages: [
      "Try again 😜",
      "You can't say no 😌",
      "Just press YES ❤️",
      "Ennapaaa apo paasam illayaaa☹️",
      "unak ennaikumey naandhaan yenak ennaikumey needhaaan👹👹👿"
    ],
    finalMessage: "You said YES... ❤️\nFrom this moment, it's you and me forever.\nThank you for choosing me again🥹...\nI promise to love you endlessly🥺🤍....LOVE YOU EN CHELLLAA PULLLAAAA🥹💋💋🤍🌹"
  },
  memoryCardLines: [
    "not this one chellow🌚",
    "Crct ah select pannu daa kuttty boii😁",
    "adi vaanga pora🙁",
    "azhudhuruvennn daaa aprmmm🥺🥺",
    "po un pechu kaa🥺👩🏻‍🦯"
  ]
};

const pageMap = {
  index: { bg: "indexBg" },
  page1: { bg: "page1Bg" },
  page2: { bg: "indexBg" },
  page3: { bg: "indexBg" },
  page4: { bg: "indexBg" },
  page5: { bg: "indexBg" },
  proposal: { bg: "proposalBg" },
  final: { bg: "finalBg" }
};

const page = document.body?.dataset?.page || "";
const toastEl = document.getElementById("toast");
const MUSIC_TIME_KEY = "loveMusicTime";
const MUSIC_SAVED_AT_KEY = "loveMusicSavedAt";

document.addEventListener("DOMContentLoaded", () => {
  initBackground();
  injectConfigText();
  initCursorGlow();
  initFloatingHearts();
  initEmojiParticles();
  initMusic();
  initTransitions();

  requestAnimationFrame(() => document.body.classList.add("page-ready"));

  if (page === "loading") initLoading();
  if (page === "index") initIndex();
  if (page === "page1") initPage1();
  if (page === "page2") initPage2();
  if (page === "page3") initPage3();
  if (page === "page4") initPage4();
  if (page === "page5") initPage5();
  if (page === "proposal") initProposal();
  if (page === "final") initFinal();
});

function initBackground() {
  const bg = document.getElementById("pageBg");
  if (!bg || !pageMap[page]) return;
  bg.style.backgroundImage = `url('${loveConfig.paths[pageMap[page].bg]}')`;
}

function injectConfigText() {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.dataset.key;
    if (key === "names") el.textContent = loveConfig.names;
    else if (loveConfig.customMessages[key]) el.textContent = loveConfig.customMessages[key];
  });

  const page2Photo = document.getElementById("page2Photo");
  if (page2Photo) page2Photo.src = loveConfig.paths.page2Photo;
  const page3Photo = document.getElementById("page3Photo");
  if (page3Photo) page3Photo.src = loveConfig.paths.page3Photo;
  const page5Photo = document.getElementById("page5Photo");
  if (page5Photo) page5Photo.src = loveConfig.paths.page5Photo;
  const couplePhoto = document.getElementById("couplePhoto");
  if (couplePhoto) couplePhoto.src = loveConfig.paths.couplePhoto;

  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) bgMusic.src = loveConfig.paths.bgMusic;
  const heartBeat = document.getElementById("heartbeatSfx");
  if (heartBeat) heartBeat.src = loveConfig.paths.heartbeat;
}

function initTransitions() {
  document.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.disabled) return;
      const next = btn.dataset.next;
      if (!next) return;
      e.preventDefault();
      navigate(next);
    });
  });
}

function navigate(path) {
  const audio = document.getElementById("bgMusic");
  if (audio && Number.isFinite(audio.currentTime)) {
    sessionStorage.setItem(MUSIC_TIME_KEY, String(audio.currentTime));
    sessionStorage.setItem(MUSIC_SAVED_AT_KEY, String(Date.now()));
  }
  document.body.classList.add("page-leave");
  setTimeout(() => {
    window.location.href = path;
  }, 220);
}

function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;
  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

function initFloatingHearts() {
  const layer = document.getElementById("heartLayer");
  if (!layer) return;

  const spawn = () => {
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent = Math.random() > 0.5 ? "❤" : "💗";
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${14 + Math.random() * 18}px`;
    el.style.animationDuration = `${6 + Math.random() * 6}s`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 13000);
  };

  const pace = page === "final" ? 220 : 520;
  setInterval(spawn, pace);
}

function initEmojiParticles() {
  const layer = document.getElementById("emojiLayer");
  if (!layer) return;

  setInterval(() => {
    const el = document.createElement("span");
    el.className = "emoji-particle";
    el.textContent = ["✨", "💙", "🌹", "💕"][Math.floor(Math.random() * 4)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${6 + Math.random() * 6}s`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }, 900);
}

function initMusic() {
  const toggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  if (!audio) return;
  audio.preload = "auto";

  const pref = localStorage.getItem("loveMusicOn");
  const shouldPlay = pref === null ? true : pref === "1";
  const savedTime = Number(sessionStorage.getItem(MUSIC_TIME_KEY) || "0");
  const savedAt = Number(sessionStorage.getItem(MUSIC_SAVED_AT_KEY) || "0");
  const elapsed = savedAt > 0 ? Math.max(0, (Date.now() - savedAt) / 1000) : 0;
  const resumeAt = savedTime + elapsed;

  const restoreThenPlay = () => {
    if (Number.isFinite(resumeAt) && resumeAt > 0) {
      try {
        const maxTime = Number.isFinite(audio.duration) && audio.duration > 0 ? Math.max(0, audio.duration - 0.08) : resumeAt;
        audio.currentTime = Math.min(resumeAt, maxTime);
      } catch (_) {}
    }
    if (shouldPlay) startMusicFromLoad(audio);
  };

  if (audio.readyState >= 1) restoreThenPlay();
  else audio.addEventListener("loadedmetadata", restoreThenPlay, { once: true });

  if (toggle) toggle.textContent = shouldPlay ? "Mute ♫" : "Play ♫";

  const persistTime = () => {
    if (Number.isFinite(audio.currentTime)) {
      sessionStorage.setItem(MUSIC_TIME_KEY, String(audio.currentTime));
      sessionStorage.setItem(MUSIC_SAVED_AT_KEY, String(Date.now()));
    }
  };
  audio.addEventListener("timeupdate", persistTime);
  window.addEventListener("beforeunload", persistTime);
  window.addEventListener("pagehide", persistTime);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") persistTime();
  });

  if (toggle) {
    toggle.addEventListener("click", async () => {
      if (audio.paused) {
        await audio.play().catch(() => {});
        toggle.textContent = "Mute ♫";
        localStorage.setItem("loveMusicOn", "1");
      } else {
        audio.pause();
        toggle.textContent = "Play ♫";
        localStorage.setItem("loveMusicOn", "0");
      }
    });
  }
}

function playWithUnlock(audio) {
  audio.play().catch(() => {
    const unlock = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", unlock);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("keydown", unlock);
    };
    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);
    document.addEventListener("keydown", unlock);
  });
}

function startMusicFromLoad(audio) {
  audio.muted = true;
  audio.play()
    .then(() => {
      // Start immediately at load; then unmute once playback is active.
      setTimeout(() => {
        audio.muted = false;
      }, 120);
    })
    .catch(() => {
      audio.muted = false;
      playWithUnlock(audio);
    });
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(showToast.hideTimer);
  showToast.hideTimer = setTimeout(() => toastEl.classList.remove("show"), 1700);
}

function normalize(value) {
  return value.trim().toLowerCase();
}

function initLoading() {
  setTimeout(() => navigate("index.html"), 2600);
}

function initIndex() {
  const begin = document.getElementById("beginBtn");
  if (!begin) return;
  begin.addEventListener("click", () => {
    begin.style.transform = "scale(0.95)";
    setTimeout(() => navigate("page1.html"), 180);
  });
}

function initPage1() {
  const form = document.getElementById("page1Form");
  const input = document.getElementById("meetInput");
  const feedback = document.getElementById("page1Feedback");
  const next = document.getElementById("page1Next");
  const card = document.getElementById("page1Card");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (normalize(input.value) === normalize(loveConfig.firstMeetAnswer)) {
      feedback.textContent = loveConfig.customMessages.page1Success;
      feedback.className = "feedback success";
      next.disabled = false;
      showToast(loveConfig.customMessages.page1Success);
    } else {
      feedback.textContent = loveConfig.customMessages.page1Fail;
      feedback.className = "feedback error";
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
      next.disabled = true;
      showToast(loveConfig.customMessages.page1Fail);
    }
  });
}

function initPage2() {
  const photo = document.getElementById("page2PhotoFrame");
  const yes = document.getElementById("p2Yes");
  const no = document.getElementById("p2No");
  const next = document.getElementById("page2Next");

  setTimeout(() => photo?.classList.add("visible"), 220);

  yes?.addEventListener("click", () => {
    showToast("Awww same here ❤️");
    next.disabled = false;
  });

  no?.addEventListener("click", () => {
    showToast(loveConfig.customMessages.page2NoMessage);
    setTimeout(() => { next.disabled = false; }, 650);
  });
}

function initPage3() {
  const form = document.getElementById("page3Form");
  const input = document.getElementById("giftInput");
  const feedback = document.getElementById("page3Feedback");
  const next = document.getElementById("page3Next");
  const sparkleHost = document.getElementById("sparkleHost");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (normalize(input.value) === normalize(loveConfig.miniQuizAnswer)) {
      feedback.textContent = loveConfig.customMessages.page3Success;
      feedback.className = "feedback success";
      next.disabled = false;
      sparkle(sparkleHost);
      showToast(loveConfig.customMessages.page3Success);
    } else {
      feedback.textContent = "Almost... one more try 💫";
      feedback.className = "feedback error";
      showToast("Almost... one more try 💫");
    }
  });
}

function sparkle(host) {
  if (!host) return;
  for (let i = 0; i < 20; i += 1) {
    const dot = document.createElement("span");
    dot.className = "emoji-particle";
    dot.textContent = "✨";
    dot.style.left = `${45 + Math.random() * 10}%`;
    dot.style.bottom = "40%";
    dot.style.animationDuration = `${1.3 + Math.random()}s`;
    host.appendChild(dot);
    setTimeout(() => dot.remove(), 1600);
  }
}

function initPage4() {
  const grid = document.getElementById("memoryGrid");
  const next = document.getElementById("page4Next");
  const zoomModal = createMemoryZoomModal();

  const specialIndex = Math.floor(Math.random() * 6);
  const filler = [...loveConfig.memoryCardLines];

  for (let i = 0; i < 6; i += 1) {
    const card = document.createElement("div");
    card.className = "memory-card";

    const backContent = i === specialIndex
      ? `<img src="${loveConfig.paths.page4Special}" alt="Special memory" />`
      : `<p>${filler.pop() || "not this one chellow🌚"}</p>`;

    card.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-face memory-front">Pick me 💌</div>
        <div class="memory-face memory-back">${backContent}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (card.classList.contains("flipped")) return;
      card.classList.add("flipped");
      if (i === specialIndex) {
        showMemoryZoom(zoomModal, loveConfig.paths.page4Special);
        next.disabled = false;
      }
    });

    grid.appendChild(card);
  }
}

function createMemoryZoomModal() {
  const existing = document.getElementById("memoryZoomModal");
  if (existing) return existing;

  const modal = document.createElement("div");
  modal.id = "memoryZoomModal";
  modal.className = "memory-zoom-modal";
  modal.innerHTML = `
    <div class="memory-zoom-card">
      <img src="${loveConfig.paths.page4Special}" alt="Special memory zoom" />
      <p>Special Memories 🤍🌹</p>
    </div>
  `;
  modal.addEventListener("click", () => modal.classList.remove("show"));
  document.body.appendChild(modal);
  return modal;
}

function showMemoryZoom(modal, imgSrc) {
  const img = modal.querySelector("img");
  if (img) img.src = imgSrc;
  modal.classList.add("show");
}

function initPage5() {
  const textTarget = document.getElementById("typewriter");
  const photo = document.getElementById("page5PhotoFrame");
  const next = document.getElementById("page5Next");
  const sentence = loveConfig.customMessages.page5Line;

  let i = 0;
  const timer = setInterval(() => {
    textTarget.textContent = sentence.slice(0, i);
    i += 1;
    if (i > sentence.length) {
      clearInterval(timer);
      setTimeout(() => photo.classList.add("visible"), 300);
      next.disabled = false;
    }
  }, 42);
}

function initProposal() {
  const yes = document.getElementById("yesBtn");
  const no = document.getElementById("noBtn");
  const heartbeat = document.getElementById("heartbeatSfx");
  let noCount = 0;
  let evadeCount = 0;

  function moveNo() {
    const x = Math.floor((Math.random() - 0.5) * 180);
    const y = Math.floor((Math.random() - 0.5) * 130);
    no.style.transform = `translate(${x}px, ${y}px)`;
  }

  document.addEventListener("mousemove", (e) => {
    const rect = no.getBoundingClientRect();
    const near = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
    if (near < 120 && evadeCount < 2) {
      moveNo();
      evadeCount += 1;
    }
  });

  no.addEventListener("click", (e) => {
    e.preventDefault();
    noCount += 1;
    const line = loveConfig.customMessages.noMessages[Math.min(noCount - 1, loveConfig.customMessages.noMessages.length - 1)];
    showToast(line);
    if (noCount >= 5) no.classList.add("tiny");
    moveNo();
  });

  yes.addEventListener("click", () => {
    heartBurst(yes);
    heartbeat?.play().catch(() => {});
    setTimeout(() => navigate("final.html"), 1100);
  });
}

function heartBurst(sourceEl) {
  const rect = sourceEl.getBoundingClientRect();
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "💖";
    heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 90}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heart.style.position = "fixed";
    heart.style.animationDuration = `${1 + Math.random() * 1.2}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  }
}

function initFinal() {
  const popup = document.getElementById("finalPopup");
  const replay = document.getElementById("replayBtn");
  const copy = document.getElementById("copyBtn");

  setTimeout(() => popup.classList.add("show"), 250);
  createConfetti();

  replay?.addEventListener("click", () => navigate("index.html"));
  copy?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(loveConfig.customMessages.finalMessage).catch(() => {});
    showToast("Love message copied 💌");
  });

  const finalText = document.getElementById("finalText");
  if (finalText) finalText.innerText = loveConfig.customMessages.finalMessage;
}

function createConfetti() {
  const layer = document.getElementById("confettiLayer");
  if (!layer) return;

  for (let i = 0; i < 110; i += 1) {
    const piece = document.createElement("span");
    piece.style.position = "absolute";
    piece.style.top = "-20px";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${5 + Math.random() * 5}px`;
    piece.style.height = `${8 + Math.random() * 8}px`;
    piece.style.borderRadius = "5px";
    piece.style.background = ["#ff8ec8", "#8cc6ff", "#cbb0ff", "#ffffff"][Math.floor(Math.random() * 4)];
    piece.style.opacity = "0.9";
    piece.style.animation = `floatUp ${3 + Math.random() * 3}s linear forwards`;
    piece.style.transform = `translateY(100vh)`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}
