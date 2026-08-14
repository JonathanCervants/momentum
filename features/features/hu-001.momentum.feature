# language: es
@HU-001 @SportsbookIA
Característica: Carga de Módulo de IA HU-001

  @TC-001-01 @Smoke
  Escenario: Carga exitosa de la sección IA
    Dado que el usuario se encuentra en apuestatotal
    Cuando ingresa a la sección de IA
    Entonces se debe visualizar la sección de "DATOS CON IA" y el "Generador de apuestas"
    Y las cards deben renderizarse en menos de 10 segundos

