let deepSeekTabId = null;
let lastText = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "createDeepSeekTab") {
    lastText = message.text || "";
    chrome.tabs.create({ url: message.url }, (tab) => {
      if (tab && tab.id) {
        deepSeekTabId = tab.id;
        sendResponse({ success: true, tabId: tab.id });
      } else {
        sendResponse({ error: "Não foi possível criar a aba." });
      }
    });
    return true; // resposta assíncrona
  } else {
    sendResponse({ error: "Ação desconhecida." });
  }
});

// Injeta o alerta apenas quando a página terminar de carregar e for o link correto
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Só executa se a URL for exatamente https://chat.deepseek.com/ ou https://chat.deepseek.com
  if (
    !(
      tab.url === "https://chat.deepseek.com/" ||
      tab.url === "https://chat.deepseek.com"
    )
  ) {
    return; // Sai do listener se não for o link desejado
  }

  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      args: [lastText],
      func: (text) => {
        // Sanitize o texto
        text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

        function clickElement(el) {
          if (!el) return;
          const evt = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 0, // Botão esquerdo
          });
          el.dispatchEvent(evt);
        }

        // 1. Encontrar e clicar no elemento com o texto "Hi, I'm DeepSeek."
        const xpath = '//*[contains(text(),"Hi, I\'m DeepSeek.")]';
        const result = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );
        const deepSeekEl = result.singleNodeValue;
        clickElement(deepSeekEl);

        // 2. Após 1 segundo, clicar no elemento com id chat-input e digitar o texto recebido
        setTimeout(() => {
          const chatInput = document.getElementById("chat-input");
          clickElement(chatInput);
          if (chatInput) {
            // Escreve o texto inteiro de uma vez só
            chatInput.value = text;
            chatInput.dispatchEvent(new Event("input", { bubbles: true }));

            // Só clica no botão após definir o valor
            const button = document.querySelector("._7436101");
            if (button) {
              button.click();
            }
          }
        }, 1000);
      },
    });
    lastText = ""; // Limpa após uso
  }
});
