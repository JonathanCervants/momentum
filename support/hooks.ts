import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
const environment = process.env.ENV || 'staging';
dotenv.config({ path: path.resolve(__dirname, `../.env.${environment}`) });

// Timeout de 30 segundos por step
setDefaultTimeout(30000);

let browser: Browser;
let context: BrowserContext;

Before(async function () {
  // Iniciar navegador Chromium con emulación móvil
  const isHeadless = process.env.HEADED === 'true' ? false : true;
  browser = await chromium.launch({ headless: isHeadless, slowMo: isHeadless ? 0 : 500 });
  context = await browser.newContext({
    ...devices['Pixel 5'],
    baseURL: process.env.BASE_URL || 'https://web-at-stg.kurax.dev'
  });
  this.page = await context.newPage();
});

After(async function (scenario) {
  // Tomar captura de pantalla tanto para exitosos como fallidos
  if (this.page) {
    const status = scenario.result?.status === Status.PASSED ? 'passed' : 'failed';
    const screenshot = await this.page.screenshot({
      path: `screenshots/${scenario.pickle.name.replace(/[^a-zA-Z0-9_-]/g, '_')}_${status}.png`,
      fullPage: true
    });
    // Adjuntar la captura al reporte HTML de Cucumber
    this.attach(screenshot, 'image/png');
  }

  // Cerrar página y navegador
  if (this.page) await this.page.close();
  if (context) await context.close();
  if (browser) await browser.close();
});
