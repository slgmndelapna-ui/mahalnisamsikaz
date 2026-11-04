
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus = document.getElementById("terminal-status");

const nextInteraction = document.getElementById("next-interaction");
const nextYes = document.getElementById("next-yes");
const nextNo = document.getElementById("next-no");

const finalReveal = document.getElementById("final-reveal");
const finalMessageText = document.getElementById("final-message-text");

const mainWorkspace = document.getElementById("main-workspace");
const birthdayStage = document.getElementById("birthday-stage");
const openPrompt = document.getElementById("open-prompt");
const openYes = document.getElementById("open-yes");
const openNo = document.getElementById("open-no");
const openNote = document.getElementById("open-note");
const birthdayAnimation = document.getElementById("birthday-animation");
const replayBirthday = document.getElementById("replay-birthday");
const birthdayBow = document.querySelector(".bow");

let isTyping = false;
let noAttempts = 0;
let openNoAttempts = 0;
let bowIsBeingPulled = false;
let bowStartX = 0;
let pullDistance = 0;
let surpriseStarted = false;

const attemptsBeforeDisappearing = 5;

const finalMessage = `hi palangga.

i've been diarying'ed whatever sa notes ko so i'll just copy paste.

and also every line of code, every little detail, and every interaction was made by me.

im still learning, but I wanted to make something that you could experience yourself.

thx for op'ning diz

"yes i do like you because you're gorgeous, but girl?

talking to you makes me happy because someone actually tries to actually understand my kabaliwan

and you do sometimes get annoyed by it but its genuinely so cute seeing you annoyed, baby

and also having you comfortable with me talking abt anything makes me fall deeper 'cuz ganon basta boom

it makes me feel special ba, ive been wanting to send you actual flowers and a gift for your bday

but im not really good with these stuff and im scared hehe, just know that its a sign na love na love kita, babybybyby

YES IM REALLY HALATA but thats because im unexperienced with these stufff, like i wanna go over sa over

we mightve never seen each other like physically but i already want to give you everything.

lahat ng 11:11, shooting stars, and stuff i wished for you, for us to last, baby :(

and i keep falling for you ket sa simpleng paguusap lang natin, i really like talking to you

ive liked you for 2 months pa lang and im determined for us to last frfr

i love the way we banter and the way you would tell me or even remind me about the right things i should and could do

kasi pamilya ko di ko sinusunod pero misis ko oo, im really happy that i met you, langga.

and im hoping ill get to know you better so i can keep falling in love over and over again (over guys mb)

i really think you have a special place in my heart, i wish we'd still be close after many years.

yun lang, hafi happy haps birthday, baby ko.
`;

/* FIRST NO BUTTON */

function dodgeNoButton() {
    if (isTyping || noButton.classList.contains("vanished")) return;

    noAttempts++;

    if (noAttempts >= attemptsBeforeDisappearing) {
        noButton.classList.add("vanished");
        terminalStatus.textContent = "NO OPTION NOT FOUND.";
        return;
    }

    noButton.classList.add("dodging");

    const padding = 25;
    const maxX = Math.max(padding, window.innerWidth - noButton.offsetWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - noButton.offsetHeight - padding);

    noButton.style.left = `${padding + Math.random() * (maxX - padding)}px`;
    noButton.style.top = `${padding + Math.random() * (maxY - padding)}px`;

    terminalStatus.textContent = `NO OPTION ESCAPED: ${noAttempts}/${attemptsBeforeDisappearing}`;
}

noButton.addEventListener("mouseenter", dodgeNoButton);

noButton.addEventListener("click", (event) => {
    event.preventDefault();
    dodgeNoButton();
});

noButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    dodgeNoButton();
}, { passive: false });

/* TYPING EFFECTS */

function typeText(element, text, speed = 35, callback = null) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        } else {
            isTyping = false;
        }
    }

    isTyping = true;
    element.textContent = "";
    type();
}

function typeMessages(messages, index = 0, callback = null) {
    if (index >= messages.length) {
        isTyping = false;
        if (callback) callback();
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

/* FIRST INTERACTION */

function startExperience(choice) {
    if (isTyping) return;

    yesButton.disabled = true;
    noButton.disabled = true;

    terminalStatus.textContent = `User response received: ${choice}`;
    response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            { text: "[SYSTEM] Access granted.", color: "#55b9ff" },
            { text: "hi, langga.", color: "#65e6a5" },
            { text: "u probably obviously chose yes." },
            { text: "oke proceed pls" }
        ]
        : [
            { text: "[SYSTEM] Request received.", color: "#55b9ff" },
            { text: "ay, no worries, bebe.", color: "#65e6a5" },
            { text: "refresh mo whenever ur'e ready" },
            { text: "let's continue whenever you're ready" }
        ];

    typeMessages(messages, 0, () => {
        setTimeout(() => {
            nextInteraction.classList.remove("hidden");
            terminalStatus.textContent = "Awaiting next response...";
        }, 700);
    });
}

/* SECOND INTERACTION */

function handleNextChoice(choice) {
    if (isTyping) return;

    nextYes.disabled = true;
    nextNo.disabled = true;

    nextInteraction.classList.add("hidden");
    terminalStatus.textContent = `Second response received: ${choice}`;
    response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            { text: "[SYSTEM] Continuing sequence...", color: "#55b9ff" },
            { text: "last one na", color: "#65e6a5" },
            { text: "im so proud of this" },
            { text: "zo here's a letter for you" }
        ]
        : [
            { text: "[SYSTEM] Response saved.", color: "#55b9ff" },
            { text: ":((((", color: "#65e6a5" },
            { text: "anyways" }
        ];

    typeMessages(messages, 0, () => {
        setTimeout(() => {
            finalReveal.classList.remove("hidden");

            typeText(finalMessageText, finalMessage, 35, () => {
                terminalStatus.textContent = "TRANSMISSION COMPLETE.";
                setTimeout(showOpenPrompt, 1400);
            });
        }, 900);
    });
}

/* BIRTHDAY SCREEN */

function showOpenPrompt() {
    mainWorkspace.classList.add("workspace-fade-out");

    setTimeout(() => {
        mainWorkspace.classList.add("hidden");
        birthdayStage.classList.remove("hidden");

        requestAnimationFrame(() => {
            birthdayStage.classList.add("stage-visible");
        });
    }, 1100);
}

/* CAKE SURPRISE NO BUTTON */

function dodgeCakeNoButton() {
    if (openNo.classList.contains("vanished")) return;

    openNoAttempts++;

    if (openNoAttempts >= attemptsBeforeDisappearing) {
        openNo.classList.add("vanished");
        openNote.textContent = "NO OPTION NOT FOUND. hehe ♡";
        return;
    }

    openNo.classList.add("dodging");

    const padding = 25;
    const maxX = Math.max(padding, window.innerWidth - openNo.offsetWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - openNo.offsetHeight - padding);

    openNo.style.left = `${padding + Math.random() * (maxX - padding)}px`;
    openNo.style.top = `${padding + Math.random() * (maxY - padding)}px`;
}

openNo.addEventListener("mouseenter", dodgeCakeNoButton);

openNo.addEventListener("click", (event) => {
    event.preventDefault();
    dodgeCakeNoButton();
});

openNo.addEventListener("touchstart", (event) => {
    event.preventDefault();
    dodgeCakeNoButton();
}, { passive: false });

/* START BIRTHDAY SURPRISE */

function startBirthdayAnimation() {
    openPrompt.classList.add("hidden");
    birthdayAnimation.classList.remove("hidden");

    birthdayAnimation.classList.remove("play");
    birthdayAnimation.classList.remove("shot");

    birthdayBow.classList.remove("pulling", "shot");
    birthdayBow.style.removeProperty("--pull-distance");

    surpriseStarted = false;
    bowIsBeingPulled = false;
    pullDistance = 0;

    terminalStatus.textContent = "PULL THE BOW TO BEGIN. ♡";
}

/* INTERACTIVE BOW */

birthdayBow.addEventListener("pointerdown", (event) => {
    if (surpriseStarted) return;

    event.preventDefault();

    bowIsBeingPulled = true;
    bowStartX = event.clientX;
    pullDistance = 0;

    birthdayBow.classList.add("pulling");
    birthdayBow.setPointerCapture(event.pointerId);

    terminalStatus.textContent = "PULL BACK TO AIM AT THE HEART. ♡";
});

birthdayBow.addEventListener("pointermove", (event) => {
    if (!bowIsBeingPulled) return;

    const distance = Math.max(0, Math.min(65, bowStartX - event.clientX));

    pullDistance = distance;
    birthdayBow.style.setProperty("--pull-distance", `${distance}px`);
});

birthdayBow.addEventListener("pointerup", () => {
    if (!bowIsBeingPulled) return;

    bowIsBeingPulled = false;

    birthdayBow.classList.remove("pulling");

    if (pullDistance < 15) {
        birthdayBow.style.removeProperty("--pull-distance");
        terminalStatus.textContent = "PULL A LITTLE FURTHER. ♡";
        return;
    }

    if (surpriseStarted) return;

    surpriseStarted = true;

    birthdayBow.classList.add("shot");
    terminalStatus.textContent = "THE HEART HAS BEEN HIT! ♡";

    const arrow = birthdayBow.querySelector(".arrow");

    arrow.addEventListener("animationend", function onArrowHit(event) {
        if (event.animationName !== "shoot-to-heart") return;

        arrow.removeEventListener("animationend", onArrowHit);

        birthdayAnimation.classList.add("play");
        terminalStatus.textContent = "CHOCOLATE CAKE UNLOCKED!";
    });
});

birthdayBow.addEventListener("pointercancel", () => {
    bowIsBeingPulled = false;
    birthdayBow.classList.remove("pulling");
    birthdayBow.style.removeProperty("--pull-distance");
});

/* REPLAY */

function replaySurprise() {
    birthdayAnimation.classList.remove("play");
    birthdayAnimation.classList.add("hidden");

    openPrompt.classList.remove("hidden");
    openNote.textContent = "one more time? ♡";

    openNo.classList.remove("vanished", "dodging");
    openNo.style.left = "";
    openNo.style.top = "";
    openNoAttempts = 0;

    surpriseStarted = false;
    birthdayBow.classList.remove("shot", "pulling");
    birthdayBow.style.removeProperty("--pull-distance");
}

/* BUTTON EVENTS */

yesButton.addEventListener("click", () => startExperience("YES"));

nextYes.addEventListener("click", () => handleNextChoice("YES"));
nextNo.addEventListener("click", () => handleNextChoice("NO"));

openYes.addEventListener("click", startBirthdayAnimation);
replayBirthday.addEventListener("click", replaySurprise);
