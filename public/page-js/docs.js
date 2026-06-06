// NAV scroll
window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40));

// Mobile nav toggle
(function(){
  var nav=document.getElementById('navbar');
  if(!nav)return;
  var toggle=nav.querySelector('.nav-toggle');
  if(!toggle)return;
  function close(){nav.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');}
  toggle.addEventListener('click',function(){
    var open=nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded',open?'true':'false');
  });
  nav.querySelectorAll('.nav-links a').forEach(function(link){link.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();

// Accordion
function toggleCard(id){
  var card=document.getElementById(id);
  if(!card)return;
  card.classList.toggle('open');
}

// Smooth TOC active state on scroll
var sections=document.querySelectorAll('.doc-section');
var tocLinks=document.querySelectorAll('.toc-list a');
var observer=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var id=e.target.getAttribute('id');
      tocLinks.forEach(function(a){
        a.classList.toggle('active',a.getAttribute('href')==='#'+id);
      });
    }
  });
},{rootMargin:'-20% 0px -70% 0px',threshold:0});
sections.forEach(function(s){observer.observe(s);});

// Race bar animation trigger on scroll
var raceSection=document.querySelector('.race-section');
var raceAnimated=false;
var raceObserver=new IntersectionObserver(function(entries){
  if(entries[0].isIntersecting&&!raceAnimated){
    raceAnimated=true;
    document.querySelectorAll('.race-bar').forEach(function(bar){
      bar.style.animationPlayState='running';
    });
  }
},{threshold:0.3});
if(raceSection)raceObserver.observe(raceSection);

// Pause race bar animations until visible
document.querySelectorAll('.race-bar').forEach(function(bar){
  bar.style.animationPlayState='paused';
});



/* ═══════════════════════════════════════════════════════════════
   PLAIN-ENGLISH ANALOGIES + REAL CODE (Python / Java / C++)
   Lets a reader pick the language they understand and read a
   layman explanation of every algorithm.
═══════════════════════════════════════════════════════════════ */
var PLAIN_ENGLISH = {
  'alg-bubble': "Think of bubbles in a fizzy drink — the biggest bubble keeps floating to the top. Bubble Sort looks at two side-by-side numbers, and if the left one is bigger it swaps them. After each pass, the largest number left has \u201Cfloated\u201D to the end.",
  'alg-insertion': "Exactly like sorting playing cards in your hand. You pick up one card at a time and slide it to the left until it sits in the right place among the cards you\u2019ve already tidied up.",
  'alg-selection': "Like lining kids up by height: each round you scan everyone still unsorted, find the shortest one, and put them next in line. Simple, but you always scan the whole leftover group.",
  'alg-merge': "Keep splitting the pile in half until every piece has just one number (a single number is already \u201Csorted\u201D). Then zip the small sorted piles back together two at a time, always grabbing the smaller front number first.",
  'alg-quick': "Pick one number to be the \u201Creference\u201D (the pivot). Push everything smaller to its left and everything bigger to its right \u2014 now the pivot sits in its final spot. Then do the very same trick on the left group and the right group.",
  'alg-heap': "Arrange the numbers like a family tree where every parent is bigger than its children, so the biggest sits on top. Take the top off and move it to the end, fix the tree, and repeat until everything is placed.",
  'alg-shell': "Insertion Sort with a head-start. First it tidies numbers that sit far apart, then closer and closer together, so big values can jump most of the way across the list early instead of crawling one step at a time.",
  'alg-counting': "No comparing at all \u2014 it just tallies how many times each value shows up (like counting votes), then writes the numbers back out in order straight from the tallies. Brilliant for small whole numbers.",
  'alg-radix': "Sort by one digit at a time, starting from the last digit (ones, then tens, then hundreds) \u2014 just like sorting a stack of forms by ZIP code one digit column at a time.",
  'alg-tim': "The clever real-world mix that Python and Java actually use. It spots stretches that are already in order, tidies short stretches with Insertion Sort, then merges them like Merge Sort. That\u2019s why it\u2019s so fast on everyday, partly-sorted data.",
};

var CODE_SNIPPETS = {
  'alg-bubble': {
    python: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        swapped = False\n        for j in range(n - 1 - i):\n            if arr[j] > arr[j + 1]:\n                # left is bigger -> swap them\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:        # already sorted, stop early\n            break\n    return arr",
    java: "void bubbleSort(int[] a) {\n    int n = a.length;\n    for (int i = 0; i < n - 1; i++) {\n        boolean swapped = false;\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (a[j] > a[j + 1]) {       // left is bigger -> swap\n                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n                swapped = true;\n            }\n        }\n        if (!swapped) break;             // already sorted\n    }\n}",
    cpp: "void bubbleSort(vector<int>& a) {\n    int n = a.size();\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (a[j] > a[j + 1]) {       // left is bigger -> swap\n                swap(a[j], a[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break;             // already sorted\n    }\n}",
  },
  'alg-insertion': {
    python: "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]            # the card we pick up\n        j = i - 1\n        # slide bigger cards one step right\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key        # drop the card in its slot\n    return arr",
    java: "void insertionSort(int[] a) {\n    for (int i = 1; i < a.length; i++) {\n        int key = a[i], j = i - 1;   // card we pick up\n        // slide bigger cards one step right\n        while (j >= 0 && a[j] > key) {\n            a[j + 1] = a[j];\n            j--;\n        }\n        a[j + 1] = key;              // drop it in place\n    }\n}",
    cpp: "void insertionSort(vector<int>& a) {\n    for (int i = 1; i < (int)a.size(); i++) {\n        int key = a[i], j = i - 1;   // card we pick up\n        // slide bigger cards one step right\n        while (j >= 0 && a[j] > key) {\n            a[j + 1] = a[j];\n            j--;\n        }\n        a[j + 1] = key;              // drop it in place\n    }\n}",
  },
  'alg-selection': {
    python: "def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        # find the smallest in the unsorted part\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        # put it at the front of the unsorted part\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr",
    java: "void selectionSort(int[] a) {\n    int n = a.length;\n    for (int i = 0; i < n; i++) {\n        int min = i;\n        // find the smallest in the unsorted part\n        for (int j = i + 1; j < n; j++)\n            if (a[j] < a[min]) min = j;\n        // put it at the front of the unsorted part\n        int t = a[i]; a[i] = a[min]; a[min] = t;\n    }\n}",
    cpp: "void selectionSort(vector<int>& a) {\n    int n = a.size();\n    for (int i = 0; i < n; i++) {\n        int min = i;\n        // find the smallest in the unsorted part\n        for (int j = i + 1; j < n; j++)\n            if (a[j] < a[min]) min = j;\n        // put it at the front of the unsorted part\n        swap(a[i], a[min]);\n    }\n}",
  },
  'alg-merge': {
    python: "def merge_sort(arr):\n    if len(arr) <= 1:           # one item is already sorted\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]: # take the smaller front item\n            result.append(left[i]); i += 1\n        else:\n            result.append(right[j]); j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
    java: "void mergeSort(int[] a, int l, int r) {\n    if (l >= r) return;            // one item is sorted\n    int mid = (l + r) / 2;\n    mergeSort(a, l, mid);\n    mergeSort(a, mid + 1, r);\n    merge(a, l, mid, r);\n}\n\nvoid merge(int[] a, int l, int mid, int r) {\n    int[] tmp = new int[r - l + 1];\n    int i = l, j = mid + 1, k = 0;\n    while (i <= mid && j <= r)     // take smaller front item\n        tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];\n    while (i <= mid) tmp[k++] = a[i++];\n    while (j <= r)   tmp[k++] = a[j++];\n    System.arraycopy(tmp, 0, a, l, tmp.length);\n}",
    cpp: "void merge(vector<int>& a, int l, int mid, int r) {\n    vector<int> tmp;\n    int i = l, j = mid + 1;\n    while (i <= mid && j <= r)     // take smaller front item\n        tmp.push_back(a[i] <= a[j] ? a[i++] : a[j++]);\n    while (i <= mid) tmp.push_back(a[i++]);\n    while (j <= r)   tmp.push_back(a[j++]);\n    for (int k = 0; k < (int)tmp.size(); k++) a[l + k] = tmp[k];\n}\n\nvoid mergeSort(vector<int>& a, int l, int r) {\n    if (l >= r) return;            // one item is sorted\n    int mid = (l + r) / 2;\n    mergeSort(a, l, mid);\n    mergeSort(a, mid + 1, r);\n    merge(a, l, mid, r);\n}",
  },
  'alg-quick': {
    python: "def quick_sort(arr, lo=0, hi=None):\n    if hi is None:\n        hi = len(arr) - 1\n    if lo < hi:\n        p = partition(arr, lo, hi)   # pivot lands in final spot\n        quick_sort(arr, lo, p - 1)   # sort smaller side\n        quick_sort(arr, p + 1, hi)   # sort bigger side\n    return arr\n\ndef partition(arr, lo, hi):\n    pivot = arr[hi]                  # reference value\n    i = lo - 1\n    for j in range(lo, hi):\n        if arr[j] <= pivot:          # smaller -> move left\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]\n    return i + 1",
    java: "void quickSort(int[] a, int lo, int hi) {\n    if (lo < hi) {\n        int p = partition(a, lo, hi);  // pivot in final spot\n        quickSort(a, lo, p - 1);       // smaller side\n        quickSort(a, p + 1, hi);       // bigger side\n    }\n}\n\nint partition(int[] a, int lo, int hi) {\n    int pivot = a[hi], i = lo - 1;     // reference value\n    for (int j = lo; j < hi; j++) {\n        if (a[j] <= pivot) {           // smaller -> move left\n            i++;\n            int t = a[i]; a[i] = a[j]; a[j] = t;\n        }\n    }\n    int t = a[i + 1]; a[i + 1] = a[hi]; a[hi] = t;\n    return i + 1;\n}",
    cpp: "int partition(vector<int>& a, int lo, int hi) {\n    int pivot = a[hi], i = lo - 1;     // reference value\n    for (int j = lo; j < hi; j++)\n        if (a[j] <= pivot)             // smaller -> move left\n            swap(a[++i], a[j]);\n    swap(a[i + 1], a[hi]);\n    return i + 1;\n}\n\nvoid quickSort(vector<int>& a, int lo, int hi) {\n    if (lo < hi) {\n        int p = partition(a, lo, hi);  // pivot in final spot\n        quickSort(a, lo, p - 1);       // smaller side\n        quickSort(a, p + 1, hi);       // bigger side\n    }\n}",
  },
  'alg-heap': {
    python: "def heap_sort(arr):\n    n = len(arr)\n    # build a max-heap (biggest on top)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    # take the top off one by one\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(arr, i, 0)\n    return arr\n\ndef heapify(arr, n, i):\n    largest = i\n    l, r = 2 * i + 1, 2 * i + 2\n    if l < n and arr[l] > arr[largest]: largest = l\n    if r < n and arr[r] > arr[largest]: largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)",
    java: "void heapSort(int[] a) {\n    int n = a.length;\n    // build a max-heap (biggest on top)\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);\n    // take the top off one by one\n    for (int i = n - 1; i > 0; i--) {\n        int t = a[0]; a[0] = a[i]; a[i] = t;\n        heapify(a, i, 0);\n    }\n}\n\nvoid heapify(int[] a, int n, int i) {\n    int largest = i, l = 2 * i + 1, r = 2 * i + 2;\n    if (l < n && a[l] > a[largest]) largest = l;\n    if (r < n && a[r] > a[largest]) largest = r;\n    if (largest != i) {\n        int t = a[i]; a[i] = a[largest]; a[largest] = t;\n        heapify(a, n, largest);\n    }\n}",
    cpp: "void heapify(vector<int>& a, int n, int i) {\n    int largest = i, l = 2 * i + 1, r = 2 * i + 2;\n    if (l < n && a[l] > a[largest]) largest = l;\n    if (r < n && a[r] > a[largest]) largest = r;\n    if (largest != i) {\n        swap(a[i], a[largest]);\n        heapify(a, n, largest);\n    }\n}\n\nvoid heapSort(vector<int>& a) {\n    int n = a.size();\n    // build a max-heap (biggest on top)\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);\n    // take the top off one by one\n    for (int i = n - 1; i > 0; i--) {\n        swap(a[0], a[i]);\n        heapify(a, i, 0);\n    }\n}",
  },
  'alg-shell': {
    python: "def shell_sort(arr):\n    n = len(arr)\n    gap = n // 2\n    while gap > 0:                  # shrink the gap each round\n        for i in range(gap, n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j - gap] > temp:\n                arr[j] = arr[j - gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2\n    return arr",
    java: "void shellSort(int[] a) {\n    int n = a.length;\n    for (int gap = n / 2; gap > 0; gap /= 2) {   // shrink gap\n        for (int i = gap; i < n; i++) {\n            int temp = a[i], j = i;\n            while (j >= gap && a[j - gap] > temp) {\n                a[j] = a[j - gap];\n                j -= gap;\n            }\n            a[j] = temp;\n        }\n    }\n}",
    cpp: "void shellSort(vector<int>& a) {\n    int n = a.size();\n    for (int gap = n / 2; gap > 0; gap /= 2) {   // shrink gap\n        for (int i = gap; i < n; i++) {\n            int temp = a[i], j = i;\n            while (j >= gap && a[j - gap] > temp) {\n                a[j] = a[j - gap];\n                j -= gap;\n            }\n            a[j] = temp;\n        }\n    }\n}",
  },
  'alg-counting': {
    python: "def counting_sort(arr):\n    if not arr:\n        return arr\n    max_val = max(arr)\n    count = [0] * (max_val + 1)\n    for x in arr:               # tally each value\n        count[x] += 1\n    k = 0\n    for value, freq in enumerate(count):\n        for _ in range(freq):   # write values back in order\n            arr[k] = value\n            k += 1\n    return arr",
    java: "void countingSort(int[] a) {\n    int max = 0;\n    for (int x : a) max = Math.max(max, x);\n    int[] count = new int[max + 1];\n    for (int x : a) count[x]++;        // tally each value\n    int k = 0;\n    for (int v = 0; v <= max; v++)     // write back in order\n        while (count[v]-- > 0) a[k++] = v;\n}",
    cpp: "void countingSort(vector<int>& a) {\n    int mx = *max_element(a.begin(), a.end());\n    vector<int> count(mx + 1, 0);\n    for (int x : a) count[x]++;        // tally each value\n    int k = 0;\n    for (int v = 0; v <= mx; v++)      // write back in order\n        while (count[v]-- > 0) a[k++] = v;\n}",
  },
  'alg-radix': {
    python: "def radix_sort(arr):\n    if not arr:\n        return arr\n    max_val = max(arr)\n    exp = 1\n    while max_val // exp > 0:        # one digit column at a time\n        counting_by_digit(arr, exp)\n        exp *= 10\n    return arr\n\ndef counting_by_digit(arr, exp):\n    n = len(arr)\n    output = [0] * n\n    count = [0] * 10\n    for x in arr:\n        count[(x // exp) % 10] += 1\n    for i in range(1, 10):\n        count[i] += count[i - 1]\n    for i in range(n - 1, -1, -1):\n        d = (arr[i] // exp) % 10\n        output[count[d] - 1] = arr[i]\n        count[d] -= 1\n    arr[:] = output",
    java: "void radixSort(int[] a) {\n    int max = 0;\n    for (int x : a) max = Math.max(max, x);\n    for (int exp = 1; max / exp > 0; exp *= 10)  // digit by digit\n        countingByDigit(a, exp);\n}\n\nvoid countingByDigit(int[] a, int exp) {\n    int n = a.length;\n    int[] output = new int[n], count = new int[10];\n    for (int x : a) count[(x / exp) % 10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n    for (int i = n - 1; i >= 0; i--) {\n        int d = (a[i] / exp) % 10;\n        output[--count[d]] = a[i];\n    }\n    System.arraycopy(output, 0, a, 0, n);\n}",
    cpp: "void countingByDigit(vector<int>& a, int exp) {\n    int n = a.size();\n    vector<int> output(n), count(10, 0);\n    for (int x : a) count[(x / exp) % 10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n    for (int i = n - 1; i >= 0; i--) {\n        int d = (a[i] / exp) % 10;\n        output[--count[d]] = a[i];\n    }\n    a = output;\n}\n\nvoid radixSort(vector<int>& a) {\n    int mx = *max_element(a.begin(), a.end());\n    for (int exp = 1; mx / exp > 0; exp *= 10)   // digit by digit\n        countingByDigit(a, exp);\n}",
  },
  'alg-tim': {
    python: "# Python's built-in sorted() / list.sort() IS TimSort.\n# A simplified version of the idea:\nRUN = 32\n\ndef tim_sort(arr):\n    n = len(arr)\n    # 1) tidy small chunks with insertion sort\n    for start in range(0, n, RUN):\n        end = min(start + RUN - 1, n - 1)\n        for i in range(start + 1, end + 1):\n            key, j = arr[i], i - 1\n            while j >= start and arr[j] > key:\n                arr[j + 1] = arr[j]; j -= 1\n            arr[j + 1] = key\n    # 2) merge the chunks together\n    size = RUN\n    while size < n:\n        for left in range(0, n, 2 * size):\n            mid = min(left + size - 1, n - 1)\n            right = min(left + 2 * size - 1, n - 1)\n            if mid < right:\n                merged = sorted(arr[left:right + 1])\n                arr[left:right + 1] = merged\n        size *= 2\n    return arr",
    java: "// Java's Arrays.sort(Object[]) / Collections.sort() ARE TimSort.\nstatic final int RUN = 32;\n\nvoid timSort(int[] a) {\n    int n = a.length;\n    // 1) tidy small chunks with insertion sort\n    for (int i = 0; i < n; i += RUN)\n        insertionSort(a, i, Math.min(i + RUN - 1, n - 1));\n    // 2) merge the chunks together\n    for (int size = RUN; size < n; size *= 2)\n        for (int left = 0; left < n; left += 2 * size) {\n            int mid = Math.min(left + size - 1, n - 1);\n            int right = Math.min(left + 2 * size - 1, n - 1);\n            if (mid < right) merge(a, left, mid, right);\n        }\n}\n// uses insertionSort(a, lo, hi) and merge(a, l, mid, r) shown above",
    cpp: "// C++: std::sort is IntroSort; std::stable_sort is close to TimSort.\nconst int RUN = 32;\n\nvoid timSort(vector<int>& a) {\n    int n = a.size();\n    // 1) tidy small chunks with insertion sort\n    for (int i = 0; i < n; i += RUN)\n        insertionRange(a, i, min(i + RUN - 1, n - 1));\n    // 2) merge the chunks together\n    for (int size = RUN; size < n; size *= 2)\n        for (int left = 0; left < n; left += 2 * size) {\n            int mid = min(left + size - 1, n - 1);\n            int right = min(left + 2 * size - 1, n - 1);\n            if (mid < right) merge(a, left, mid, right);\n        }\n}\n// uses insertionRange(a, lo, hi) and merge(a, l, mid, r) shown above",
  },
};

var LANG_LABELS = { python: 'Python', java: 'Java', cpp: 'C++' };

function getDocsLang() {
  try { return localStorage.getItem('sv_docs_lang') || 'python'; } catch (e) { return 'python'; }
}
function setDocsLang(lang) {
  try { localStorage.setItem('sv_docs_lang', lang); } catch (e) {}
}

// Tiny, safe highlighter: escape HTML then grey out comments.
function highlightCode(code) {
  var s = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  s = s.replace(/(#[^\n]*)/g, '<span class="cmt">$1</span>');
  s = s.replace(/(\/\/[^\n]*)/g, '<span class="cmt">$1</span>');
  return s;
}

function renderDocsLang(lang) {
  // Update every code block
  document.querySelectorAll('.code-switch').forEach(function (block) {
    var algo = block.getAttribute('data-algo');
    var snippet = CODE_SNIPPETS[algo] && CODE_SNIPPETS[algo][lang];
    if (snippet == null) return;
    var codeEl = block.querySelector('code');
    if (codeEl) codeEl.innerHTML = highlightCode(snippet);
    block.querySelectorAll('.cs-tab').forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-lang') === lang);
    });
  });
  // Update the global toolbar
  document.querySelectorAll('.lg-btn').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
}

function chooseDocsLang(lang) {
  if (!LANG_LABELS[lang]) return;
  setDocsLang(lang);
  renderDocsLang(lang);
}

function buildCodeSwitcher(algoId) {
  var wrap = document.createElement('div');
  wrap.className = 'code-switch';
  wrap.setAttribute('data-algo', algoId);
  var tabs = '';
  ['python', 'java', 'cpp'].forEach(function (l) {
    tabs += '<button type="button" class="cs-tab" data-lang="' + l + '">' + LANG_LABELS[l] + '</button>';
  });
  wrap.innerHTML =
    '<div class="code-switch-head">' +
      '<span class="cs-label">&lt;/&gt; Code</span>' +
      '<div class="cs-tabs">' + tabs + '</div>' +
    '</div>' +
    '<pre class="cs-code"><code></code></pre>';
  // Tab clicks must not toggle the surrounding accordion card
  wrap.querySelectorAll('.cs-tab').forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      chooseDocsLang(t.getAttribute('data-lang'));
    });
  });
  return wrap;
}

function buildPlainCallout(text) {
  var el = document.createElement('div');
  el.className = 'plain-callout';
  el.innerHTML =
    '<div class="plain-callout-head"><span class="plain-ico">🟢</span> In plain English</div>' +
    '<p class="plain-callout-text">' + text + '</p>';
  return el;
}

function initDocsLanguageFeature() {
  if (!document.getElementById('algorithms')) return; // only on docs page

  // 1) Global language toolbar, inserted at the top of the algorithms section
  var section = document.getElementById('algorithms');
  if (section && !section.querySelector('.lang-global')) {
    var bar = document.createElement('div');
    bar.className = 'lang-global';
    var btns = '';
    ['python', 'java', 'cpp'].forEach(function (l) {
      btns += '<button type="button" class="lg-btn" data-lang="' + l + '">' + LANG_LABELS[l] + '</button>';
    });
    bar.innerHTML =
      '<span class="lang-global-label">👩‍💻 Show every code example in:</span>' +
      '<div class="lang-global-tabs">' + btns + '</div>';
    bar.querySelectorAll('.lg-btn').forEach(function (b) {
      b.addEventListener('click', function () { chooseDocsLang(b.getAttribute('data-lang')); });
    });
    // place it right after the intro paragraph of the section
    var introP = section.querySelector('.doc-p');
    if (introP && introP.nextSibling) {
      introP.parentNode.insertBefore(bar, introP.nextSibling);
    } else {
      section.appendChild(bar);
    }
  }

  // 2) For each algorithm card: add plain-English callout + real code switcher
  Object.keys(CODE_SNIPPETS).forEach(function (algoId) {
    var card = document.getElementById(algoId);
    if (!card) return;
    var body = card.querySelector('.algo-deep-body');
    if (!body || body.querySelector('.code-switch')) return;

    // Plain-English callout goes first inside the body
    if (PLAIN_ENGLISH[algoId]) {
      body.insertBefore(buildPlainCallout(PLAIN_ENGLISH[algoId]), body.firstChild);
    }

    // Replace the old pseudocode mini-block if present, else append the switcher
    var switcher = buildCodeSwitcher(algoId);
    var pseudo = body.querySelector('.pseudo-mini');
    if (pseudo) {
      // swap the "Pseudocode" label text to "Code" for the column it lives in
      var col = pseudo.closest('.ada-col');
      if (col) {
        var lbl = col.querySelector('.ada-label');
        if (lbl) lbl.textContent = 'Code';
      }
      pseudo.parentNode.replaceChild(switcher, pseudo);
    } else {
      // condensed cards (shell/counting/radix): insert before the "Watch" link
      var link = body.querySelector('a[href="/visualiser"]');
      if (link) body.insertBefore(switcher, link);
      else body.appendChild(switcher);
    }
  });

  renderDocsLang(getDocsLang());
}

initDocsLanguageFeature();
