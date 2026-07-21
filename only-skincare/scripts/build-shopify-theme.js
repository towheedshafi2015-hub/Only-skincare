import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const ROOT_DIR = process.cwd()
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const THEME_DIR = path.join(ROOT_DIR, 'shopify-theme-dist')

console.log('📦 Step 1: Running Vite build...')
execSync('npm run build', { stdio: 'inherit' })

console.log('🎨 Step 2: Preparing Shopify Theme Structure...')

// Clean or create target directory
if (fs.existsSync(THEME_DIR)) {
  fs.rmSync(THEME_DIR, { recursive: true, force: true })
}

const dirs = ['assets', 'layout', 'templates', 'config']
dirs.forEach(d => fs.mkdirSync(path.join(THEME_DIR, d), { recursive: true }))

const assetMap = {}

function copyToAssets(srcDir, subPath = '') {
  const items = fs.readdirSync(srcDir)
  items.forEach(item => {
    const fullSrc = path.join(srcDir, item)
    const relKey = subPath ? `${subPath}/${item}` : item
    const stat = fs.statSync(fullSrc)

    if (stat.isDirectory()) {
      if (item !== 'assets') {
        copyToAssets(fullSrc, relKey)
      }
    } else if (stat.isFile() && item !== 'index.html') {
      const flatName = subPath ? `${subPath.replace(/\//g, '_')}_${item}` : item
      const targetPath = path.join(THEME_DIR, 'assets', flatName)
      fs.copyFileSync(fullSrc, targetPath)
      assetMap[relKey] = flatName
      if (subPath) {
        assetMap[item] = flatName
      }
    }
  })
}

// 1. Copy dist assets (bundled GLB, PNGs, etc) & record in mapping table
const distAssetsDir = path.join(DIST_DIR, 'assets')
if (fs.existsSync(distAssetsDir)) {
  fs.readdirSync(distAssetsDir).forEach(file => {
    fs.copyFileSync(
      path.join(distAssetsDir, file),
      path.join(THEME_DIR, 'assets', file)
    )
    assetMap[`assets/${file}`] = file
    assetMap[file] = file
  })
}

// Copy dist root files and subfolders (products, trust, hero.mp4, etc)
copyToAssets(DIST_DIR)

// 2. Find main JS & CSS bundles
const distAssets = fs.readdirSync(path.join(THEME_DIR, 'assets'))
let indexJs = ''
let indexCss = ''

distAssets.forEach(file => {
  if (file.startsWith('index-') && file.endsWith('.js')) indexJs = file
  if (file.startsWith('index-') && file.endsWith('.css')) indexCss = file
})

console.log(`Found built bundle: JS=${indexJs}, CSS=${indexCss}`)
console.log('Mapped static assets for Shopify CDN:', Object.keys(assetMap).length, 'files mapped')

// Build Liquid asset mappings object string
const liquidMappings = Object.entries(assetMap)
  .map(([key, flatName]) => `"${key}": "{{ '${flatName}' | asset_url }}"`)
  .join(',\n      ')

// 3. Create layout/theme.liquid
const themeLiquid = `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{{ page_title }} – Only Skincare</title>
    {{ content_for_header }}
    {{ '${indexCss}' | asset_url | stylesheet_tag }}
    <script>
      window.SHOPIFY_ASSETS = {
        ${liquidMappings}
      };
      window.getAssetUrl = function(path) {
        if (!path) return '';
        var clean = path.replace(/^\\//, '').split('?')[0];
        return window.SHOPIFY_ASSETS[clean] || window.SHOPIFY_ASSETS[path] || path;
      };
    </script>
  </head>
  <body class="bg-[#040906]">
    <div id="root"></div>
    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>
    <script type="module" src="{{ '${indexJs}' | asset_url }}"></script>
  </body>
</html>`

fs.writeFileSync(path.join(THEME_DIR, 'layout', 'theme.liquid'), themeLiquid)

// 4. Create templates/index.liquid
fs.writeFileSync(
  path.join(THEME_DIR, 'templates', 'index.liquid'),
  `{% comment %} Only Skincare React App mounts inside #root {% endcomment %}`
)

// 5. Create config/settings_schema.json
fs.writeFileSync(
  path.join(THEME_DIR, 'config', 'settings_schema.json'),
  JSON.stringify([
    {
      "name": "Theme information",
      "settings": [
        {
          "type": "header",
          "content": "Only Skincare Custom React Storefront"
        }
      ]
    }
  ], null, 2)
)

console.log('🤐 Step 3: Zipping Shopify Theme...')
const zipPath = path.join(ROOT_DIR, 'only-skincare-shopify-theme.zip')
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath)

execSync(`cd "${THEME_DIR}" && zip -r "${zipPath}" ./*`, { stdio: 'inherit' })

console.log(`\n🎉 SUCCESS! Shopify Theme generated at:\n👉 ${zipPath}\n`)
