import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const text = async (p) => readFile(resolve(root, p), 'utf8');
const json = async (p) => JSON.parse(await text(p));
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

const version = (await text('VERSION')).trim();
const rootPkg = await json('package.json');
const webPkg = await json('apps/web/package.json');
const mobilePkg = await json('apps/mobile/package.json');
const expo = await json('apps/mobile/app.json');
const contractsPkg = await json('packages/contracts/package.json');
const apiPkg = await json('packages/api-client/package.json');
const designPkg = await json('packages/design/package.json');
const changelog = await text('CHANGELOG.md');
const license = await text('LICENSE');
const api = await text('packages/api-client/src/client.ts');

expect(version === '0.1.0', `VERSION is ${version}, expected 0.1.0`);
for (const [name,pkg] of [['root',rootPkg],['web',webPkg],['mobile',mobilePkg],['contracts',contractsPkg],['api-client',apiPkg],['design',designPkg]]) {
  expect(pkg.version === version, `${name} version ${pkg.version} does not match ${version}`);
}
expect(expo.expo.version === version, `Expo app version ${expo.expo.version} does not match ${version}`);
expect(changelog.includes(`## [${version}] - 2026-09-04`), 'CHANGELOG lacks current release entry');
expect(license.toLowerCase().includes('proprietary'), 'LICENSE does not state proprietary status');
for (const endpoint of ['/v1/users','/v1/follows','/profile','/following','/followers']) expect(api.includes(endpoint), `API client missing endpoint fragment ${endpoint}`);
expect(webPkg.dependencies.next === '16.3.3', 'Next.js release pin changed without docs update');
expect(mobilePkg.dependencies.expo === '~57.0.20', 'Expo SDK pin changed without docs update');
expect(mobilePkg.dependencies.react === '19.2.3' && mobilePkg.dependencies['react-native'] === '0.86.2', 'Expo compatibility pins changed without docs update');

if (failures.length) {
  console.error('Static verification failed:');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log('Static verification passed.');
