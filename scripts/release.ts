import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

const bumpVersion = (version: string, type: 'major' | 'minor' | 'patch') => {
  const [major, minor, patch] = version.split('.').map(Number)
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
  }
}

const release = (type: 'major' | 'minor' | 'patch') => {
  try {
    // Read current version
    const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
    const currentVersion = pkg.version
    const newVersion = bumpVersion(currentVersion, type)

    // Update package.json
    pkg.version = newVersion
    writeFileSync('./package.json', JSON.stringify(pkg, null, 2))

    // Git commands
    execSync('git add package.json')
    execSync(`git commit -m "v${newVersion}"`)
    execSync(`git tag v${newVersion}`)
    execSync('git push && git push --tags')

    console.log(`Released version ${newVersion}`)
  } catch (error) {
    console.error('Release failed:', error)
    process.exit(1)
  }
}

const type = process.argv[2] as 'major' | 'minor' | 'patch'
if (!type || !['major', 'minor', 'patch'].includes(type)) {
  console.error('Please specify version type: major, minor, or patch')
  process.exit(1)
}

release(type)
