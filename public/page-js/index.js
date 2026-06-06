// ─── NAV SCROLL ───
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
    });

    // ─── PARTICLES ───
    function spawnParticles() {
      const c = document.getElementById('particles');
      for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        const colors = ['#00ffc8', '#b06fff', '#ffb830', '#39ff85', '#ff4060'];
        const col = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 12;
        const dur = 8 + Math.random() * 12;
        p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      background:${col};
      opacity:0.4;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      box-shadow:0 0 ${size * 3}px ${col};
    `;
        c.appendChild(p);
      }
    }
    spawnParticles();

    // ─── PREVIEW BARS ───
    const BAR_HEIGHTS = [30, 55, 20, 70, 45, 85, 15, 60, 35, 80, 25, 65, 40, 90, 50, 75, 10, 95, 38, 62, 48, 73, 18, 88, 42];
    function buildPreviewBars() {
      const el = document.getElementById('previewBars');
      BAR_HEIGHTS.forEach((h, i) => {
        const bar = document.createElement('div');
        bar.className = 'pb';
        bar.style.height = (h / 100 * 110) + 'px';
        bar.style.animationDelay = (i * 0.03) + 's';
        bar.style.background = 'linear-gradient(to top,#1e3050,#2a4a72)';
        el.appendChild(bar);
      });
    }
    buildPreviewBars();

    // animate preview bars continuously
    let previewPhase = 0;
    const previewBars = () => document.querySelectorAll('.pb');
    function animatePreview() {
      const bars = [...previewBars()];
      const n = bars.length;
      previewPhase++;

      if (previewPhase % 3 === 0) {
        const i = Math.floor(Math.random() * n);
        const j = Math.floor(Math.random() * n);
        bars.forEach(b => b.style.background = 'linear-gradient(to top,#1e3050,#2a4a72)');
        bars[i].style.background = 'linear-gradient(to top,#cc8800,#ffb830)';
        bars[j].style.background = 'linear-gradient(to top,#cc1030,#ff4060)';
        setTimeout(() => {
          bars[i].style.background = 'linear-gradient(to top,#1a7a40,#39ff85)';
          bars[j].style.background = 'linear-gradient(to top,#1a7a40,#39ff85)';
        }, 400);
      }
    }
    setInterval(animatePreview, 600);

    // ─── ALGO GRID ───
    const ALGOS = [
      { name: 'Bubble Sort', desc: 'The classic comparison-based sort. Repeatedly swaps adjacent elements in the wrong order.', worst: 'O(n²)', space: 'O(1)', stable: true, delay: '0.05s' },
      { name: 'Selection Sort', desc: 'Finds the minimum element each pass and places it in the sorted portion.', worst: 'O(n²)', space: 'O(1)', stable: false, delay: '0.10s' },
      { name: 'Insertion Sort', desc: 'Builds sorted array one element at a time by inserting each into its correct position.', worst: 'O(n²)', space: 'O(1)', stable: true, delay: '0.15s' },
      { name: 'Merge Sort', desc: 'Divide-and-conquer: splits, sorts, and merges halves. Guaranteed O(n log n).', worst: 'O(n log n)', space: 'O(n)', stable: true, delay: '0.20s' },
      { name: 'Quick Sort', desc: 'Partitions around a pivot. Fastest in practice for random data with excellent cache use.', worst: 'O(n²)', space: 'O(log n)', stable: false, delay: '0.25s' },
      { name: 'Heap Sort', desc: 'Uses a binary max-heap. Guaranteed O(n log n) with O(1) extra space.', worst: 'O(n log n)', space: 'O(1)', stable: false, delay: '0.30s' },
      { name: 'Shell Sort', desc: 'Generalised insertion sort with shrinking gap sequences. Bridge to optimal sorts.', worst: 'O(n log²n)', space: 'O(1)', stable: false, delay: '0.35s' },
      { name: 'Counting Sort', desc: 'Non-comparison sort for bounded integers. Achieves linear O(n+k) time.', worst: 'O(n+k)', space: 'O(k)', stable: true, delay: '0.40s' },
      { name: 'Radix Sort', desc: 'Sorts integers digit by digit using stable counting sort as a subroutine.', worst: 'O(nk)', space: 'O(n+k)', stable: true, delay: '0.45s' },
      { name: 'Tim Sort', desc: 'Hybrid of merge & insertion sort. The default in Python, Java, and Swift.', worst: 'O(n log n)', space: 'O(n)', stable: true, delay: '0.50s' },
    ];

    const miniBarData = [
      [20, 60, 35, 85, 15, 70, 45, 90, 30, 55, 10, 75, 50, 95, 40],
      [50, 20, 80, 35, 65, 15, 90, 45, 70, 25, 60, 40, 85, 30, 55],
      [10, 40, 70, 20, 80, 50, 30, 90, 15, 60, 45, 75, 35, 65, 25],
      [80, 25, 55, 15, 70, 40, 90, 20, 65, 35, 85, 10, 50, 30, 75],
      [30, 75, 10, 50, 85, 25, 60, 15, 70, 45, 95, 20, 55, 35, 80],
      [60, 15, 80, 40, 20, 75, 35, 90, 10, 55, 30, 70, 45, 85, 25],
      [45, 85, 20, 65, 30, 75, 15, 55, 90, 25, 70, 40, 80, 10, 60],
      [15, 55, 85, 25, 70, 10, 80, 40, 60, 30, 75, 20, 90, 45, 65],
      [70, 30, 10, 60, 85, 20, 75, 45, 15, 90, 35, 65, 25, 80, 50],
      [25, 65, 45, 80, 15, 55, 90, 30, 70, 10, 85, 40, 60, 20, 75],
    ];

    function buildAlgoGrid() {
      const grid = document.getElementById('algoGrid');
      ALGOS.forEach((a, i) => {
        const card = document.createElement('a');
        card.href = '/visualiser';
        card.className = 'algo-card';
        card.style.animationDelay = a.delay;

        const mbHtml = miniBarData[i].map(h => `<div class="mini-bar" style="height:${h * 0.35}px"></div>`).join('');

        card.innerHTML = `
      <div class="mini-bars">${mbHtml}</div>
      <div class="algo-card-name">${a.name}</div>
      <div class="algo-card-desc">${a.desc}</div>
      <div class="algo-card-badges">
        <span class="badge badge-time">${a.worst}</span>
        <span class="badge badge-space">${a.space}</span>
        <span class="badge ${a.stable ? 'badge-stable' : 'badge-unstable'}">${a.stable ? 'Stable' : 'Unstable'}</span>
      </div>
      <div class="algo-card-cta">Visualise → </div>
    `;
        grid.appendChild(card);
      });
    }
    buildAlgoGrid();

    // ─── SCROLL REVEAL ───
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ─── COUNT UP ───
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count);
          let cur = 0;
          const step = Math.ceil(target / 40);
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur;
            if (cur >= target) clearInterval(t);
          }, 30);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
