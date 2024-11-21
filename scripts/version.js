const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');

const updateVersion = (type) => {
  try {
    // Read current version
    const pkg = JSON.parse(readFileSync('./package.json'));
    const [major, minor, patch] = pkg.version.split('.').map(Number);

    // Calculate new version
    let newVersion;
    switch(type) {
      case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
      default:
        newVersion = `${major}.${minor}.${patch + 1}`;
    }

    // Update package.json
    pkg.version = newVersion;
    writeFileSync('./package.json', JSON.stringify(pkg, null, 2));

    // Git commands
    execSync('git add package.json');
    execSync(`git commit -m "v${newVersion}"`);
    execSync(`git tag v${newVersion}`);
    execSync('git push');
    execSync('git push --tags');

    console.log(`Version updated to ${newVersion}`);
  } catch (error) {
    console.error('Error updating version:', error);
    process.exit(1);
  }
};

const type = process.argv[2] || 'patch';
updateVersion(type);
