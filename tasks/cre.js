#!/usr/bin/env node

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const { generatePackageJSON, generateManifestJSON } = require('./genereate');

const { ArgumentParser } = require('argparse');
const { version } = require('../package.json');


async function cre() {
    const packageJson = require('../packages/chrome-extension-react-antd-template/package.json');

    const rootDir = path.dirname(__dirname, '..');
    const packagesDir = path.join(rootDir, 'packages');
    const templateDir = path.join(packagesDir, 'chrome-extension-react-antd-template')


    const parser = new ArgumentParser({
        description: 'Create chrome extension'
    });

    parser.add_argument('-v', '--version', { action: 'version', version });
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
    await generatePackageJSON(templatePackageDir);
    await generateManifestJSON(projectDir);
    console.log('🤖 Installing packages. This might take a couple of minutes....');

    // process.chdir(projectDir);
    // const installProc = child_process.spawn('npm', ['install'], {env: process.env});
    // installProc.stdout.pipe(process.stdout);
    // installProc.stderr.pipe(process.stderr);

    // installProc.on('error', e => {
    //     console.error('Install error', e);
    // });

    // installProc.on('exit', e => {
    //     console.log('Packages install success.');
    // });
}

cre();