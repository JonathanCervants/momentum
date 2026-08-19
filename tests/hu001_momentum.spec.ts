import { test, expect } from '@playwright/test';
import { MomentumPage } from '../pages/MomentumPage';

/**
 * Suite de Automatización de QA - HU-001: Visualización del Momentum de Juego en Vivo
 * Framework: Playwright (TypeScript)
 */
test.describe('HU-001: Pruebas con Page Object Model', () => {

  test.beforeEach(async ({ page }) => {
    let momentumPage: MomentumPage;
    momentumPage = new MomentumPage(page);
    await momentumPage.navegarIA();
  });

  test.afterEach(async ({ page }, testInfo) => {
    try {
      if (page && !page.isClosed()) {
        const status = testInfo.status || 'unknown';
        const testName = testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_');
        const screenshot = await page.screenshot({
          path: `screenshots/${testName}_${status}.png`,
          fullPage: true
        });
        await testInfo.attach('captura-resultado', {
          body: screenshot,
          contentType: 'image/png'
        });
      }
    } catch (e) {
      console.warn('No se pudo tomar captura en afterEach:', e);
    }
  });

  test('TC-POM-01: Validar carga de secciones y tiempo de respuesta', async ({ page }) => {

  });
});
