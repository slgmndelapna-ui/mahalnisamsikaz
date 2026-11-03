const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const response = document.getElementById("response");
const terminalStatus = document.getElementById("terminal-status");
yesButton.addEventListener("click", () => {
  terminalStatus.textContent = "User response received: YES";
  response.innerHTML = `
      <br>
      <span style="color: #55b9ff;">[SYSTEM]</span><br>
      Access granted.<br>
      <br>
      <span style="color: #65e6a5;">Hi, baby.</span><br>
      plsplspls pick yes.<br>
      :)))))
      `;
  yesButton.disabled = true;
  noButton.disabled = true;
});
noButton.addEventListener("click", () => {
  terminalStatus.textContent = "User response received: NO";
  response.innerHTML = `
      <br>
      <span style="color: #55b9ff;">[SYSTEM]</span><br>
      Request received.<br>
      <br>
      <span style="color: #65e6a5;">K lang, baby.</span><br>
      :(((((
      `;
});
      
