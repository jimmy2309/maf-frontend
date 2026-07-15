# MAF Frontend POC

This repository contains the premium Graphical User Interface for the Multi-Agent Framework ecosystem.
It connects directly to the `maf-engine` (The Gateway) and provides a stunning, visually rich interface to chat with the backend agents.

## 🎨 Tech Stack
- **Framework:** Vite + Vanilla TypeScript (No React!)
- **Styling:** Pure Vanilla CSS
- **Design Elements:** Glassmorphism, Dark Mode gradients, Micro-animations.

## 🚀 Setup & Run

### 1. Installation
Ensure you have Node.js installed. Open a terminal in this directory:
```bash
npm install
```

### 2. Running the Frontend
```bash
npm run dev
```
This will start the local development server (usually at `http://localhost:5173`).

### 3. Usage
- Make sure that **`maf-engine`**, **`maf-analytics-agent`**, and **`maf-mcp-server`** are all running on their respective ports.
- Open your browser to the local Vite URL.
- Type a query like `"IT department ki salary calculate karo"` and press Send.
- The UI will automatically show loaders and stream the response!
