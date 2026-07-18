# TabCapsule

A lightweight browser extension that helps you save, organize, and restore browser tabs into reusable workspaces. Instead of keeping dozens of tabs open all the time, you can save your current session and restore it whenever you need it.

This project was built to solve a simple problem: losing important tabs while switching between different tasks like studying, development, research, or entertainment.

---

## Preview

### Extension Popup

> **Screenshot I**
>
> <img width="517" height="713" alt="Screenshot 2026-07-17 120246" src="https://github.com/user-attachments/assets/8236e5ed-2ab8-47bd-af7a-6b5ba48307d4" />




---

### Saved Sessions

> ** Screenshot II**
>
> <img width="522" height="752" alt="Screenshot 2026-07-17 120321" src="https://github.com/user-attachments/assets/db40218c-e201-45fe-9f17-238f53f40a4a" />




---

## Features

* Save all open tabs with one click
* Restore an entire browsing session instantly
* Search saved workspaces
* Mark important sessions as favorites
* Keep track of restore count
* Store everything locally using IndexedDB
* Fast and lightweight
* Modern React-based user interface
* Works without any external server

---

## Why I Built This

While working on multiple projects, I usually end up with 30–50 tabs open. Closing Chrome meant either losing those tabs or relying on the browser's history.

I wanted something that could:

* organize tabs into meaningful workspaces
* restore them whenever needed
* work completely offline
* be fast enough to handle large numbers of tabs

That's why I started building **TabCapsule**.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* WXT Framework

### Storage

* IndexedDB
* Dexie.js

### Browser APIs

* Chrome Tabs API
* Chrome Storage API

### Development Tools

* Vite
* npm
* Git
* GitHub

---

## Project Structure

```text
src/
│
├── database/
├── features/
│   └── session/
├── popup/
├── services/
├── hooks/
├── repositories/
├── types/
└── utils/
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/TabCapsule.git
```

Move into the project

```bash
cd TabCapsule
```

Install dependencies

```bash
npm install
```

Run the extension in development mode

```bash
npm run dev
```

Create a production build

```bash
npm run build
```

---

## Load the Extension

### Chrome

1. Open **chrome://extensions**
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the generated build folder

### Firefox

1. Open **about:debugging**
2. Click **This Firefox**
3. Choose **Load Temporary Add-on**
4. Select the generated manifest file

---

## Future Improvements

* Sync sessions across devices
* Workspace categories
* Import and export sessions
* Keyboard shortcuts
* Dark mode
* Session statistics
* Duplicate tab detection
* Cloud backup

---

## What I Learned

Building TabCapsule helped me gain hands-on experience with:

* React component architecture
* TypeScript
* Browser Extension APIs
* IndexedDB with Dexie
* Repository pattern
* State management
* Git and GitHub workflow
* Extension packaging and deployment

---

## License

This project is licensed under the MIT License.

---

## Author

**Ankit Hindwar**

If you have any suggestions or feedback, feel free to open an issue or connect with me on GitHub.

---

⭐ If you found this project useful, consider giving it a star.
