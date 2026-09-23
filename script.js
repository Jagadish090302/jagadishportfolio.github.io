const DEFAULTS = {
  name: 'JAGADISH B',
  headline: 'Electronics & Communication Engineering Graduate',
  summary: 'Electronics and Communication Engineering graduate with strong analytical skills, a solid academic foundation, and the ability to adapt quickly to new technologies. Experienced in data research, validation, reporting, quality checks, and process-driven team environments.',
  about: 'A practical, process-oriented profile with experience in financial market data research and quality assurance, backed by engineering education and software testing exposure.',
  degreeYear: '2019 — 2023',
  cgpa: '7.8',
  expRole: 'Research Analyst',
  expCompany: 'Exchange Data International · Vellore',
  expDate: 'April 2026 — Aug 2026',
  exp1: 'Researched, validated, and maintained financial market data with high accuracy.',
  exp2: 'Used Microsoft Excel and Microsoft 365 tools for data processing and reporting.',
  exp3: 'Collaborated with team members using Microsoft Teams.',
  exp4: 'Worked on the Columba System to manage, update, and validate financial datasets.',
  exp5: 'Performed quality checks to ensure data accuracy and consistency.',
  exp6: 'Followed company SOPs while meeting daily productivity and quality targets.',
  currentRole: 'AI Data Annotation',
  currentCompany: 'AI Data Annotation Project',
  currentDate: 'Present',
  currentDescription: 'Currently working on AI data annotation and language-quality tasks for Tamil and English, including audio transcription, QA/review of AI training data, and Tamil voice data collection.',
  skillsProgramming: 'Java',
  skillsDatabase: 'SQL · MySQL',
  skillsData: 'Microsoft Excel · Microsoft 365 · Microsoft Teams · Columba System · Microsoft Outlook',
  skillsTesting: 'Manual Testing · Selenium WebDriver · SDLC · STLC · Regression Testing · Functional Testing · Bug Life Cycle',
  skillsTools: 'Eclipse · MySQL',
  skillsPlatforms: 'Linux Mint · Ubuntu · Kali · Windows',
  professionalSkills: 'Data Validation & Quality Assurance · Financial Data Research · Data Analysis · Attention to Detail · Process Compliance · Team Collaboration · Problem Solving',
  project1Title: 'Personalized Emotion Recognition and Emotion Prediction System Based on Cloud Computing',
  project1Desc: 'Academic project focused on emotion recognition and prediction using a cloud-computing approach.',
  project2Title: 'Containment Zone Alerting Application',
  project2Desc: 'Application project documented through ICT Academy coursework and certification.',
  cert1: 'Software Testing Course – QSpiders',
  cert2: 'ICT Academy Project - Containment Zone Alerting Application',
  contactMessage: "Ready to discuss opportunities, projects, collaboration, or creative work.",
  email: 'jaganjash095@gmail.com',
  phone: '+91-73589 43247',
  languages: 'Tamil · English',
  languagesDetail: 'Tamil · English',
  hobbies: 'Content Creating · Script Writing · Video Editing · Drawing · Reading Books · Investing in Crypto Coins',
  footerName: 'JAGADISH B'
};

const DATA_KEY = 'jagadishCyberpunkPortfolioData';
const CURRENT_KEY = 'jagadishCyberpunkPortfolioCurrentWork';
// Browser-only edit lock. This keeps casual visitors out of EDIT MODE.
// IMPORTANT: because this is a static GitHub Pages site, any passcode stored
// in client-side JavaScript is not a replacement for real server authentication.
const ADMIN_PASSCODE_HASH = '54ba29a59c1a80dd7ce4efeb45f3605dad0c670e78c1f620e902e0a385e27368';
let adminUnlocked = false;
const stored = JSON.parse(localStorage.getItem(DATA_KEY) || 'null');
const state = { ...DEFAULTS, ...(stored || {}) };

const setText = (key, value) => {
  document.querySelectorAll(`[data-key="${CSS.escape(key)}"]`).forEach(el => {
    el.textContent = value;
  });
};

function render() {
  Object.entries(state).forEach(([key, value]) => setText(key, value));
  const email = document.getElementById('emailLink');
  if (email) email.href = `mailto:${state.email}`;

  const phoneLink = document.querySelector('.contact-item[href^="tel:"]');
  if (phoneLink) phoneLink.href = `tel:${state.phone.replace(/[^+\d]/g, '')}`;

  document.getElementById('year').textContent = new Date().getFullYear();

  const currentOn = localStorage.getItem(CURRENT_KEY) !== 'false';
  document.getElementById('currentToggle').checked = currentOn;
  document.getElementById('currentWorkCard').classList.toggle('hidden-section', !currentOn);
}

function collectEdits() {
  document.querySelectorAll('.editable[data-key]').forEach(el => {
    state[el.dataset.key] = el.textContent.trim();
  });
}

async function hashPasscode(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function showAuth(show) {
  const modal = document.getElementById('authModal');
  modal.classList.toggle('open', show);
  modal.setAttribute('aria-hidden', show ? 'false' : 'true');
  if (show) {
    const input = document.getElementById('passcodeInput');
    input.value = '';
    setTimeout(() => input.focus(), 50);
  }
}

async function requestAdminAccess() {
  if (adminUnlocked) {
    setEditing(true);
    return;
  }
  showAuth(true);
}

function setEditing(enabled) {
  document.body.classList.toggle('editing', enabled);
  document.querySelectorAll('.editable').forEach(el => {
    el.contentEditable = enabled ? 'true' : 'false';
    el.spellcheck = enabled;
  });
  document.getElementById('editorPanel').classList.toggle('open', enabled);
  document.getElementById('editorPanel').setAttribute('aria-hidden', enabled ? 'false' : 'true');
  document.getElementById('editBtn').classList.toggle('hidden', enabled);
  document.getElementById('saveBtn').classList.toggle('hidden', !enabled);
}

document.getElementById('editBtn').addEventListener('click', requestAdminAccess);
document.getElementById('authCancelBtn').addEventListener('click', () => showAuth(false));
document.getElementById('authCancelBtn2').addEventListener('click', () => showAuth(false));

document.getElementById('authForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = document.getElementById('passcodeInput');
  const error = document.getElementById('authError');
  const hash = await hashPasscode(input.value);
  if (hash === ADMIN_PASSCODE_HASH) {
    adminUnlocked = true;
    showAuth(false);
    setEditing(true);
    error.textContent = '';
  } else {
    error.textContent = 'ACCESS DENIED // INVALID PASSCODE';
    input.select();
  }
});

document.getElementById('saveBtn').addEventListener('click', () => {
  collectEdits();
  localStorage.setItem(DATA_KEY, JSON.stringify(state));
  setEditing(false);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!adminUnlocked) return requestAdminAccess();
  const ok = window.confirm('Reset all saved edits and return to the resume content?');
  if (!ok) return;
  localStorage.removeItem(DATA_KEY);
  localStorage.removeItem(CURRENT_KEY);
  location.reload();
});

document.getElementById('currentToggle').addEventListener('change', (e) => {
  localStorage.setItem(CURRENT_KEY, String(e.target.checked));
  document.getElementById('currentWorkCard').classList.toggle('hidden-section', !e.target.checked);
});

document.getElementById('exportBtn').addEventListener('click', () => {
  collectEdits();
  const exportData = {
    generatedAt: new Date().toISOString(),
    currentWorkVisible: localStorage.getItem(CURRENT_KEY) === 'true',
    data: state
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'jagadish-portfolio-data.json';
  a.click();
  URL.revokeObjectURL(url);
});

render();
