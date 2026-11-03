const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus = document.getElementById("terminal-status");

const nextInteraction = document.getElementById("next-interaction");
const nextYes = document.getElementById("next-yes");
const nextNo = document.getElementById("next-no");

const finalReveal = document.getElementById("final-reveal");
const finalMessageText = document.getElementById("final-message-text");

let isTyping = false;

const finalMessage = `Hi, Kaz.

I made this little experience because I wanted to do something different for you.

Every line of code, every little detail, and every interaction was made by me.

I'm still learning, but I wanted to make something that you could experience yourself.

Thank you for being here.

— Sam`;

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

function startExperience(choice) {
    if (isTyping) return;

    yesButton.disabled = true;
    noButton.disabled = true;

    terminalStatus.textContent = `User response received: ${choice}`;
    response.innerHTML = "";

    const messages = choice === "YES"
        ? [
            { text: "[SYSTEM] Access granted.", color: "#55b9ff" },
            { text: "Hello, Kaz.", color: "#65e6a5" },
            { text: "I was hoping you'd say yes." },
            { text: "Let's continue..." }
        ]
        : [
            { text: "[SYSTEM] Request received.", color: "#55b9ff" },
            { text: "That's okay, Kaz.", color: "#65e6a5" },
            { text: "Take your time." },
            { text: "Let's continue whenever you're ready." }
        ];

    typeMessages(messages, 0, () => {
        setTimeout(() => {
            nextInteraction.classList.remove("hidden");
            terminalStatus.textContent = "Awaiting next response...";
        }, 700);
    });
}

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
            { text: "Okay, one more thing.", color: "#65e6a5" },
            { text: "I made all of this myself." },
            { text: "And I have something to show you." }
        ]
        : [
            { text: "[SYSTEM] Response saved.", color: "#55b9ff" },
            { text: "No pressure, Kaz.", color: "#65e6a5" },
            { text: "I still have something to show you." }
        ];

    typeMessages(messages, 0, () => {
        setTimeout(() => {
            finalReveal.classList.remove("hidden");

            typeText(
                finalMessageText,
                finalMessage,
                35,
                () => {
                    terminalStatus.textContent = "TRANSMISSION COMPLETE.";
                }
            );
        }, 900);
    });
}

yesButton.addEventListener("click", () => startExperience("YES"));
noButton.addEventListener("click", () => startExperience("NO"));

nextYes.addEventListener("click", () => handleNextChoice("YES"));
nextNo.addEventListener("click", () => handleNextChoice("NO"));
