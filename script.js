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

and i also hope that one day, i can gift you everything youll ever want and make you happy. i love you so much, bebe

i really think you have a special place in my heart, i wish we'd still be close after many years.

yun lang, hafi happy haps birthday, baby ko.

`;function typeText(element, text, speed = 35, callback = null) {
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
