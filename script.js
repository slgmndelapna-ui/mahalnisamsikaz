const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus = document.getElementById("terminal-status");
let istyping... = false;
function type message(lines, index = 0) {
if (index >= lines.length) {
  is typing = false;
  return;
}
  istyping = true;
  const line = document.createElement("p");
  line.style.marginBottom = 10px ;
  if (lines[index].color) {
      lines.style.color = lines[index].color;
  }
  response.appendChild(line);
  let character = 0;
  function type Character() {
    if (character < lines[index].text.length) {
        line.textContent += lines[index].text.charAt(character);
        character++;
        setTimeout(typeCharacter, 35);
    } else {
        setTimeout(() => typeMessage(lines, index + 1), 350);
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
        { text: "[SYSTEM] Access granted. ", color: "#55b9ff" },
        { text: "hihihi baby, color "#65e6a5" },
        { text: "you obviously probably chose yes" },
        { text: "mwamwa" }
      ]
      : [
        { text: "[SYSTEM] Request received.", color: "#55b9ff" },
        { text: "Go by Cortis", color: "#65e6a5" },
        { text: "time your take bebe" },
      ];
  typeMessage(messages);
}
yesButton.addEventListener("click", () => {
  startExperience("YES");
});
noButton.addEventListener("click", () => {
  startExperience("NO");
});
