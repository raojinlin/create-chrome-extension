const fs = require('fs');
const path = require('path');
const input = require('@inquirer/input').default;

async function generatePackageJSON(packageDir, packageName, packageDescription) {
    const pkg = require(packageDir);
    const name = packageName || await input({message: '(package.json) Enter extension package name: '})
    if (name) {
        pkg.name = name;
    }

    const description = packageDescription || await input({message: '(package.json) Enter extension package description: '})
    if (description) {
        pkg.description = description;
    }


    fs.writeFileSync(packageDir, JSON.stringify(pkg, null, 2));
}

async function generateManifestJSON(extensionDir, extensionName, extensionDescription) {
    const devManifestDir = path.join(extensionDir, 'src/manifest.development.json');
    const prodManifestDir = path.join(extensionDir, 'src/manifest.production.json');

    const manifestDirs = [devManifestDir, prodManifestDir];

    const name = extensionName || await input({message: '(manifest.json) Enter your extension name: '});
    const description = extensionDescription || await input({message: '(manifest.json) Enter your extension description: '});

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