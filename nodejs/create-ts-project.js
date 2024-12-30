const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Por favor, proporciona un nombre para el proyecto.');
  process.exit(1);
}

const projectPath = path.join(__dirname, projectName);
const distPath = path.join(projectPath, 'dist');
const srcPath = path.join(projectPath, 'src');
const testsPath = path.join(srcPath, '__tests__');
const configPath = path.join(projectPath, 'vitest.config.ts');
const indexPath = path.join(srcPath, 'index.ts');

if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath);
}

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

if (!fs.existsSync(srcPath)) {
  fs.mkdirSync(srcPath);
}

if (!fs.existsSync(testsPath)) {
  fs.mkdirSync(testsPath);
}

const tsconfig = `{
    "compilerOptions": {
      "target": "es6",
      "module": "Commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "sourceMap": true,
      "baseUrl": "./",
      "paths": {
        "@base/*": ["src/*"]
      },
      "types": ["vite/client", "node"],
      "esModuleInterop": true,
      "skipLibCheck": true
    },
    "include": ["src/**/*"]
  }`;

const vitestConfig = `/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    alias: {
      '@base': path.resolve(__dirname, './src')
    }
  }
})`;

const packageJson = `{
  "name": "${projectName}",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "watch": "npx tsc --watch"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^20.8.0",
    "typescript": "^5.7.2",
    "vitest": "^0.31.0",
    "vite": "^4.0.0",
    "module-alias": "^2.2.3"
  },
  "dependencies": {
    "module-alias": "^2.2.3"
  },
  "_moduleAliases": {
    "@base": "dist"
  }
}`;

const indexTs = `console.log('Hello, world!');`;

fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), tsconfig);
fs.writeFileSync(configPath, vitestConfig);
fs.writeFileSync(path.join(projectPath, 'package.json'), packageJson);
fs.writeFileSync(indexPath, indexTs);

exec('npm install', { cwd: projectPath }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al instalar las dependencias: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`Proyecto '${projectName}' creado con éxito, dependencias instaladas y archivos generados.`);
  console.log(stdout);
});
