import { Page, Locator, expect } from '@playwright/test';

export class MomentumPage {
    readonly page: Page;
    readonly tabIA: Locator;
    readonly seccionDatosconIA: Locator;
    readonly seccionGeneradorApuestas: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tabIA = page.locator('button[aria-label="IA"]');
        this.seccionDatosconIA = page.getByAltText('DATOS CON IA').first();
        this.seccionGeneradorApuestas = page.getByText('Generador de apuestas').first();
    }



    async navegarInicio(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    async navegarIA(): Promise<void> {
        await this.page.goto('/ia', { waitUntil: 'domcontentloaded' });
    }

    async ingresarModuloIA(): Promise<void> {
        if (await this.tabIA.isVisible({ timeout: 5000 }).catch(() => false)) {
            await this.tabIA.click();
        } else {
            await this.page.goto('/ia', { waitUntil: 'domcontentloaded' });
        }
    }

    async validarContenedoresPrincipales(seccion1: string, seccion2: string): Promise<void> {
        await expect(this.page.getByText(seccion1).first()).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(seccion2).first()).toBeVisible({ timeout: 15000 });
    }

    /**
     * Mide con precisión el tiempo que demora en renderizarse el contenido REAL de las cards (equipos, cuotas, estadísticas)
     * @returns Duración en milisegundos (ms)
     */
    async medirTiempoRenderizadoCards(): Promise<number> {
        const inicio = performance.now();

        // Espera a que el contenido real de los equipos/tarjeta esté presente en pantalla (no el skeleton gris)
        const contenidoRealCard = this.page.locator('div[class*="Insight_Insight__teamsWrapper"], div[class*="BetGeneratorItem_betGenerator__teamNames"]').first();
        await expect(contenidoRealCard).toBeVisible({ timeout: 20000 });

        const fin = performance.now();
        const duracionMs = Number((fin - inicio).toFixed(2));
        const duracionSegundos = (duracionMs / 1000).toFixed(2);

        console.log(`⏱️ [TIMER] Las cards con datos reales tardaron ${duracionMs} ms (${duracionSegundos} s) en renderizarse.`);
        return duracionMs;
    }
}

