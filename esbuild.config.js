const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./dist-tmp/index.js'],
    outfile: 'dist/index.js',
    bundle: true,
    platform: 'node',
    target: 'node14',
    external: ['express'],
    sourcemap: true,
    minify: true,
  })
  .catch(() => process.exit(1));
