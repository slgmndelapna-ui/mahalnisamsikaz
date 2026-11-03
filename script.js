const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus = document.getElementById("terminal-status");

const nextInteraction = document.getElementById("next-interaction");
const nextQuestion = document.getElementById("next-question");
const nextSubtitle = document.getElementById("next-subtitle");
const nextYes = document.getElementById("next-yes");
const nextNo = document.getElementById("next-no");

let isTyping = false;

function typeMessage(lines, index = 0, onComplete = null) {
    if (index >= lines.length) {
        isTyping = false;
        if (onComplete) onComplete();
        return;
    }

    isTyping = true;

    const line = document.createElement("p");
    line.style.marginBottom = "10px";

    if (lines[index].color) {
        line.style.color = lines[index].color;
    }

    response.appendChild(line);

    let character = 0;

    function typeCharacter() {
        if (character < lines[index].text.length) {
            line.textContent += lines[index].text.charAt(character);
            character++;
            setTimeout(typeCharacter, 35);
        } else {
            setTimeout(() => typeMessage(lines, index + 1, onComplete), 350);
        }
    }

    typeCharacter();
}

function startExperience(choice) {
    if (isTyping) return;

    yesButton.disabled = true;
    noButton.disabled = true;

    terminalStatus.textContent = `User response received: ${choice}`;
    response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            { text: "[SYSTEM] Access granted.", color: "#55b9ff" },
            { text: "hi baby.", color: "#65e6a5" },
            { text: "hafi birthday." },
            { text: "go by cortis." }
        ]
        : [
            { text: "[SYSTEM] Request received.", color: "#55b9ff" },
            { text: "sana naki-kiss kita rn.", color: "#65e6a5" },
            { text: "anw time your take." },
            { text: "here lang me." }
        ];

    typeMessage(messages, 0, () => {
        setTimeout(() => {
            nextInteraction.classList.remove("hidden");
            terminalStatus.textContent = "Waiting for next response...";
        }, 700);
    });
}

function handleNextChoice(choice) {
    if (isTyping) return;

    nextYes.disabled = true;
    nextNo.disabled = true;

    terminalStatus.textContent = `Second response received: ${choice}`;

    nextInteraction.classList.add("hidden");
    response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            { text: "[SYSTEM] Continuing sequence...", color: "#55b9ff" },
            { text: "i love my wife sm guys.", color: "#65e6a5" },
            { text: "I made all of this myself" },
            { text: "kiss lang kapalit" }
        ]
        : [
            { text: "[SYSTEM] Response saved.", color: "#55b9ff" },
            { text: "flis", color: "#65e6a5" },
            { text: "miss ko na talaga baby ko" },
            { text: "look mo" }
        ];

    typeMessage(messages, 0, () => {
        terminalStatus.textContent = "Second sequence completed.";
    });
}

yesButton.addEventListener("click", () => startExperience("YES"));
noButton.addEventListener("click", () => startExperience("NO"));

nextYes.addEventListener("click", () => handleNextChoice("YES"));
nextNo.addEventListener("click", () => handleNextChoice("NO"));
