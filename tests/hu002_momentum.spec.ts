import { test, expect } from '@playwright/test';

/**
 * Suite de Automatización de QA - HU-001: Visualización del Momentum de Juego en Vivo
 * Framework: Playwright (TypeScript)
 */
test.describe('HU-001: Visualización del Momentum de Juego en Vivo', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar a la sección de IA esperando a que el DOM esté listo
    await page.goto('/ia', { waitUntil: 'domcontentloaded' });
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

  test('TC-001-01: Visualización de la card en vivo y widget de Momentum', async ({ page }) => {
    // 1. Validar que la sección de Datos con IA y el badge EN VIVO estén visibles
    const liveBadge = page.getByText('EN VIVO').first();
    await expect(liveBadge).toBeVisible({ timeout: 15000 });

    // 2. Validar que el título "Momentum del juego" esté presente
    const momentumTitle = page.getByText('Momentum del juego').first();
    await expect(momentumTitle).toBeVisible();

    // 3. Validar marcas de la línea de tiempo del Momentum (0', 15', 30', ET, 60', 75', Fin)
    await expect(page.getByText("0'").first()).toBeVisible();
    await expect(page.getByText("15'").first()).toBeVisible();
    await expect(page.getByText("30'").first()).toBeVisible();
    await expect(page.getByText("ET").first()).toBeVisible();
    await expect(page.getByText("60'").first()).toBeVisible();
    await expect(page.getByText("75'").first()).toBeVisible();
    await expect(page.getByText("Fin").first()).toBeVisible();
  });

  test('TC-001-02: Validación de logos y marcadores de los equipos en vivo', async ({ page }) => {
    // 1. Validar que la tarjeta en vivo esté visible
    await expect(page.getByText('EN VIVO').first()).toBeVisible({ timeout: 15000 });

    // 2. Validar presencia del contenedor de estadísticas y equipos
    const statsContainer = page.locator('div[class*="Insight_Insight__teamsWrapper"]').first();
    await expect(statsContainer).toBeVisible();

    // 3. Validar logos de los equipos
    const teamLogos = statsContainer.locator('li img');
    await expect(teamLogos.first()).toBeVisible();
    await expect(teamLogos.last()).toBeVisible();

    // 4. Validar marcadores de goles en vivo
    const scoreElements = statsContainer.locator('li p');
    await expect(scoreElements.first()).toBeVisible();
  });

  test('TC-001-03: Navegación por Estadísticas de IA (Índice de ataque / xG)', async ({ page }) => {
    // 1. Validar métrica inicial "Índice de ataque"
    const attackPowerTitle = page.getByText('Índice de ataque').first();
    await expect(attackPowerTitle).toBeVisible({ timeout: 15000 });

    // 2. Botón siguiente en el carrusel de estadísticas de IA
    const nextStatBtn = page.locator('button[aria-label="Siguiente"][class*="insightAiStatistics__nav--next"]').first();
    if (await nextStatBtn.isVisible()) {
      await nextStatBtn.click();
      // Validar cambio a "Goles esperados (xG)"
      await expect(page.getByText('Goles esperados (xG)').first()).toBeVisible();
    }
  });

});
