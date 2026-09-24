# Dr. Veera Naidu, Ph.D. — Executive Portfolio

> **Platform Engineering Leader & Doctoral Graduate**  
> Dynamic, single-source-of-truth portfolio website built with a Kubernetes and Platform Engineering design system (`platform.exec/v1`). Hosted seamlessly on **GitHub Pages**.

---

## ☸ Architecture & Overview

This portfolio website is designed around the concept of **Infrastructure as Code (IaC)** and **Platform-as-a-Product**:

- **Single Source of Truth (`profile.yaml`)**: All profile metadata, career achievements, core competencies, education credentials, and doctoral dissertation links are stored in `profile.yaml`.
- **Dynamic Frontend Renderer (`js/app.js`)**: Automatically fetches and parses `profile.yaml` client-side using `js-yaml` and renders responsive, styled Kubernetes control plane cards.
- **Dual View Modes**:
  - **🎛️ DASHBOARD**: Executive telemetry grid, competencies matrix, experience timeline, and doctoral dissertation section.
  - **📄 RAW YAML SPEC**: Live view of the underlying `profile.yaml` configuration.

---

## 📁 Repository Structure

```text
portfolio/
├── profile.yaml                       # Primary data source for all site content
├── index.html                         # Entry point HTML & Control Plane UI layout
├── css/
│   └── k8s.css                        # Modern K8s / CNCF dark design system
├── js/
│   └── app.js                         # Dynamic YAML parser & UI rendering engine
├── Veera Naidu - Executive Resume.md   # Executive resume in Markdown format
├── Veera Naidu - Executive Resume.docx # Generated Word document executive resume
└── README.md                          # Repository documentation & hosting guide
```

---

## 🛠️ How to Update Your Portfolio

1. **Edit `profile.yaml`**: Simply update `profile.yaml` with your latest accomplishments, skills, or roles.
2. **Commit and Push**:
   ```bash
   git add profile.yaml
   git commit -m "Update platform engineering accomplishments"
   git push origin main
   ```
3. Your live GitHub Pages site will instantly reflect the changes without requiring any HTML modifications!

---

## 🌐 Deploying to GitHub Pages

1. In your GitHub repository settings, navigate to **Pages**.
2. Under **Build and deployment**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
3. Save settings. Your portfolio will be live at `https://<your-username>.github.io/<repository-name>/`.

---

## 🎓 Executive Credentials & Dissertation

- **Doctorate in Information Technology (Ph.D.)** | University of the Cumberlands (2017 – 2021)
  - **Dissertation:** ["Inaccuracy of Predicting Software Defects Using Supervised Machine Learning Models"](https://www.proquest.com/openview/9e600d59a2bf021921d0ef87d03a9771/1.pdf?pq-origsite=gscholar&cbl=18750&diss=y) (*ProQuest*)
- **M.S., Information Systems Security** | University of the Cumberlands (2017 – 2021)
- **M.S., Computer Science** | Northwestern Polytechnic University (2014 – 2016)

---

## 🔗 Professional Profiles

- **LinkedIn:** [linkedin.com/in/bramhavardhan](https://linkedin.com/in/bramhavardhan)
- **GitHub:** [github.com/vb-n](https://github.com/vb-n)
