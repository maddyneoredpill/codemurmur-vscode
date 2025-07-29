import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface MurmurMetadata {
  file: string;         // relative path to source file
  startLine: number;
  endLine: number;
  audio: string;        // relative path to audio file
  created: string;      // ISO timestamp
  text?: string; // 👈 Add this line
}

export async function saveMurmurMetadata(baseDir: string, entry: any) {
  const metadataPath = path.join(baseDir, '.code_murmur', 'murmurs.json');
  let existing: any[] = [];

  if (fs.existsSync(metadataPath)) {
    existing = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  }

  const developer = os.userInfo().username;
  const newEntry = { ...entry, developer };

  existing.push(newEntry);
  fs.mkdirSync(path.dirname(metadataPath), { recursive: true });
  fs.writeFileSync(metadataPath, JSON.stringify(existing, null, 2), 'utf-8');
}
