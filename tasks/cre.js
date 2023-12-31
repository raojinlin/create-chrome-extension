#!/usr/bin/env node

const child_process = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { generatePackageJSON, generateManifestJSON } = require('./genereate');

const { ArgumentParser } = require('argparse');
const { version } = require('../package.json');


async function cre() {
    const rootDir = path.dirname(__dirname, '..');
    const packagesDir = path.join(rootDir, 'packages');
    const templateDir = path.join(packagesDir, 'chrome-extension-react-antd-template')


    const parser = new ArgumentParser({
        description: 'Create chrome extension'
    });

    parser.add_argument('-v', '--version', {action: 'version', version});
    parser.add_argument('-p', '--package', {help: 'Package name'})
    parser.add_argument('-d', '--description', {help: 'Package description'})
    parser.add_argument('-e', '--extension-name', {help: 'Extension name'})
    parser.add_argument('-x', '--extension-description', {help: 'Extension description'})
    parser.add_argument('project-directory');

    const args = parser.parse_args();

    const project = args['project-directory']
    const projectDir = path.resolve(project);
    if (fs.existsSync(projectDir)) {
        console.error('project directory: ', projectDir, 'already exists.');
        process.exit(1);
    }


    fs.cpSync(templateDir, projectDir, {recursive: true});
    if (!fs.existsSync(projectDir)) {
        console.error('create failed');
        process.exit(1);
    }


    console.log('✅ Extension ', project, 'created.');

    const templatePackageDir = path.join(projectDir, 'package.json');
    await generatePackageJSON(templatePackageDir, args['package'], args['description']);
    await generateManifestJSON(projectDir, args['extension_name'], args['extension_description']);
    console.log('🤖 Installing packages. This might take a couple of minutes....');

    process.chdir(projectDir);
    const npmExecutable = os.type() === 'Windows_NT' ? 'npm.cmd' : 'npm'
    const installProc = child_process.spawn(npmExecutable, ['install'], {env: process.env});
    installProc.stdout.pipe(process.stdout);
    installProc.stderr.pipe(process.stderr);

    installProc.on('error', e => {
        console.error('Install error', e);
    });

    installProc.on('exit', e => {
        console.log('Packages install success.');
    });
}

cre();