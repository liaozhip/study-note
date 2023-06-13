#!/usr/bin/env node
const argv = process.argv;
const {version, name} = require('../package.json');
const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');

const file2obj = (filePath) => {
  filePath = path.resolve(__dirname, filePath);
  return JSON.parse(fs.readFileSync(filePath).toString());
}

const obj2file = (data) => {
  filePath = path.resolve(__dirname, './data.json');
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('success');
}

const obj = file2obj('./data.json');

const [op, arg1, arg2] = process.argv.slice(2);

if (op === '-v' || op === '--version') {
  console.log(`${name} v${version}`)
} else if (op === 'list') {
  const buffer = execSync('npm get registry')
  const currentRegistry = buffer.toString('ascii');
  Object.keys(obj).forEach(key => {
    const registry = obj[key]
    console.log(`${currentRegistry.trim() === registry ? '*' : ''}${key} ====> ${registry}`)
  });
} else if (op === 'add' && arg1 && arg2) {
  if (obj[arg1] !== undefined) {
    return console.log(`${arg1} has already been in list`)
  }
  obj[arg1] = argv[4];
  obj2file(obj);
} else if (op === 'del' && arg1) {
  if (obj[arg1] === undefined) {
    return console.log(`${arg1} is not in p-nrm list`);
  }
  delete obj[arg1];
  obj2file(obj);
} else if (op === 'use' && arg1) {
  if (obj[arg1] === undefined) {
    return console.log(`${arg1} is not in p-nrm list`)
  }
  execSync(`npm set registry ${obj[arg1]}`);
  console.log('success')
}
