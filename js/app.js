document.addEventListener('DOMContentLoaded', loadPortfolio);

async function loadPortfolio() {
  const loadingMessage = document.getElementById('loadingMessage');
  const content = document.getElementById('portfolioContent');
  const errorMessage = document.getElementById('loadError');

  try {
    if (!window.jsyaml) {
      throw new Error('The YAML parser could not be loaded.');
    }

    const response = await fetch('profile.yaml');
    if (!response.ok) {
      throw new Error(`Could not load profile.yaml (${response.status}).`);
    }

    const profile = window.jsyaml.load(await response.text());
    if (!profile || !profile.personal_info) {
      throw new Error('profile.yaml is missing the required personal information.');
    }

    renderPortfolio(profile);
    loadingMessage.hidden = true;
    content.hidden = false;
  } catch (error) {
    console.error('Unable to load the portfolio:', error);
    loadingMessage.hidden = true;
    errorMessage.textContent = 'The portfolio could not be loaded. Please try again later.';
    errorMessage.hidden = false;
  }
}

function renderPortfolio(profile) {
  const person = profile.personal_info;
  setText('candidateName', person.name || '');
  setText('candidateHeadline', person.headline || '');
  setText('summaryText', profile.summary || '');
  setText('footerName', person.name || '');
  renderLinks(person, profile.website?.resume_request_email);
  renderSkills(profile.competencies);
  renderExperience(
    profile.experience,
    profile.additional_experience,
    profile.website?.experience_summaries || []
  );
  renderEducation(profile.education);
}

function renderLinks(person, resumeRequestEmail) {
  const links = [
    ...(resumeRequestEmail ? [{
      label: 'Request a resume',
      url: `mailto:${resumeRequestEmail}?subject=${encodeURIComponent('Resume request')}`,
      className: 'resume-request'
    }] : []),
    { label: 'LinkedIn', url: person.linkedin },
    { label: 'GitHub', url: person.github }
  ].filter(link => link.url);

  document.getElementById('contactActions').innerHTML = links.map(link => `
    <a${link.className ? ` class="${escapeHtml(link.className)}"` : ''} href="${escapeHtml(link.url)}" ${isExternal(link.url) ? 'target="_blank" rel="noopener noreferrer"' : ''}>
      ${escapeHtml(link.label)} <span aria-hidden="true">↗</span>
    </a>
  `).join('');
}

function renderSkills(categories = []) {
  document.getElementById('skillsGrid').innerHTML = categories.map(category => `
    <div class="skill-category">
      <h3>${escapeHtml(category.category)}</h3>
      <p>${(category.skills || []).map(escapeHtml).join(' · ')}</p>
    </div>
  `).join('');
}

function renderExperience(experience = [], additionalExperience = [], summaries = []) {
  const roles = experience.flatMap(company => (company.roles || []).map(role => `
    <article class="experience-item">
      <div class="role-block">
        <div class="role-header">
          <span class="role-title">${escapeHtml(role.title)}</span>
          <span class="role-period">${escapeHtml(role.period)}</span>
        </div>
        ${(summaries.find(summary =>
          summary.company === company.company && summary.role === role.title
        )?.paragraphs || []).map(paragraph =>
          `<p class="role-summary">${escapeHtml(paragraph)}</p>`
        ).join('')}
      </div>
    </article>
  `));

  const additional = additionalExperience.length
    ? `<p class="additional-experience"><strong>Earlier roles:</strong> ${additionalExperience.map(item =>
        `${escapeHtml(item.role)} (${escapeHtml(item.company)})`
      ).join(' · ')}</p>`
    : '';

  document.getElementById('experienceTimeline').innerHTML = `${roles.join('')}${additional}`;
}

function renderEducation(education = []) {
  document.getElementById('educationList').innerHTML = education.map(item => {
    const dissertation = item.dissertation
      ? `<div class="dissertation">
          <span class="dissertation-label">Doctoral dissertation</span>
          <a href="${escapeHtml(item.dissertation.link)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(item.dissertation.title)}
          </a>
          <span> · ${escapeHtml(item.dissertation.publisher || '')}</span>
        </div>`
      : '';

    return `<article class="education-item">
      <span class="education-degree">${escapeHtml(item.degree)}</span>
      <span class="education-period">${escapeHtml(item.period || '')}</span>
      <span class="education-institution">${escapeHtml(item.institution)}</span>
      ${dissertation}
    </article>`;
  }).join('');
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}
