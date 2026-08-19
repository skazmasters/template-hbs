import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import data from '../src/data/pages.json' with { type: 'json' }
import site from '../src/data/site.json' with { type: 'json' }

const root = fileURLToPath(new URL('..', import.meta.url))
const publicDir = path.join(root, 'public', 'preview')
const buildDir = path.join(root, 'build', 'preview')
const origin = 'http://127.0.0.1:4321'
const base = `${site.base.replace(/\/$/, '')}/`

function waitForOutput(child, pattern, timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error('Preview server did not start in time')),
      timeoutMs
    )
    const onData = (chunk) => {
      const text = chunk.toString()
      if (pattern.test(text)) {
        clearTimeout(timer)
        child.stdout.off('data', onData)
        resolve()
      }
    }
    child.stdout.on('data', onData)
    child.stderr.on('data', onData)
    child.on('exit', (code) => {
      clearTimeout(timer)
      reject(new Error(`Preview server exited with code ${code}`))
    })
  })
}

const preview = spawn('yarn', ['preview'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, FORCE_COLOR: '0' },
})

await waitForOutput(preview, /localhost:4321|127\.0\.0\.1:4321/)
await mkdir(publicDir, { recursive: true })
await mkdir(buildDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

try {
  for (const item of data.pages) {
    if (!item.screenshot) continue
    const url = new URL(
      `${base}${item.href.replace(/^\//, '')}`,
      origin
    ).toString()
    await page.goto(url, { waitUntil: 'networkidle' })
    const order = String(item.order).padStart(2, '0')
    const name = `${order}_${item.slug}.png`
    await page.screenshot({ path: path.join(publicDir, name), fullPage: false })
    await page.screenshot({ path: path.join(buildDir, name), fullPage: false })
    console.log(`saved ${name}`)
  }
} finally {
  await browser.close()
  preview.kill('SIGTERM')
}
