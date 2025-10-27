# 🎯 VagaCertaIA – Smart Job Platform with AI

![Banner](https://raw.githubusercontent.com/luisstarlino/ReactJs-VagaCertaIA/main/public/banner.png)

![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat\&logo=react\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat\&logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat\&logo=vite\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat\&logo=tailwind-css\&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat\&logo=reactrouter\&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E36?style=flat)
![Puter.js](https://img.shields.io/badge/Puter.js-000000?style=flat\&logo=javascript\&logoColor=white)

---

## 📖 About the Project

**VagaCertaIA** is a modern web platform built with **React + TypeScript + Vite**, powered by **AI** and **Puter.js** to enhance the recruitment process.

**With VagaCertaIA, you instantly analyze your profile and discover whether it's the right job for you.** Quick, secure, and intuitive, our comprehensive analysis is designed to help you secure the job of your dreams.

> 🔍 “Make it easy for your application :)”


---

## 🚀 Features


* **Fast ATS Analysis:** Quick and intuitive validation of your resume's adherence to job requirements (Job Match Score), leveraging **ATS-like technology**.
* **Secure Analysis Storage:** Fast and easy authentication ensures your resume analyses are stored privately and accessible **only by you**.
* **Analysis History Review:** Easily review and compare all analyses performed, organized by job and date, allowing you to track your resume's progress.
* **File System Integration:** Utilizes **Puter.js** for file system integration and client-side cloud storage features.
* **State Management:** Optimized and reactive global state management with **Zustand**.
* **PDF Resume Viewer:** Resume viewing integrated with `pdfjs-dist` for instant in-browser preview.
* **File Uploads:** Robust file upload implementation with drag-and-drop functionality via `react-dropzone`.
* **UI Components:** Interface components built with **Radix UI** (focused on accessibility) and styled with **TailwindCSS** for design consistency.

---

## 🛠️ Technologies Used

### Core Stack

| Library / Tool | Description | Icon | Link |
| :--- | :--- | :---: | :--- |
| **React 19** | JavaScript library for building user interfaces | ⚛️ | [https://react.dev/](https://react.dev/) |
| **TypeScript** | Strongly typed programming language that builds on JavaScript | 💙 | [https://www.typescriptlang.org/](https://www.typescriptlang.org/) |
| **Vite** | Next Generation Frontend Tooling (Build Tool / Dev Server) | ⚡ | [https://vitejs.dev/](https://vitejs.dev/) |
| **React Router v7** | Declarative routing for React | 🧭 | [https://reactrouter.com/](https://reactrouter.com/) |
| **TailwindCSS 4** | Utility-first CSS framework for rapid styling | 🎨 | [https://tailwindcss.com/](https://tailwindcss.com/) |

### Libraries & Tools

| Library / Tool | Description | Icon | Link |
| :--- | :--- | :---: | :--- |
| **Puter.js** | File system integration | ☁️ | [https://puter.com/](https://puter.com/) |
| **Zustand** | State management | 🧠 | [https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/) |
| **Radix UI** | Accessible component library | 🧩 | [https://www.radix-ui.com/](https://www.radix-ui.com/) |
| **React Dropzone** | File uploads | 📤 | [https://react-dropzone.js.org/](https://react-dropzone.js.org/) |
| **pdfjs-dist** | PDF rendering | 📄 | [https://github.com/mozilla/pdfjs-dist](https://github.com/mozilla/pdfjs-dist) |
| **Tailwind Merge** | Utility class merging | ✨ | [https://github.com/dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge) 
| **isbot** | Bot detection for analytics | 🤖 | [https://www.npmjs.com/package/isbot](https://www.npmjs.com/package/isbot) |
| **tw-animate-css** | Tailwind animations | 🎞️ | [https://www.npmjs.com/package/tw-animate-css](https://www.npmjs.com/package/tw-animate-css) |

---

## ⚙️ How to Run the Project

### 🧰 Prerequisites

* Node.js v18+
* NPM or Yarn

### 📥 Installation

```bash
git clone https://github.com/luisstarlino/ReactJs-VagaCertaIA.git
cd ReactJs-VagaCertaIA
npm install
```

### ▶️ Run in Development

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

### 🧪 Build for Production

```bash
npm run build
```

### 🧭 Start Production Server

```bash
npm start
```

---

## 📂 Project Structure

```
📁 app
├── 📂 components    # Reusable UI components
├── 📂 routes        # Main application pages
└── 🔵 root.tsx      # Application entry point
└── 🟢 route.ts      # React Router configuration
📁 contans           # Prompt Engineering, file paths, and other settings for the project
📂 lib               # Helper and utility functions
📂 stores            # Zustand state store
📂 types             # Types for the entities project
🔵 DockerFile        # To Run a container app 

```

---

## ✨ Contributing

Contributions are welcome! Follow the steps below:

1. Fork the repository.
2. Create a new branch `git checkout -b my-feature`.
3. Commit your changes `git commit -m "feat: added my feature"`.
4. Push the branch `git push origin feature/my-feature`.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

---

## 🛡️ Contact

**Developed by [Luis Starlino](https://www.linkedin.com/in/luis-starlino/)**
📧 [luis.guilherme009@gmail.com](mailto:luis.guilherme009@gmail.com)