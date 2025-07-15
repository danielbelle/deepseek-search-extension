# DeepSeek Search Extension

Esta extensão permite pesquisar rapidamente no DeepSeek diretamente do Chrome,
com interface moderna, responsiva e modo escuro automático.

## Funcionalidades

- Abre o DeepSeek em uma nova aba e insere a pesquisa automaticamente.
- Interface elegante, responsiva e adaptada ao modo claro/escuro do sistema.
- Ícone personalizado.
- Segurança reforçada: permissões mínimas, sanitização de dados e sem
  dependências externas.

## Tecnologias Utilizadas

- **HTML5** e **CSS3** (customizado, sem frameworks externos)
- **JavaScript** puro (popup e background)
- **Manifest V3** para extensões Chrome

## Estrutura dos Arquivos

- `manifest.json` — Configuração da extensão e permissões.
- `popup.html` — Interface do popup.
- `style.css` — Estilos customizados, com variáveis para temas claro/escuro.
- `popup.js` — Lógica do popup (envio da pesquisa).
- `background.js` — Lógica de automação na aba do DeepSeek.
- `icon.png` — Ícone da extensão.

## Como instalar e testar

1. Clone ou baixe este repositório.
2. Acesse `chrome://extensions/` no Chrome.
3. Ative o **Modo de desenvolvedor**.
4. Clique em **Carregar sem compactação** e selecione a pasta do projeto.
5. O ícone da extensão aparecerá na barra do Chrome.

## Como funciona

- O usuário digita a pesquisa no popup e clica em "Buscar no DeepSeek" (ou
  pressiona Enter).
- O background abre uma nova aba no DeepSeek, simula cliques e insere o texto no
  campo de pesquisa.
- O botão de envio é clicado automaticamente.
- O modo escuro/claro é definido pelo sistema do usuário.

## Segurança

- Permissões mínimas no manifest.
- Nenhum dado sensível é armazenado.
- Sanitização de texto antes de inserir no site.
- Sem uso de `eval`, `innerHTML` ou scripts remotos.

## Personalização

- As cores e estilos podem ser ajustados facilmente via `style.css` usando as
  variáveis no `:root`.
- O ícone pode ser trocado por outro PNG nas dimensões recomendadas (16, 32, 48,
  128px).

## Contribuição

Pull requests são bem-vindos!  
Sugestões, melhorias e correções podem ser enviadas via issues ou PR.

---

Desenvolvido
