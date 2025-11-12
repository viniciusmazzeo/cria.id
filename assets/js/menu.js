// --- Mobile menu acessível ---
  (function () {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('mobileNav');

    function toggleMenu(force) {
      const isOpen = typeof force === 'boolean' ? !force : nav.classList.contains('hidden');
      nav.classList.toggle('hidden', !isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      if (isOpen) {
        // Foca no primeiro item quando abre
        const firstItem = nav.querySelector('a, button');
        firstItem && firstItem.focus();
      } else {
        btn.focus();
      }
    }

    btn.addEventListener('click', () => toggleMenu());

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  })();

  // --- Dark mode com persistência (usa estratégia 'class' do Tailwind) ---
  (function () {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const storageKey = 'criaid-theme';

    function applyTheme(theme) {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.classList.toggle('dark', isDark);
      btn?.setAttribute('aria-pressed', String(isDark));
    }

    function getInitialTheme() {
      return localStorage.getItem(storageKey) || 'system';
    }

    // Inicializa
    applyTheme(getInitialTheme());

    // Reage à mudança do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if ((localStorage.getItem(storageKey) || 'system') === 'system') applyTheme('system');
    });

    // Toggle manual
    btn?.addEventListener('click', () => {
      const current = localStorage.getItem(storageKey) || 'system';
      const next = (current === 'dark') ? 'light' : (current === 'light' ? 'system' : 'dark');
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  })();
</script>