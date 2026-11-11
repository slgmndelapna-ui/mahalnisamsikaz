
// ==========================================
// ELEMENT REFERENCES
// ==========================================

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus = document.getElementById("terminal-status");

const nextInteraction = document.getElementById("next-interaction");
const nextYes = document.getElementById("next-yes");
const nextNo = document.getElementById("next-no");

const finalReveal = document.getElementById("final-reveal");
const finalMessageText = document.getElementById("final-message-text");
const proceedButton = document.getElementById("proceed-button");

const mainWorkspace = document.getElementById("main-workspace");
const birthdayStage = document.getElementById("birthday-stage");

const openPrompt = document.getElementById("open-prompt");
const openYes = document.getElementById("open-yes");
const openNo = document.getElementById("open-no");
const openNote = document.getElementById("open-note");

const birthdayAnimation = document.getElementById("birthday-animation");
const replayBirthday = document.getElementById("replay-birthday");
const birthdayBow = document.querySelector(".bow");

const backgroundMusic = document.getElementById("backgroundMusic");

// Gift section
const continueGiftsButton = document.getElementById("continue-gifts");
const giftSection = document.getElementById("gift-section");
const giftBoxButton = document.getElementById("gift-box-button");
const giftBoxCount = document.getElementById("gift-box-count");
const giftInstruction = document.getElementById("gift-instruction");
const giftReveal = document.getElementById("gift-reveal");

// Mixtape
const mixtapeOpenButton = document.getElementById("mixtape-open");
const mixtapePlayer = document.getElementById("mixtape-player");
const closeMixtapeButton = document.getElementById("close-mixtape");
const mixtapeAudio = document.getElementById("mixtapeAudio");

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songNote = document.getElementById("song-note");
const audioStatus = document.getElementById("audio-status");

const playSongButton = document.getElementById("play-song");
const previousSongButton = document.getElementById("previous-song");
const nextSongButton = document.getElementById("next-song");

const songItems = document.querySelectorAll(".song-item");


// ==========================================
// VARIABLES
// ==========================================

let isTyping = false;
let noAttempts = 0;
let openNoAttempts = 0;

let bowIsBeingPulled = false;
let bowStartX = 0;
let pullDistance = 0;
let surpriseStarted = false;

const attemptBeforeDisappearing = 5;

const giftClicksNeeded = 5;
let giftClicks = 0;

let currentSongIndex = 0;
let backgroundWasPlaying = false;


// ==========================================
// YOUR LETTER
// ==========================================

const finalMessage = `hi, palangga.

i've been diarying'ed whatever sa notes ko so i'll just copy paste.

and also, every line of code, details, and interaction was made by me.

i'm still learning, but i wanted to make something that you could experience yourself.

thx for op'ning diz

yes i do like you because you're gorgeous,

but talking to you makes me happy because someone actually tries to understand my kabaliwan

and you do sometimes get annoyed by it, but it's genuinely so funny seeing you annoyed.

and i also like you having been comfortable with me talking about anything that has happened in your life.

i feel special that i get to hear it almost everyday

yes i really am halata, but it is my first time experiencing this so ganon

lahat ng 11:11, shooting stars, and stuff, i wished for you, for us to last.

i keep falling for you kahit sa simpleng paguusap lang natin, which translates to i really like talking to you

i love the way we banter and the fact that you would tell me or even remind me

about the right things i should and could do

kasi pamilya ko 'di ko sinusunod pero misis ko oo

im really happy that i met you, langga.

i really think you have a special place in my heart."

yun lang, hafi happy haps birthday, baby ko.
`;


// ==========================================
// BACKGROUND MUSIC
// ==========================================

function playBackgroundMusic() {
    if (!backgroundMusic) {
        console.error("Background music element not found.");
        return;
    }

    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.7;
    backgroundMusic.muted = false;

    // Use the uploaded file if no source is assigned.
    if (
        !backgroundMusic.getAttribute("src") &&
        !backgroundMusic.querySelector("source")
    ) {
        backgroundMusic.src = "./song.mp3";
    }

    console.log("Attempting to play background music...");
    console.log("Audio source:", backgroundMusic.currentSrc || backgroundMusic.src);

    // Call play directly from the button interaction.
    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("Background music successfully started.");
            })
            .catch((error) => {
                console.error("Background music playback failed:", error);

                if (terminalStatus) {
                    terminalStatus.textContent =
                        "MUSIC COULD NOT START. CHECK AUDIO SETTINGS.";
                }
            });
    }
}

if (backgroundMusic) {
    backgroundMusic.addEventListener("error", () => {
        console.error(
            "Background music file could not be loaded:",
            backgroundMusic.error
        );
    });
}


// ==========================================
// NO BUTTON DODGING
// ==========================================

function dodgeNoButton() {
    if (
        isTyping ||
        !noButton ||
        noButton.classList.contains("vanished")
    ) {
        return;
    }

    noAttempts++;

    if (noAttempts >= attemptBeforeDisappearing) {
        noButton.classList.add("vanished");

        if (terminalStatus) {
            terminalStatus.textContent = "404 NOT FOUND.";
        }

        return;
    }

    noButton.classList.add("dodging");

    const padding = 25;

    const maxX = Math.max(
        padding,
        window.innerWidth - noButton.offsetWidth - padding
    );

    const maxY = Math.max(
        padding,
        window.innerHeight - noButton.offsetHeight - padding
    );

    noButton.style.left =
        `${padding + Math.random() * (maxX - padding)}px`;

    noButton.style.top =
        `${padding + Math.random() * (maxY - padding)}px`;

    if (terminalStatus) {
        terminalStatus.textContent =
            `NOT HERE BRO: ${noAttempts}/${attemptBeforeDisappearing}`;
    }
}

if (noButton) {
    noButton.addEventListener("mouseenter", dodgeNoButton);

    noButton.addEventListener("click", (event) => {
        event.preventDefault();
        dodgeNoButton();
    });

    noButton.addEventListener("touchstart", (event) => {
        event.preventDefault();
        dodgeNoButton();
    }, { passive: false });
}


// ==========================================
// TYPING EFFECT
// ==========================================

function typeText(element, text, speed = 35, callback = null) {
    if (!element) {
        if (callback) callback();
        return;
    }

    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;

            setTimeout(type, speed);
        } else {
            if (callback) {
                callback();
            } else {
                isTyping = false;
            }
        }
    }

    type();
}


// ==========================================
// TYPE MULTIPLE MESSAGES
// ==========================================

function typeMessages(messages, index = 0, callback = null) {
    if (index >= messages.length) {
        isTyping = false;

        if (callback) callback();

        return;
    }

    if (!response) {
        isTyping = false;
        return;
    }

    const line = document.createElement("p");
    line.style.marginBottom = "10px";

    if (messages[index].color) {
        line.style.color = messages[index].color;
    }

    response.appendChild(line);

    typeText(line, messages[index].text, 35, () => {
        setTimeout(() => {
            typeMessages(messages, index + 1, callback);
        }, 350);
    });
}


// ==========================================
// FIRST INTERACTION
// ==========================================

function startExperience(choice) {
    if (isTyping) return;

    isTyping = true;

    // Start music immediately from the user's button click.
    playBackgroundMusic();

    if (yesButton) yesButton.disabled = true;
    if (noButton) noButton.disabled = true;

    if (terminalStatus) {
        terminalStatus.textContent =
            `User response received: ${choice}`;
    }

    if (response) response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            {
                text: "[SYSTEM] Access granted.",
                color: "#55b9ff"
            },
            {
                text: "hi, langga.",
                color: "#65e6a5"
            },
            {
                text: "u probably obviously chose yes."
            },
            {
                text: "oke proceed pls."
            }
        ]
        : [
            {
                text: "[SYSTEM] Request received.",
                color: "#55b9ff"
            },
            {
                text: "ay, no worries, bebe.",
                color: "#65e6a5"
            },
            {
                text: "refresh mo na lang whenever you're ready."
            }
        ];

    typeMessages(messages, 0, () => {
        if (nextInteraction) {
            nextInteraction.classList.remove("hidden");
        }

        if (nextYes) nextYes.disabled = false;
        if (nextNo) nextNo.disabled = false;

        if (terminalStatus) {
            terminalStatus.textContent =
                "AWAITING SECOND RESPONSE.";
        }
    });
}


// ==========================================
// SECOND INTERACTION
// ==========================================

function handleNextChoice(choice) {
    if (isTyping) return;

    isTyping = true;

    if (nextYes) nextYes.disabled = true;
    if (nextNo) nextNo.disabled = true;

    if (nextInteraction) {
        nextInteraction.classList.add("hidden");
    }

    if (terminalStatus) {
        terminalStatus.textContent =
            `Second response received: ${choice}`;
    }

    if (response) response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            {
                text: "last one na.",
                color: "#65e6a5"
            },
            {
                text: "im so proud of this."
            },
            {
                text: "zo here's a letter for you."
            }
        ]
        : [
            {
                text: "HAHAHA, no escaping this one.",
                color: "#65e6a5"
            },
            {
                text: "okay, here's something for you anyway."
            },
            {
                text: "zo here's a letter for you."
            }
        ];

    typeMessages(messages, 0, () => {
        if (finalReveal) {
            finalReveal.classList.remove("hidden");
        }

        typeText(finalMessageText, finalMessage, 35, () => {
            if (terminalStatus) {
                terminalStatus.textContent =
                    "TRANSMISSION COMPLETE. AWAITING PROCEED.";
            }

            if (proceedButton) {
                proceedButton.classList.remove("hidden");
                proceedButton.disabled = false;
            }
        });
    });
}


// ==========================================
// PROCEED TO BIRTHDAY SCREEN
// ==========================================

function showOpenPrompt() {
    if (mainWorkspace) {
        mainWorkspace.classList.add("hidden");
    }

    if (birthdayStage) {
        birthdayStage.classList.remove("hidden");
        birthdayStage.classList.add("stage-visible");
    }
}

if (proceedButton) {
    proceedButton.addEventListener("click", showOpenPrompt);
}


// ==========================================
// BIRTHDAY SCREEN: NO BUTTON
// ==========================================

function dodgeCakeNoButton() {
    if (!openNo || openNo.classList.contains("vanished")) {
        return;
    }

    openNoAttempts++;

    if (openNoAttempts >= attemptBeforeDisappearing) {
        openNo.classList.add("vanished");

        if (openNote) {
            openNote.textContent = "NO OPTION NOT FOUND.";
        }

        return;
    }

    openNo.classList.add("dodging");

    const padding = 25;

    const maxX = Math.max(
        padding,
        window.innerWidth - openNo.offsetWidth - padding
    );

    const maxY = Math.max(
        padding,
        window.innerHeight - openNo.offsetHeight - padding
    );

    openNo.style.left =
        `${padding + Math.random() * (maxX - padding)}px`;

    openNo.style.top =
        `${padding + Math.random() * (maxY - padding)}px`;
}

if (openNo) {
    openNo.addEventListener("mouseenter", dodgeCakeNoButton);

    openNo.addEventListener("click", (event) => {
        event.preventDefault();
        dodgeCakeNoButton();
    });

    openNo.addEventListener("touchstart", (event) => {
        event.preventDefault();
        dodgeCakeNoButton();
    }, { passive: false });
}


// ==========================================
// START BIRTHDAY ANIMATION
// ==========================================

function startBirthdayAnimation() {
    if (openPrompt) openPrompt.classList.add("hidden");

    if (birthdayAnimation) {
        birthdayAnimation.classList.remove("hidden");
        birthdayAnimation.classList.remove("play");
    }

    if (birthdayBow) {
        birthdayBow.classList.remove("pulling", "shot");
        birthdayBow.style.removeProperty("--pull-distance");
    }

    surpriseStarted = false;
    bowIsBeingPulled = false;
    pullDistance = 0;

    if (terminalStatus) {
        terminalStatus.textContent =
            "PULL ON THE BOW TO BEGIN.";
    }
}

if (openYes) {
    openYes.addEventListener("click", startBirthdayAnimation);
}


// ==========================================
// BOW POINTER INTERACTION
// ==========================================

if (birthdayBow) {
    birthdayBow.addEventListener("pointerdown", (event) => {
        if (surpriseStarted) return;

        event.preventDefault();

        bowIsBeingPulled = true;
        bowStartX = event.clientX;
        pullDistance = 0;

        birthdayBow.classList.add("pulling");

        birthdayBow.setPointerCapture(event.pointerId);

        if (terminalStatus) {
            terminalStatus.textContent =
                "PULL BACK TO AIM AT THE HEART.";
        }
    });

    birthdayBow.addEventListener("pointermove", (event) => {
        if (!bowIsBeingPulled) return;

        const distance = Math.max(
            0,
            Math.min(65, bowStartX - event.clientX)
        );

        pullDistance = distance;

        birthdayBow.style.setProperty(
            "--pull-distance",
            `${distance}px`
        );
    });

    birthdayBow.addEventListener("pointerup", () => {
        if (!bowIsBeingPulled) return;

        bowIsBeingPulled = false;

        birthdayBow.classList.remove("pulling");

        if (pullDistance < 15) {
            birthdayBow.style.removeProperty("--pull-distance");

            if (terminalStatus) {
                terminalStatus.textContent =
                    "PULL A LITTLE FURTHER.";
            }

            return;
        }

        if (surpriseStarted) return;

        surpriseStarted = true;

        birthdayBow.classList.add("shot");

        if (terminalStatus) {
            terminalStatus.textContent =
                "THE HEART HAS BEEN HIT.";
        }

        const arrow = birthdayBow.querySelector(".arrow");

        if (!arrow) return;

        arrow.addEventListener("animationend", function onArrowHit(event) {
            if (event.animationName !== "shoot-to-heart") return;

            arrow.removeEventListener("animationend", onArrowHit);

            if (birthdayAnimation) {
                birthdayAnimation.classList.add("play");
            }

            if (terminalStatus) {
                terminalStatus.textContent =
                    "CHOCOLATE CAKE UNLOCKED!";
            }
        });
    });

    birthdayBow.addEventListener("pointercancel", () => {
        bowIsBeingPulled = false;

        birthdayBow.classList.remove("pulling");

        birthdayBow.style.removeProperty("--pull-distance");
    });
}


// ==========================================
// REPLAY BIRTHDAY SURPRISE
// ==========================================

function replaySurprise() {
    if (birthdayAnimation) {
        birthdayAnimation.classList.remove("play");
        birthdayAnimation.classList.add("hidden");
    }

    if (openPrompt) {
        openPrompt.classList.remove("hidden");
    }

    if (openNote) {
        openNote.textContent = "one more time?";
    }

    if (openNo) {
        openNo.classList.remove("vanished", "dodging");
        openNo.style.left = "";
        openNo.style.top = "";
    }

    openNoAttempts = 0;

    surpriseStarted = false;
    bowIsBeingPulled = false;
    pullDistance = 0;

    if (birthdayBow) {
        birthdayBow.classList.remove("shot", "pulling");
        birthdayBow.style.removeProperty("--pull-distance");
    }

    if (terminalStatus) {
        terminalStatus.textContent =
            "BIRTHDAY SURPRISE READY.";
    }
}

if (replayBirthday) {
    replayBirthday.addEventListener("click", replaySurprise);
}


// ==========================================
// BUTTON EVENT LISTENERS
// ==========================================

if (yesButton) {
    yesButton.addEventListener("click", () => {
        startExperience("YES");
    });
}

if (nextYes) {
    nextYes.addEventListener("click", () => {
        handleNextChoice("YES");
    });
}

if (nextNo) {
    nextNo.addEventListener("click", () => {
        handleNextChoice("NO");
    });
}


// ==========================================
// MIXTAPE SONGS
// ==========================================

const mixtapeSongs = [
    {
        title: "Balisong",
        artist: "Rico Blanco",
        file: "balisong.mp3",
        note: "For making my days more colorful and meaningful."
    },
    {
        title: "Ikaw Pa Rin",
        artist: "mrld",
        file: "ikaw-pa-rin.mp3",
        note: "A little reminder that my heart keeps choosing you."
    },
    {
        title: "Gusto",
        artist: "Zack Tabudlo",
        file: "gusto.mp3",
        note: "Because there's so much about you that I adore."
    },
    {
        title: "Sinta",
        artist: "Rob Deniel",
        file: "sinta.mp3",
        note: "For the softness and happiness you bring into my days."
    },
    {
        title: "Mundo",
        artist: "IV of Spades",
        file: "mundo.mp3",
        note: "A song for the little world we've made together."
    },
    {
        title: "Ikaw Lang",
        artist: "Nobita",
        file: "ikaw-lang.mp3",
        note: "And, well, this one's for you. Always you."
    }
];


// ==========================================
// SHOW GIFT SECTION
// ==========================================

function showGiftSection() {
    if (!birthdayAnimation || !giftSection) return;

    birthdayAnimation.classList.add("hidden");
    giftSection.classList.remove("hidden");

    giftSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (terminalStatus) {
        terminalStatus.textContent =
            "A FEW MORE SURPRISES UNLOCKED.";
    }
}

if (continueGiftsButton) {
    continueGiftsButton.addEventListener("click", showGiftSection);
}


// ==========================================
// GIFT BOX: FIVE CLICKS
// ==========================================

if (giftBoxButton && giftBoxCount && giftReveal) {
    giftBoxButton.addEventListener("click", () => {
        if (giftClicks >= giftClicksNeeded) return;

        giftClicks++;

        giftBoxCount.textContent =
            `${giftClicks} / ${giftClicksNeeded}`;

        giftBoxButton.classList.add("opening");

        if (giftClicks < giftClicksNeeded) {
            if (giftInstruction) {
                giftInstruction.textContent =
                    `almost there... ${giftClicksNeeded - giftClicks} more taps!`;
            }

            return;
        }

        giftBoxButton.disabled = true;

        if (giftInstruction) {
            giftInstruction.textContent =
                "opening your little surprise... ♡";
        }

        setTimeout(() => {
            giftBoxButton.classList.add("hidden");
            giftReveal.classList.remove("hidden");

            if (giftInstruction) {
                giftInstruction.textContent =
                    "a little something for you ♡";
            }

            if (terminalStatus) {
                terminalStatus.textContent =
                    "GIFTS UNLOCKED. OPEN YOUR MIXTAPE.";
            }

            giftReveal.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 700);
    });
}


// ==========================================
// SELECT A SONG
// ==========================================

function selectSong(index, shouldPlay = false) {
    if (!mixtapeAudio || !mixtapeSongs.length) return;

    currentSongIndex =
        (index + mixtapeSongs.length) % mixtapeSongs.length;

    const song = mixtapeSongs[currentSongIndex];

    if (songTitle) songTitle.textContent = song.title;
    if (songArtist) songArtist.textContent = song.artist;
    if (songNote) songNote.textContent = song.note;

    songItems.forEach((item, itemIndex) => {
        item.classList.toggle(
            "active",
            itemIndex === currentSongIndex
        );
    });

    mixtapeAudio.pause();

    mixtapeAudio.src = `./${song.file}`;
    mixtapeAudio.load();

    if (playSongButton) {
        playSongButton.textContent = "PLAY ▶";
    }

    if (audioStatus) {
        audioStatus.textContent =
            `selected: ${song.title} — press play ♡`;
    }

    if (shouldPlay) {
        playCurrentSong();
    }
}


// ==========================================
// PLAY CURRENT SONG
// ==========================================

async function playCurrentSong() {
    if (!mixtapeAudio) return;

    // Pause background music while a mixtape song is playing.
    if (backgroundMusic && !backgroundMusic.paused) {
        backgroundWasPlaying = true;
        backgroundMusic.pause();
    }

    try {
        await mixtapeAudio.play();

        if (playSongButton) {
            playSongButton.textContent = "PAUSEⅡ";
        }

        if (audioStatus) {
            audioStatus.textContent =
                `now playing: ${mixtapeSongs[currentSongIndex].title} ♡`;
        }

    } catch (error) {
        if (playSongButton) {
            playSongButton.textContent = "PLAY ▶";
        }

        if (audioStatus) {
            audioStatus.textContent =
                `couldn't play ${mixtapeSongs[currentSongIndex].file}. Check that the MP3 is uploaded beside index.html.`;
        }

        console.error("Mixtape playback failed:", error);
    }
}


// ==========================================
// PAUSE CURRENT SONG
// ==========================================

function pauseCurrentSong() {
    if (!mixtapeAudio) return;

    mixtapeAudio.pause();

    if (playSongButton) {
        playSongButton.textContent = "PLAY ▶";
    }

    if (audioStatus) {
        audioStatus.textContent = "paused ♡";
    }
}


// ==========================================
// OPEN MIXTAPE PLAYER
// ==========================================

function openMixtape() {
    if (!mixtapePlayer) return;

    backgroundWasPlaying =
        Boolean(backgroundMusic && !backgroundMusic.paused);

    mixtapePlayer.classList.remove("hidden");

    mixtapePlayer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (terminalStatus) {
        terminalStatus.textContent =
            "MIXTAPE PLAYER OPENED.";
    }
}


// ==========================================
// CLOSE MIXTAPE PLAYER
// ==========================================

function closeMixtape() {
    if (mixtapeAudio) {
        mixtapeAudio.pause();
    }

    if (mixtapePlayer) {
        mixtapePlayer.classList.add("hidden");
    }

    if (playSongButton) {
        playSongButton.textContent = "PLAY ▶";
    }

    // Resume the original background music if it was playing before.
    if (backgroundWasPlaying && backgroundMusic) {
        backgroundMusic.play().catch((error) => {
            console.error(
                "Background music could not resume:",
                error
            );
        });
    }

    if (audioStatus) {
        audioStatus.textContent =
            "choose a song below to begin.";
    }

    if (terminalStatus) {
        terminalStatus.textContent =
            "BACK TO YOUR GIFTS.";
    }
}


// ==========================================
// MIXTAPE BUTTON LISTENERS
// ==========================================

if (mixtapeOpenButton) {
    mixtapeOpenButton.addEventListener("click", openMixtape);
}

if (closeMixtapeButton) {
    closeMixtapeButton.addEventListener("click", closeMixtape);
}


// ==========================================
// PLAY / PAUSE BUTTON
// ==========================================

if (playSongButton) {
    playSongButton.addEventListener("click", () => {
        if (!mixtapeAudio) return;

        if (mixtapeAudio.paused) {
            playCurrentSong();
        } else {
            pauseCurrentSong();
        }
    });
}


// ==========================================
// PREVIOUS SONG
// ==========================================

if (previousSongButton) {
    previousSongButton.addEventListener("click", () => {
        selectSong(currentSongIndex - 1, true);
    });
}


// ==========================================
// NEXT SONG
// ==========================================

if (nextSongButton) {
    nextSongButton.addEventListener("click", () => {
        selectSong(currentSongIndex + 1, true);
    });
}


// ==========================================
// SELECT SONG FROM LIST
// ==========================================

songItems.forEach((item) => {
    item.addEventListener("click", () => {
        const selectedIndex = Number(item.dataset.song);

        if (
            Number.isInteger(selectedIndex) &&
            mixtapeSongs[selectedIndex]
        ) {
            selectSong(selectedIndex, true);
        }
    });
});


// ==========================================
// AUTOMATICALLY PLAY NEXT SONG
// ==========================================

if (mixtapeAudio) {
    mixtapeAudio.addEventListener("ended", () => {
        selectSong(currentSongIndex + 1, true);
    });

    mixtapeAudio.addEventListener("error", () => {
        if (audioStatus) {
            audioStatus.textContent =
                `audio file not found: ${mixtapeSongs[currentSongIndex].file}. Make sure it is uploaded beside index.html.`;
        }

        console.error(
            "Mixtape audio error:",
            mixtapeAudio.error
        );
    });
}


// ==========================================
// PREPARE FIRST SONG
// ==========================================

if (mixtapeAudio && songTitle && songArtist && songNote) {
    selectSong(0, false);
}

console.log("MAHALNISAMSIKAZ script loaded successfully.");
