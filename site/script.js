// ===== Data =====

const tickerLines = [
  { text: "[PATENT-SEARCH] 640 vehicle patents across 64 weekly files, hybrid BM25 and bi-encoder retrieval", sev: "ok" },
  { text: "[PROFILE] query encoding is a fixed 13ms cost, dominating full-corpus scoring by 18x", sev: "high" },
  { text: "[QUIXBUGS] 39 of 40 pass@1, bounded retries, source edits permitted but never test edits", sev: "ok" },
  { text: "[AUDIT] agent caught satisfying a weak assertion with a hardcoded value, scope tightened", sev: "high" },
  { text: "[VIAIT] 16M+ flow records from CSE-CIC-IDS2018 classified at 95%+ accuracy", sev: "ok" },
  { text: "[CPROFILE] bottleneck traced to file I/O rather than inference, 30min run cut to under 2min", sev: "high" },
  { text: "[DATA-QUALITY] XML-corrupted claims text flagged, not repaired and not dropped", sev: "high" },
  { text: "[DEPLOY] 47 zero-downtime releases to AWS App Runner with health gating", sev: "ok" },
  { text: "[IEEE] multi-layered honeypot architecture published at INDIACom 2024, first author", sev: "ok" },
  { text: "[SECUREFILE] Fernet end-to-end encryption, SHA-256 integrity verified on read, RBAC", sev: "ok" },
  { text: "[SOLAR-MAPPER] per-site status state machine, failures surface instead of disappearing", sev: "ok" },
  { text: "[LEARNTEJ] 25,000-word curriculum recovered from a JavaScript bundle and redeployed", sev: "ok" },
  { text: "[NUEVERA] 5 teams, 30 interns, one AI real estate chatbot shipped to a live client", sev: "ok" },
  { text: "[SECURETECH] 500+ member forum led for three years, 20+ workshops and hackathons run", sev: "ok" },
];

const projects = [
  {
    id: "CASE-09",
    title: "Agentic Test-Repair System",
    tags: ["Python", "Gemini API", "pytest", "AI Agents", "Automated Program Repair", "Evaluation", "LLM"],
    desc: "An autonomous agent that runs a test suite, localises the fault from captured output, patches source through LLM calls, and reruns to verify the repair held. The control loop is written directly against the API rather than through an orchestration framework, so every retry boundary and validation gate is explicit instead of inherited from a library default. Scope is restricted at the file level: the agent may edit source but never the tests, which closes the degenerate solution of rewriting the assertion instead of fixing the bug. It reached 39 of 40 pass@1 on QuixBugs, reported alongside the caveat that the benchmark's bugs are simple and old enough to be well represented in training data, so the number evidences a working loop rather than reasoning ability. The more useful finding came from watching it work: the agent was caught satisfying a weak assertion by hardcoding the expected value, which establishes that automation quality is bounded by specification quality.",
    date: "2026",
    link: "https://github.com/TejaShiv/agentic-test-repair-system",
  },
  {
    id: "CASE-08",
    title: "Patent Search Engine: Hybrid Retrieval with Cross-Encoder Re-Ranking",
    tags: ["Python", "BM25", "sentence-transformers", "Cross-encoder", "Information Retrieval", "Benchmarking", "NumPy"],
    desc: "Hybrid retrieval over 640 vehicle patent applications spread across 64 weekly files with eight fields each. BM25 was implemented by hand rather than imported, so every scoring decision from IDF weighting through saturation and length normalisation is explainable line by line. Keyword relevance is blended with bi-encoder semantic similarity under a tunable weight, which is what lets a query for airless tire surface a patent that only ever says non-pneumatic. The expectation going in was that metadata filtering would cut latency; measurement said otherwise. Query encoding is a fixed 13ms cost that dominates full-corpus scoring by roughly 18x, and the cross-encoder scores a fixed number of candidates regardless of pool size, so filtering changes which documents are eligible rather than how many receive the expensive treatment. The latency lever is re-ranking depth. Separately, claims text corrupted by upstream XML parsing was detected using a signature that distinguishes genuine damage from valid patent reference numerals, and flagged rather than repaired or dropped, because silently rewriting legal claim language is the wrong failure mode for patent data.",
    date: "2026",
    link: "https://github.com/TejaShiv/patent-search-engine",
  },
  {
    id: "CASE-07",
    title: "Solar Mapper: NREL-Backed Site Potential Estimation",
    tags: ["Python", "Django", "Leaflet", "REST APIs", "Data Pipelines", "Geospatial"],
    desc: "A Django application that maps US commercial sites on an interactive Leaflet surface and estimates their solar potential through the NREL PVWatts and Solar Resource APIs. Built on a re-runnable ingestion pipeline with a per-site status state machine, so a site that failed geocoding, failed an API call, or returned implausible output lands in a distinct state rather than silently disappearing from the map. Re-running the pipeline retries only what actually failed. The design principle throughout is that bad data should be visible as bad data, not absent.",
    date: "2026",
    link: "https://github.com/TejaShiv/solar-mapper",
  },
  {
    id: "CASE-06",
    title: "LearnTej: Recovering a Portal That Existed for One Day",
    tags: ["JavaScript", "Static Site", "GitHub Pages", "Content Recovery", "Frontend"],
    desc: "A workshop published a 25,000-word generative AI curriculum, then took it down. The site had been archived hours before deletion. It had been compiled into a JavaScript bundle, and three extraction attempts failed before one worked: the whole curriculum turned out to be a single markdown document embedded as a template literal, which earlier string-filtering passes had rejected for being too punctuation-heavy. Written permission was secured from the publisher, the portal was rebranded and rebuilt as a static site, and dated material such as model pricing, benchmark tables and market statistics was removed rather than republished, because it was already stale. ",
    date: "2026",
    link: "https://tejashiv.github.io/learntej",
  },
  {
    id: "CASE-05",
    title: "Rockledge: Personal iOS App",
    tags: ["Swift", "SwiftUI", "Xcode", "iOS", "Frontend"],
    desc: "A personal iPhone application in daily use, covering four things that each had a bad answer elsewhere: health and activity tracking, a grocery list that survives a shopping trip, a shared flat chore rota, and live MBTA arrivals for the stop at the end of the road. Built in SwiftUI with the interface designed end to end. The MBTA module reads the live feed rather than a timetable, because the timetable and the bus disagree often enough to matter when it is cold. Built because the alternative was four apps that each did one of these badly, and because a tool used every day surfaces design problems that a demo never will.",
    date: "2026",
    link: "https://github.com/TejaShiv/Rockledge",
  },
  {
    id: "CASE-04",
    title: "REST Country Data Platform: Go API, React Frontend, Zero-Downtime CI/CD",
    tags: ["Go", "React", "TypeScript", "Docker", "AWS", "Redis", "Prometheus", "Grafana", "CI/CD", "OpenAPI"],
    desc: "Full-stack platform with a React and TypeScript frontend against a Go REST API defined by an OpenAPI specification, so the contract between the two is a document rather than an assumption. Local development runs through Docker Compose, with Redis caching in front of the data layer and Prometheus and Grafana dashboards covering API latency and deploy health. GitHub Actions ships to AWS App Runner with health gating, and 47 zero-downtime deployments have gone through that path. Kubernetes was considered and deliberately rejected: App Runner is the right abstraction for a single service at this scale, and the heavier tool would have added operational surface without buying anything.",
    date: "2025",
    link: "https://github.com/TejaShiv/rest-country-platform",
  },
  {
    id: "CASE-03",
    title: "VIAIT: Network Anomaly Detection over 16M Flow Records",
    tags: ["Python", "Pandas", "scikit-learn", "cProfile", "Anomaly Detection", "Network Forensics", "Security"],
    desc: "Machine learning anomaly detection across the CSE-CIC-IDS2018 corpus, more than sixteen million network traffic records, classified at over 95% accuracy. The model was the straightforward part. The pipeline took thirty minutes per run and the working assumption was that inference was the bottleneck, so it was profiled with cProfile before anything was optimised. The cost turned out to be file I/O, not the model. Chunked reading cut the run to under two minutes, and accuracy was revalidated afterwards rather than assumed unchanged, because an optimisation that quietly alters results is not an optimisation.",
    date: "2024",
    link: "https://github.com/TejaShiv/Network-Analysis-and-Visualization",
  },
  {
    id: "CASE-02",
    title: "SecureFile: Encrypted Storage with Tamper Detection",
    tags: ["Python", "Flask", "SQLAlchemy", "Fernet", "SHA-256", "RBAC", "Security", "Cryptography"],
    desc: "Secure file storage and sharing built on end-to-end Fernet encryption with SHA-256 integrity verification, blockchain-backed tamper detection, and role-based access control. Key handling is explicit rather than left to library defaults, and integrity is verified on read rather than trusted, so a modified file is detected at access time instead of silently served.",
    date: "2024",
    link: "https://github.com/TejaShiv/SecureFile",
  },
  {
    id: "CASE-01",
    title: "Multi-layered Honeypot Architecture: IEEE INDIACom 2024",
    tags: ["Security", "Honeypots", "Network Monitoring", "Research", "Publication"],
    desc: "First-author peer-reviewed research proposing a layered honeypot defence framework combined with integrated network monitoring tools for threat detection and mitigation. Published at the 11th International Conference on Computing for Sustainable Global Development and available on IEEE Xplore. Honeypots sit at the centre of a theme that recurs across this work: instrumenting a system so that what actually happens becomes measurable rather than assumed.",
    date: "2024",
    link: "https://ieeexplore.ieee.org/document/10498895",
  },
];

// Derived from the projects array so these never drift when a case is added.
const caseCount = projects.length;
const caseNumber = p => Number(p.id.replace("CASE-", ""));
const maxCase = Math.max(...projects.map(caseNumber));
const caseRange = `open [1-${maxCase}]`;
const projectsTitle = document.getElementById("projectsTitle");
if (projectsTitle) projectsTitle.textContent = `${caseCount} builds, from hybrid retrieval to autonomous agents`;

const experience = [
  {
    date: "2025 - 2027",
    role: "MS, Computer Science",
    org: "Northeastern University, Khoury College &middot; Boston, MA",
    desc: "Graduate coursework across programming design paradigms, algorithms, computer networking, network security, cloud computing and web development, alongside independent work on retrieval systems and autonomous agents. Open to spring and summer 2027 roles, and summer new grad openings.",
  },
  {
    date: "Jun 2024 - Oct 2024",
    role: "Artificial Intelligence Intern Head",
    org: "Nuevera Infotech Pvt Ltd &middot; Bengaluru, Remote",
    desc: "Led five teams totalling thirty interns to ship an AI-powered real estate chatbot for a live client in Python, Rasa and Flask. Owned requirements gathering, sprint planning and delivery, and architected the NLP intent and entity extraction pipelines. Ran weekly code reviews and technical workshops across all five teams and triaged blockers to hold the schedule.",
  },
  {
    date: "Jul 2022 - Mar 2025",
    role: "President, SecureTech Cybersecurity Forum",
    org: "Global Academy of Technology &middot; Bengaluru, India",
    desc: "Led a 500-plus member student cybersecurity forum for three years, managing an executive committee and the annual calendar. Organised more than twenty workshops, guest lectures and hackathons, owning budgets, speaker outreach and vendor coordination end to end.",
  },
  {
    date: "2024",
    role: "First author, IEEE INDIACom",
    org: "Multi-layered honeypot architecture research",
    desc: "Published Enhancing Network Security through a Multi-layered Honeypot Architecture with Integrated Network Monitoring Tools at the 11th International Conference on Computing for Sustainable Global Development, IEEE Xplore.",
  },
  {
    date: "Jan 2021 - Jul 2025",
    role: "BTech, Computer Science and Engineering",
    org: "Global Academy of Technology &middot; Bengaluru, India",
    desc: "Bachelor of Technology in Computer Science and Engineering.",
  },
];

const stack = [
  {
    group: "Retrieval & Search",
    items: [
      { name: "BM25 / hybrid retrieval", level: 92 },
      { name: "Embeddings / semantic search", level: 90 },
      { name: "Cross-encoder re-ranking", level: 85 },
      { name: "Evaluation & benchmarking", level: 88 },
    ],
  },
  {
    group: "AI & Agents",
    items: [
      { name: "LLM APIs / tool calling", level: 86 },
      { name: "AI agents / RAG", level: 84 },
      { name: "PyTorch / TensorFlow", level: 76 },
      { name: "scikit-learn", level: 88 },
    ],
  },
  {
    group: "Languages",
    items: [
      { name: "Python", level: 95 },
      { name: "JavaScript / TypeScript", level: 82 },
      { name: "Go", level: 72 },
      { name: "Java / C / SQL", level: 75 },
    ],
  },
  {
    group: "Backend & Cloud",
    items: [
      { name: "Flask / Django", level: 86 },
      { name: "React / Node.js", level: 78 },
      { name: "Docker / AWS", level: 80 },
      { name: "GitHub Actions CI/CD", level: 82 },
    ],
  },
  {
    group: "Data & Profiling",
    items: [
      { name: "Pandas / NumPy", level: 90 },
      { name: "cProfile / optimisation", level: 85 },
      { name: "PostgreSQL / SQLite", level: 80 },
      { name: "Redis / Prometheus / Grafana", level: 75 },
    ],
  },
  {
    group: "Security",
    items: [
      { name: "Honeypot architecture", level: 88 },
      { name: "Network traffic analysis", level: 84 },
      { name: "Intrusion & anomaly detection", level: 86 },
      { name: "Fernet / SHA-256 / RBAC", level: 80 },
    ],
  },
];

// ===== Render =====

function renderTicker() {
  const build = () => tickerLines
    .map(l => `<span class="${l.sev === 'high' ? 'sev-high' : 'sev-ok'}">${l.text}</span>`)
    .join("");
  document.getElementById("tickerA").innerHTML = build();
  document.getElementById("tickerB").innerHTML = build();
}

function renderProjects() {
  const grid = document.getElementById("caseGrid");
  grid.innerHTML = projects.map((p, i) => `
    <article class="case-card reveal" data-index="${i}" data-tags="${p.tags.join("|")}" tabindex="0" role="button" aria-label="Open details for ${p.title}">
      <span class="case-id">${p.id} &middot; ${p.date}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="case-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <a class="case-link" href="${p.link}" target="_blank" rel="noopener">View repository &rarr;</a>
    </article>
  `).join("");

  grid.querySelectorAll(".case-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".case-link")) return;
      openModal(projects[Number(card.dataset.index)]);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openModal(projects[Number(card.dataset.index)]);
    });
  });
}

function renderFilterBar() {
  const bar = document.getElementById("filterBar");
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  bar.innerHTML = `<button class="filter-chip active" data-tag="all">All</button>` +
    allTags.map(t => `<button class="filter-chip" data-tag="${t}">${t}</button>`).join("");

  bar.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      bar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const tag = chip.dataset.tag;
      const cards = document.querySelectorAll(".case-card");

      cards.forEach(card => card.classList.add("filtering-out"));

      setTimeout(() => {
        let visibleIndex = 0;
        cards.forEach(card => {
          const tags = card.dataset.tags.split("|");
          const show = tag === "all" || tags.includes(tag);
          card.classList.toggle("hidden-by-filter", !show);
          if (show) {
            card.style.transitionDelay = Math.min(visibleIndex, 6) * 40 + "ms";
            visibleIndex++;
          }
        });
        requestAnimationFrame(() => {
          cards.forEach(card => card.classList.remove("filtering-out"));
        });
      }, 180);
    });
  });
}

function openModal(p) {
  document.getElementById("modalId").textContent = `${p.id} \u00b7 ${p.date}`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalTags").innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  document.getElementById("modalLink").href = p.link;
  const overlay = document.getElementById("modalOverlay");
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("is-open"));
  });
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  const finish = () => { overlay.hidden = true; };
  if (prefersReduced) {
    finish();
  } else {
    setTimeout(finish, 280);
  }
}

function initModal() {
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function renderTimeline() {
  const tl = document.getElementById("timeline");
  tl.innerHTML = experience.map(e => `
    <div class="tl-item reveal">
      <span class="tl-date">${e.date}</span>
      <div>
        <p class="tl-role">${e.role}</p>
        <p class="tl-org">${e.org}</p>
        <p class="tl-desc">${e.desc}</p>
      </div>
    </div>
  `).join("");
}

function renderStack() {
  const grid = document.getElementById("stackGrid");
  grid.innerHTML = stack.map(s => `
    <div class="stack-group reveal">
      <h4>${s.group}</h4>
      <ul>
        ${s.items.map(i => `
          <li class="skill-row">
            <div class="skill-row-top"><span>${i.name}</span></div>
            <div class="skill-meter"><div class="skill-meter-fill" data-level="${i.level}"></div></div>
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

function initSkillMeters() {
  const fills = document.querySelectorAll(".skill-meter-fill");
  if (!("IntersectionObserver" in window)) {
    fills.forEach(f => f.style.width = f.dataset.level + "%");
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + "%";
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => io.observe(f));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");

  const groups = new Map();
  els.forEach(el => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach(siblings => {
    siblings.forEach((el, i) => {
      const delay = Math.min(i, 6) * 70;
      el.style.transitionDelay = delay + "ms";
    });
  });

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ===== Greeter =====

const greeting = `Nine cases in the log. Hybrid retrieval, an agent that patches its own test failures, and sixteen million packets that turned out to be an I/O problem. Pick one.`;

let typeSpeechToken = 0;

function typeSpeech(text, el, speed = 18) {
  const myToken = ++typeSpeechToken;
  let shown = 0;
  let last = null;
  let carry = 0;

  function frame(now) {
    if (myToken !== typeSpeechToken) return;
    if (last === null) last = now;

    carry += now - last;
    last = now;

    const step = Math.floor(carry / speed);
    if (step > 0) {
      carry -= step * speed;
      shown = Math.min(text.length, shown + step);
      el.textContent = text.slice(0, shown);
    }

    if (shown < text.length) {
      requestAnimationFrame(frame);
    }
  }

  el.textContent = "";
  requestAnimationFrame(frame);
}

function typeSpeechLegacy(text, el, speed = 22) {
  const myToken = ++typeSpeechToken;
  el.textContent = "";
  let i = 0;
  const tick = () => {
    if (myToken !== typeSpeechToken) return;
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(tick, speed);
    }
  };
  tick();
}

function playAvatarVideo() {
  const video = document.getElementById("avatarVideo");
  if (!video) return;
  try {
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {});
  } catch (e) {}
}

function startGreetingSpeech() {
  const speechEl = document.getElementById("speechText");
  if (!speechEl) return;
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  typeSpeech(greeting, speechEl, prefersReduced ? 0 : 22);
}

function initGreeter() {
  const avatarBtn = document.getElementById("avatarBtn");
  const contactPill = document.querySelector(".contact-pill");

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  avatarBtn.addEventListener("click", (e) => {
    if (e.target.closest(".contact-pill")) return;
    playAvatarVideo();
    startGreetingSpeech();
  });

  if (contactPill) {
    contactPill.addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("contact").scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    });
  }
}

// ===== Terminal =====

function tprint(body, text, cls) {
  const line = document.createElement("div");
  line.className = "tline" + (cls ? " " + cls : "");
  line.innerHTML = text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
}

const terminalCommands = {
  help: () => `Commands: <span class="thl">about</span>, <span class="thl">projects</span>, <span class="thl">experience</span>, <span class="thl">stack</span>, <span class="thl">contact</span>, <span class="thl">whoami</span>, <span class="thl">${caseRange}</span>, <span class="thl">clear</span>`,
  about: () => "MS Computer Science @ Northeastern, graduating May 2027. Retrieval systems, agentic AI and security engineering. IEEE first author on honeypot architecture.",
  whoami: () => "tejas-shivaprasad &middot; ml and security engineering &middot; open to spring and summer 2027 roles, and summer new grad",
  projects: () => `${caseCount} cases logged. Type <span class="thl">${caseRange}</span> for a case, or scroll to Project Log.`,
  experience: () => "Nuevera Infotech (AI Intern Head, 5 teams and 30 interns), SecureTech Forum President (500+ members, 3 years), IEEE INDIACom 2024 first author. The Experience section has the timeline.",
  stack: () => "Python, Go, TypeScript, BM25, sentence-transformers, cross-encoders, PyTorch, scikit-learn, Pandas, Flask, Django, React, Docker, AWS, Redis. The Stack section has the breakdown.",
  contact: () => "shivaprasad.t@northeastern.edu &middot; linkedin.com/in/tejas-shivaprasad-a216a427a &middot; github.com/TejaShiv",
  sudo: () => "Nice try. Access denied: this terminal only reads public data.",
};

function runCommand(raw, body) {
  const cmd = raw.trim();
  if (!cmd) return;
  tprint(body, cmd, "tcmd");

  if (cmd === "clear") {
    body.innerHTML = "";
    return;
  }

  const openMatch = cmd.match(/^open\s+(\d+)/i);
  if (openMatch) {
    const match = projects.find(p => caseNumber(p) === Number(openMatch[1]));
    if (match) {
      openModal(match);
      tprint(body, `Opening ${match.id}: ${match.title}...`);
    } else {
      tprint(body, `No case with that number. Try a number from open 1 to open ${maxCase}.`, "terr");
    }
    return;
  }

  const key = cmd.toLowerCase();
  if (terminalCommands[key]) {
    tprint(body, terminalCommands[key]());
  } else {
    tprint(body, `Command not found: ${cmd}. Type <span class="thl">help</span>.`, "terr");
  }
}

function initTerminal() {
  const input = document.getElementById("terminalInput");
  const body = document.getElementById("terminalBody");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(input.value, body);
      input.value = "";
    }
  });

  body.addEventListener("click", (e) => {
    const target = e.target.closest(".thl");
    if (!target) return;
    const cmd = target.textContent.trim();
    if (cmd === caseRange) {
      runCommand(`open ${maxCase}`, body);
    } else {
      runCommand(cmd, body);
    }
    input.focus();
  });
}

// ===== Scrollspy =====

function initScrollspy() {
  const links = document.querySelectorAll("#topnav a");
  const sections = Array.from(links)
    .map(l => document.getElementById(l.dataset.section))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.dataset.section === entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(s => io.observe(s));
}

// ===== Interactive network web (hero) =====

function initNetworkGraph() {
  const canvas = document.getElementById("netCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const LINE = "45, 212, 191";
  const DOT = "94, 234, 212";
  const ALERT = "232, 162, 61";

  const LINK_DIST = 132;
  const MAX_LINKS = 2;
  const CURSOR_DIST = 210;
  const CURSOR_LINK_DIST = 190;
  const PULL = 0.075;

  const IMPULSE_DAMP = 0.92;
  const SPEED_MIN = 0.15;
  const SPEED_MAX = 0.35;

  const AREA_PER_NODE = 14000;
  const COUNT_MIN = 30;
  const COUNT_MAX = 120;

  const ZONE_PAD = 16;
  const ZONE_MARGIN = 54;
  const ZONE_PUSH = 0.1;

  const SEP_DIST = 74;
  const SEP_PUSH = 0.05;

  let w = 0, h = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const ZONE_SELECTORS = [".hero-inner", ".laptop-showcase"];
  let zones = [];

  function measureZones() {
    const cr = canvas.getBoundingClientRect();
    zones = ZONE_SELECTORS
      .map(sel => document.querySelector(sel))
      .filter(el => el && el.getBoundingClientRect().width > 0)
      .map(el => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - cr.left - ZONE_PAD,
          y: r.top - cr.top - ZONE_PAD,
          w: r.width + ZONE_PAD * 2,
          h: r.height + ZONE_PAD * 2,
        };
      });
  }

  function inZone(x, y) {
    for (const z of zones) {
      if (x > z.x && x < z.x + z.w && y > z.y && y < z.y + z.h) return z;
    }
    return null;
  }

  function openArea() {
    let taken = 0;
    for (const z of zones) {
      taken += Math.max(0, Math.min(z.w, w)) * Math.max(0, Math.min(z.h, h));
    }
    return Math.max(w * h - taken, w * h * 0.15);
  }

  function zoneSteer(n) {
    for (const z of zones) {
      const hx = z.w / 2 + ZONE_MARGIN;
      const hy = z.h / 2 + ZONE_MARGIN;
      const dx = n.x - (z.x + z.w / 2);
      const dy = n.y - (z.y + z.h / 2);
      const ox = 1 - Math.abs(dx) / hx;
      const oy = 1 - Math.abs(dy) / hy;
      if (ox <= 0 || oy <= 0) continue;
      if (ox < oy) n.ivx += (dx >= 0 ? 1 : -1) * ox * ZONE_PUSH;
      else n.ivy += (dy >= 0 ? 1 : -1) * oy * ZONE_PUSH;
    }
  }

  function evictFromZone(n) {
    const z = inZone(n.x, n.y);
    if (!z) return;
    const dLeft = n.x - z.x;
    const dRight = z.x + z.w - n.x;
    const dTop = n.y - z.y;
    const dBottom = z.y + z.h - n.y;
    const min = Math.min(dLeft, dRight, dTop, dBottom);
    if (min === dLeft) { n.x = z.x; n.bvx = -Math.abs(n.bvx); n.ivx = 0; }
    else if (min === dRight) { n.x = z.x + z.w; n.bvx = Math.abs(n.bvx); n.ivx = 0; }
    else if (min === dTop) { n.y = z.y; n.bvy = -Math.abs(n.bvy); n.ivy = 0; }
    else { n.y = z.y + z.h; n.bvy = Math.abs(n.bvy); n.ivy = 0; }
  }

  resize();
  measureZones();

  function openSpot() {
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      if (!inZone(x, y)) return { x, y };
    }
    return { x: Math.random() * w, y: Math.random() * h };
  }

  function makeNode() {
    const spot = openSpot();
    const angle = Math.random() * Math.PI * 2;
    const speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    return {
      x: spot.x,
      y: spot.y,
      bvx: Math.cos(angle) * speed,
      bvy: Math.sin(angle) * speed,
      ivx: 0,
      ivy: 0,
      pulse: Math.random() * Math.PI * 2,
      alert: Math.random() < 0.1,
      lit: 0,
    };
  }

  function targetCount() {
    const n = Math.round(openArea() / AREA_PER_NODE);
    return Math.min(Math.max(n, COUNT_MIN), COUNT_MAX);
  }

  const nodes = [];
  function syncCount() {
    const target = targetCount();
    while (nodes.length < target) nodes.push(makeNode());
    if (nodes.length > target) nodes.length = target;
    if (degree.length < nodes.length) degree = new Uint8Array(nodes.length);
  }

  let degree = new Uint8Array(COUNT_MAX);
  const pairs = [];

  syncCount();

  window.addEventListener("resize", () => { resize(); measureZones(); syncCount(); });

  const pointer = { x: 0, y: 0, active: false };
  const ripples = [];

  function projectPointer(e) {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    const inBounds =
      pointer.x > -60 && pointer.x < w + 60 &&
      pointer.y > -60 && pointer.y < h + 60;
    pointer.active = inBounds && !inZone(pointer.x, pointer.y);
  }

  function bindPointer() {
    window.addEventListener("pointermove", projectPointer, { passive: true });
    window.addEventListener("pointerleave", () => { pointer.active = false; }, { passive: true });
    window.addEventListener("pointerdown", (e) => {
      projectPointer(e);
      if (pointer.active) ripples.push({ x: pointer.x, y: pointer.y, r: 0 });
    }, { passive: true });
  }

  function drawStrand(ax, ay, bx, by, opacity, width) {
    ctx.strokeStyle = "rgba(" + LINE + ", " + opacity + ")";
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  function strandClear(ax, ay, bx, by) {
    return !inZone((ax + bx) / 2, (ay + by) / 2)
      && !inZone(ax + (bx - ax) * 0.25, ay + (by - ay) * 0.25)
      && !inZone(ax + (bx - ax) * 0.75, ay + (by - ay) * 0.75);
  }

  function step() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > SEP_DIST * SEP_DIST || d2 < 0.01) continue;
        const d = Math.sqrt(d2);
        const f = (1 - d / SEP_DIST) * SEP_PUSH;
        const ux = dx / d, uy = dy / d;
        a.ivx += ux * f; a.ivy += uy * f;
        b.ivx -= ux * f; b.ivy -= uy * f;
      }
    }

    for (const n of nodes) {
      zoneSteer(n);

      if (pointer.active) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CURSOR_DIST && dist > 0.5) {
          const force = (1 - dist / CURSOR_DIST) * PULL;
          n.ivx += (dx / dist) * force;
          n.ivy += (dy / dist) * force;
          n.lit = Math.max(n.lit, 1 - dist / CURSOR_DIST);
        }
      }

      for (const rp of ripples) {
        const dx = n.x - rp.x;
        const dy = n.y - rp.y;
        const dist = Math.hypot(dx, dy);
        const band = Math.abs(dist - rp.r);
        if (band < 34 && dist > 0.5) {
          const force = (1 - band / 34) * 0.5;
          n.ivx += (dx / dist) * force;
          n.ivy += (dy / dist) * force;
          n.lit = Math.max(n.lit, 1 - band / 34);
        }
      }

      n.ivx *= IMPULSE_DAMP;
      n.ivy *= IMPULSE_DAMP;

      n.x += n.bvx + n.ivx;
      n.y += n.bvy + n.ivy;

      const m = 12;
      if (n.x < -m) n.x = w + m;
      else if (n.x > w + m) n.x = -m;
      if (n.y < -m) n.y = h + m;
      else if (n.y > h + m) n.y = -m;

      evictFromZone(n);

      n.pulse += 0.02;
      n.lit *= 0.93;
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].r += 7;
      if (ripples[i].r > Math.hypot(w, h)) ripples.splice(i, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    pairs.length = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist >= LINK_DIST) continue;
        if (!strandClear(a.x, a.y, b.x, b.y)) continue;
        pairs.push({ i: i, j: j, dist: dist });
      }
    }
    pairs.sort((p, q) => p.dist - q.dist);

    degree.fill(0);
    for (const p of pairs) {
      if (degree[p.i] >= MAX_LINKS || degree[p.j] >= MAX_LINKS) continue;
      degree[p.i]++;
      degree[p.j]++;
      const a = nodes[p.i], b = nodes[p.j];
      const base = (1 - p.dist / LINK_DIST) * 0.34;
      const boost = Math.max(a.lit, b.lit);
      drawStrand(a.x, a.y, b.x, b.y, base + boost * 0.45, 1 + boost * 0.8);
    }

    if (pointer.active) {
      for (const n of nodes) {
        const dist = Math.hypot(pointer.x - n.x, pointer.y - n.y);
        if (dist >= CURSOR_LINK_DIST) continue;
        if (!strandClear(pointer.x, pointer.y, n.x, n.y)) continue;
        const t = 1 - dist / CURSOR_LINK_DIST;
        drawStrand(pointer.x, pointer.y, n.x, n.y, t * 0.6, 0.9 + t);
      }
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + DOT + ", 0.95)";
      ctx.fill();
    }

    for (const rp of ripples) {
      const fade = Math.max(0, 1 - rp.r / Math.hypot(w, h));
      ctx.strokeStyle = "rgba(" + LINE + ", " + (fade * 0.3) + ")";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (const n of nodes) {
      const r = n.alert ? 2.6 + Math.sin(n.pulse) * 1.2 : 1.9 + n.lit * 1.8;
      ctx.beginPath();
      ctx.arc(n.x, n.y, Math.max(r, 0.6), 0, Math.PI * 2);
      ctx.fillStyle = n.alert
        ? "rgba(" + ALERT + ", " + (0.6 + Math.sin(n.pulse) * 0.3) + ")"
        : "rgba(" + DOT + ", " + (0.55 + n.lit * 0.45) + ")";
      ctx.fill();
    }
  }

  if (prefersReduced) {
    draw();
    return;
  }

  bindPointer();

  let rafId = 0;
  let onScreen = true;
  let tick = 0;

  function frame() {
    if (tick++ % 30 === 0) { measureZones(); syncCount(); }
    step();
    draw();
    rafId = requestAnimationFrame(frame);
  }
  function start() {
    if (!rafId && onScreen && !document.hidden) rafId = requestAnimationFrame(frame);
  }
  function stop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) start(); else stop();
    }, { threshold: 0 }).observe(canvas);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });

  start();
}

// ===== Text motion =====

const SCRAMBLE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*+-_";

function scrambleIn(el, speed = 1.6) {
  const text = el.dataset.text || el.textContent;
  el.dataset.text = text;
  el.setAttribute("aria-label", text);

  el.style.minHeight = el.offsetHeight + "px";

  let frame = 0;
  function tick() {
    const settled = Math.floor(frame / speed);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (i < settled || ch === " ") {
        out += ch;
      } else if (i < settled + 6) {
        out += SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
      }
    }
    el.textContent = out;
    frame++;
    if (settled <= text.length) requestAnimationFrame(tick);
    else { el.textContent = text; el.style.minHeight = ""; }
  }
  tick();
}

function splitWords(el) {
  if (el.dataset.split === "1") return;
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute("aria-label", el.textContent.trim());
  el.textContent = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.style.transitionDelay = Math.min(i * 28, 700) + "ms";
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "1";
}

function initTextFX() {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const role = document.getElementById("heroRole");
  if (role) {
    splitWords(role);
  }

  if (!("IntersectionObserver" in window)) return;
  const titles = Array.from(document.querySelectorAll(".section-title, .eyebrow"))
    .filter(el => !el.closest(".hero"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      scrambleIn(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  titles.forEach(t => io.observe(t));
}

renderTicker();
renderProjects();
renderFilterBar();
renderTimeline();
renderStack();
initReveal();
initSkillMeters();
initGreeter();
initTerminal();
initModal();
initScrollspy();
try { initNetworkGraph(); } catch (e) { console.error("network web failed:", e); }
try { initTextFX(); } catch (e) { console.error("text fx failed:", e); }
initIntro();

function initIntro() {
  const overlay = document.getElementById("introOverlay");

  if (!overlay) {
    initHeroIntro();
    return;
  }

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadySeen = false;

  if (prefersReduced || alreadySeen) {
    overlay.remove();
    initHeroIntro();
    return;
  }

  const linesEl = document.getElementById("introLines");
  const skipEl = document.querySelector(".intro-skip");
  const bootLines = [
    { text: "$ initiating portfolio.sys", cls: "icmd" },
    { text: `[OK] loading ${caseCount} case files`, cls: "iok" },
    { text: "[OK] establishing signal", cls: "iok" },
    { text: "[OK] access granted<span class=\"isignal\">, welcome</span>", cls: "iok" },
  ];

  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    sessionStorage.setItem("introSeen", "1");
    overlay.classList.add("intro-out");
    initHeroIntro();
    setTimeout(() => overlay.remove(), 550);
  }

  bootLines.forEach((line, i) => {
    const div = document.createElement("div");
    div.className = "iline " + line.cls;
    div.innerHTML = line.text;
    linesEl.appendChild(div);
    setTimeout(() => div.classList.add("in"), 220 * i + 120);
  });

  setTimeout(() => { if (skipEl) skipEl.classList.add("in"); }, 200);

  overlay.addEventListener("click", dismiss);
  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    dismiss();
  }, { once: true });
  window.addEventListener("wheel", dismiss, { once: true, passive: true });
  window.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dismiss();
  }, { once: true, passive: false });

  const totalTime = 10000;
  setTimeout(dismiss, totalTime);
}

function initHeroIntro() {
  const nameEl = document.getElementById("heroNameType");
  const caretEl = document.getElementById("heroNameCaret");
  const stages = document.querySelectorAll(".hero-stage");
  if (!nameEl) return;

  const fullName = "Tejas Shivaprasad";
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealStages() {
    stages.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), i * 90);
    });
    const eyebrow = document.getElementById("heroEyebrow");
    if (eyebrow) scrambleIn(eyebrow);
    const role = document.getElementById("heroRole");
    if (role) setTimeout(() => role.classList.add("words-in"), 220);
    playAvatarVideo();
    startGreetingSpeech();
  }

  if (prefersReduced) {
    nameEl.textContent = fullName;
    if (caretEl) caretEl.classList.add("done");
    stages.forEach(el => el.classList.add("in"));
    playAvatarVideo();
    startGreetingSpeech();
    return;
  }

  let i = 0;
  function typeNext() {
    if (i <= fullName.length) {
      nameEl.textContent = fullName.slice(0, i);
      i++;
      setTimeout(typeNext, 65);
    } else {
      if (caretEl) caretEl.classList.add("done");
      revealStages();
    }
  }
  typeNext();
}
