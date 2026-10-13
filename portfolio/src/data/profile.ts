export const PROFILE = {
  name: "hi, i'm tejas",
  tagline:
    'a machine learning engineer who builds retrieval systems and autonomous agents, then measures them hard enough to report when the clever part did not help',
  email: 'shivaprasad.t@northeastern.edu',
  phone: '+1 (617) 708-2809',
  phoneHref: 'tel:+16177082809',
  github: 'https://github.com/TejaShiv',
  linkedin: 'https://www.linkedin.com/in/tejas-shivaprasad-a216a427a',
};

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// Links that leave this build. The site is served at /portfolio/, so "../"
// is the root site and "../learntej/" is the curriculum.
export const SITE_LINKS = [
  { label: 'Main site', href: '../' },
  { label: 'LearnTej', href: '../learntej/' },
];

// Newest first. `stat` is the headline number already stated in `desc`.
export type Role = {
  date: string;
  role: string;
  org: string;
  desc: string;
  current?: boolean;
  stat?: { value: string; label: string };
};

export const EXPERIENCE: Role[] = [
  {
    date: 'Jun 2024 to Oct 2024',
    stat: { value: '30', label: 'interns across 5 teams' },
    role: 'Artificial Intelligence Intern Head',
    org: 'Nuevera Infotech Pvt Ltd, Bengaluru, Remote',
    desc: 'Led five teams totalling thirty interns to ship an AI powered real estate chatbot for a live client in Python, Rasa and Flask. Owned requirements gathering, sprint planning and delivery, and architected the NLP intent and entity extraction pipelines. Ran weekly code reviews and technical workshops across all five teams and triaged blockers to hold the schedule, coordinating remotely across Microsoft Teams, Discord and Google Meet.',
  },
  {
    date: 'Jul 2022 to Mar 2025',
    stat: { value: '500+', label: 'forum members, 3 years' },
    role: 'President, SecureTech Cybersecurity Forum',
    org: 'Global Academy of Technology, Bengaluru',
    desc: 'Led a 500 plus member student cybersecurity forum for three years, managing an executive committee and the annual calendar. Organised more than twenty workshops, guest lectures and hackathons, owning budgets, speaker outreach and vendor coordination end to end.',
  },
  {
    date: '2024',
    stat: { value: '1st', label: 'author, INDIACom 2024' },
    role: 'First author, IEEE INDIACom',
    org: 'Multi-layered honeypot architecture research',
    desc: 'Published Enhancing Network Security through a Multi-layered Honeypot Architecture with Integrated Network Monitoring Tools at the 11th International Conference on Computing for Sustainable Global Development. Proposed a layered defence framework combining honeypots with network monitoring for threat detection and mitigation.',
  },
];

export const ABOUT_TEXT =
  'I am an MS Computer Science candidate at Northeastern, graduating May 2027. My work sits where retrieval systems, autonomous agents and security engineering overlap, and the thread running through all of it is measurement. The patent engine was built on the assumption that metadata filtering would cut latency, and the benchmark said it would not, because query encoding is a fixed cost that dominates everything downstream. The test repair agent reached 39 of 40 on QuixBugs and the more useful finding was catching it satisfy a weak assertion with a hardcoded value. The anomaly detection pipeline was slow because of file I O rather than the model, which only showed up under a profiler. I would rather ship the uncomfortable result than the flattering one, so most of what is here comes with the number that proves whether the design choice was worth it.';

export const EDUCATION = [
  {
    dates: '2025 to 2027',
    degree: 'MS, Computer Science',
    school: 'Northeastern University, Khoury College of Computer Sciences',
    note: 'Boston, MA',
  },
  {
    dates: '2021 to 2025',
    degree: 'BTech, Computer Science and Engineering',
    school: 'Global Academy of Technology, Bengaluru',
  },
];

// `href` links to the credential; entries without one have no public proof yet.
export const CERTIFICATIONS: { name: string; href?: string; status?: string }[] = [
  {
    name: 'IEEE INDIACom 2024, first author',
    href: 'https://ieeexplore.ieee.org/document/10498895',
  },
  { name: 'CPR, First Aid and AED certified' },
];

const GH = 'https://github.com/TejaShiv/';

export type WorkCard = {
  number: string;
  name: string;
  category: string;
  repo: string;
  description: string;
  stats: string[];
  tags: string[];
};

export const WORK: WorkCard[] = [
  {
    number: '01',
    name: 'Agentic Test-Repair System',
    category: 'AI Agents / Program Repair',
    repo: `${GH}agentic-test-repair-system`,
    description:
      'An autonomous agent that runs a test suite, localises the fault from captured output, patches source through LLM calls and reruns to verify the repair held. The control loop is written directly against the API rather than through an orchestration framework, so every retry boundary and validation gate is explicit instead of inherited from a library default. Scope is restricted at the file level, so the agent may edit source but never the tests, which closes the degenerate solution of rewriting the assertion instead of fixing the bug. The headline number comes with a caveat: QuixBugs is old enough and simple enough that its bugs are likely in training data, so it evidences a working loop rather than reasoning. The more useful finding came from watching it work, when it was caught satisfying a weak assertion by hardcoding the expected value, which establishes that automation quality is bounded by specification quality.',
    stats: ['39 of 40 pass@1', 'Bounded retries', 'Source edits only, never tests'],
    tags: ['Python', 'Gemini API', 'pytest', 'AI Agents', 'Automated Program Repair', 'Evaluation'],
  },
  {
    number: '02',
    name: 'Patent Search Engine',
    category: 'Information Retrieval / Search',
    repo: `${GH}patent-search-engine`,
    description:
      'Hybrid retrieval over 640 vehicle patent applications spread across 64 weekly files with eight fields each. BM25 was implemented by hand rather than imported, so every scoring decision from IDF weighting through saturation and length normalisation is explainable line by line. Keyword relevance is blended with bi-encoder semantic similarity under a tunable weight, which is what lets a query for airless tire surface a patent that only ever says non-pneumatic. Metadata filtering narrows the candidate pool and a cross-encoder re-ranks a shortlist in a second pass. Claims text corrupted by upstream XML parsing was detected using a signature that separates genuine damage from valid patent reference numerals, then flagged rather than repaired or dropped, because silently rewriting legal claim language is the wrong failure mode for patent data.',
    stats: ['640 patents, 64 weekly files', 'Query encoding fixed at 13ms', '18x over corpus scoring'],
    tags: ['Python', 'BM25', 'sentence-transformers', 'Cross-encoder', 'Information Retrieval', 'Benchmarking'],
  },
  {
    number: '03',
    name: 'VIAIT Network Anomaly Detection',
    category: 'Security / Machine Learning',
    repo: `${GH}Network-Analysis-and-Visualization`,
    description:
      'Machine learning anomaly detection across the CSE-CIC-IDS2018 corpus, more than sixteen million network traffic records, classified at over 95 percent accuracy. The model was the straightforward part. The pipeline took thirty minutes per run and the working assumption was that inference was the bottleneck, so it was profiled with cProfile before anything was optimised. The cost turned out to be file I O rather than the model. Chunked reading cut the run to under two minutes, and accuracy was revalidated afterwards rather than assumed unchanged, because an optimisation that quietly alters results is not an optimisation.',
    stats: ['16M+ flow records', '95%+ accuracy', '30 minutes to under 2'],
    tags: ['Python', 'Pandas', 'scikit-learn', 'cProfile', 'Anomaly Detection', 'Network Forensics'],
  },
  {
    number: '04',
    name: 'REST Country Data Platform',
    category: 'Full-stack / Cloud',
    repo: `${GH}rest-country-platform`,
    description:
      'Full-stack platform with a React and TypeScript frontend against a Go REST API defined by an OpenAPI specification, so the contract between the two is a document rather than an assumption. Local development runs through Docker Compose, with Redis caching in front of the data layer and Prometheus and Grafana dashboards covering API latency and deploy health. GitHub Actions ships to AWS App Runner with health gating. Kubernetes was considered and deliberately rejected, because App Runner is the right abstraction for a single service at this scale and the heavier tool would have added operational surface without buying anything.',
    stats: ['47 zero-downtime deploys', 'OpenAPI contract', 'Redis, Prometheus, Grafana'],
    tags: ['Go', 'React', 'TypeScript', 'Docker', 'AWS', 'Redis', 'CI/CD', 'OpenAPI'],
  },
  {
    number: '05',
    name: 'LearnTej Learning Portal',
    category: 'Content Recovery / Static Site',
    repo: 'https://tejashiv.github.io/learntej',
    description:
      'A workshop published a 25,000 word generative AI curriculum, then took it down. The site had been archived hours before deletion. It had been compiled into a JavaScript bundle, and three extraction attempts failed before one worked, because the whole curriculum turned out to be a single markdown document embedded as a template literal that earlier string filtering had rejected for being too punctuation heavy. Written permission was secured from the publisher, the portal was rebranded and rebuilt as a static site, and dated material such as model pricing and benchmark tables was removed rather than republished because it was already stale.',
    stats: ['25,000 words recovered', 'Extracted from a JS bundle', 'Permission secured in writing'],
    tags: ['JavaScript', 'Static Site', 'GitHub Pages', 'Content Recovery', 'Frontend'],
  },
  {
    number: '06',
    name: 'Solar Mapper',
    category: 'Geospatial / Data Pipelines',
    repo: `${GH}solar-mapper`,
    description:
      'A Django application that maps US commercial sites on an interactive Leaflet surface and estimates their solar potential through the NREL PVWatts and Solar Resource APIs. Built on a re-runnable ingestion pipeline with a per site status state machine, so a site that failed geocoding, failed an API call or returned implausible output lands in a distinct state rather than silently disappearing from the map. Re-running retries only what actually failed. The principle throughout is that bad data should be visible as bad data rather than absent.',
    stats: ['Per-site status state machine', 'NREL PVWatts and Solar Resource', 'Re-runnable ingestion'],
    tags: ['Python', 'Django', 'Leaflet', 'REST APIs', 'Data Pipelines', 'Geospatial'],
  },
  {
    number: '07',
    name: 'SecureFile',
    category: 'Security / Cryptography',
    repo: `${GH}SecureFile`,
    description:
      'Secure file storage and sharing built on end to end Fernet encryption with SHA-256 integrity verification, blockchain backed tamper detection and role based access control. Key handling is explicit rather than left to library defaults, and integrity is verified on read rather than trusted, so a modified file is detected at access time instead of being silently served.',
    stats: ['Fernet end-to-end encryption', 'SHA-256 integrity on read', 'Role based access control'],
    tags: ['Python', 'Flask', 'SQLAlchemy', 'Fernet', 'SHA-256', 'RBAC', 'Security'],
  },
  {
    number: '08',
    name: 'Rockledge',
    category: 'iOS / SwiftUI / Transit',
    repo: 'https://github.com/TejaShiv/Rockledge',
    description:
      'A personal iPhone application in daily use, covering four things that each had a bad answer elsewhere: health and activity tracking, a grocery list that survives a shopping trip, a shared flat chore rota, and live MBTA arrivals for the stop at the end of the road. Built in SwiftUI with the interface designed end to end. The transit module reads the live vehicle feed rather than a timetable, because the two disagree often enough to matter when it is cold.',
    stats: ['Four modules in daily use', 'Live MBTA vehicle feed', 'SwiftUI end to end'],
    tags: ['Swift', 'SwiftUI', 'Xcode', 'iOS', 'Frontend'],
  },
  {
    number: '09',
    name: 'Multi-layered Honeypot Architecture',
    category: 'Security Research / IEEE',
    repo: 'https://ieeexplore.ieee.org/document/10498895',
    description:
      'First author peer reviewed research proposing a layered honeypot defence framework combined with integrated network monitoring tools for threat detection and mitigation. Published at the 11th International Conference on Computing for Sustainable Global Development and available on IEEE Xplore. Honeypots sit at the centre of a theme that recurs across this work, which is instrumenting a system so what actually happens becomes measurable rather than assumed.',
    stats: ['First author', 'IEEE INDIACom 2024', 'Published on IEEE Xplore'],
    tags: ['Security', 'Honeypots', 'Network Monitoring', 'Research', 'Publication'],
  },
];
