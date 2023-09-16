const fs = require('fs');
const path = require('path');
const input = require('@inquirer/input').default;

async function generatePackageJSON(packageDir) {
    const pkg = require(packageDir);
    const name = await input({message: '(package.json) Enter extension package name: '})
    if (name) {
        pkg.name = name;
    }

    const description = await input({message: '(package.json) Enter extension package description: '})
    if (description) {
        pkg.description = description;
    }


    fs.writeFileSync(packageDir, JSON.stringify(pkg, null, 2));
}

async function generateManifestJSON(extensionDir) {
    const devManifestDir = path.join(extensionDir, 'src/manifest.development.json');
    const prodManifestDir = path.join(extensionDir, 'src/manifest.production.json');

    const manifestDirs = [devManifestDir, prodManifestDir];

    const name = await input({message: '(manifest.json) Enter your extension name: '});
    const description = await input({message: '(manifest.json) Enter your extension description: '});

    manifestDirs.forEach(manifestDir => {
        const manifestJSON = require(manifestDir);        
        if (name) {
            manifestJSON.name = name;
        }

        if (description) {
            manifestJSON.description = description;
        }

        fs.writeFileSync(manifestDir, JSON.stringify(manifestJSON, null, 2));
    });
}

module.exports = {
    generatePackageJSON,
    generateManifestJSON,
}