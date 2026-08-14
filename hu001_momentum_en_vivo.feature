# language: es
@HU-001 @MomentumEnVivo @SportsbookIA

Característica: Visualización del Momentum de Juego en Vivo (HU-001)
  Como usuario de la plataforma de Sportsbook
  Quiero visualizar el gráfico de Momentum en tiempo real durante un partido en vivo
  Para analizar el dominio e intensidad del encuentro antes o durante mis apuestas.

  Criterios de Aceptación:
  - Mostrar gráfico de momentum en partidos en vivo.
  - Eje Y con logos correspondientes a cada equipo (Local arriba, Visitante abajo).
  - Eje X con línea de tiempo (0' a Fin) y eventos clave (goles, tarjetas rojas/amarillas).

  Antecedentes:
    Dado que el usuario accede al evento en vivo "Sporting Lisboa vs FK Bodo Glimt"
    Y navega a la pestaña de estadísticas "IA"

  @TC-001-01 @Smoke @UI
  Escenario: Visualización inicial del contenedor y marcas de tiempo del gráfico de Momentum
    Cuando se renderiza la tarjeta "Estadísticas de IA"
    Entonces el widget "Momentum del juego" debe estar visible en pantalla
    Y el eje X debe contener las marcas del partido: "0'", "15'", "30'", "ET", "60'", "75'", "Fin".

  @TC-001-02 @UI @Equipos
  Escenario: Validación de logos de los equipos en el Eje Y
    Cuando se visualiza el eje Y del gráfico de Momentum
    Entonces el logo de "Sporting Lisboa" debe posicionarse en el extremo del equipo local
    Y el logo de "FK Bodo Glimt" debe posicionarse en el extremo del equipo visitante.

  @TC-001-03 @Funcional @Eventos
  Escenario Esquema: Renderizado e interacción con eventos clave en la línea de tiempo
    Dado que el partido registró un evento "<evento>" en el minuto "<minuto>"
    Cuando se consulta la línea de tiempo del gráfico de Momentum
    Entonces se debe mostrar el icono "<icono>" en el minuto "<minuto>"
    Y al pasar el cursor o presionar sobre el icono se despliega la descripción "<descripcion>".

    Ejemplos:
      | evento           | minuto | icono             | descripcion                        |
      | Gol Local        | 12     | Balón             | Gol de Sporting Lisboa (1-0)       |
      | Tarjeta Roja     | 28     | Tarjeta Roja      | Tarjeta Roja para FK Bodo Glimt    |
      | Tarjeta Amarilla | 35     | Tarjeta Amarilla  | Tarjeta Amarilla para jugador local|

  @TC-001-04 @EdgeCase @Entretiempo
  Escenario: Comportamiento del gráfico durante el Entretiempo (ET)
    Dado que el partido se encuentra en estado "Entretiempo" (minuto 45+)
    Cuando el usuario revisa el gráfico de Momentum
    Entonces el trazado de la curva se detiene exactamente en el indicador "ET"
    Y la interfaz no muestra desplazamientos anómalos en el eje X.

  @TC-001-05 @TiempoReal @WebSocket
  Escenario: Actualización dinámica en tiempo real por emisión de eventos de presión
    Dado que el usuario tiene el gráfico visible en tiempo real
    Cuando el servidor emite una actualización de presión favorable al equipo visitante
    Entonces el trazado del gráfico de Momentum se dibuja dinámicamente hacia el lado del visitante sin requerir refrescar la página.
