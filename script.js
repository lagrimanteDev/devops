// Menu mobile toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Fecha o menu ao clicar em um link (mobile)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Ano dinâmico no footer
const anoEl = document.getElementById('ano');
if (anoEl) {
  anoEl.textContent = new Date().getFullYear();
}

// Envio simples do formulário de contato (sem backend)
const contatoForm = document.getElementById('contato-form');
if (contatoForm) {
  contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Conta solicitada! Em instantes você recebe o link de acesso e o bônus de boas-vindas no seu e-mail.');
    contatoForm.reset();
  });
}

// Simula a atualização das odds em tempo real nos cards de eventos
const odds = document.querySelectorAll('.evento-card .odd');

if (odds.length) {
  const atualizarOdds = () => {
    odds.forEach((odd) => {
      const base = parseFloat(odd.dataset.odd || odd.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
      odd.dataset.odd = base;
      const variacao = (Math.random() * 0.2 - 0.1);
      const novoValor = Math.min(Math.max(base + variacao, 1.05), 9.99);
      odd.textContent = `Odd ${novoValor.toFixed(2)}`;
    });
  };

  setInterval(atualizarOdds, 6000);
}
