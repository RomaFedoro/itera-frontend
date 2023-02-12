import {defineNitroConfig} from 'nitropack';
import {resolve} from 'path';

const SRC = resolve(__dirname, 'src');

export default defineNitroConfig({
  noPublicDir: true,
  srcDir: SRC,
  imports: {
    dirs: ['src/services', 'src/validators'],
  },
  runtimeConfig: {
    jwt: {
      expiresIn: '1d',
      secret: 'secret',
    }
  },
});
