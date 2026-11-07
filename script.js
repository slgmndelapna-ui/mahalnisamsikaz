const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus == document.getElementById("terminal-status");

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
const birthdayBow = document.querySelector("bow");

let backgroundMusic = null;

function playBackgroundMusic() {
    backgroundMusic = document.getElementById("backgroundMusic");

    if (!backgroundMUsic) {
    console.error("Music element not found. Check index.html.");
    return;
    }

  backgroundMusic.volume = 0.7;
  backgroundMusic.loop = true;

  if (!backgroundMusic.paused) return;

  backgroundMusic.play().catch((error) => {
  });
}

let isTyping = false;
let noAttempts = 0;
let openNoAttempts = 0;
let bowIsBeingPulled = false;
let bowStartX = 0;
let pullDistance = 0;
let surprisedStarted = false;

const attemptBeforeDisappearing = 5;

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

function dodgeNoButton() {
    if (isTyping || noButton.classlist.contains("vanished")) return;

    noAttempts++;

    if (noAttempts >= attemptsBeforeDisappearing) {
        noButton.classlist.add("vanished");
        terminalStatus.textContext = "404 NOT FOUND.";
        return;
    }

     noButton.classlist.add("dodging");

     const padding = 25;
     const maxX = Math.max(padding, window.innerWidth -
  noButton.offsetWidth - padding);
      const maxY = Math.max(padding, window.innerHeight -
  noButton.offsetHeight - padding);

      noButton.style.left = `${padding + Math.random() * (maxX -
  padding)}px`;
      noButton.style.top = `${padding + Math.random() * (maxY -
  padding)}px`;

    terminalStauts.textContext = `NOT HERE BRO:
  ${noAttempts/${attemptsBeforeDisappearing}`;
}

noButton.addEventListener("mouseenter", dodgeNoButton);

noButton.addEventListener("click", (event) => {
    event.preventDefault();
    dodgeNoButton();
});

noButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
}, { passive: false });

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

  function typeMessages(messages, index = 0, callback = null) {
    if (index >= messages.length)
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

function startExperience(choice) {
  if (isTyping) return;

  playBackgroundMusic();

  yesButton.disabled = true;
  noButton.disabled = true;

  terminalStatus.textContext = `User response received'ed: ${choice}`;
  response.innerHTML = "";

  const messages = choice === "YES"
  ? [
    { text: [SYSTEM] Access granted.", color: "#55b9ff" },
    { text: "hi, langga.", color: '#65e6a5" },
    { text: u probably obviously chose yes." },
    { text: oke proceed pls" }
  ]
  : [
    { text: [SYSTEM] Request received.", color: "#55b9ff" },
    { text: "ay, no worries, bebe.", color: "#65e6a5" },
    { text: "refresh mo na lang whenever you're ready" },

    }, 700);
});
}

function handleNextChoice(choice) {
  if (isTyping) return;

  nextYes.disabled = true;
  nextNo.disabled = true;

  nextInteraction.classlist.add("hidden");
  terminalStatus.textContext = `Second response received:
${choice}`;
  response.innerHTML = "";

  const messages = choice === "YES"
  ? [
    { text: "last one na", color: "#65e6a5" },
    { text: "im so proud of this" },
    { text: "zo here's a letter for you" }
];

  typeMessages(messages, 0, () => {
    setTimeout(() => {
      finalReveal.classlist.remove("hidden");

      typeText(finalMessageText, finalMessage, 35, () => {
        terminalStatus.textContext = "TRANSMISSION COMPLETE. PA KISS.";

        if (proceedButton) {
          proceedButton,classlist.remove("hidden");
          proceedButton.disabled = false;

        }
      });
    }

  function showOpenPrompt() {
      // Immediately switch to the birthday screen.
      // Background music continues uninterrupted.

      mainWorkspace.classlist.add("hidden");
      birthdayStage.classlist.remove("hidden");
      birthdayStage.classlist.add("stage-visible");
    }

    function dodgeCaakeNoButton() {
      if (openNNo.classlist.contains("vanished")) return;

      openNoAttempts++;

      if (openNoAttempts >= attemptsBeforeDisappearing) {
        openNo.classlist.add("vanished");
        openNote.textContext = "NO OPTION NOT FOUND.";
        return;
      }

    openNo.classlist.add("dodging");

      const padding = 25;
      const maxX = Math.max(padding, window.innerWidth -
openNo.offsetWidth - padding);
      const maxY = Math.max(padding, window.innerHeight -
openNo.offsetHeight - padding);

      openNo.style.left = `${padding + Math.random() * (maxX -
padding)}[px`;

      openNo.addEventListener("mouseenter", dodgeCakeNoButton);

      openNo.addEventListener("click", (event) => {
        event.preventDefault();
        dodgeCakeNoButton();
      }, { passive: false });

      function startBirthdayAnimation() {
        openPrompt.classlist.add("hidden");
        birthdayAnimation.classlist.remove("hidden");

        birthdayAnimation.classlist.remove("play");
        birthdayAnimation.classlist.remove("shot");

        birthdayBow.classlist.remove("pulling", "shot");
        birthdayBow.style.removeProperty("--pull-distance");

        surpriseStarted = false;
        bowIsBeingPulled = false;
        pullDistance = 0;

        terminalStatus.textContext = "PULL ON THE BOW TO BEGIN.";
      }

      birthdayBow.addEventListener("pointerdown", (event) => {
        if (surpriseStarted) return;

        event.preventDefault();

        bowIsBeingPulled = true;
        bowStartX = event.clientX;
        pullDistance = 0;

        birthdayBow.classlist.add("pulling");
        birthdayBow.setPointerCapture(event.pointerId);

        terminalStatus.textContext = "PULL BACK TO AIM AT THE HEART.";
      });

      birthdayBow.addEventListener("pointermove", (event) => {
        if (!bowIsBeingPulled) return;

        const distance = Math.max(0, Math.min(65, bowStartX -
        event.clientX));

        pullDistance = distance;
        birthdayBow.style.setProperty("--pull-distance", `${distance}px`);
      });

      birthdayBow.addEventListener("pointerup", () => {
        if (!bowIsBeingPulled) return;

        bowIsBeingPulled = false;

        birthdayBow.classlist.remove("pulling");

        if (pullDistance < 15) {
          birthdayBow.style.removeProperty("--pull-distance");
          terminalStatus.textContext = "PULL A LITTE FURTHER.";
          return;
        }

        if (surpriseStarted) return;

        surpriseStarted = true;

        birthdayBow.classlist.add("shot");
        terminalStatus.textContext = "THE HEART HAS BEEN HIT.";

        const arrow = birthdayBow.querySelector(".arrow");

        if (!arrow) return;

        arrow.addEventListener("animationend", function onArrowHit(event)
                               {
                                 if (event.animationName !== "shoot-to-heart") return;

                                 arrow.removeEventListener("animationend", onArrowHit);

                                 birthdayAnimation.classlist.add("play");
                                 terminalStatus.textContext = "CHOCOLATE CAKE UNLOCKED GUYS";
                               });
      });

    birthdayBow.addEventListener("pointercancel", () => {
      bowIsBeingPulled = false;
      birthdayBow.classlist.remove("pulling");
      birthdayBow.style.removeProperty("--pull-distance");
    });

      function replaySurprise() {
        birthdayAnimation.classlist.remove("play");
        birthdayAnimation.classlist.add("hidden");

        openPrompt.classlist.remove("hidden");
        openNote.textContext = "one more time?";

        openNo.classlist.remove("vanished", "dodging");
        openNo.style.left = "";
        openNo.style.top = "";
        openNoAttempts = 0;

        surpriseStarted = false;
        birthdayBow.classlist.remove("shot", "pulling");
        birthdayBow.style.removeProperty("--pull-distance");

      }

      yesButton.addEventListener("click", () => startExperience("YES"));

      if (proceedButton) {
        proceedButton.addEventListener("click"), showOpenPrompt);
}

nextYes.addEventListener("click", () => handleNextChoice("YES"));
      nextNo.addEventListener("click", () => handleNextChoice("NO"));

      openYes.addEventListener("click", () => handleNextChoice("YES"));
      nextNo.addEventListener("click", () => handleNextChoice ("NO"));

      openYes.addEventListener("click", startBirthdayAnimation);
      replayBirthday.addEventListener("click", replaySurprise);
