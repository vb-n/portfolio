/* ======================================================
   KUBERNETES & PLATFORM ENGINEERING PORTFOLIO - APP JS
   Loads profile.yaml dynamically & renders K8s UI components
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  let profileData = null;
  let rawYamlText = '';

  try {
    const res = await fetch('profile.yaml');
    if (res.ok) {
      rawYamlText = await res.text();
      if (window.jsyaml) {
        profileData = jsyaml.load(rawYamlText);
      }
    }
  } catch (err) {
    console.warn('Could not fetch profile.yaml directly (CORS/file protocol fallback activated):', err);
  }

  // Fallback profile object if js-yaml CDN is unreachable or running under raw file protocol
  if (!profileData) {
    profileData = getFallbackProfileData();
    rawYamlText = getFallbackYamlText();
  }

  renderUI(profileData);
  setupYamlViewer(rawYamlText);
  setupTabs();
}

/* ------------------------------------------------------
   UI RENDERER FROM YAML DATA
   ------------------------------------------------------ */
function renderUI(data) {
  if (!data) return;

  // Header & Personal Info
  const p = data.personal_info || {};
  setText('candidateName', p.name || 'VEERA NAIDU, Ph.D.');
  setText('candidateHeadline', p.headline || '');
  
  // Quick contact links & Request Contact button
  const contactContainer = document.getElementById('contactActions');
  if (contactContainer) {
    contactContainer.innerHTML = `
      <button onclick="requestContactModal()" class="btn-action primary">📩 Request Contact Details</button>
      <a href="${p.linkedin}" target="_blank" rel="noopener" class="btn-action">🔗 LinkedIn</a>
      <a href="${p.github}" target="_blank" rel="noopener" class="btn-action">💻 GitHub</a>
      <a href="Veera Naidu - Executive Resume.docx" target="_blank" class="btn-action">📄 Word Resume (.docx)</a>
      <a href="Veera Naidu - Executive Resume.md" target="_blank" class="btn-action">📝 Markdown Resume</a>
    `;
  }

  // Key Metrics
  const metricsContainer = document.getElementById('telemetryGrid');
  if (metricsContainer && data.key_metrics) {
    metricsContainer.innerHTML = data.key_metrics.map(m => `
      <div class="telemetry-card">
        <div class="telemetry-value">${m.value}</div>
        <div class="telemetry-label">${m.label}</div>
      </div>
    `).join('');
  }

  // Summary
  setText('summaryText', data.summary || '');

  // Competencies Grid
  const skillsContainer = document.getElementById('skillsGrid');
  if (skillsContainer && data.competencies) {
    skillsContainer.innerHTML = data.competencies.map(cat => `
      <div class="skill-category-card">
        <div class="category-name">${cat.category}</div>
        <div class="pill-tags">
          ${cat.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Experience Timeline
  const expContainer = document.getElementById('experienceTimeline');
  if (expContainer && data.experience) {
    expContainer.innerHTML = data.experience.map(exp => `
      <div class="experience-item">
        <div class="company-header">${exp.company} <span style="font-size:0.95rem; font-weight:normal; color:var(--text-dim);">| ${exp.location}</span></div>
        ${exp.roles.map(r => `
          <div class="role-block">
            <div class="role-header">
              <span class="role-title">${r.title}</span>
              <span class="role-period">${r.period}</span>
            </div>
            <ul class="bullets-list">
              ${r.achievements.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `).join('');

    // Append Additional Experience
    if (data.additional_experience) {
      expContainer.innerHTML += `
        <div style="margin-top:24px; padding-top:16px; border-top:1px dashed var(--border-color);">
          <div style="font-weight:600; color:var(--brand-accent); margin-bottom:10px;">Additional Experience</div>
          <ul class="bullets-list">
            ${data.additional_experience.map(item => `<li><strong>${item.company}</strong> – ${item.role}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  }

  // Education & Dissertation
  const eduContainer = document.getElementById('educationList');
  if (eduContainer && data.education) {
    eduContainer.innerHTML = data.education.map(edu => {
      let dissHtml = '';
      if (edu.dissertation) {
        dissHtml = `
          <div class="dissertation-card">
            <div class="dissertation-badge">DOCTORAL DISSERTATION</div>
            <div class="dissertation-title">"${edu.dissertation.title}"</div>
            <a href="${edu.dissertation.link}" target="_blank" rel="noopener" class="dissertation-link">
              🔗 Read Paper on ${edu.dissertation.publisher} &rarr;
            </a>
          </div>
        `;
      }
      return `
        <div style="margin-bottom:22px;">
          <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap;">
            <div style="font-size:1.1rem; font-weight:600; color:var(--text-main);">${edu.degree}</div>
            <div style="font-family:var(--font-mono); font-size:0.9rem; color:var(--brand-accent);">${edu.period || ''}</div>
          </div>
          <div style="font-size:0.9rem; color:var(--text-dim); margin-top:2px;">${edu.institution}</div>
          ${dissHtml}
        </div>
      `;
    }).join('');
  }
}

window.requestContactModal = function() {
  const p = (window.profileData && window.profileData.personal_info) || {};
  const msg = `To request direct phone, email, or meeting details for Dr. Veera Naidu, please send a message via LinkedIn or GitHub:\n\n• LinkedIn: https://linkedin.com/in/bramhavardhan\n• GitHub: https://github.com/vb-n`;
  alert(msg);
};

/* ------------------------------------------------------
   RAW YAML SPEC VIEWER & COPY
   ------------------------------------------------------ */
function setupYamlViewer(yamlText) {
  const container = document.getElementById('yamlContent');
  if (container) {
    container.textContent = yamlText;
  }
}

window.copyYaml = function() {
  const container = document.getElementById('yamlContent');
  if (container) {
    navigator.clipboard.writeText(container.textContent).then(() => {
      alert('YAML configuration copied to clipboard!');
    });
  }
};

/* ------------------------------------------------------
   TAB NAVIGATION
   ------------------------------------------------------ */
function setupTabs() {
  const tabDashboard = document.getElementById('tabDashboard');
  const tabYaml = document.getElementById('tabYaml');
  const viewDashboard = document.getElementById('viewDashboard');
  const viewYaml = document.getElementById('viewYaml');

  if (tabDashboard && tabYaml) {
    tabDashboard.addEventListener('click', () => {
      tabDashboard.classList.add('active');
      tabYaml.classList.remove('active');
      viewDashboard.style.display = 'block';
      viewYaml.style.display = 'none';
    });

    tabYaml.addEventListener('click', () => {
      tabYaml.classList.add('active');
      tabDashboard.classList.remove('active');
      viewDashboard.style.display = 'none';
      viewYaml.style.display = 'block';
    });
  }
}

function setText(id, text) {
  const elem = document.getElementById(id);
  if (elem) elem.textContent = text;
}

/* ------------------------------------------------------
   FALLBACK DATA IF FILE PROTOCOL / DIRECT OPEN
   ------------------------------------------------------ */
function getFallbackProfileData() {
  return {
    personal_info: {
      name: "VEERA NAIDU, Ph.D.",
      headline: "Senior Manager – Platform Engineering & Doctoral Graduate",
      linkedin: "https://linkedin.com/in/bramhavardhan",
      github: "https://github.com/vb-n"
    },
    summary: "Platform Engineering leader and Doctoral graduate with 9+ years of experience building and scaling Internal Developer Platforms (IDP), driving Developer Experience (DevEx) transformations, and leading cloud-native modernization initiatives.",
    key_metrics: [
      { label: "Platform & Cloud Leadership", value: "9+ Yrs" },
      { label: "Doctoral Credentials", value: "Ph.D." }
    ],
    competencies: [
      { category: "Platform Architecture & DevEx", skills: ["Internal Developer Platforms (IDP)", "Spotify Backstage", "Developer Experience (DevEx)", "Golden Paths", "Software Cataloging", "Service Scaffolding", "Self-Service Portals"] },
      { category: "Cloud-Native & Orchestration", skills: ["Kubernetes (EKS)", "Cloud-Native Architecture", "Workload Migration", "GitOps (Argo CD)", "Infrastructure as Code (Terraform, Crossplane)", "Docker", "Linux"] }
    ],
    experience: [],
    education: [
      { degree: "Doctorate in Information Technology (Ph.D.)", institution: "University of the Cumberlands", period: "2017 – 2021" },
      { degree: "M.S., Information Systems Security", institution: "University of the Cumberlands", period: "2017 – 2021" },
      { degree: "M.S., Computer Science", institution: "Northwestern Polytechnic University", period: "2014 – 2016" }
    ]
  };
}

function getFallbackYamlText() {
  return `apiVersion: platform.exec/v1
kind: ExecutiveProfile
metadata:
  name: veera-naidu-phd
  title: "Dr. Veera Naidu | Platform Engineering Leader"
  status: "Running"
  namespace: "executive-careers"

personal_info:
  name: "VEERA NAIDU, Ph.D."
  headline: "Senior Manager – Platform Engineering & Doctoral Graduate"
  linkedin: "https://linkedin.com/in/bramhavardhan"
  github: "https://github.com/bramha574"

summary: >
  Platform Engineering leader and Doctoral graduate with 9+ years of experience building and scaling Internal Developer Platforms (IDP), driving Developer Experience (DevEx) transformations, and leading cloud-native modernization initiatives.

education:
  - degree: "Doctorate in Information Technology (Ph.D.)"
    institution: "University of the Cumberlands"
    period: "2017 – 2021"
  - degree: "M.S., Information Systems Security"
    institution: "University of the Cumberlands"
    period: "2017 – 2021"
  - degree: "M.S., Computer Science"
    institution: "Northwestern Polytechnic University"
    period: "2014 – 2016"`;
}
