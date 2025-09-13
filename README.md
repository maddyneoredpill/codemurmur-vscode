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
   code --install-extension codemurmur-0.0.1.vsix
▶ How to Use
🎙️ Record a Murmur

Select Lines for which you want to record Murmur and press Ctrl+Shift+M.

You get a web control to start recording, Speak your explanation and stop to save.

🎧 Play a Murmur

A ![murmur icon](./CodeMurmur/media/murmur.svg) icon appears in the gutter icon appears in the gutter

Hover to see tooltip and click "Listen to the murmur"

🗑️ Manage Murmurs

Delete: Removes audio + metadata

Edit: Update line numbers without re-recording

💡 Use Cases

   - Explain complex logic without long comments
   - Leave context for your future self
   - Mentor junior developers with rich guidance
   - Code review with quick verbal feedback

📁 Folder Structure
.code_murmur/
 ├── murmurs.json       # Metadata (file, line, audio)
 └── recordings/
         └── murmur_xxx.wav

🧰 Developer Setup (For Testers & Contributors)
✅ Prerequisites (All Platforms)

   - Node.js (v18 or later)
   - Git
   - Visual Studio Code

🪟 Windows Setup

   Install VLC
      Download VLC for Windows
      ⚠️ During setup, check the option: "Add to PATH"

      Install SoX (Sound eXchange)  
      [Download SoX for Windows](https://sourceforge.net/projects/sox/files/sox/)  
      ⚠️ During install, check "Add to PATH"

   Clone the Repo

      git clone https://github.com/maddyneoredpill/codemurmur-vscode.git
      cd codemurmur-vscode\CodeMurmur
      
   
   Install Dependencies

      npm install
      
   
   Open in VS Code and Run

      code .
      
   Press F5 or go to Run > Start Debugging
   This launches a new Extension Development Host window Open a existing or new project in this Extension Development Window and press (Ctrl+Shift+M) to record Murmur

🐧 Linux Setup (Tested on Ubuntu)

   Clone the Repo

      git clone https://github.com/maddyneoredpill/codemurmur-vscode.git
      cd codemurmur-vscode/CodeMurmur
      

   Install Dependencies

      npm install
      

   Run in VS Code

      code .
      

   Press F5 to open the Extension Host
   This launches a new Extension Development Host window Open a existing or new project in this Extension Development Window and press (Ctrl+Shift+M) to record Murmur

   ✅ On Linux, most systems can play audio using built-in players (aplay, ffplay, etc.) — no need to install VLC.

🤝 Contributing

   Contributions are welcome!

   Open issues for bugs or ideas

   Submit PRs — your voice matters (literally 😉)

📜 License

   MIT License — free to use, modify, and share.
   See LICENSE
   for full terms.

🌟 Support

   If you like CodeMurmur, please star the repo ⭐, share it, and help us bring voice to code!
