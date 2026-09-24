# Dr. Veera Naidu, Ph.D. — Executive Portfolio

> **Senior Manager – Platform Engineering & Doctoral Graduate**  
> Modern, industry-standard, single-source-of-truth executive portfolio website built with a dynamic, YAML-driven architecture (`profile.yaml`). Hosted seamlessly on **GitHub Pages**.

---

## 🌟 Overview & Architecture

This executive portfolio website is engineered around the principle of **Single Source of Truth (SSOT)** and **Infrastructure as Code (IaC)**:

- **Single Source of Truth (`profile.yaml`)**: All executive summary text, career achievements, key metrics, core competencies, education credentials, and doctoral dissertation links are maintained in `profile.yaml`.
- **Dynamic Client-Side Engine (`js/app.js`)**: Automatically fetches and parses `profile.yaml` client-side using `js-yaml` and dynamically builds the modern responsive DOM layout.
- **Industry-Standard Design System (`css/k8s.css`)**:
  - Sticky glassmorphism header bar with `backdrop-filter: blur(16px)`.
  - Deep dark ambient theme with high-contrast, executive typography.
  - Interactive segment controller tabs:
    - **🎛️ Dashboard**: Executive telemetry grid, core competencies matrix, experience timeline, and doctoral dissertation highlight card.
    - **📄 YAML Spec**: Live view of the underlying `profile.yaml` configuration with one-click copy functionality.

---

## 📁 Repository Structure

```text
portfolio/
├── profile.yaml                       # Primary data source for all site content
├── index.html                         # Entry point HTML layout & modern executive UI
├── css/
│   └── k8s.css                        # Industry-standard executive CSS design system
├── js/
│   └── app.js                         # Dynamic YAML parser & UI rendering engine
├── Veera Naidu - Executive Resume.md   # Executive resume in Markdown format
├── Veera Naidu - Executive Resume.docx # Generated Word document executive resume
└── README.md                          # Repository documentation & hosting guide
```

---

## 🛠️ How to Update Your Content

1. **Edit `profile.yaml`**: Update `profile.yaml` directly to add new achievements, roles, skills, or metrics.
2. **Commit and Push**:
   ```bash
   git add profile.yaml
   git commit -m "Update executive platform achievements"
   git push origin main
   ```
3. Your live site at `https://vb-n.github.io/portfolio/` will instantly update without touching any HTML or CSS code!

---

## 🌐 Deployment & Live Hosting

- **Live URL:** [https://vb-n.github.io/portfolio/](https://vb-n.github.io/portfolio/)
- **Repository:** [https://github.com/vb-n/portfolio](https://github.com/vb-n/portfolio)
- **GitHub Pages Configuration:** Deployed directly from the `main` branch root (`/`) directory.

---

## 🎓 Executive Credentials & Doctoral Dissertation

- **Doctorate in Information Technology (Ph.D.)** | University of the Cumberlands (2017 – 2021)
  - **Dissertation:** ["Inaccuracy of Predicting Software Defects Using Supervised Machine Learning Models"](https://www.proquest.com/openview/9e600d59a2bf021921d0ef87d03a9771/1.pdf?pq-origsite=gscholar&cbl=18750&diss=y) (*ProQuest*)
- **M.S., Information Systems Security** | University of the Cumberlands (2017 – 2021)
- **M.S., Computer Science** | Northwestern Polytechnic University (2014 – 2016)

---

## 🔗 Professional Links

- **Portfolio Website:** [https://vb-n.github.io/portfolio/](https://vb-n.github.io/portfolio/)
- **LinkedIn:** [https://linkedin.com/in/bramhavardhan](https://linkedin.com/in/bramhavardhan)
- **GitHub:** [https://github.com/vb-n](https://github.com/vb-n)
