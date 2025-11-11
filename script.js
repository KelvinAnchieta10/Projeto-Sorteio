// Som do sorteio (ajuste o caminho se precisar)
const somSorteio = new Audio("./assets/som-sorteio.mp3");

// Elementos (use IDs para evitar ambiguidade)
const btn = document.getElementById("btnSortear");
const inputMin = document.getElementById("min");
const inputMax = document.getElementById("max");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", () => {
  // limpa estados anteriores
  resultado.classList.remove("sorteado", "show");

  const min = parseInt(inputMin.value, 10);
  const max = parseInt(inputMax.value, 10);

  // validações
  if (isNaN(min) || isNaN(max)) {
    resultado.textContent = "⚠️ Digite os dois números!";
    resultado.classList.add("show");
    return;
  }

  if (min >= max) {
    resultado.textContent = "⚠️ O mínimo precisa ser menor que o máximo!";
    resultado.classList.add("show");
    return;
  }

  // feedback de processamento
  resultado.textContent = "🎲 Sorteando...";
  resultado.classList.add("show");

  // suspense curto e sorteio
  setTimeout(() => {
    const sorteado = Math.floor(Math.random() * (max - min + 1)) + min;

    // toca o som com tratamento (evita erro de promise)
    try {
      somSorteio.currentTime = 0;
      const p = somSorteio.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {/* ignore se o navegador bloquear */});
      }
    } catch (_) {}

    resultado.textContent = `Número sorteado: ${sorteado}`;
    resultado.classList.add("sorteado");
  }, 800);
});
