import { preview } from 'astro';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await preview({
  root,
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
});

let stopping = false;

async function stop() {
  if (stopping) return;
  stopping = true;

  try {
    await server.stop();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

process.once('SIGINT', stop);
process.once('SIGTERM', stop);
