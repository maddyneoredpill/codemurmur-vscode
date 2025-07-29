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
Coming soon: 🎬 *Animated GIF* showing `record ▶ hover ▶ listen` flow.  
(We recommend [ScreenToGif](https://www.screentogif.com/) to create a quick demo GIF)

---

## 📦 Installation

### From Marketplace *(Recommended)*
*(Coming soon — will be available after official publish)*

### From `.vsix` File
1. Download the latest `.vsix` from the [Releases](https://github.com/maddyneoredpill/codemurmur-vscode/releases)  
2. Install manually:
   ```bash
   code --install-extension codemurmur-x.x.x.vsix

🛠️ How to Use
▶ Trigger Recording
Open Command Palette (Ctrl+Shift+P)

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



📁 Folder Structure

.code_murmur/
 ├── murmurs.json       # Metadata (file, line, audio)
 └── recordings/
      └── murmur_xxx.wav
      
🤝 Contributing
Contributions are welcome!

Open issues for feature requests and bugs

PRs are encouraged (voice of the devs 😉)

📜 License
MIT License — free to use, modify, and share.

🌟 Support
If you like CodeMurmur, star the repo ⭐ and help spread the word!


