import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { saveMurmurMetadata } from './storage';

import * as child_process from 'child_process';
import * as os from 'os';
let currentTerminal: vscode.Terminal | undefined;
let currentAudioProcess: any = null;
let currentPlayerProcess: any = null;


export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "CodeMurmur" is now active!');

 
  let currentAudioProcess: any = null;

  const playDisposable = vscode.commands.registerCommand('codemurmur.playMurmur', async (args) => {
   console.log('!!!!Inside Play!!!!');

   
  const audioFilename = path.basename(args.audio);
  const baseDir = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(args.file))?.uri.fsPath || path.dirname(args.file);
  const audioPath = path.join(baseDir, '.code_murmur', 'recordings', audioFilename);
  console.log('🔍 Looking for audio at:', audioPath);

  if (!fs.existsSync(audioPath)) {
    vscode.window.showErrorMessage('❌ Audio file not found.');
    return;
  }

  // Stop previous audio
  if (currentAudioProcess) {
    try {
      currentAudioProcess.kill();
      console.log('⏹️ Stopped previous audio');
    } catch (e) {
      console.warn('⚠️ Failed to kill previous audio process:', e);
    }
  }

  vscode.window.showInformationMessage(`🔊 Playing murmur: ${audioFilename}`);

  const cp = require('child_process');
  const platform = process.platform;

  if (platform === 'win32') {
    const vlcPath = process.env['ProgramFiles'] + '\\VideoLAN\\VLC\\vlc.exe';
    if (!fs.existsSync(vlcPath)) {
      vscode.window.showErrorMessage('❌ VLC not found at expected path. Please install VLC or update the path.');
      return;
    }

    currentAudioProcess = cp.spawn(vlcPath, ['--intf', 'dummy', '--play-and-exit', audioPath], {
      detached: true,
      stdio: 'ignore'
    });
  } else if (platform === 'darwin') {
    currentAudioProcess = cp.spawn('afplay', [audioPath], { detached: true, stdio: 'ignore' });
  } else if (platform === 'linux'){
    const playCmd = fs.existsSync('/usr/bin/aplay') ? 'aplay' : 'ffplay';
    const args = playCmd === 'ffplay' ? ['-nodisp', '-autoexit', audioPath] : [audioPath];
    currentAudioProcess = cp.spawn(playCmd, args, { detached: true, stdio: 'ignore' });
  }

  currentAudioProcess.unref();
});
context.subscriptions.push(playDisposable);

console.log('🧭 SVG path:', path.join(context.extensionPath, 'murmur.svg'));
console.log('📄 SVG exists:', fs.existsSync(path.join(context.extensionPath, 'murmur.svg')));

const murmurDecorationType = vscode.window.createTextEditorDecorationType({
gutterIconPath: vscode.Uri.file(path.join(context.extensionPath, 'murmur.svg')),
gutterIconSize: 'contain'
});

////TEST
vscode.commands.registerCommand('codemurmur.testHover', () => {
  vscode.window.showInformationMessage('✅ Hover command clicked!');
});
////TEST


 const hoverDecorationType = vscode.window.createTextEditorDecorationType({ backgroundColor: 'rgba(255,215,0,0.1)',  // yellow highlight
  isWholeLine: false}); 

async function applyDecorations(editor: vscode.TextEditor) {
  console.log('🔄 applyDecorations called for:', editor.document.uri.fsPath);
  try {
    const baseDir =
      vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath ||
      path.dirname(editor.document.uri.fsPath);

    const metadataPath = path.join(baseDir, '.code_murmur', 'murmurs.json');
    if (!fs.existsSync(metadataPath)) {
      console.warn('❌ No murmurs.json found at:', metadataPath);
      return;
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    const gutterDecorations: vscode.DecorationOptions[] = [];
    const hoverDecorations: vscode.DecorationOptions[] = [];

    metadata
      .filter((entry: any) => {
        const entryAbsolutePath = path.resolve(baseDir, entry.file);
        const editorPathNormalized = path.normalize(editor.document.uri.fsPath);
        const entryPathNormalized = path.normalize(entryAbsolutePath);

        const match = entryPathNormalized === editorPathNormalized;

        console.log('📄 Matching:', {
          entryPath: entryPathNormalized,
          editorPath: editorPathNormalized,
          match
        });

        return match;
      })
      .forEach((entry: any) => {
        if (typeof entry.startLine !== 'number' || isNaN(entry.startLine)) {
          console.warn('⚠️ Skipping entry due to invalid startLine:', entry);
          return;
        }
        let adjustedLine = entry.startLine;
        const maxLines = editor.document.lineCount;
        // Find first non-empty line starting from startLine
        while (adjustedLine < maxLines && editor.document.lineAt(adjustedLine).text.trim() === '') {
          adjustedLine++;
        }
        const targetLineText = editor.document.lineAt(adjustedLine).text;
        const range = new vscode.Range(adjustedLine, 0, adjustedLine, targetLineText.length || 1);
        //const range = new vscode.Range(entry.startLine, 0, entry.startLine, lineText.length);
        console.log('✅ Decorations applied — try hovering over line:', entry.startLine);
        const displayName = entry.developer ? ` by ${entry.developer}` : '';
        const args = {
          file: editor.document.uri.fsPath,
          startLine: entry.startLine,
          endLine: entry.endLine,
          audio: entry.audio,
          developer: entry.developer
        };
        const encodedArgs = encodeURIComponent(JSON.stringify(args));

        console.log('📦 Hover args:', args);

        const playUri = `command:codemurmur.playMurmur?${encodedArgs}`;
        const editUri = `command:codemurmur.editMurmur?${encodedArgs}`;
        const deleteUri = `command:codemurmur.confirmDeleteMurmur?${encodedArgs}`;

        const hoverText = new vscode.MarkdownString(
          `🔊 **Listen to the murmur${displayName}**\n\n` +
          `[🎧 Play Murmur](${playUri})   ` +
          `[✏️ Edit Murmur](${editUri})   ` +
          `[🗑️ Delete Murmur](${deleteUri})`
        );
        hoverText.isTrusted = true;

        console.log(`🧪 HoverText: Listen to murmur${displayName}`);
        console.log(`🧪 URIs:`, { playUri, editUri, deleteUri });

        gutterDecorations.push({ range });
        hoverDecorations.push({ range, hoverMessage: hoverText });
      });

    editor.setDecorations(murmurDecorationType, gutterDecorations);
    editor.setDecorations(hoverDecorationType, hoverDecorations);

  } catch (err) {
    console.error('💥 Error loading murmur decorations:', err);
  }
}

vscode.commands.registerCommand('codemurmur.confirmDeleteMurmur', async (args) => {
  const confirm = await vscode.window.showWarningMessage(
    `Both media and metadata will be deleted.`,
    'Confirm Delete',
    'Cancel'
  );

  if (confirm === 'Confirm Delete') {
    console.log('🧨 confirmDeleteMurmur called with:', args);
    const { file, startLine, audio } = args;

    console.log('🧨 confirmDeleteMurmur args:', JSON.stringify(args, null, 2));

    const baseDir = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(file))?.uri.fsPath || path.dirname(file);

    const metadataPath = path.join(baseDir, '.code_murmur', 'murmurs.json');
    const audioPath = path.join(baseDir, '.code_murmur', 'recordings', audio);

    // Update JSON
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    const updatedMetadata = metadata.filter((entry: any) => {
      const entryFile = path.resolve(baseDir, entry.file);
      const inputFile = path.resolve(file);

      const entryAudio = path.normalize(entry.audio);
      const inputAudio = path.normalize(audio);

      const isSameFile = entryFile === inputFile;
      const isSameLine = entry.startLine === startLine;
      const isSameAudio = entryAudio === inputAudio;

      const keep = !(isSameFile && isSameLine && isSameAudio);

      if (!keep) {
        console.log('🧹 Removing entry:', entry);
      }

      return keep;
    });


    fs.writeFileSync(metadataPath, JSON.stringify(updatedMetadata, null, 2));

    console.log('🗑️ Deleting audioPath:', audioPath);

    // Delete audio
    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }

    vscode.window.showInformationMessage(`Murmur deleted successfully.`);
    refreshDecorations(); // Trigger decoration update
  }
});

vscode.commands.registerCommand('codemurmur.editMurmur', async (args) => {
  console.log('✏️ editMurmur args:', JSON.stringify(args, null, 2));
  const { file, startLine, endLine, audio } = args;

  const baseDir =
    vscode.workspace.getWorkspaceFolder(vscode.Uri.file(file))?.uri.fsPath || path.dirname(file);
  const metadataPath = path.join(baseDir, '.code_murmur', 'murmurs.json');

  if (!fs.existsSync(metadataPath)) {
    vscode.window.showErrorMessage('❌ murmurs.json not found.');
    return;
  }

  console.log('🗑️ Metadata path for Editing:', metadataPath);

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  const murmurIndex = metadata.findIndex((entry: any) => {
    const entryFileAbs = path.resolve(baseDir, entry.file);
    const inputFileAbs = path.resolve(file);
    const isSameFile = entryFileAbs === inputFileAbs;
    const isSameAudio = path.normalize(entry.audio) === path.normalize(audio);
    const isSameStart = entry.startLine === startLine;
    const isSameEnd = entry.endLine === endLine;

    return isSameFile && isSameAudio && isSameStart && isSameEnd;
  });

  if (murmurIndex === -1) {
    vscode.window.showErrorMessage('❌ Murmur not found in metadata.');
    return;
  }

  const newStartLineStr = await vscode.window.showInputBox({
    prompt: `Enter new start line (current: ${startLine})`,
    validateInput: (val) => isNaN(parseInt(val)) ? 'Must be a number' : undefined
  });

  if (!newStartLineStr) return;

  const newEndLineStr = await vscode.window.showInputBox({
    prompt: `Enter new end line (current: ${endLine})`,
    validateInput: (val) => isNaN(parseInt(val)) ? 'Must be a number' : undefined
  });

  if (!newEndLineStr) return;

  const newStartLine = parseInt(newStartLineStr);
  const newEndLine = parseInt(newEndLineStr);

  if (newStartLine > newEndLine) {
    vscode.window.showErrorMessage('Start line must be <= end line.');
    return;
  }

  metadata[murmurIndex].startLine = newStartLine;
  metadata[murmurIndex].endLine = newEndLine;

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  vscode.window.showInformationMessage(`✅ Murmur line range updated.`);

  refreshDecorations();
});


function refreshDecorations() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    applyDecorations(editor);
  }
}


  const disposable = vscode.commands.registerCommand('codemurmur.recordMurmur', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('Open a file first.');
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const startLine = selection.start.line;
    const endLine = selection.end.line;
    const filePath = editor.document.uri.fsPath;

    const baseDir = vscode.workspace.getWorkspaceFolder(editor.document.uri)?.uri.fsPath || path.dirname(filePath);
    const recordScript = path.join(context.extensionPath, 'record.js');
    const fileName = `murmur_${Date.now()}.wav`;

    const panel = vscode.window.createWebviewPanel(
      'codeMurmurRecorder',
      '🎙 CodeMurmur Recorder',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = getWebviewContent();

    panel.webview.onDidReceiveMessage(
      async (message) => {
        if (message.command === 'startRecording') {
          if (!isSoxInstalled()) {
            vscode.window.showErrorMessage("🔧 SoX not installed. Please install it with: sudo apt install sox");
            return;
          }
          currentTerminal = vscode.window.createTerminal('CodeMurmur Recorder');
          currentTerminal.show();
          currentTerminal.sendText(`node "${recordScript}" "${baseDir}" "${fileName}"`);
        } else if (message.command === 'stopRecording') {
          if (currentTerminal) {
            currentTerminal.sendText('\x03'); // Ctrl+C
            vscode.window.showInformationMessage("🛑 Recording stopped.");

            await saveMurmurMetadata(baseDir, {
              file: path.relative(baseDir, filePath),
              startLine,
              endLine,
              text: selectedText,
              audio: fileName,
              created: new Date().toISOString()
            });

            const range = new vscode.Range(startLine, 0, startLine, 0);
            const decoration: vscode.DecorationOptions = {
              range,
              hoverMessage: 'Click to play voice note'
            };
            editor.setDecorations(murmurDecorationType, [decoration]);
          } else {
            vscode.window.showErrorMessage("No recording in progress.");
          }
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);

  vscode.window.onDidChangeTextEditorVisibleRanges(event => {
    applyDecorations(event.textEditor);
  }, null, context.subscriptions);

  console.log('👀 Scheduling delayed decoration for visible editors...');
  setTimeout(() => {
    vscode.window.visibleTextEditors.forEach(editor => {
      console.log('🕒 Delayed startup decoration for:', editor.document.uri.fsPath);
      applyDecorations(editor);
    });
  }, 500);

  vscode.window.onDidChangeVisibleTextEditors(editors => {
    for (const editor of editors) {
      applyDecorations(editor);
    }
  });

  vscode.workspace.onDidOpenTextDocument(doc => {
    const openEditor = vscode.window.visibleTextEditors.find(
      editor => editor.document.uri.toString() === doc.uri.toString()
    );
    if (openEditor) {
      applyDecorations(openEditor);
    }
  });
}

export function deactivate() {
  if (currentTerminal) {
    currentTerminal.dispose();
    currentTerminal = undefined;
  }
}



function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>CodeMurmur</title>
      <style>
        body { font-family: sans-serif; padding: 1rem; }
        button { padding: 0.5rem 1rem; font-size: 1rem; margin-right: 1rem; }
      </style>
    </head>
    <body>
      <h2>🎤 CodeMurmur Voice Note</h2>
      <button id="startBtn">Start Recording</button>
      <button id="stopBtn">Stop Recording</button>

      <script>
        const vscode = acquireVsCodeApi();
        document.getElementById('startBtn').addEventListener('click', () => {
          vscode.postMessage({ command: 'startRecording' });
        });
        document.getElementById('stopBtn').addEventListener('click', () => {
          vscode.postMessage({ command: 'stopRecording' });
        });
      </script>
    </body>
    </html>
  `;
}

function isSoxInstalled() {
  if (process.platform !== 'linux') return true;
  const cp = require('child_process');
  try {
    cp.execSync('which sox', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}