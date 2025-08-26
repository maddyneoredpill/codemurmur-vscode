# 🎙️ CodeMurmur — Voice Annotations for Code

CodeMurmur lets developers **record voice notes (murmurs) directly in their code**, replacing tedious written comments with **rich, contextual audio explanations**.

Perfect for **open-source contributors**, **teammates**, or even **your future self**.

---

## 🚀 Features

- 🎤 **Record** murmur voice notes for selected lines of code  
- 🎧 **Hover** over mic icons in the gutter to listen  
- 💡 **Interactive hover** with “Listen to the murmur” popup  
- 🗑️ **Delete** murmurs with confirmation (removes audio + metadata)  
- ✏️ **Edit** murmur line ranges without re-recording  
- 🔄 **Auto-stop** current murmur when another is played  
- 🧩 **Clean UI**, non-intrusive, and Git-friendly  
- 🌐 **Future-ready** with WebView audio player & sharing options  

---

## 📸 Demo

🎥 [Watch the YouTube Demo](https://www.youtube.com/watch?v=1akAdJ2oL6c&t=130s)

## 📦 Installation

### From Marketplace *(Coming soon)*
> Will be available after official publish on VS Code Marketplace.

### From `.vsix` File

1. Download the latest `.vsix` from the [Releases](https://github.com/maddyneoredpill/codemurmur-vscode/releases)  
2. Install it manually:
   ```bash
   code --install-extension codemurmur-x.x.x.vsix

🛠️ How to Use
▶ Trigger Recording
Open Command Palette (Ctrl+Shift+M)

Run CodeMurmur: Record Murmur

Speak your explanation and stop to save

🎧 View & Play
A 🎙 mic icon appears in the gutter

Hover to see a tooltip and click Listen to the murmur

🗑️ Manage Murmurs
Delete: Removes audio and metadata

Edit: Update line numbers while keeping the same murmur

💡 Use Cases
Explain complex logic without long comments

Leave context for your future self

Mentor junior developers with richer guidance

Code review with quick verbal feedback


📁 Folder Structure in your root project folder

.code_murmur/
 ├── murmurs.json       # Metadata (file, line, audio)
 └── recordings/
      └── murmur_xxx.wav

🧰 Developer Setup (For Testers & Contributors)
✅ Prerequisites (All Platforms)

Node.js
 (v18 or later)

Git

Visual Studio Code

🪟 Windows Setup

1. Install VLC
   Download VLC for Windows

   ⚠️ During setup, check the option: "Add to PATH"

2. Clone the Repo

   git clone https://github.com/maddyneoredpill/codemurmur-vscode.git
   cd codemurmur-vscode\CodeMurmur

3. Install Dependencies
   npm install

4. Open in VS Code and Run
   code .
   
   Press F5 or go to Run > Start Debugging

   This launches a new Extension Development Host window
   Open a existing or new project in this Extension Development Window and press (Ctrl+Shift+M) to record Murmur

🐧 Linux Setup (Tested on Ubuntu)

1. Clone the Repo
   git clone https://github.com/maddyneoredpill/codemurmur-vscode.git
   cd codemurmur-vscode/CodeMurmur

2. Install Dependencies
   npm install

3. Run in VS Code
   code .

Press F5 to open the Extension Host
Open a existing or new project in this Extension Development Window and press (Ctrl+Shift+M) to record Murmur

🤝 Contributing
Contributions are welcome!

Open issues for feature requests and bugs

PRs are encouraged (voice of the devs 😉)

📜 License
MIT License — free to use, modify, and share.
See LICENSE for full terms.

🌟 Support
If you like CodeMurmur, star the repo ⭐ and help spread the word!


