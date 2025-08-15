let searchQuery = document.getElementById("searchQuery");

function enviarBusca() {
  document.getElementById("errorMessage").textContent = ""; // Limpa mensagens anteriores

  const text = searchQuery.value.slice(0, 500);

  chrome.runtime.sendMessage(
    {
      action: "createDeepSeekTab",
      url: "https://chat.deepseek.com/",
      text: text,
    },
    (response) => {
      if (chrome.runtime.lastError) {
        document.getElementById("errorMessage").textContent =
          "Erro: " + chrome.runtime.lastError.message;
        return;
      }
      if (response && response.error) {
        document.getElementById("errorMessage").textContent =
          "Erro: " + response.error;
      }
    }
  );
}

document.getElementById("searchButton").addEventListener("click", enviarBusca);

searchQuery.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviarBusca();
  }
});

searchQuery.focus();

searchQuery.addEventListener("input", () => {});
