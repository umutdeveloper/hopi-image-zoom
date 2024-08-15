import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default ({ mode }) => {
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
  return defineConfig({});
};
