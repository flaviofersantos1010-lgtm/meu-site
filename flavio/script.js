/* =========================================================
   FlautaFácil — script.js
   JavaScript separado do HTML
   ========================================================= */

/* =========================
   AULAS
========================= */

const aulas = {
  1: {
    titulo: "Aula 1 — Conhecendo a flauta",
    texto:
      "A flauta transversal é normalmente formada por três partes principais: cabeça, corpo e pé. Antes de tocar, aprenda a montar e desmontar o instrumento com cuidado."
  },

  2: {
    titulo: "Aula 2 — Postura",
    texto:
      "Mantenha a coluna confortável, os ombros relaxados e a cabeça em uma posição natural. Evite apertar a flauta excessivamente com as mãos."
  },

  3: {
    titulo: "Aula 3 — Respiração",
    texto:
      "Pratique inspirações tranquilas e depois solte o ar lentamente. O objetivo inicial é aprender a controlar o fluxo de ar."
  },

  4: {
    titulo: "Aula 4 — Primeiras notas",
    texto:
      "Comece produzindo sons longos e estáveis. Não tenha pressa para tocar músicas: primeiro procure desenvolver um som confortável e consistente."
  },

  5: {
    titulo: "Aula 5 — Escalas",
    texto:
      "Depois de conhecer algumas notas, pratique escalas lentamente. Use o metrônomo para manter o ritmo e aumente a velocidade apenas quando estiver confortável."
  }
};

function abrirAula(numero) {
  const aula = aulas[numero];

  if (!aula) return;

  document.getElementById("modalTitulo").textContent = aula.titulo;
  document.getElementById("modalTexto").textContent = aula.texto;
  document.getElementById("modal").style.display = "flex";
}

function fecharAula() {
  document.getElementById("modal").style.display = "none";
}

/* =========================
   PROGRESSO
========================= */

let progresso = 20;

function atualizarProgresso() {
  const barra = document.getElementById("barra");
  const porcentagem = document.getElementById("porcentagem");

  if (barra) {
    barra.style.width = `${progresso}%`;
  }

  if (porcentagem) {
    porcentagem.textContent = `${progresso}%`;
  }
}

function aumentarProgresso() {
  if (progresso < 100) {
    progresso += 20;
  }

  atualizarProgresso();
}

/* =========================
   METRÔNOMO
========================= */

let bpm = 80;
let tocando = false;
let intervalo = null;
let timeoutBeat = null;

function alterarBPM() {
  const bpmRange = document.getElementById("bpmRange");

  if (!bpmRange) return;

  bpm = Number(bpmRange.value);

  const bpmDisplay = document.getElementById("bpm");

  if (bpmDisplay) {
    bpmDisplay.textContent = bpm;
  }

  if (tocando) {
    pararMetronomo();
    iniciarMetronomo();
  }
}

function pulsarBeat() {
  const beat = document.getElementById("beat");

  if (!beat) return;

  beat.classList.add("active");

  clearTimeout(timeoutBeat);

  timeoutBeat = setTimeout(() => {
    beat.classList.remove("active");
  }, 100);
}

function iniciarMetronomo() {
  if (tocando) return;

  tocando = true;

  const botao = document.getElementById("metroButton");

  if (botao) {
    botao.textContent = "⏹ Parar";
  }

  // Primeiro pulso imediato.
  pulsarBeat();

  const tempo = 60000 / bpm;

  intervalo = setInterval(() => {
    pulsarBeat();
  }, tempo);
}

function pararMetronomo() {
  tocando = false;

  clearInterval(intervalo);
  clearTimeout(timeoutBeat);

  intervalo = null;
  timeoutBeat = null;

  const beat = document.getElementById("beat");

  if (beat) {
    beat.classList.remove("active");
  }

  const botao = document.getElementById("metroButton");

  if (botao) {
    botao.textContent = "▶ Iniciar";
  }
}

function alternarMetronomo() {
  if (tocando) {
    pararMetronomo();
  } else {
    iniciarMetronomo();
  }
}

/* =========================
   MODAL
========================= */

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");

  if (modal && event.target === modal) {
    fecharAula();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharAula();
  }
});

/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const bpmRange = document.getElementById("bpmRange");

  if (bpmRange) {
    bpmRange.value = bpm;
  }

  const bpmDisplay = document.getElementById("bpm");

  if (bpmDisplay) {
    bpmDisplay.textContent = bpm;
  }

  atualizarProgresso();
});