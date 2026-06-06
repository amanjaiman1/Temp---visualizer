/* ═══════════════════════════════════════════════════════
   DATA: Algorithm Definitions
═══════════════════════════════════════════════════════ */
const ALGORITHMS = [
  {
    id: 'bubble', name: 'Bubble Sort',
    displayParts: ['Bubble','Sort'],
    best:'O(n)', avg:'O(n²)', worst:'O(n²)', space:'O(1)', stable:true, method:'Exchange',
    desc:'The classic comparison-based sort. Repeatedly steps through the list, compares adjacent elements, and swaps them if they\'re in the wrong order. Simple but inefficient for large datasets — best understood as a teaching tool.',
    useCases:['Teaching & learning fundamentals','Near-sorted small arrays','Detecting if array is sorted'],
    pseudo:[
      'procedure bubbleSort(A):',
      '  n ← length(A)',
      '  repeat',
      '    swapped ← false',
      '    for i ← 0 to n−2 do',
      '      if A[i] > A[i+1] then',
      '        swap(A[i], A[i+1])',
      '        swapped ← true',
      '      end if',
      '    end for',
      '    n ← n − 1',
      '  until not swapped',
      'end procedure',
    ],
    pseudoActive: [],
  },
  {
    id: 'selection', name: 'Selection Sort',
    displayParts: ['Selection','Sort'],
    best:'O(n²)', avg:'O(n²)', worst:'O(n²)', space:'O(1)', stable:false, method:'Selection',
    desc:'Divides the array into sorted and unsorted parts. In each pass, finds the minimum element in the unsorted portion and places it at the correct position. Makes O(n) swaps — useful when write operations are costly.',
    useCases:['Minimising writes (e.g. flash memory)','Small datasets where simplicity matters','Understanding in-place selection'],
    pseudo:[
      'procedure selectionSort(A):',
      '  n ← length(A)',
      '  for i ← 0 to n−1 do',
      '    minIdx ← i',
      '    for j ← i+1 to n−1 do',
      '      if A[j] < A[minIdx] then',
      '        minIdx ← j',
      '      end if',
      '    end for',
      '    swap(A[i], A[minIdx])',
      '  end for',
      'end procedure',
    ],
    pseudoActive: [],
  },
  {
    id: 'insertion', name: 'Insertion Sort',
    displayParts: ['Insertion','Sort'],
    best:'O(n)', avg:'O(n²)', worst:'O(n²)', space:'O(1)', stable:true, method:'Insertion',
    desc:'Builds the sorted array one element at a time by inserting each element into its correct position within the already-sorted portion. Excellent performance on nearly-sorted data. Used internally by Timsort.',
    useCases:['Online sorting (data arriving in stream)','Nearly-sorted input','Small arrays or subarrays'],
    pseudo:[
      'procedure insertionSort(A):',
      '  for i ← 1 to length(A)−1 do',
      '    key ← A[i]',
      '    j ← i − 1',
      '    while j ≥ 0 and A[j] > key do',
      '      A[j+1] ← A[j]',
      '      j ← j − 1',
      '    end while',
      '    A[j+1] ← key',
      '  end for',
      'end procedure',
    ],
    pseudoActive: [],
  },
  {
    id: 'merge', name: 'Merge Sort',
    displayParts: ['Merge','Sort'],
    best:'O(n log n)', avg:'O(n log n)', worst:'O(n log n)', space:'O(n)', stable:true, method:'Merge',
    desc:'Divide-and-conquer: recursively splits the array in half, sorts each half, then merges the sorted halves. Guarantees O(n log n) in all cases. Preferred for linked lists and external sorting due to predictable performance.',
    useCases:['Sorting linked lists','External merge sort for large files','When stable sort with O(n log n) guarantee is required'],
    pseudo:[
      'procedure mergeSort(A, l, r):',
      '  if l ≥ r then return',
      '  mid ← (l + r) / 2',
      '  mergeSort(A, l, mid)',
      '  mergeSort(A, mid+1, r)',
      '  merge(A, l, mid, r)',
      '',
      'procedure merge(A, l, mid, r):',
      '  left  ← A[l..mid]',
      '  right ← A[mid+1..r]',
      '  i ← 0; j ← 0; k ← l',
      '  while i < |left| and j < |right|:',
      '    if left[i] ≤ right[j]:',
      '      A[k++] ← left[i++]',
      '    else:',
      '      A[k++] ← right[j++]',
    ],
    pseudoActive: [],
  },
  {
    id: 'quick', name: 'Quick Sort',
    displayParts: ['Quick','Sort'],
    best:'O(n log n)', avg:'O(n log n)', worst:'O(n²)', space:'O(log n)', stable:false, method:'Partition',
    desc:'Picks a pivot and partitions elements around it. One of the fastest in practice due to excellent cache performance. Used in many language standard libraries. Worst case avoided with randomised pivot selection.',
    useCases:['General-purpose in-place sorting','Arrays fitting in cache','When average-case performance matters most'],
    pseudo:[
      'procedure quickSort(A, lo, hi):',
      '  if lo < hi then',
      '    p ← partition(A, lo, hi)',
      '    quickSort(A, lo, p−1)',
      '    quickSort(A, p+1, hi)',
      '',
      'procedure partition(A, lo, hi):',
      '  pivot ← A[hi]',
      '  i ← lo − 1',
      '  for j ← lo to hi−1 do',
      '    if A[j] ≤ pivot then',
      '      i ← i + 1',
      '      swap(A[i], A[j])',
      '  swap(A[i+1], A[hi])',
      '  return i + 1',
    ],
    pseudoActive: [],
  },
  {
    id: 'heap', name: 'Heap Sort',
    displayParts: ['Heap','Sort'],
    best:'O(n log n)', avg:'O(n log n)', worst:'O(n log n)', space:'O(1)', stable:false, method:'Selection',
    desc:'Uses a binary max-heap data structure. First builds a max-heap, then repeatedly extracts the maximum to build the sorted array. Guaranteed O(n log n) with O(1) extra space — but poor cache locality compared to quicksort.',
    useCases:['When O(1) extra space is required','Guaranteed O(n log n) in worst case','Priority queue implementations'],
    pseudo:[
      'procedure heapSort(A):',
      '  buildMaxHeap(A)',
      '  for i ← n−1 downto 1 do',
      '    swap(A[0], A[i])',
      '    heapify(A, 0, i)',
      '',
      'procedure heapify(A, i, n):',
      '  largest ← i',
      '  l ← 2i+1; r ← 2i+2',
      '  if l < n and A[l] > A[largest]:',
      '    largest ← l',
      '  if r < n and A[r] > A[largest]:',
      '    largest ← r',
      '  if largest ≠ i:',
      '    swap(A[i], A[largest])',
      '    heapify(A, largest, n)',
    ],
    pseudoActive: [],
  },
  {
    id: 'shell', name: 'Shell Sort',
    displayParts: ['Shell','Sort'],
    best:'O(n log n)', avg:'O(n log²n)', worst:'O(n log²n)', space:'O(1)', stable:false, method:'Insertion',
    desc:'Generalisation of insertion sort. Sorts elements far apart first, then progressively reduces the gap. Gap sequence choice affects performance significantly. Bridge between insertion sort and optimal comparison sorts.',
    useCases:['Medium-sized arrays','Embedded systems (no recursion needed)','When O(1) space with decent speed is needed'],
    pseudo:[
      'procedure shellSort(A):',
      '  n ← length(A)',
      '  gap ← n / 2',
      '  while gap > 0 do',
      '    for i ← gap to n−1 do',
      '      temp ← A[i]',
      '      j ← i',
      '      while j ≥ gap and A[j−gap] > temp do',
      '        A[j] ← A[j−gap]',
      '        j ← j − gap',
      '      end while',
      '      A[j] ← temp',
      '    end for',
      '    gap ← gap / 2',
      '  end while',
    ],
    pseudoActive: [],
  },
  {
    id: 'counting', name: 'Counting Sort',
    displayParts: ['Counting','Sort'],
    best:'O(n+k)', avg:'O(n+k)', worst:'O(n+k)', space:'O(k)', stable:true, method:'Non-comparison',
    desc:'Non-comparison sort that counts occurrences of each element. Works for integers in a known, bounded range. Achieves linear time — faster than any comparison-based sort for suitable inputs.',
    useCases:['Integer data with known bounded range','Sorting characters or grades','As a subroutine in radix sort'],
    pseudo:[
      'procedure countingSort(A, max):',
      '  count ← array of zeros [0..max]',
      '  for each x in A:',
      '    count[x] ← count[x] + 1',
      '  k ← 0',
      '  for i ← 0 to max do',
      '    while count[i] > 0 do',
      '      A[k] ← i',
      '      k ← k + 1',
      '      count[i] ← count[i] − 1',
      '    end while',
      '  end for',
      'end procedure',
    ],
    pseudoActive: [],
  },
  {
    id: 'radix', name: 'Radix Sort',
    displayParts: ['Radix','Sort'],
    best:'O(nk)', avg:'O(nk)', worst:'O(nk)', space:'O(n+k)', stable:true, method:'Non-comparison',
    desc:'Sorts integers by processing individual digits — least-significant digit first (LSD). Uses counting sort as a stable subroutine for each digit position. Achieves linear time for fixed-length integer keys.',
    useCases:['Sorting large numbers of integers','Fixed-length strings or keys','When O(n log n) comparison bound isn\'t fast enough'],
    pseudo:[
      'procedure radixSort(A):',
      '  max ← maximum(A)',
      '  exp ← 1',
      '  while max / exp > 0 do',
      '    countingSortByDigit(A, exp)',
      '    exp ← exp × 10',
      '',
      'procedure countingSortByDigit(A, exp):',
      '  output ← array[n]',
      '  count  ← array[10] of zeros',
      '  for i ← 0 to n−1:',
      '    digit ← (A[i] / exp) mod 10',
      '    count[digit]++',
      '  // accumulate, place, copy back',
    ],
    pseudoActive: [],
  },
  {
    id: 'tim', name: 'Tim Sort',
    displayParts: ['Tim','Sort'],
    best:'O(n)', avg:'O(n log n)', worst:'O(n log n)', space:'O(n)', stable:true, method:'Hybrid',
    desc:'Hybrid of merge sort and insertion sort, designed by Tim Peters for Python\'s sorted(). Detects natural runs in the data, extends small runs via insertion sort, then merges them. The default sort in Python, Java (Arrays.sort for objects), and Swift.',
    useCases:['General-purpose library sort','Real-world data with partial ordering','Python, Java, Android default sort'],
    pseudo:[
      'procedure timSort(A):',
      '  RUN ← 32',
      '  n ← length(A)',
      '  for i ← 0 to n step RUN:',
      '    insertionSort(A, i, min(i+RUN−1, n−1))',
      '  size ← RUN',
      '  while size < n:',
      '    for left ← 0 to n step 2×size:',
      '      mid   ← left + size − 1',
      '      right ← min(left + 2×size−1, n−1)',
      '      if mid < right:',
      '        merge(A, left, mid, right)',
      '    size ← size × 2',
      'end procedure',
    ],
    pseudoActive: [],
  },
];

/* ═══════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════ */
let array = [];
let frames = [];       // animation frames [{arr, states, pseudoLine, comparisons, swaps}]
let frameIdx = 0;
let animTimer = null;
let isRunning = false;
let isPaused  = false;
let isSorted  = false;
let soundOn   = true;
let currentAlgoId = 'bubble';
let comparisons = 0;
let swaps = 0;
let startTime = 0;

// 3D (Three.js) view state
let use3D = false;
let lastArr = [];
let lastStates = {};
// Teach Mode state
let teachMode = false;

// Speed levels: slider position (1-10) maps to a labelled multiplier.
// Lower multipliers (0.5×, 0.75×) play SLOWER so learners can follow each step;
// the `delay` is the milliseconds spent on every animation frame.
const speedLevels = [
  { label: '0.25×', delay: 1150 },
  { label: '0.5×',  delay: 760 },
  { label: '0.75×', delay: 480 },
  { label: '1×',    delay: 300 },
  { label: '1.5×',  delay: 190 },
  { label: '2×',    delay: 120 },
  { label: '3×',    delay: 70  },
  { label: '4×',    delay: 40  },
  { label: '6×',    delay: 20  },
  { label: '8×',    delay: 9   },
  { label: '10×',   delay: 3   },
];

let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function beep(freq, dur=0.06) {
  if (!soundOn) return;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch(e) {}
}

/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
function init() {
  buildAlgoList();
  buildComparisonTable();
  onSpeedChange(document.getElementById('speedSlider').value);
  setupDimension();
  selectAlgo('bubble');
  generateArray();
}

// Enable the Three.js view by default when WebGL is available; otherwise
// fall back to the classic DOM/CSS bars and hide the 3D/2D toggle.
function setupDimension() {
  const btn = document.getElementById('btnDim');
  if (window.Viz3D && window.Viz3D.ready) {
    use3D = true;
    window.Viz3D.setEnabled(true);
    if (btn) btn.innerHTML = '🧊 3D';
  } else {
    use3D = false;
    if (btn) btn.style.display = 'none';
  }
}

function toggleDimension() {
  if (!window.Viz3D || !window.Viz3D.ready) return;
  use3D = !use3D;
  window.Viz3D.setEnabled(use3D);
  const btn = document.getElementById('btnDim');
  if (btn) btn.innerHTML = use3D ? '🧊 3D' : '▦ 2D';
  renderBars(lastArr.length ? lastArr : array, lastStates || {});
}

function buildAlgoList() {
  const list = document.getElementById('algoList');
  list.innerHTML = '';
  ALGORITHMS.forEach(algo => {
    const el = document.createElement('div');
    el.className = 'algo-item';
    el.id = 'algoItem_' + algo.id;
    el.onclick = () => { if (!isRunning) selectAlgo(algo.id); };
    el.innerHTML = `
      <div class="algo-name">${algo.name}</div>
      <div class="algo-badges">
        <span class="badge badge-time">${algo.worst}</span>
        <span class="badge badge-space">${algo.space}</span>
        <span class="badge ${algo.stable ? 'badge-stable' : 'badge-unstable'}">${algo.stable ? 'stable' : 'unstable'}</span>
      </div>`;
    list.appendChild(el);
  });
}

function selectAlgo(id) {
  if (isRunning) return;
  currentAlgoId = id;
  document.querySelectorAll('.algo-item').forEach(el => el.classList.remove('active'));
  document.getElementById('algoItem_' + id)?.classList.add('active');
  const algo = ALGORITHMS.find(a => a.id === id);
  if (!algo) return;

  // Display name
  const dn = document.getElementById('algoDisplayName');
  dn.innerHTML = `${algo.displayParts[0]}<span>${algo.displayParts[1]}</span>`;

  // Complexity pills
  const pills = document.getElementById('complexityPills');
  pills.innerHTML = `
    <div class="cpill best"><span class="cpill-label">Best</span><span class="cpill-val">${algo.best}</span></div>
    <div class="cpill avg"><span class="cpill-label">Avg</span><span class="cpill-val">${algo.avg}</span></div>
    <div class="cpill worst"><span class="cpill-label">Worst</span><span class="cpill-val">${algo.worst}</span></div>
    <div class="cpill space"><span class="cpill-label">Space</span><span class="cpill-val">${algo.space}</span></div>
  `;

  // Pseudocode
  document.getElementById('pseudoTitle').textContent = id + '_sort';
  renderPseudo(algo.pseudo, -1);

  // Desc
  document.getElementById('algoDesc').textContent = algo.desc;

  // Complexity grid
  const cg = document.getElementById('complexityGrid');
  cg.innerHTML = `
    <div class="cx-item best"><div class="cx-label">Best Case</div><div class="cx-val">${algo.best}</div></div>
    <div class="cx-item avg"><div class="cx-label">Average</div><div class="cx-val">${algo.avg}</div></div>
    <div class="cx-item worst"><div class="cx-label">Worst Case</div><div class="cx-val">${algo.worst}</div></div>
    <div class="cx-item space"><div class="cx-label">Space</div><div class="cx-val">${algo.space}</div></div>
  `;

  // Use cases
  const ul = document.getElementById('useCaseList');
  ul.innerHTML = algo.useCases.map(u => `<li>${u}</li>`).join('');

  // Status
  document.getElementById('statusAlgo').textContent = algo.name;

  // Reset view
  resetStats();
  showAlgoIntro(id);
}

function renderPseudo(lines, activeLine) {
  const el = document.getElementById('pseudoLines');
  el.innerHTML = lines.map((line, i) => `
    <div class="pline ${i === activeLine ? 'active' : ''}" id="pline_${i}">
      <div class="pline-num">${line ? i+1 : ''}</div>
      <div class="pcode">${escHtml(line)}</div>
    </div>`).join('');
}

function activatePseudoLine(lineIdx) {
  document.querySelectorAll('.pline').forEach(el => el.classList.remove('active'));
  const line = document.getElementById('pline_' + lineIdx);
  if (line) {
    line.classList.add('active');
    line.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ═══════════════════════════════════════════════════════
   ARRAY GENERATION
═══════════════════════════════════════════════════════ */
function getSize() { return parseInt(document.getElementById('sizeSlider').value); }
function getSpeedLevel() {
  const idx = parseInt(document.getElementById('speedSlider').value) - 1;
  return speedLevels[Math.max(0, Math.min(speedLevels.length - 1, idx))];
}
function getDelay() { return getSpeedLevel().delay; }

function generateArray() {
  if (isRunning) return;
  const n = getSize();
  array = Array.from({length:n}, () => Math.floor(Math.random() * 90) + 10);
  isSorted = false;
  resetStats();
  renderBars(array, {});
  setStatus('idle', 'IDLE');
  showAlgoIntro(currentAlgoId);
}

function resetArray() {
  if (animTimer) { clearTimeout(animTimer); animTimer = null; }
  isRunning = false; isPaused = false; isSorted = false;
  frames = []; frameIdx = 0;
  teachMode = false;
  document.getElementById('btnTeach')?.classList.remove('active');
  setButtonStates(false);
  generateArray();
}

function resetStats() {
  comparisons = 0; swaps = 0;
  document.getElementById('statComparisons').textContent = '0';
  document.getElementById('statSwaps').textContent = '0';
  document.getElementById('statTime').textContent = '0ms';
  document.getElementById('statusN').textContent = array.length;
}

/* ═══════════════════════════════════════════════════════
   BAR RENDERING
═══════════════════════════════════════════════════════ */
function renderBars(arr, stateMap) {
  // remember the last render so we can repaint after a 2D/3D toggle
  lastArr = arr; lastStates = stateMap;

  // In 3D mode, hand off to the Three.js renderer and skip the DOM bars.
  if (use3D && window.Viz3D && window.Viz3D.ready) {
    window.Viz3D.render(arr, stateMap);
    return;
  }

  const canvas = document.getElementById('barCanvas');
  const n = arr.length;

  // Build or reuse bar elements
  let wraps = canvas.querySelectorAll('.bar-wrap');
  if (wraps.length !== n) {
    // Remove old, create new
    canvas.querySelectorAll('.bar-wrap').forEach(el => el.remove());
    for (let i = 0; i < n; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'bar-wrap';
      const bar = document.createElement('div');
      bar.className = 'bar';
      wrap.appendChild(bar);
      canvas.appendChild(wrap);
    }
    wraps = canvas.querySelectorAll('.bar-wrap');
  }

  const maxVal = Math.max(...arr, 1);
  const canvasH = canvas.clientHeight - 2;

  wraps.forEach((wrap, i) => {
    const bar = wrap.querySelector('.bar');
    const pct = arr[i] / maxVal;
    bar.style.height = Math.max(2, Math.floor(pct * canvasH)) + 'px';

    bar.className = 'bar ' + (stateMap[i] || 'default');
  });
}

/* ═══════════════════════════════════════════════════════
   FRAME BUILDER HELPERS
═══════════════════════════════════════════════════════ */
// Each frame: { arr: [...], states: {idx: 'comparing'|'swapping'|...}, pseudoLine: n, cmp: n, swp: n }
function makeFrame(arr, states, pseudoLine, cmp, swp) {
  return { arr: [...arr], states: {...states}, pseudoLine, cmp, swp };
}

/* ═══════════════════════════════════════════════════════
   SORTING ALGORITHMS — Frame generators
═══════════════════════════════════════════════════════ */
function buildFramesBubble(arr) {
  const A = [...arr]; const F = [];
  const n = A.length;
  let c=0, s=0;
  let swapped;
  let end = n;
  do {
    swapped = false;
    for (let i = 0; i < end-1; i++) {
      F.push(makeFrame(A, {[i]:'comparing',[i+1]:'comparing'}, 5, ++c, s));
      if (A[i] > A[i+1]) {
        F.push(makeFrame(A, {[i]:'swapping',[i+1]:'swapping'}, 7, c, ++s));
        [A[i],A[i+1]] = [A[i+1],A[i]];
        swapped = true;
        F.push(makeFrame(A, {[i]:'swapping',[i+1]:'swapping'}, 7, c, s));
      }
    }
    end--;
    // mark sorted tail
    const sorted = {};
    for(let k=end;k<n;k++) sorted[k]='sorted';
    F.push(makeFrame(A, sorted, 11, c, s));
  } while (swapped);
  // all sorted
  const allSorted = {};
  A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A, allSorted, 12, c, s));
  return F;
}

function buildFramesSelection(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const sortedSet = new Set();
  for (let i=0;i<n-1;i++) {
    let minIdx=i;
    F.push(makeFrame(A, {[i]:'selected',...sortedStates(sortedSet)}, 3, c, s));
    for (let j=i+1;j<n;j++) {
      F.push(makeFrame(A, {[i]:'selected',[minIdx]:'selected',[j]:'comparing',...sortedStates(sortedSet)}, 5, ++c, s));
      if (A[j]<A[minIdx]) { minIdx=j; }
    }
    if (minIdx!==i) {
      F.push(makeFrame(A, {[i]:'swapping',[minIdx]:'swapping',...sortedStates(sortedSet)}, 9, c, ++s));
      [A[i],A[minIdx]]=[A[minIdx],A[i]];
      F.push(makeFrame(A, {[i]:'swapping',[minIdx]:'swapping',...sortedStates(sortedSet)}, 9, c, s));
    }
    sortedSet.add(i);
    F.push(makeFrame(A, {[i]:'sorted',...sortedStates(sortedSet)}, 2, c, s));
  }
  sortedSet.add(n-1);
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A, allSorted, 10, c, s));
  return F;
}

function buildFramesInsertion(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  for (let i=1;i<n;i++) {
    let key=A[i], j=i-1;
    F.push(makeFrame(A, {[i]:'selected'}, 2, c, s));
    while (j>=0 && A[j]>key) {
      F.push(makeFrame(A, {[j]:'comparing',[j+1]:'swapping'}, 4, ++c, s));
      A[j+1]=A[j]; j--;
      F.push(makeFrame(A, {[j+1]:'swapping'}, 5, c, ++s));
    }
    A[j+1]=key;
    const sts={}; for(let k=0;k<=i;k++) sts[k]='sorted';
    F.push(makeFrame(A, sts, 8, c, s));
  }
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A, allSorted, 9, c, s));
  return F;
}

function buildFramesMerge(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const sortedSet=new Set();

  function merge(l,mid,r) {
    const left=A.slice(l,mid+1), right=A.slice(mid+1,r+1);
    let i=0,j=0,k=l;
    while(i<left.length&&j<right.length) {
      F.push(makeFrame(A,{[l+i]:'comparing',[mid+1+j]:'comparing',...sortedStates(sortedSet)},11,++c,s));
      if(left[i]<=right[j]){A[k++]=left[i++];}else{A[k++]=right[j++];s++;}
      F.push(makeFrame(A,{[k-1]:'swapping',...sortedStates(sortedSet)},13,c,s));
    }
    while(i<left.length){A[k++]=left[i++];F.push(makeFrame(A,{[k-1]:'selected',...sortedStates(sortedSet)},13,c,s));}
    while(j<right.length){A[k++]=right[j++];F.push(makeFrame(A,{[k-1]:'selected',...sortedStates(sortedSet)},13,c,s));}
    for(let x=l;x<=r;x++) sortedSet.add(x);
    F.push(makeFrame(A,sortedStates(sortedSet),5,c,s));
  }

  function mergeSort(l,r){
    if(l>=r)return;
    const mid=Math.floor((l+r)/2);
    F.push(makeFrame(A,{},2,c,s));
    mergeSort(l,mid); mergeSort(mid+1,r);
    merge(l,mid,r);
  }
  mergeSort(0,n-1);
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,5,c,s));
  return F;
}

function buildFramesQuick(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const sortedSet=new Set();

  function partition(lo,hi){
    const pivot=A[hi]; let i=lo-1;
    F.push(makeFrame(A,{[hi]:'pivot',...sortedStates(sortedSet)},7,c,s));
    for(let j=lo;j<hi;j++){
      F.push(makeFrame(A,{[j]:'comparing',[hi]:'pivot',...sortedStates(sortedSet)},10,++c,s));
      if(A[j]<=pivot){
        i++;
        F.push(makeFrame(A,{[i]:'swapping',[j]:'swapping',[hi]:'pivot',...sortedStates(sortedSet)},12,c,++s));
        [A[i],A[j]]=[A[j],A[i]];
        F.push(makeFrame(A,{[i]:'swapping',[j]:'swapping',[hi]:'pivot',...sortedStates(sortedSet)},12,c,s));
      }
    }
    [A[i+1],A[hi]]=[A[hi],A[i+1]]; s++;
    sortedSet.add(i+1);
    F.push(makeFrame(A,{[i+1]:'sorted',...sortedStates(sortedSet)},13,c,s));
    return i+1;
  }

  function qs(lo,hi){
    if(lo<hi){
      F.push(makeFrame(A,{...sortedStates(sortedSet)},1,c,s));
      const p=partition(lo,hi);
      qs(lo,p-1); qs(p+1,hi);
    } else if(lo===hi){ sortedSet.add(lo); }
  }
  qs(0,n-1);
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,14,c,s));
  return F;
}

function buildFramesHeap(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const sortedSet=new Set();

  function heapify(i,sz){
    let largest=i, l=2*i+1, r=2*i+2;
    F.push(makeFrame(A,{[i]:'selected',...sortedStates(sortedSet)},8,c,s));
    if(l<sz){F.push(makeFrame(A,{[i]:'comparing',[l]:'comparing',...sortedStates(sortedSet)},9,++c,s));if(A[l]>A[largest])largest=l;}
    if(r<sz){F.push(makeFrame(A,{[i]:'comparing',[r]:'comparing',...sortedStates(sortedSet)},10,++c,s));if(A[r]>A[largest])largest=r;}
    if(largest!==i){
      F.push(makeFrame(A,{[i]:'swapping',[largest]:'swapping',...sortedStates(sortedSet)},14,c,++s));
      [A[i],A[largest]]=[A[largest],A[i]];
      F.push(makeFrame(A,{[i]:'swapping',[largest]:'swapping',...sortedStates(sortedSet)},14,c,s));
      heapify(largest,sz);
    }
  }

  // build heap
  for(let i=Math.floor(n/2)-1;i>=0;i--) heapify(i,n);
  // extract
  for(let i=n-1;i>0;i--){
    F.push(makeFrame(A,{[0]:'swapping',[i]:'swapping',...sortedStates(sortedSet)},3,c,++s));
    [A[0],A[i]]=[A[i],A[0]];
    sortedSet.add(i);
    F.push(makeFrame(A,{[i]:'sorted',...sortedStates(sortedSet)},4,c,s));
    heapify(0,i);
  }
  sortedSet.add(0);
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,4,c,s));
  return F;
}

function buildFramesShell(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  let gap=Math.floor(n/2);
  while(gap>0){
    for(let i=gap;i<n;i++){
      const temp=A[i]; let j=i;
      F.push(makeFrame(A,{[i]:'selected'},5,c,s));
      while(j>=gap&&A[j-gap]>temp){
        F.push(makeFrame(A,{[j]:'comparing',[j-gap]:'comparing'},8,++c,s));
        A[j]=A[j-gap]; j-=gap;
        F.push(makeFrame(A,{[j+gap]:'swapping',[j]:'swapping'},9,c,++s));
      }
      A[j]=temp;
      F.push(makeFrame(A,{[j]:'selected'},12,c,s));
    }
    gap=Math.floor(gap/2);
    F.push(makeFrame(A,{},13,c,s));
  }
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,3,c,s));
  return F;
}

function buildFramesCounting(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const maxV=Math.max(...A);
  const count=new Array(maxV+1).fill(0);
  // count
  for(let x=0;x<n;x++){
    F.push(makeFrame(A,{[x]:'comparing'},3,++c,s));
    count[A[x]]++;
  }
  // write back
  let k=0;
  for(let i=0;i<=maxV;i++){
    while(count[i]>0){
      A[k]=i; count[i]--;
      F.push(makeFrame(A,{[k]:'swapping'},8,c,++s));
      k++;
      F.push(makeFrame(A,{[k-1]:'sorted'},9,c,s));
    }
  }
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,12,c,s));
  return F;
}

function buildFramesRadix(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const maxV=Math.max(...A);
  let exp=1;
  while(Math.floor(maxV/exp)>0){
    // counting sort by digit
    const output=new Array(n);
    const count=new Array(10).fill(0);
    for(let i=0;i<n;i++){
      const d=Math.floor(A[i]/exp)%10;
      count[d]++;
      F.push(makeFrame(A,{[i]:'comparing'},10,++c,s));
    }
    for(let i=1;i<10;i++) count[i]+=count[i-1];
    for(let i=n-1;i>=0;i--){
      const d=Math.floor(A[i]/exp)%10;
      output[count[d]-1]=A[i];
      count[d]--;
    }
    for(let i=0;i<n;i++){
      A[i]=output[i];
      F.push(makeFrame(A,{[i]:'swapping'},13,c,++s));
    }
    exp*=10;
    F.push(makeFrame(A,{},4,c,s));
  }
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,12,c,s));
  return F;
}

function buildFramesTim(arr) {
  const A=[...arr]; const F=[]; const n=A.length; let c=0,s=0;
  const RUN=32;
  const sortedSet=new Set();

  function insSort(l,r){
    for(let i=l+1;i<=r;i++){
      const key=A[i]; let j=i-1;
      while(j>=l&&A[j]>key){
        F.push(makeFrame(A,{[j]:'comparing',[j+1]:'swapping',...sortedStates(sortedSet)},5,++c,++s));
        A[j+1]=A[j]; j--;
      }
      A[j+1]=key;
    }
    for(let k=l;k<=r;k++) sortedSet.add(k);
    F.push(makeFrame(A,sortedStates(sortedSet),4,c,s));
  }

  function merge(l,mid,r){
    const left=A.slice(l,mid+1),right=A.slice(mid+1,r+1);
    let i=0,j=0,k=l;
    while(i<left.length&&j<right.length){
      F.push(makeFrame(A,{[l+i]:'comparing',[mid+1+j]:'comparing',...sortedStates(sortedSet)},10,++c,s));
      if(left[i]<=right[j]){A[k++]=left[i++];}else{A[k++]=right[j++];s++;}
      F.push(makeFrame(A,{[k-1]:'sorted',...sortedStates(sortedSet)},11,c,s));
    }
    while(i<left.length){A[k++]=left[i++];}
    while(j<right.length){A[k++]=right[j++];}
    for(let x=l;x<=r;x++) sortedSet.add(x);
  }

  for(let i=0;i<n;i+=RUN) insSort(i,Math.min(i+RUN-1,n-1));
  for(let size=RUN;size<n;size*=2){
    for(let left=0;left<n;left+=2*size){
      const mid=Math.min(left+size-1,n-1);
      const right=Math.min(left+2*size-1,n-1);
      if(mid<right) merge(left,mid,right);
    }
    F.push(makeFrame(A,sortedStates(sortedSet),8,c,s));
  }
  const allSorted={};A.forEach((_,i)=>allSorted[i]='sorted');
  F.push(makeFrame(A,allSorted,12,c,s));
  return F;
}

function sortedStates(set) {
  const o={};
  set.forEach(i=>o[i]='sorted');
  return o;
}

const BUILDERS = {
  bubble:   buildFramesBubble,
  selection:buildFramesSelection,
  insertion:buildFramesInsertion,
  merge:    buildFramesMerge,
  quick:    buildFramesQuick,
  heap:     buildFramesHeap,
  shell:    buildFramesShell,
  counting: buildFramesCounting,
  radix:    buildFramesRadix,
  tim:      buildFramesTim,
};

/* ═══════════════════════════════════════════════════════
   ANIMATION ENGINE
═══════════════════════════════════════════════════════ */
function startSort() {
  if (isRunning || isSorted) { if (isSorted) resetArray(); return; }
  frames = BUILDERS[currentAlgoId]([...array]);
  frameIdx = 0;
  isRunning = true; isPaused = false;
  startTime = Date.now();
  setButtonStates(true);
  setStatus('running','RUNNING');
  play();
}

function play() {
  if (!isRunning || isPaused) return;
  if (frameIdx >= frames.length) { finish(); return; }
  const f = frames[frameIdx++];
  applyFrame(f);
  animTimer = setTimeout(play, getDelay());
}

function applyFrame(f) {
  comparisons = f.cmp; swaps = f.swp;
  document.getElementById('statComparisons').textContent = comparisons;
  document.getElementById('statSwaps').textContent = swaps;
  document.getElementById('statTime').textContent = (Date.now()-startTime) + 'ms';
  activatePseudoLine(f.pseudoLine);
  renderBars(f.arr, f.states);
  updateExplain(f);

  // sound: map bar height to freq
  const stateKeys = Object.keys(f.states);
  if (stateKeys.length > 0) {
    const idx = parseInt(stateKeys[0]);
    if (!isNaN(idx) && f.arr[idx] !== undefined) {
      const freq = 150 + (f.arr[idx] / 100) * 900;
      beep(freq, 0.04);
    }
  }
}

function finish() {
  isRunning = false; isSorted = true;
  clearTimeout(animTimer);
  if (frames.length > 0) array = [...frames[frames.length-1].arr];
  const allSorted = {};
  array.forEach((_,i) => allSorted[i] = 'sorted');
  renderBars(array, allSorted);

  if (use3D && window.Viz3D && window.Viz3D.ready) {
    // ripple celebration handled by the Three.js renderer
    window.Viz3D.celebrate();
  } else {
    // Wave animation: re-apply sorted state with staggered delay (DOM bars)
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, i) => {
      bar.className = 'bar default';
      setTimeout(() => {
        bar.className = 'bar sorted';
      }, i * (800 / Math.max(bars.length, 1)));
    });
  }

  setStatus('done','SORTED ✓');
  setButtonStates(false);
  document.getElementById('btnSort').textContent = '↺ New Sort';
  if (teachMode) {
    setExplain('🎉', 'All done! Every bar is now lined up from shortest to tallest. It took <b class="ev">' +
      comparisons + '</b> comparisons and <b class="ev">' + swaps + '</b> moves to sort just ' +
      array.length + ' bars — imagine doing that by hand! <span class="teach-extra">Tip: try another algorithm to see how the number of steps changes.</span>');
  } else {
    setExplain('🎉', 'Done! Every bar is now arranged from shortest to tallest — the list is fully sorted.');
  }
  // celebration beep sequence
  if (soundOn) {
    [523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,0.12),i*80));
  }
}

function togglePause() {
  if (!isRunning) return;
  isPaused = !isPaused;
  const btn = document.getElementById('btnPause');
  if (isPaused) {
    clearTimeout(animTimer);
    btn.innerHTML = '▶ Resume';
    btn.classList.add('btn-amber');
    btn.classList.remove('btn-ghost');
    setStatus('running','PAUSED');
    document.getElementById('btnStep').disabled = false;
  } else {
    btn.innerHTML = '⏸ Pause';
    btn.classList.remove('btn-amber');
    btn.classList.add('btn-ghost');
    document.getElementById('btnStep').disabled = true;
    setStatus('running','RUNNING');
    play();
  }
}

function stepForward() {
  if (!isPaused || frameIdx >= frames.length) return;
  const f = frames[frameIdx++];
  applyFrame(f);
  if (frameIdx >= frames.length) finish();
}

function setButtonStates(running) {
  document.getElementById('btnSort').disabled = running;
  document.getElementById('btnPause').disabled = !running;
  document.getElementById('btnStep').disabled = !running;
  document.getElementById('btnReset').disabled = false;
  document.querySelectorAll('.algo-item').forEach(el => {
    el.style.opacity = running ? '0.4' : '1';
    el.style.cursor = running ? 'not-allowed' : 'pointer';
  });
  document.getElementById('sizeSlider').disabled = running;
  if (!running) {
    document.getElementById('btnPause').innerHTML = '⏸ Pause';
    document.getElementById('btnPause').classList.remove('btn-amber');
    document.getElementById('btnPause').classList.add('btn-ghost');
    document.getElementById('btnSort').textContent = '▶ Sort';
  }
}

function setStatus(state, text) {
  const dot = document.getElementById('statusDot');
  dot.className = 'status-dot ' + state;
  document.getElementById('statusText').textContent = text;
}

/* ═══════════════════════════════════════════════════════
   CONTROLS
═══════════════════════════════════════════════════════ */
function onSizeChange(v) {
  document.getElementById('sizeVal').textContent = v;
  document.getElementById('statusN').textContent = v;
  if (!isRunning) generateArray();
}

function onSpeedChange(v) {
  const level = speedLevels[Math.max(0, Math.min(speedLevels.length - 1, parseInt(v) - 1))];
  document.getElementById('speedVal').textContent = level.label;
}

function toggleSound() {
  soundOn = !soundOn;
  const btn = document.getElementById('soundBtn');
  btn.textContent = soundOn ? '🔊' : '🔇';
  btn.classList.toggle('on', soundOn);
}

/* ═══════════════════════════════════════════════════════
   COMPARISON TABLE MODAL
═══════════════════════════════════════════════════════ */
function buildComparisonTable() {
  const tbody = document.querySelector('#cmpTable tbody');
  tbody.innerHTML = ALGORITHMS.map(a => `
    <tr>
      <td class="algo-col">${a.name}</td>
      <td class="${timeClass(a.best)}">${a.best}</td>
      <td class="${timeClass(a.avg)}">${a.avg}</td>
      <td class="${timeClass(a.worst)}">${a.worst}</td>
      <td class="cpill-val" style="color:var(--purple)">${a.space}</td>
      <td class="${a.stable ? 'stab' : 'unstab'}">${a.stable ? '✔ Stable' : '✗ Unstable'}</td>
      <td style="color:var(--muted)">${a.method}</td>
    </tr>`).join('');
}

function timeClass(t) {
  if (t.includes('n²') || t.includes('nk') && !t.includes('log')) return 'ok';
  if (t.includes('n log') || t.includes('nk')) return 'good';
  if (t === 'O(n)') return 'good';
  return 'bad';
}

function openModal() {
  document.getElementById('cmpModal').classList.add('open');
}
function closeModal() {
  document.getElementById('cmpModal').classList.remove('open');
}
document.getElementById('cmpModal').addEventListener('click', e => {
  if (e.target === document.getElementById('cmpModal')) closeModal();
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (typeof tourActive !== 'undefined' && tourActive) {
    if (e.key === 'Escape') endTour(false);
    if (e.key === 'ArrowRight') { if (tourIdx < tourSteps.length - 1) showTourStep(tourIdx + 1); else endTour(true); }
    if (e.key === 'ArrowLeft' && tourIdx > 0) showTourStep(tourIdx - 1);
    return;
  }
  if (e.key === ' ') { e.preventDefault(); isRunning ? togglePause() : startSort(); }
  if (e.key === 'r' || e.key === 'R') resetArray();
  if (e.key === 'ArrowRight' && isPaused) stepForward();
  if (e.key === 'Escape') closeModal();
});

/* ═══════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════ */
window.addEventListener('load', init);
window.addEventListener('resize', () => {
  if (!isRunning) renderBars(array, {});
});



/* ═══════════════════════════════════════════════════════
   LAYMAN MODE — plain-English narration of every step
   so a non-programmer can follow exactly what is happening.
═══════════════════════════════════════════════════════ */
const PLAIN_INTRO = {
  bubble:    "👋 Bubble Sort compares two side-by-side bars and swaps them if the left one is taller, so the tallest bar keeps drifting to the right. Press ▶ Sort to watch.",
  selection: "👋 Selection Sort scans the unsorted bars, finds the shortest one, and moves it to the front — over and over. Press ▶ Sort to watch.",
  insertion: "👋 Insertion Sort works like sorting cards in your hand: it picks up one bar and slides it left until it sits in the right place. Press ▶ Sort to watch.",
  merge:     "👋 Merge Sort splits the bars into tiny groups, then zips them back together in order, always taking the shorter front bar first. Press ▶ Sort to watch.",
  quick:     "👋 Quick Sort picks one bar as a 'pivot' (reference), puts shorter bars on its left and taller on its right, then repeats on each side. Press ▶ Sort to watch.",
  heap:      "👋 Heap Sort builds a tree where every parent is taller than its children, then keeps taking the tallest off the top. Press ▶ Sort to watch.",
  shell:     "👋 Shell Sort is Insertion Sort with a head-start: it first compares bars far apart, then closer and closer. Press ▶ Sort to watch.",
  counting:  "👋 Counting Sort doesn't compare bars — it tallies how many of each height there are, then rewrites them in order. Press ▶ Sort to watch.",
  radix:     "👋 Radix Sort orders the bars one digit at a time, from the last digit to the first. Press ▶ Sort to watch.",
  tim:       "👋 Tim Sort (used by Python & Java) tidies small chunks with Insertion Sort, then merges them like Merge Sort. Press ▶ Sort to watch.",
};

function setExplain(icon, html) {
  const iconEl = document.getElementById('explainIcon');
  const textEl = document.getElementById('explainText');
  if (iconEl) iconEl.textContent = icon;
  if (textEl) textEl.innerHTML = html;
}

function showAlgoIntro(algoId) {
  setExplain('💡', PLAIN_INTRO[algoId] || 'Press ▶ Sort to watch this algorithm work step by step.');
}

function rolesOf(states) {
  const r = { comparing: [], swapping: [], pivot: [], selected: [], sorted: [] };
  for (const k in states) {
    const role = states[k];
    if (r[role]) r[role].push(parseInt(k));
  }
  return r;
}

// Turn a single animation frame into a friendly sentence.
function narrateFrame(f) {
  const r = rolesOf(f.states);
  const A = f.arr;
  const algo = currentAlgoId;
  const mergeLike = (algo === 'merge' || algo === 'tim');
  const countLike = (algo === 'counting' || algo === 'radix');
  const b = (i) => '<b class="ev">' + A[i] + '</b>';

  const c = r.comparing, s = r.swapping, p = r.pivot, sel = r.selected;

  // 1) A real swap of two bars
  if (s.length >= 2) {
    if (algo === 'heap')
      return { icon: '🔁', text: 'Swapping ' + b(s[0]) + ' and ' + b(s[1]) + ' so the taller bar floats up the tree.' };
    return { icon: '🔁', text: 'These two are out of order, so we swap ' + b(s[0]) + ' and ' + b(s[1]) + ' — the shorter one moves left.' };
  }

  // 2) A single bar being shifted / written
  if (s.length === 1) {
    if (countLike)
      return { icon: '📥', text: 'Writing ' + b(s[0]) + ' back into its sorted position.' };
    if (mergeLike)
      return { icon: '🧩', text: 'Placing ' + b(s[0]) + ' into the merged, sorted group.' };
    return { icon: '↪️', text: 'Sliding ' + b(s[0]) + ' one step right to make room for a smaller bar.' };
  }

  // 3) Quick Sort pivot context
  if (p.length >= 1) {
    if (c.length >= 1)
      return { icon: '🎯', text: 'Pivot is ' + b(p[0]) + '. Is ' + b(c[0]) + ' shorter than it? If so, it belongs on the left.' };
    return { icon: '🎯', text: 'Chose ' + b(p[0]) + ' as the pivot — the reference every other bar is measured against.' };
  }

  // 4) Comparing two bars
  if (c.length >= 2) {
    if (mergeLike)
      return { icon: '🧩', text: 'Merging two sorted groups — comparing their front bars ' + b(c[0]) + ' and ' + b(c[1] !== undefined ? c[1] : c[0]) + '; the shorter goes in next.' };
    if (algo === 'heap')
      return { icon: '🔍', text: 'Comparing a parent bar ' + b(c[0]) + ' with its child ' + b(c[1]) + ' to keep the tallest on top.' };
    return { icon: '🔍', text: 'Comparing neighbours ' + b(c[0]) + ' and ' + b(c[1]) + ' to see if they should swap.' };
  }

  // 5) Looking at a single bar
  if (c.length === 1) {
    if (algo === 'counting')
      return { icon: '🧮', text: 'Tallying the bar of height ' + b(c[0]) + ' (counting how many times it appears).' };
    if (algo === 'radix')
      return { icon: '🔢', text: 'Sorting ' + b(c[0]) + ' into a bucket by its current digit.' };
    return { icon: '🔍', text: 'Looking at the bar ' + b(c[0]) + '.' };
  }

  // 6) A bar picked / selected
  if (sel.length >= 1) {
    if (algo === 'insertion')
      return { icon: '✋', text: 'Picked up ' + b(sel[0]) + ' — now finding where it slots into the sorted left side.' };
    if (algo === 'selection')
      return { icon: '🔎', text: 'Scanning the unsorted bars for the shortest one (current pick: ' + b(sel[0]) + ').' };
    if (algo === 'shell')
      return { icon: '✋', text: 'Holding ' + b(sel[0]) + ' to compare it with a bar a gap away.' };
    if (algo === 'heap')
      return { icon: '🌲', text: 'Fixing the heap around the bar ' + b(sel[0]) + '.' };
    return { icon: '👉', text: 'Working with the bar ' + b(sel[0]) + '.' };
  }

  // 7) Nothing active — a section just got locked in
  if (algo === 'quick')
    return { icon: '✅', text: 'The pivot is now in its final place — every shorter bar is on its left, every taller bar on its right.' };
  if (countLike)
    return { icon: '📥', text: 'Placing the bars back into the array in sorted order.' };
  return { icon: '✅', text: 'This section is now in order — moving on to the next part.' };
}

function updateExplain(f) {
  const msg = narrateFrame(f);
  if (teachMode) {
    const extra = teachExtra(f);
    setExplain(msg.icon, msg.text + (extra ? ' <span class="teach-extra">' + extra + '</span>' : ''));
  } else {
    setExplain(msg.icon, msg.text);
  }
}

// Extra plain-English context shown only in Teach Mode, with running totals
// so a complete beginner understands *why* each step happens.
function teachExtra(f) {
  const r = rolesOf(f.states);
  if (r.swapping.length >= 2)
    return 'Swapping = the two bars trade places so the smaller value moves toward the left. Total swaps so far: ' + f.swp + '.';
  if (r.swapping.length === 1)
    return 'The bar is being moved into its new slot. Total moves so far: ' + f.swp + '.';
  if (r.pivot.length >= 1)
    return 'The pivot is the yardstick: smaller bars go to its left, larger to its right.';
  if (r.comparing.length >= 2)
    return 'Comparing means we only LOOK — nothing moves yet. We are checking which bar is bigger. Comparisons so far: ' + f.cmp + '.';
  if (r.comparing.length === 1)
    return 'We are inspecting this single bar. Comparisons so far: ' + f.cmp + '.';
  if (r.selected.length >= 1)
    return 'The highlighted bar is the one we are currently working with.';
  if (r.sorted.length >= 1)
    return 'Green bars are locked in their final, correct positions — they will not move again.';
  return '';
}



/* ═══════════════════════════════════════════════════════
   TEACH MODE — slows to 0.25×, sets 10 bars, runs a guided
   on-screen tour of the tools, then auto-plays the sort with
   comprehensive plain-English narration of every step.
═══════════════════════════════════════════════════════ */
function startTeachMode() {
  // stop any run in progress
  if (animTimer) { clearTimeout(animTimer); animTimer = null; }
  isRunning = false; isPaused = false; isSorted = false;
  frames = []; frameIdx = 0;
  setButtonStates(false);

  teachMode = true;
  document.getElementById('btnTeach')?.classList.add('active');

  // 10 bars
  const sizeSlider = document.getElementById('sizeSlider');
  if (sizeSlider) { sizeSlider.value = 10; onSizeChange(10); }

  // 0.25× speed (slider position 1)
  const speedSlider = document.getElementById('speedSlider');
  if (speedSlider) { speedSlider.value = 1; onSpeedChange(1); }

  // prefer the 3D view when it is available
  if (window.Viz3D && window.Viz3D.ready && !use3D) toggleDimension();

  startTour();
}

/* ── Guided tour (product-tour style spotlight) ── */
const tourSteps = [
  { sel: null, title: '🎓 Welcome to Teach Mode',
    body: 'I\'ve slowed everything to <b>0.25× speed</b> and shrunk the list to just <b>10 bars</b> so you can follow every single move. Here\'s a 30-second tour of the screen.' },
  { sel: '#algoList', title: '1 · Pick an algorithm',
    body: 'These are 10 different <b>recipes</b> for sorting. They all reach the same result but work very differently. <b>Bubble Sort</b> is chosen for you — it\'s the easiest to grasp.' },
  { sel: '#barCanvas', title: '2 · The bars',
    body: 'Each 3D block is one number — <b>taller means bigger</b>. Sorting just means rearranging them shortest-to-tallest, left to right. They\'ll glow as they\'re compared and moved.' },
  { sel: '.legend', title: '3 · What the colours mean',
    body: '<b>Amber</b> = being compared, <b>red</b> = being swapped, <b>cyan / purple</b> = a special bar being worked on, <b>green</b> = finished and locked in its correct spot.' },
  { sel: '#btnSort', title: '4 · Start & watch',
    body: 'This button starts the animation. I\'ll press it for you when the tour ends.' },
  { sel: '#btnPause', title: '5 · Pause & step',
    body: 'You can <b>Pause</b> at any moment, then use <b>Step</b> to advance one tiny operation at a time — ideal for studying a single move.' },
  { sel: '#speedGroup', title: '6 · Speed',
    body: 'It\'s set to <b>0.25×</b> (nice and slow) for you. Later, drag it right to speed things up once you\'re comfortable.' },
  { sel: '#sizeGroup', title: '7 · List size',
    body: 'Set to <b>10 bars</b> for teaching. Fewer bars are easier to follow; more bars look impressive but move fast.' },
  { sel: '#explainBar', title: '8 · The narrator',
    body: 'This is the heart of Teach Mode: it explains <b>every step in plain English</b> as it happens, with running totals of comparisons and swaps.' },
  { sel: '.pseudo-block', title: '9 · The recipe (pseudocode)',
    body: 'The algorithm written as simple numbered steps. The <b>highlighted line</b> shows exactly which instruction is running right now.' },
  { sel: '.header-stats', title: '10 · The score',
    body: 'These counters track how many <b>comparisons</b> and <b>swaps</b> the computer makes, plus the elapsed time.' },
  { sel: null, title: '✅ You\'re ready!',
    body: 'That\'s the whole screen. Press the button below and watch Bubble Sort work — I\'ll narrate every move at 0.25× speed. Enjoy!' },
];

let tourIdx = 0;
let tourActive = false;
let tourEls = null;

function buildTourEls() {
  if (tourEls) return tourEls;
  const backdrop = document.createElement('div');
  backdrop.className = 'tour-backdrop';
  const spot = document.createElement('div');
  spot.className = 'tour-spot';
  const card = document.createElement('div');
  card.className = 'tour-card';
  card.innerHTML =
    '<div class="tour-step" id="tourStepCount"></div>' +
    '<div class="tour-title" id="tourTitle"></div>' +
    '<div class="tour-body" id="tourBody"></div>' +
    '<div class="tour-actions">' +
      '<button class="tour-btn tour-skip" id="tourSkip">Skip tour</button>' +
      '<div class="tour-nav">' +
        '<button class="tour-btn tour-back" id="tourBack">← Back</button>' +
        '<button class="tour-btn tour-next" id="tourNext">Next →</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);
  document.body.appendChild(spot);
  document.body.appendChild(card);

  backdrop.addEventListener('click', () => endTour(false));
  card.querySelector('#tourSkip').addEventListener('click', () => endTour(false));
  card.querySelector('#tourBack').addEventListener('click', () => { if (tourIdx > 0) showTourStep(tourIdx - 1); });
  card.querySelector('#tourNext').addEventListener('click', () => {
    if (tourIdx < tourSteps.length - 1) showTourStep(tourIdx + 1);
    else endTour(true);
  });

  tourEls = { backdrop, spot, card };
  return tourEls;
}

function startTour() {
  buildTourEls();
  tourActive = true;
  tourIdx = 0;
  tourEls.backdrop.style.display = 'block';
  tourEls.spot.style.display = 'block';
  tourEls.card.style.display = 'block';
  document.body.classList.add('tour-on');
  showTourStep(0);
  window.addEventListener('resize', positionTour);
  window.addEventListener('scroll', positionTour, true);
}

function showTourStep(i) {
  tourIdx = i;
  const step = tourSteps[i];
  document.getElementById('tourStepCount').textContent = 'Step ' + (i + 1) + ' of ' + tourSteps.length;
  document.getElementById('tourTitle').innerHTML = step.title;
  document.getElementById('tourBody').innerHTML = step.body;
  document.getElementById('tourBack').style.visibility = i === 0 ? 'hidden' : 'visible';
  document.getElementById('tourNext').textContent = (i === tourSteps.length - 1) ? "Let's Sort! ▶" : 'Next →';
  positionTour();
}

function isElVisible(el) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.width > 1 && r.height > 1 && el.offsetParent !== null;
}

function positionTour() {
  if (!tourActive || !tourEls) return;
  const step = tourSteps[tourIdx];
  const { spot, card, backdrop } = tourEls;
  const el = step.sel ? document.querySelector(step.sel) : null;

  if (!el || !isElVisible(el)) {
    // centred message, fully dim the page (no spotlight)
    backdrop.classList.add('solid');
    spot.style.display = 'none';
    card.style.left = '50%';
    card.style.top = '50%';
    card.style.transform = 'translate(-50%, -50%)';
    return;
  }

  backdrop.classList.remove('solid');
  spot.style.display = 'block';
  card.style.transform = 'none';

  const r = el.getBoundingClientRect();
  const pad = 8;
  spot.style.left = Math.max(2, r.left - pad) + 'px';
  spot.style.top = Math.max(2, r.top - pad) + 'px';
  spot.style.width = (r.width + pad * 2) + 'px';
  spot.style.height = (r.height + pad * 2) + 'px';

  // try to scroll the target into view if it is off-screen
  if (r.top < 0 || r.bottom > window.innerHeight) {
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  const cardW = Math.min(340, window.innerWidth - 24);
  const cardH = card.offsetHeight || 190;
  const vw = window.innerWidth, vh = window.innerHeight;

  let left = Math.min(Math.max(12, r.left + r.width / 2 - cardW / 2), vw - cardW - 12);
  let top;
  if (r.bottom + 18 + cardH < vh) top = r.bottom + 18;
  else if (r.top - 18 - cardH > 0) top = r.top - 18 - cardH;
  else top = Math.max(12, vh - cardH - 12);

  card.style.left = left + 'px';
  card.style.top = top + 'px';
}

function endTour(startSorting) {
  tourActive = false;
  document.body.classList.remove('tour-on');
  if (tourEls) {
    tourEls.backdrop.style.display = 'none';
    tourEls.spot.style.display = 'none';
    tourEls.card.style.display = 'none';
  }
  window.removeEventListener('resize', positionTour);
  window.removeEventListener('scroll', positionTour, true);

  if (startSorting && !isRunning && !isSorted) {
    startSort();
  }
}
