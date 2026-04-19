# Nexus Locator CLI 🛠️

A professional full-stack Linux terminal tool for geolocation demonstration with explicit user consent.

## 🚀 Installation (Linux/Kali/Ubuntu)

Transform this project into a global command with one script:

```bash
git clone <repo-url>
cd game-style-location-demo
chmod +x install.sh
sudo ./install.sh
```

## 🛠 Usage

Once installed, you can trigger the locator from **any directory** in your system:

```bash
# Start with default settings (Frontend: 5173, Backend: 5000)
locator

# Start with a custom port and force tunnel generation
locator --port 8080 --tunnel

# View all options
locator --help
```

## ✨ Advanced Features

*   **Global Access**: Run `locator` from anywhere after using `install.sh`.
*   **Professional Dashboard**: A clean, ASCII-styled terminal interface with live status updates.
*   **Auto-Tunneling**: Integrated Cloudflare tunnel for immediate public link generation.
*   **Process Management**: Safely handles backend, frontend, and tunnel lifecycles in the background.


## 🛠 Project Structure

*   **/backend**: Node.js/Express server (Port 5000). Logs location data to `capture.json`.
*   **/frontend**: React/Vite application (Port 5173). Requests user consent before accessing GPS.
*   **start.sh**: Master script to install dependencies, launch servers, and generate a shareable Cloudflare link.

## ✨ Features

*   **Explicit Consent**: The app follows privacy best practices by requiring a button click and browser permission before data is collected.
*   **Live Terminal Logging**: Capture data appears instantly in your terminal for real-time monitoring.
*   **Shareable Link**: Automatically generates a public tunnel link (no Ngrok account required) via Cloudflare.

## 📁 Captured Data
All data is stored locally in `backend/capture.json`.

---
*Disclaimer: This project is for educational and authorized testing purposes only.*
