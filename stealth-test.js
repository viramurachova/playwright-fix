import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

chromium.use(StealthPlugin())

const run = async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Navigating to Zara...')
  try {
    await page.goto('https://www.zara.com', { waitUntil: 'networkidle' })
    console.log('Page loaded!')
  } catch (error) {
    console.error('Navigation failed:', error.message)
  }

  await page.screenshot({ path: 'zara-stealth.png', fullPage: true })
  await browser.close()
}

run()