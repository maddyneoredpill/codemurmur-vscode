# codemurmur-vscode
# 🎙️ CodeMurmur — Voice Annotations for Code

**CodeMurmur** lets developers record voice notes (aka *murmurs*) directly in their code — replacing tedious written comments with rich, contextual audio explanations.

Ideal for open-source contributors, teammates, or your future self.

---

## 🚀 Features

- 🎤 Record murmur voice notes for selected lines of code  
- 🎧 Hover over mic icons in the gutter to **listen** to murmurs  
- 💡 Highlighted hover with interactive “Listen to the murmur” popup  
- 🔄 Auto-stops current murmur when another is played (optional)  
- 🧩 Clean UI, non-intrusive, and Git-friendly  
- 🌐 Future-ready with WebView player controls and sharing options  

---

## 📸 Demo

> Coming soon: animated GIF showing record ▶️ hover ▶️ listen flow.

---

## 📦 Installation

### From Marketplace *(Recommended)*

> Coming soon — once published!

### From `.vsix` File

1. [Download the latest `.vsix`](https://github.com/yourusername/codemurmur/releases)
2. Install manually:
   ```bash
   code --install-extension codemurmur-x.x.x.vsix


🛠️ How to Use
Trigger Recording

Open Command Palette (Ctrl+Shift+P)

Run CodeMurmur: Record Murmur

Speak your explanation and stop to save

View & Play

A 🎙 mic icon appears in the gutter

Hover to see a tooltip and play option

Click to listen to the recorded murmur

Manage

Audio files are stored in: <project>/.code_murmur/recordings/

💡 Use Cases
Explain complex logic without long comments

Leave context for your future self

Mentor junior developers with richer guidance

Review code with quick verbal feedback

📁 Folder Structure

.code_murmur/
├── murmurs.json       # Metadata (file, line, audio)
└── recordings/
    └── murmur_<timestamp>.wav

    
