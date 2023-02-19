import {defineNitroConfig} from 'nitropack';
import {resolve} from 'path';

const SRC = resolve(__dirname, 'src');

export default defineNitroConfig({
  noPublicDir: true,
  srcDir: SRC,
  imports: {
    dirs: ['src/services', 'src/validators', 'src/handlers'],
  },
  typescript: {

  },
  runtimeConfig: {
    jwt: {
      expiresIn: '3600', // s
      secret: 'secret',
    }
  },
});
