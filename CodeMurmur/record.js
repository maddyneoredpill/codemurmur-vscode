const mic = require('mic');
const fs = require('fs');
const path = require('path');

const baseDir = process.argv[2] || __dirname;
const filenameArg = process.argv[3];

const recordingsDir = path.join(baseDir, '.code_murmur', 'recordings');
if (!fs.existsSync(recordingsDir)) fs.mkdirSync(recordingsDir, { recursive: true });

const fileName = filenameArg ||`murmur_${Date.now()}.wav`;
const filePath = path.join(recordingsDir, fileName);

const micInstance = mic({
  rate: '16000',
  channels: '1',
  debug: true,
  exitOnSilence: 6
});

const micInputStream = micInstance.getAudioStream();
const outputFileStream = fs.WriteStream(filePath);

micInputStream.pipe(outputFileStream);

console.log(`🎙 Recording to ${filePath}. Press Ctrl+C to stop.`);

micInstance.start();

process.on('SIGINT', () => {
  micInstance.stop();
  console.log(`\n✅ Recording saved to ${filePath}`);
  process.exit();
});
