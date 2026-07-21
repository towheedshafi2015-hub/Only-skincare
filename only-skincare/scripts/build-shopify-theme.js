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

// 1. Find built JS and CSS files in dist/assets
const distAssets = fs.readdirSync(path.join(DIST_DIR, 'assets'))
let indexJs = ''
let indexCss = ''

distAssets.forEach(file => {
  if (file.startsWith('index-') && file.endsWith('.js')) indexJs = file
  if (file.startsWith('index-') && file.endsWith('.css')) indexCss = file
  
  // Copy all assets to shopify assets directory
  fs.copyFileSync(
    path.join(DIST_DIR, 'assets', file),
    path.join(THEME_DIR, 'assets', file)
  )
})

// Copy public assets from dist root to shopify assets
fs.readdirSync(DIST_DIR).forEach(file => {
  const fullPath = path.join(DIST_DIR, file)
  if (fs.statSync(fullPath).isFile() && file !== 'index.html') {
    fs.copyFileSync(fullPath, path.join(THEME_DIR, 'assets', file))
  }
})

console.log(`Found built bundle: JS=${indexJs}, CSS=${indexCss}`)

// 2. Create layout/theme.liquid
const themeLiquid = `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{{ page_title }} – Only Skincare</title>
    {{ content_for_header }}
    {{ '${indexCss}' | asset_url | stylesheet_tag }}
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

// 3. Create templates/index.liquid
fs.writeFileSync(
  path.join(THEME_DIR, 'templates', 'index.liquid'),
  `{% comment %} Only Skincare React App mounts inside #root {% endcomment %}`
)

// 4. Create config/settings_schema.json
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
