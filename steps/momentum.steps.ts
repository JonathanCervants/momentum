import { Given, When, Then } from '@cucumber/cucumber';
import { MomentumPage } from '../pages/MomentumPage';

/**
 * Step Definitions para HU-001: Módulo de IA y Momentum
 * Conecta cada sentencia Gherkin con los métodos del Page Object.
 */

// Step 1: Dado que el usuario se encuentra en apuestatotal
Given('que el usuario se encuentra en apuestatotal', async function () {
  const momentumPage = new MomentumPage(this.page);
  await momentumPage.navegarIA();
});

// Step 2: Cuando ingresa a la sección de IA
When('ingresa a la sección de IA', async function () {
  const momentumPage = new MomentumPage(this.page);
  await momentumPage.ingresarModuloIA();
});

// Step 3: Entonces se debe visualizar la sección de "DATOS CON IA" y el "Generador de apuestas"
Then('se debe visualizar la sección de {string} y el {string}', async function (seccion1: string, seccion2: string) {
  const momentumPage = new MomentumPage(this.page);
  await momentumPage.validarContenedoresPrincipales(seccion1, seccion2);
});

// Step 4: Medir y registrar el tiempo de renderizado de las cards
Then('las cards deben renderizarse en menos de {int} segundos', async function (segundosMaximos: number) {
  const momentumPage = new MomentumPage(this.page);
  const tiempoMs = await momentumPage.medirTiempoRenderizadoCards();

  // Adjuntar el tiempo medido como texto al reporte de Cucumber
  this.attach(`⏱️ Tiempo de renderizado de cards: ${tiempoMs} ms (${(tiempoMs / 1000).toFixed(2)} s)`, 'text/plain');

  // Validación de rendimiento (SLA)
  if (tiempoMs > segundosMaximos * 1000) {
    throw new Error(`⚠️ Rendimiento degradado: las cards tardaron ${tiempoMs} ms, superando el límite de ${segundosMaximos} s.`);
  }
});
