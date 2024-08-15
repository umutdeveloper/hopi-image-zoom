import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isLib = mode === 'lib';
  if (isLib) {
    return defineConfig({
      plugins: [
        dts({
          include: ['src/lib/**'],
        }),
      ],
      build: {
        copyPublicDir: false,
        lib: {
          entry: path.resolve(__dirname, 'src/lib/index.ts'),
          name: 'ImageZoom',
          fileName: (format) => `image-zoom.${format}.js`,
        },
      },
    });
  }
  return defineConfig({
    base: env.VITE_BASE_HREF,
  });
};
