import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.join(__dirname, 'dist', 'server');
const staticDir = path.join(__dirname, 'dist', 'client');
const srvxPath = path.join(
  __dirname,
  'node_modules',
  'srvx',
  'bin',
  'srvx.mjs',
);

const child = spawn(
  process.execPath,
  [srvxPath, '--prod', '-s', staticDir, path.join(serverDir, 'server.js')],
  {
    cwd: serverDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: process.env.PORT ?? '8080',
    },
  },
);

child.on('exit', code => {
  process.exit(code ?? 0);
});
