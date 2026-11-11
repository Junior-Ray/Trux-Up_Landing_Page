# TruxUp — Brief para la landing page

Documento para entregar a quien construya la landing (diseñador/a, desarrollador/a o una IA). Está pensado para **pegarse como prompt** o **adjuntarse como archivo**. Todo lo que afirma sobre el producto fue verificado en el proyecto; lo que no se pudo verificar está marcado como `[POR VERIFICAR]`.

Fecha de los datos: 11 de noviembre de 2026.

---

## 0. Cómo usar este documento

**Archivos que acompañan al brief** (carpeta `docs/landing/`):

| Archivo | Para qué |
|---|---|
| `rutas_ciudad.svg` | Mapa esquemático de toda el área con las 18 líneas que reconoce la cámara resaltadas sobre la red de rutas. 129 KB (24 KB comprimido). Para el hero y la sección de mapa. |
| `rutas_centro.svg` | Zoom al centro (UNT, Plaza de Armas, Estadio Mansiche) con una ruta de ejemplo en blanco y la caminata punteada. 113 KB (14 KB comprimido). Para la demo. |
| `rutas_demo.json` | Metadatos de las 18 líneas (nombre, empresa, tarifa) y datos de la ruta de ejemplo. |
| `public/img/logo.png` | Logotipo TruxUp. |
| `public/img/hero_trujillo.jpg` | Fotografía de Trujillo ya usada en la aplicación. |

Los SVG son **trazados reales** (OpenStreetMap), no una ilustración. Cada línea es un `<path class="linea" pathLength="1" data-line="M-07-V" data-name="…">`, de modo que se anima con `stroke-dasharray: 1; stroke-dashoffset: 1 → 0` sin calcular longitudes. Se regeneran con `python -m tools.transit.landing_assets`.

### Prompt A — construir la landing desde cero

> Eres un diseñador/a y desarrollador/a front-end senior especializado en accesibilidad. Construye la landing page de **TruxUp**, un asistente de voz que ayuda a personas con discapacidad visual a usar las combis y micros de Trujillo (Perú). Sigue el brief adjunto (`BRIEF_LANDING_PAGE.md`) al pie de la letra: estructura de secciones (§9), dirección visual y tokens (§10), animaciones (§11), accesibilidad (§12), rendimiento (§13) y los guardarraíles de contenido (§7 y §8). Usa los SVG adjuntos como gráfico principal. No inventes cifras, testimonios, logotipos ni funciones que no estén en el brief; donde falte un dato, deja un marcador `[POR VERIFICAR]` visible. Entrega una página estática (HTML/CSS/JS, sin frameworks pesados), en español de Perú, que funcione bien en un teléfono Android de gama media con conexión 4G, y una lista final de lo que quedó pendiente.

### Prompt B — auditar y mejorar la landing que ya tienes

> Adjunto mi landing actual y el brief de TruxUp. Audítala contra el brief: (1) contenido: problema, objetivos, funciones y estado, y qué afirma que no puede sostener (§7–§8); (2) estructura frente al §9; (3) diseño frente al §10; (4) animaciones frente al §11; (5) accesibilidad frente al §12, probando teclado, lector de pantalla y `prefers-reduced-motion`; (6) rendimiento frente al §13. Devuélveme una tabla con cada hallazgo, su gravedad y el arreglo, y luego aplica los arreglos de gravedad alta y media conservando lo que ya funciona bien.

---

## 1. El proyecto en 30 segundos

**TruxUp** es un asistente conversacional por voz para el transporte público de Trujillo, pensado para personas ciegas y de baja visión. La persona dice a dónde va ("quiero ir a la Plaza de Armas") y el sistema le responde qué combi o micro tomar, por qué calle caminar para subir, dónde bajar y cuánto caminará después. Con la cámara del teléfono puede apoyarse para reconocer si el vehículo que se acerca es de la línea correcta.

- **Nombre:** TruxUp. Nombre completo en la aplicación: "TruxUp — Asistente de Transporte Accesible de Trujillo".
- **Cobertura:** área metropolitana de Trujillo (Trujillo Centro, El Porvenir, Florencia de Mora, La Esperanza, Víctor Larco, Huanchaco, Moche, Laredo, Salaverry).
- **Plataformas:** aplicación web instalable (PWA) y aplicación móvil (Expo/React Native). `[POR VERIFICAR: enlaces de descarga o acceso públicos]`.
- **Estado:** en desarrollo, con pruebas en equipo. **No** ha sido validado en campo con usuarios.

---

## 2. El problema

> Las frases de esta sección describen la premisa del proyecto. Antes de publicarlas conviene contrastarlas con personas ciegas y de baja visión de Trujillo y con asociaciones locales (`[POR VERIFICAR]`).

**El problema central:** en Trujillo, subirse a la combi o micro correcta depende casi por completo de la vista.

Cuatro barreras concretas, que son las que el sistema ataca:

1. **Reconocer el vehículo.** La línea se identifica por un letrero en el parabrisas (letras y números) y por la carrocería. Hay decenas de empresas operadoras y más de cien líneas; algunas comparten la misma letra y se distinguen por un detalle (por ejemplo, un cartel de corazón). Quien no ve el letrero no puede saber qué carro se acerca.
2. **Saber qué línea sirve para ir de A a B.** No hay una guía accesible y unificada. Las aplicaciones y mapas existentes son visuales: dependen de leer una pantalla o de tocar un mapa.
3. **Llegar al punto de subida.** Se aborda en cualquier punto del recorrido, no solo en paraderos oficiales. La persona necesita saber *por qué calle* y *hacia qué lado* esperar, y cuánto debe caminar.
4. **Saber dónde bajar.** Sin ver la calle, es fácil pasarse o bajar lejos del destino.

**Consecuencia:** la persona depende de que alguien más le diga qué carro tomar, o evita el transporte público. Eso limita su autonomía para estudiar, trabajar, hacer trámites y atenderse en un hospital.

**Dato externo para dimensionar** `[POR VERIFICAR]`: número de personas con discapacidad visual en La Libertad/Trujillo (INEI, CONADIS o registro municipal). No usar ninguna cifra hasta tener la fuente y la fecha.

**Por qué ahora y por qué aquí:** los datos abiertos de transporte de Trujillo en OpenStreetMap ya describen más de cien líneas con su trazado, y los teléfonos tienen voz, GPS y cámara. Falta convertir eso en una ayuda pensada desde el principio para quien no ve.

---

## 3. Objetivos

### Del proyecto
- **General:** que una persona con discapacidad visual pueda planificar y realizar un viaje en combi o micro en Trujillo con mayor autonomía y seguridad.
- **Específicos:**
  1. Responder, por voz y en lenguaje natural, "¿qué tomo para ir de aquí a X?" con 3 a 5 opciones, indicando la calle de subida, la calle de bajada y la caminata.
  2. Reconocer los destinos como se dicen (la UNT, la OR, Plaza Vea, el Parque de las Aguas, restaurantes, óvalos) y elegir la sucursal más cercana.
  3. Ayudar a reconocer el vehículo con la cámara para las líneas ya entrenadas, siempre pidiendo confirmar con el conductor.
  4. Acompañar el viaje con avisos por GPS al acercarse a la bajada.
  5. Mantener los datos de rutas correctos con revisión abierta de la comunidad.

### De la landing
- **Explicar** el problema y la solución en menos de 30 segundos de lectura.
- **Generar confianza** siendo transparente sobre qué hace, qué no hace y en qué estado está.
- **Convertir** en tres acciones, en este orden de importancia: (1) probar TruxUp, (2) colaborar revisando rutas, (3) contactar como organización o institución.
- **Ser un ejemplo de accesibilidad:** la página de un proyecto para personas ciegas que no sea accesible destruye su credibilidad.

### Métricas de éxito de la landing
| Métrica | Objetivo |
|---|---|
| Clic en "Probar TruxUp" sobre visitantes | `[definir con el equipo]` |
| Profundidad de scroll hasta "Cómo funciona" | más del 60 % |
| Lighthouse (móvil): Rendimiento / Accesibilidad / Mejores prácticas / SEO | ≥ 90 / 100 / ≥ 95 / ≥ 95 |
| LCP / CLS / INP | < 2,5 s / < 0,1 / < 200 ms en 4G |
| Prueba con lector de pantalla (NVDA y TalkBack) sin bloqueos | 100 % de las secciones y la demo |

---

## 4. Público y mensajes

| Público | Qué necesita saber | Mensaje clave |
|---|---|---|
| **Personas ciegas y de baja visión** (principal) | Que es para ellas, que se maneja por voz, que es honesto sobre sus límites | "Dime a dónde vas. Te digo qué línea tomar." |
| **Familiares y acompañantes** | Que mejora la autonomía sin sustituir su ayuda | "Más autonomía para quien viaja, más tranquilidad para quien espera." |
| **Organizaciones, universidades, municipalidad/GTT** | Rigor, datos abiertos, alcance, cómo colaborar | "Datos abiertos, validación transparente, listo para pilotos." |
| **Voluntarios y colaboradores** | Cómo ayudar y que su aporte cuenta | "Revisa una ruta, ayuda a que otra persona llegue." |
| **Evaluadores / jurados / prensa** | Problema, método, resultados, límites | Sección de estado y transparencia (§9.11). |

**Principio de comunicación:** *nada sobre nosotros sin nosotros*. Mostrar a las personas usuarias como protagonistas y co-creadoras, no como destinatarias de ayuda.

---

## 5. Propuesta de valor y diferenciadores

**Promesa:** una ayuda de viaje que se maneja por voz, habla como la gente de Trujillo y sabe dónde pasa cada línea.

Diferenciadores que se pueden sostener hoy:

1. **Hecho desde la voz y la accesibilidad.** No es una aplicación visual con un lector encima: la conversación es la interfaz.
2. **Entiende cómo se pregunta aquí.** Reconoce más de 7 000 lugares con nombre (restaurantes, parques, hospitales, óvalos, mercados) y referencias locales como "la OR" o "el Plaza Vea de Mansiche".
3. **Sabe dónde subir en cualquier punto del recorrido.** Indica la calle y, si hay, un paradero oficial o una referencia cercana.
4. **Reconocimiento del vehículo con la cámara** para 18 líneas, con confirmación en varios cuadros seguidos y aviso de confirmar con el conductor.
5. **Datos abiertos y verificables.** Trazados de OpenStreetMap validados automáticamente y revisados por personas, con registro público de cambios.
6. **Rápido y ligero:** respuestas de unos 15 KB, pensadas para datos móviles.

---

## 6. Cómo funciona (para explicarlo en 4 pasos)

1. **Dices a dónde vas.** Con tu voz, desde donde estás: el teléfono usa el GPS y te confirma tu ubicación antes de calcular.
2. **Te propone opciones.** Entre 3 y 5, con la línea, la calle donde subir, la calle donde bajar, cuánto caminas y cuánto cuesta cada tramo.
3. **Te ayuda a reconocer el vehículo.** Con la cámara, para las líneas entrenadas, y siempre te pide confirmar con el conductor.
4. **Te acompaña en el viaje.** Avisa por GPS cuando te acercas a la bajada.

Flujo real de una consulta (para la demo): *"Estoy en la UNT y quiero ir al Estadio Mansiche"* → el sistema elige la línea **M-23 B (Virgen de la Puerta)**, sube en la **Av. Juan Pablo II** y baja en la **Av. Manuel Vera Enríquez**.

Respuesta real del sistema (se puede usar tal cual en la demo; la locución no incluye estimaciones de minutos a propósito):

> *Para tu viaje desde Universidad Nacional de Trujillo (UNT) hasta Estadio Mansiche, la opción más óptima es directa con el microbús de la Empresa Virgen de la Puerta, Línea B, ya que hace un recorrido en línea recta y sin transbordos. Paso 1: Camina unas 2 cuadras (unos 143 metros) en línea recta hacia Avenida Juan Pablo II para tomar el carro directo. Paso 2: Permanece en el vehículo y pide la bajada en Avenida Manuel Vera Enríquez. Al descender, tu destino estará a solo 157 metros de caminata por la misma vía. ¿Te acompaño a ir al paradero, reconocer el vehículo y tomar el carro hasta tu destino?*

---

## 7. Lo que se puede afirmar (y con qué datos)

| Afirmación | Dato | Fuente / fecha |
|---|---|---|
| Líneas de combi, micro y colectivo con trazado | **Más de 120** | OpenStreetMap, validación propia, 11-nov-2026 |
| Líneas que la cámara reconoce | **18** (más "otro/fondo") | Modelo de visión activo |
| Lugares con nombre que reconoce la voz | **Más de 7 000** | OpenStreetMap, 11-nov-2026 |
| Paraderos con código oficial en el mapa | **Más de 1 300** | OpenStreetMap, 11-nov-2026 |
| Opciones por consulta | **3 a 5** | Recomendador v2 |
| Tamaño de la respuesta | **~15 KB** (antes hasta 4 MB) | Medido en PC |
| Tiempo de cálculo | **~0,15 s** en el servidor | Medido en PC, no en teléfono |
| Alertas por GPS al acercarse a la bajada | a **300 m** y a **45 m** | Configuración de la app |
| Confirmación de la cámara | **3 cuadros consecutivos** de la misma línea | Configuración de la app |

Cifras que cambian: redondearlas ("más de 120") y mostrar la fecha.

## 8. Lo que NO se debe prometer (guardarraíles)

El proyecto tiene límites reales. La landing **no** debe decir ni insinuar lo siguiente:

| No decir | Por qué |
|---|---|
| "Reconoce cualquier combi o micro" | La cámara solo reconoce 18 líneas y no distingue las variantes "Corazón" de su línea base. |
| "Precisión del X %" o "acierto del X %" | La única cifra disponible (83,77 %) es de una validación heredada con fotos del mismo origen, **no es desempeño de campo**. Publicarla sería engañoso. |
| "Te dice cuándo llega el bus" / "en tiempo real" | No hay datos en vivo de los vehículos. |
| "Te dice cuánto tardas" | La locución evita estimaciones de minutos a propósito. |
| "Funciona sin internet" | El reconocimiento de voz usa un servicio externo; el cálculo de rutas se hace en un servidor. |
| "Te avisa con el teléfono bloqueado" | El modo a bordo exige la app abierta y la pantalla encendida. |
| "Ruta garantizada" / "100 % seguro" | Los trazados vienen de datos abiertos validados, pero **ninguno está verificado en campo**. Siempre se pide confirmar con el conductor. |
| "Tarifas oficiales" | Las tarifas son por línea y en parte estimadas; presentarlas como "tarifa estimada". |
| Testimonios, cifras de usuarios, alianzas, premios | No existen todavía. No inventarlos ni usar placeholders que parezcan reales. |
| Logotipos de empresas de transporte, de la UNT o de la municipalidad | Requieren permiso. |
| "Sustituye al bastón, al guía o al acompañante" | Es una ayuda complementaria. |

**Siempre** acompañar las funciones con su límite en lenguaje claro (por ejemplo: "La cámara reconoce 18 líneas. Para las demás, el sistema te lo dirá y te pedirá confirmar con el conductor").

---

## 9. Estructura de la página, sección por sección

Una sola página con anclas. Orden recomendado; el copy es una propuesta en español de Perú (tuteo, frases cortas, sin tecnicismos).

### 9.0 Cabecera y navegación
- Logo TruxUp a la izquierda; enlaces: *Problema, Cómo funciona, Demo, Mapa, Colabora, Estado*; botón **Probar TruxUp**.
- Enlace "Saltar al contenido" como primer elemento enfocable. Interruptor de tema (claro/oscuro) y de movimiento reducido.
- Cabecera fija que se compacta al hacer scroll. En móvil, menú accesible con foco atrapado y cierre con Escape.

### 9.1 Hero
- **Objetivo:** que en 5 segundos se entienda qué es, para quién y qué hacer.
- **H1 (elegir una):**
  - A. *Tu combi o micro en Trujillo, a la voz.*
  - B. *Dime a dónde vas. TruxUp te dice qué línea tomar.*
  - C. *Sube a la combi correcta, con tu voz y tu cámara.*
- **Subtítulo:** *TruxUp es un asistente de voz que te dice qué combi o micro tomar, dónde subir y dónde bajar, y te ayuda a reconocer el vehículo con la cámara de tu celular. Hecho en Trujillo, para personas con discapacidad visual.*
- **CTA principal:** *Probar TruxUp*. **Secundario:** *Cómo funciona* (ancla).
- **Aviso breve bajo los botones:** *En desarrollo · Cubre más de 120 líneas · La cámara reconoce 18 líneas.*
- **Visual:** fondo azul marino (`#0B2239`) con `rutas_ciudad.svg` a pantalla completa y baja opacidad; las líneas naranjas y celestes se **dibujan** una a una; en el centro, un micrófono grande con ondas y un teléfono con una burbuja de conversación. Ver §11 (animación H1).
- **Accesibilidad:** el SVG es decorativo para el lector de pantalla (`aria-hidden="true"`) en el hero; el mensaje está en el texto.

### 9.2 Problema
- **Titular:** *Subir a la combi correcta no debería depender de ver el letrero.*
- **Contenido:** las cuatro barreras (§2) como cuatro tarjetas con ícono. Cierra con la consecuencia (autonomía) en una frase.
- **Visual:** una fila de siluetas genéricas de combis y micros que pasan de izquierda a derecha, todas con letras distintas (M-07, C-18, M-23…); una de ellas se resalta. Sin mostrar marcas ni empresas reales.
- **Tono:** sin lástima, sin dramatizar, sin "superar la discapacidad". El problema está en el sistema de transporte, no en la persona.
- **Dato externo:** reservar un espacio para una cifra con fuente `[POR VERIFICAR]`.

### 9.3 Objetivo y principios
- **Titular:** *Más autonomía para moverse por la ciudad.*
- **Contenido:** objetivo general en una frase y los cinco objetivos específicos como lista corta. Debajo, tres principios: **Voz primero**, **Honestidad sobre los límites** (siempre confirma con el conductor), **Datos abiertos y verificables**.

### 9.4 Cómo funciona
- Cuatro pasos (§6) en línea de tiempo horizontal en escritorio y vertical en móvil, con ícono, título y una frase por paso.
- **Animación:** una línea de progreso se rellena al hacer scroll; cada paso se activa al entrar en pantalla.

### 9.5 Demo conversacional
- **Objetivo:** que la persona *escuche* el producto.
- **Contenido:** una conversación real (§6) en burbujas, con botón **Escuchar** (audio pregrabado o síntesis de voz del navegador) y **transcripción siempre visible**. A la derecha, `rutas_centro.svg` con la ruta blanca dibujándose y la caminata punteada.
- **Elementos:** chips para cambiar de ejemplo (*UNT → Estadio Mansiche*, *Plaza de Armas → Mall Aventura*, *UNT → Plaza Vea*). `[Generar las respuestas con el sistema real; no inventarlas]`.
- **Accesibilidad:** el audio nunca se reproduce solo; el botón tiene estado (reproduciendo/pausado); la ruta dibujada se describe en texto ("Camina 143 m hasta la Av. Juan Pablo II, sube a la M-23 B, baja en la Av. Manuel Vera Enríquez").

### 9.6 Reconocimiento con la cámara
- **Titular:** *Una segunda mirada para reconocer el vehículo.*
- **Contenido:** la cámara reconoce 18 líneas; confirma en 3 cuadros seguidos antes de avisar; **siempre** pide confirmar con el conductor. Aclarar dentro de la misma sección lo que no hace (§8): no reconoce otras líneas, no distingue variantes "Corazón" de su línea base.
- **Visual:** ilustración de un bus con un marco de detección que se ajusta y un chip *"Línea reconocida: M-07 V — confírmalo con el conductor"*. Tres puntos que se encienden de a uno (los 3 cuadros).

### 9.7 Mapa de la red
- **Titular:** *La red de Trujillo, dibujada con datos abiertos.*
- **Contenido:** `rutas_ciudad.svg` interactivo. Al pasar el cursor o enfocar una línea se resalta y aparece una tarjeta (nombre de la línea, empresa, tarifa estimada). Debajo, tres cifras con *count-up* (§7).
- **Alternativa accesible obligatoria:** una **lista de las 18 líneas** (botones reales, navegables con teclado) que resalta la línea en el mapa. El SVG tiene `role="img"` con `<title>` y `<desc>`.
- **Pie del mapa (obligatorio):** *Datos de rutas © colaboradores de OpenStreetMap, disponibles bajo la licencia ODbL.* con enlace a `https://www.openstreetmap.org/copyright`.

### 9.8 Viaje acompañado
- **Contenido:** el modo a bordo avisa por GPS cuando te acercas a la bajada (a 300 m y a 45 m). Aclarar: *"Mantén la app abierta y la pantalla encendida"*.
- **Visual:** una línea con un punto que avanza y dos ondas (300 m y 45 m) que se expanden al llegar.

### 9.9 Diseñado desde la accesibilidad
- **Contenido:** cómo se pensó para quien no ve: conversación por voz, confirmación de ubicación antes de calcular, referencias locales ("cerca de la Oficina de Registro Militar"), lenguaje sencillo, avisos de qué línea no reconoce la cámara.
- **Visual:** tres tarjetas con ícono y una cita breve del equipo. `[Testimonios reales con consentimiento, si existen; si no, omitir]`.

### 9.10 Construido con la comunidad
- **Titular:** *Cada ruta revisada ayuda a que alguien llegue.*
- **Contenido:** los trazados vienen de OpenStreetMap, se validan automáticamente y las personas los revisan en un mapa abierto: marcan cada recorrido como correcto, dudoso o incorrecto y ganan **1 punto por ruta revisada** en un ranking de etiquetadores. Todo queda registrado.
- **CTA:** *Ayúdanos a revisar rutas* (enlace configurable; **no** apuntar a un enlace temporal de túnel, que cambia cada vez).
- **Visual:** captura del mapa de revisión y un podio del ranking con datos ficticios claramente marcados como ejemplo, o bien sin ranking.

### 9.11 Estado del proyecto y hoja de ruta
- **Objetivo:** transparencia. Es la sección que más confianza genera.
- **Tres columnas** *(propuesta; confirmar con el equipo)*:
  - **Ya funciona:** conversación por voz, recomendador de rutas con más de 120 líneas, reconocimiento de lugares, cámara para 18 líneas, revisión comunitaria de rutas.
  - **En pruebas:** uso en teléfonos reales, verificación en campo de las líneas más usadas.
  - **Próximo:** indicaciones de caminata siguiendo las calles, más líneas en la cámara, distinguir variantes "Corazón", avisos con la pantalla bloqueada.
- **Aviso visible:** *TruxUp aún no ha sido validado en campo con usuarios. Úsalo como apoyo y confirma siempre con el conductor.*

### 9.12 Preguntas frecuentes
Acordeón accesible (botones con `aria-expanded`). Respuestas honestas:
- *¿Cuesta algo?* `[POR VERIFICAR]`.
- *¿Funciona sin internet?* No del todo: la voz y el cálculo de rutas necesitan conexión.
- *¿Qué líneas cubre?* Más de 120 para planificar; 18 para reconocer con la cámara.
- *¿Qué pasa con mi ubicación, mi voz y mis fotos?* (ver §14).
- *¿Es seguro?* Es una ayuda; confirma siempre con el conductor.
- *¿Puedo ayudar o reportar un error?* Sí (revisión de rutas y contacto).
- *¿Quién lo hace?* `[POR VERIFICAR: equipo, institución]`.

### 9.13 Llamada final
- **Titular:** *Empieza a viajar con TruxUp.* Dos botones: **Probar TruxUp** y **Colabora con las rutas**. Debajo, correo/WhatsApp de contacto `[POR VERIFICAR]`.

### 9.14 Pie de página
Logo, descripción de una línea, enlaces (Privacidad, Accesibilidad de esta página, Contacto), **atribución a OpenStreetMap (ODbL)**, créditos del equipo `[POR VERIFICAR]` y año. Una *declaración de accesibilidad* breve (qué se probó y cómo reportar un problema).

---

## 10. Dirección visual

### Concepto
**"La ruta que se ilumina."** Una ciudad oscura, discreta, sobre la que las rutas se encienden en naranja y celeste y guían la mirada. Combina la seriedad de un proyecto de accesibilidad con la calidez de una ciudad. Es la misma identidad que ya usa la aplicación (azul marino + naranja), llevada a un lenguaje más editorial.

### Colores (tokens de la aplicación, `public/css/base.css`)
```css
:root {
  --navy:        #0D2D52;  --navy-dark:  #081B33;  --navy-deep: #0B2239;
  --navy-light:  #163E6E;  --navy-surface: #1E497C;
  --orange:      #EA580C;  --orange-dark: #C2410C; --orange-light: #FB923C; --orange-surface: #FFF7ED;
  --amber:       #EFA748;  --amber-light: #FDE68A; --amber-surface: #FEF3C7;
  --sky:         #0284C7;  --sky-dark:   #0369A1;  --sky-light: #38BDF8; --sky-surface: #E0F2FE;
  --bg:          #F4F6F9;  --card:       #FFFFFF;  --border:   #E2E8F0;
  --text:        #0F172A;  --text-muted: #475569;
  --success: #16A34A; --warning: #D97706; --danger: #DC2626;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 18px; --radius-xl: 26px;
}
/* Modo oscuro de la aplicación */
:root[data-theme="dark"] { --bg: #0B111A; --card: #151F30; --card-subtle: #1C273D; }
```
**Uso:** fondos oscuros con azul marino (`#0B2239` en el hero); naranja para acciones y la ruta principal; celeste y ámbar para las demás líneas y acentos; blanco para la ruta de ejemplo.

### Contraste (calculado con la fórmula WCAG; `[verificar con una herramienta antes de publicar]`)
| Combinación | Contraste | Uso |
|---|---|---|
| Blanco sobre `#0B2239` | 16,1 : 1 | Texto sobre el hero |
| `#38BDF8` sobre `#0B2239` | 7,5 : 1 | Enlaces y acentos en fondo oscuro |
| Blanco sobre `#C2410C` | 5,2 : 1 | **Botón primario sobre fondo claro** |
| `#081B33` sobre `#EA580C` | 4,85 : 1 | Botón primario sobre fondo oscuro |
| Blanco sobre `#0369A1` | 5,9 : 1 | Enlaces sobre fondo claro |
| Blanco sobre `#EA580C` | **3,56 : 1** | **No usar para texto normal** (solo texto de 24 px o más, o 18,66 px en negrita) |
| Blanco sobre `#0284C7` | **4,10 : 1** | **No usar para texto normal**; usar `#0369A1` |

### Tipografía
- **Títulos:** *Plus Jakarta Sans* o *Sora*, peso 700–800.
- **Texto:** *Inter*, 400/500; la aplicación usa la pila del sistema, que es el respaldo.
- **Tamaños:** texto base **18 px mínimo**; interlineado 1,6; ancho de línea 60–70 caracteres; títulos fluidos con `clamp()`.
- Fuentes **autoalojadas** en formato `woff2` con subconjunto latino (no cargar desde terceros: privacidad y velocidad); `font-display: swap`.

### Iconografía y gráficos
- Íconos de línea con trazo uniforme de 2 px (por ejemplo, Lucide) y esquinas redondeadas; ícono + texto siempre, nunca solo ícono.
- Ilustraciones vectoriales planas con la paleta del proyecto: micrófono, teléfono, combi/micro **genéricos** (sin carrocerías ni marcas reales), ondas de sonido, pin de origen y destino.
- Mapa: los SVG adjuntos. Es el elemento distintivo de la página.
- **Fotografía:** solo con licencia o consentimiento. Evitar fotos de archivo que muestren a personas ciegas como figuras de lástima. Preferir manos con el teléfono, la ciudad y las propias combis (sin placas visibles). `hero_trujillo.jpg` ya existe.
- Si se muestran capturas de la aplicación, capturarlas de la versión real (`public/index.html`).

### Estilo de componentes
Tarjetas con radio 18 px y sombra suave; botones de 48 px de alto mínimo; foco visible de 3 px en `--amber-light` con desplazamiento de 2 px; separación generosa (escala de 8 px).

### Tema claro y oscuro
Respetar `prefers-color-scheme` y ofrecer un interruptor manual guardado (con `try/catch` por si el almacenamiento no está disponible). El hero siempre es oscuro.

---

## 11. Catálogo de animaciones

Principio: **la animación explica, no decora.** Todas deben tener un estado final estático equivalente.

| Animación | Dónde | Cómo | Duración y curva |
|---|---|---|---|
| **Dibujo de rutas** | Hero | Cada `.linea` anima `stroke-dashoffset: 1 → 0`; retraso escalonado de 60–80 ms; la red tenue (`#red`) aparece primero con fundido | 2,4 s total, `cubic-bezier(.22,1,.36,1)` |
| **Punto de origen pulsante** | Hero y demo | Círculo con anillo que se expande y desvanece | 2 s, 3 repeticiones y se detiene |
| **Ondas de voz** | Hero y demo | Barras que cambian de altura con `transform: scaleY` | 1,2 s, mientras se "habla" o se reproduce el audio |
| **Revelado al hacer scroll** | Todas las secciones | Fundido + desplazamiento de 16 px, con `IntersectionObserver` o `animation-timeline: view()` | 600–800 ms, `cubic-bezier(.22,1,.36,1)` |
| **Línea de progreso** | Cómo funciona | Barra que se rellena según el scroll; el paso activo se resalta | Ligada al scroll |
| **Burbujas de conversación** | Demo | Aparecen una a una; el texto se escribe letra a letra a 35 ms por carácter, **o** aparece completo si hay movimiento reducido | Letra a letra o 250 ms |
| **Ruta de ejemplo** | Demo | La ruta blanca se dibuja, luego la caminata punteada aparece con fundido; el marcador de destino rebota una vez | 1,6 s |
| **Resalte de línea** | Mapa | Al enfocar o pasar el cursor: la línea sube a `stroke-width` ×1,8 y el resto baja al 25 % de opacidad | 200 ms |
| **Marco de detección** | Cámara | El marco se ajusta al bus; tres puntos se encienden de a uno; aparece el chip de línea | 1,5 s, una vez |
| **Ondas de distancia** | Viaje acompañado | Dos anillos (300 m y 45 m) se expanden cuando el punto llega | 1,2 s, una vez por anillo |
| **Cifras (count-up)** | Mapa / Estado | Números que suben hasta su valor | 1,2 s, una vez, solo si no hay movimiento reducido |
| **Micro-interacciones** | Botones, tarjetas, acordeón | Elevación de 2 px, cambio de color, rotación del indicador | 150–250 ms |

**Reglas obligatorias:**
- **`prefers-reduced-motion: reduce`:** todo se muestra en su estado final, sin dibujo, sin count-up, sin letra a letra, sin parallax. Además, un interruptor manual "Reducir movimiento" en la cabecera.
- **Nada con parpadeo** (máximo 3 destellos por segundo) y **ninguna animación en bucle** de más de 5 segundos sin un botón de pausa.
- **Sin parallax fuerte** ni efectos de desplazamiento que puedan causar mareo; como máximo, un desplazamiento suave del fondo del hero.
- Animar solo `transform` y `opacity` (y `stroke-dashoffset` en SVG), para mantener 60 fps en un teléfono de gama media.
- Ninguna información importante aparece *únicamente* durante una animación.

---

## 12. Accesibilidad de la página (debe ser ejemplar)

El público principal usa lector de pantalla. La landing es la primera impresión del proyecto.

**Estándar:** WCAG 2.2 nivel AA como mínimo, apuntando a AAA donde sea viable.

- **Semántica:** un solo `<h1>`, jerarquía de títulos sin saltos, regiones `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`. `lang="es-PE"`.
- **Teclado:** todo operable sin ratón; orden de foco lógico; foco visible de 3 px con alto contraste; *skip link*; sin trampas de foco; el menú móvil y los diálogos cierran con Escape.
- **Lector de pantalla:** SVG informativos con `role="img"` + `<title>` + `<desc>`; los decorativos con `aria-hidden="true"`; el mapa tiene **lista alternativa** de líneas; el acordeón usa `aria-expanded`; los cambios dinámicos (demo) se anuncian con `aria-live="polite"`.
- **Audio:** nunca se reproduce solo; transcripción siempre visible; control de pausa y volumen; no depender del sonido para entender la sección.
- **Color:** no usar el color como único portador de información (las líneas del mapa se distinguen también por nombre y por la lista); contraste según §10.
- **Tamaño y reflujo:** texto escalable al 200 % sin pérdida, sin scroll horizontal desde 320 px; objetivos táctiles de **44 × 44 px** como mínimo.
- **Movimiento:** ver §11. Respetar `prefers-reduced-motion`, `prefers-color-scheme` y `prefers-contrast`.
- **Lenguaje:** frases cortas y concretas; sin jerga; las siglas se explican la primera vez (UNT, OR, GPS). Evitar "haz clic aquí".
- **Lenguaje sobre la discapacidad:** "personas con discapacidad visual", "personas ciegas y de baja visión". Evitar "sufren", "padecen", "víctimas", "capacidades especiales", "superar".
- **Formularios** (si los hay): etiquetas visibles, errores en texto y asociados al campo, sin límite de tiempo.
- **Declaración de accesibilidad** en el pie, con un medio de contacto para reportar problemas.

**Pruebas obligatorias antes de publicar:** NVDA + Chrome/Firefox en Windows; TalkBack en Android; VoiceOver en iOS; solo teclado; zoom al 200 % y 400 %; modo de alto contraste; `axe` y Lighthouse; y, de ser posible, **una sesión con personas ciegas o de baja visión de Trujillo**.

---

## 13. Rendimiento y técnica

La mayoría de las visitas llegarán desde un teléfono, a menudo por un enlace compartido en WhatsApp, y quizá con datos móviles limitados.

- **Sitio estático** (HTML, CSS y JavaScript sin dependencias pesadas). Un generador estático (por ejemplo, Astro) es aceptable; no usar frameworks de aplicación de una sola página para una landing.
- **Presupuesto:** primera carga **menos de 1,2 MB** (idealmente 600 KB); JavaScript menos de 60 KB comprimido; **sin librerías de animación** salvo necesidad real (CSS + `IntersectionObserver` bastan; si se usa GSAP, solo ScrollTrigger y cargado de forma diferida).
- **Metas** en un teléfono Android de gama media con 4G simulada: **LCP < 2,5 s, CLS < 0,1, INP < 200 ms**; Lighthouse ≥ 90 en rendimiento.
- **SVG en línea** para el hero (24 KB comprimidos) en lugar de imágenes; imágenes de mapa de bits en **AVIF/WebP** con `srcset`, dimensiones declaradas y carga diferida bajo el pliegue.
- **Fuentes autoalojadas**, subconjunto latino, máximo dos pesos por familia; precargar solo la de los títulos.
- **Sin recursos de terceros** que rastreen (fuentes de Google, píxeles, widgets). Analítica solo respetuosa con la privacidad y sin cookies (Cloudflare Web Analytics, Plausible o Umami). Sin banner de cookies si no hay cookies.
- **Móvil primero:** diseñar a 360 px de ancho; escritorio como ampliación.
- **Alojamiento:** estático (Cloudflare Pages encaja con lo que ya usa el proyecto), con HTTPS, compresión Brotli y caché larga para recursos con nombre de contenido.
- Enlaces de acción (probar la app, revisar rutas) **configurables en un solo lugar**; no incrustar direcciones temporales de túneles.
- Guardar preferencias (tema, movimiento) con `try/catch`: el almacenamiento puede fallar.

---

## 14. Privacidad, licencias y atribución

**Atribución obligatoria (ODbL):** en el pie y bajo cualquier mapa, *"Datos de rutas y lugares © colaboradores de OpenStreetMap, disponibles bajo la licencia ODbL"*, con enlace a `https://www.openstreetmap.org/copyright`. Si el mapa de fondo usa teselas, incluir también su atribución.

**Texto de privacidad (propuesta, en lenguaje sencillo; revisar con asesoría legal antes de publicar, en particular frente a la Ley 29733 de Protección de Datos Personales):**
- **Ubicación:** se usa para saber desde dónde sales y para los avisos del viaje. `[POR VERIFICAR: si se almacena y por cuánto tiempo]`.
- **Voz:** el reconocimiento del habla usa un servicio externo; el audio puede enviarse a un tercero para convertirlo en texto.
- **Cámara:** la foto se envía al servidor para reconocer la línea y se elimina después de procesarla.
- **Sin cuentas ni publicidad.** Las sesiones sirven solo para mantener la conversación y no identifican a la persona.
- **La landing:** sin cookies de seguimiento.

**Contenido de terceros:** usar solo fotografías, ilustraciones, íconos y fuentes con licencia compatible, y anotar los créditos. No copiar datos, textos ni diseños de otras aplicaciones de transporte.

---

## 15. SEO y compartir

- **Título:** *TruxUp — Transporte público accesible por voz en Trujillo* (menos de 60 caracteres).
- **Descripción** (≈150 caracteres): *Asistente de voz para personas con discapacidad visual: te dice qué combi o micro tomar en Trujillo, dónde subir y dónde bajar.*
- **Open Graph / Twitter:** imagen de 1200 × 630 px generada a partir de `rutas_ciudad.svg` sobre fondo `#0B2239` con el logo y el titular; texto alternativo.
- `lang="es-PE"`, URL canónica, `robots`, mapa del sitio, favicon y manifiesto web.
- **Datos estructurados** (JSON-LD): `SoftwareApplication` con `applicationCategory: "TravelApplication"` y `inLanguage: "es-PE"`. No incluir valoraciones ni descargas inventadas.
- **Palabras clave naturales:** transporte accesible Trujillo, combis y micros Trujillo, asistente de voz discapacidad visual, rutas de transporte Trujillo.
- **Vista previa en WhatsApp:** comprobarla, porque es el canal principal.

---

## 16. Tono y voz

- Español de Perú, tuteo, frases de 15 a 20 palabras como máximo.
- Palabras de la ciudad: *combi, micro, paradero, óvalo, "la OR", "la UNT"*.
- Cálido, directo, sin condescendencia y sin hipérbole. Honesto sobre los límites: es parte de la marca.
- Evitar: "revolucionario", "inteligencia artificial de última generación", "solución definitiva", "100 % preciso".
- Mencionar la inteligencia artificial solo en el detalle técnico, y con precisión (un clasificador de imágenes para 18 líneas).

---

## 17. Activos disponibles y por producir

**Disponibles:** logotipo, fotografía de Trujillo, los dos SVG de rutas, `rutas_demo.json`, la paleta y los tokens, la interfaz real de la aplicación (`public/index.html`) para capturas.

**Por producir:**
- Audios de la demo (pregrabados con la voz del sistema; evitar depender de la síntesis del navegador, que varía).
- Capturas de la aplicación en un teléfono real, con datos reales.
- Ilustraciones de combi/micro genéricas, el micrófono y el marco de detección.
- Imagen de vista previa para redes (1200 × 630).
- Fotografías o video con consentimiento, si se quiere humanizar la historia.
- Equipo, institución, enlaces y contacto.

**No reutilizar:** los códigos QR de `public/qr_*.png`, porque apuntan a enlaces temporales.

---

## 18. Preguntas abiertas para el equipo

1. **Institución y equipo:** ¿bajo qué nombre se presenta (UNT, tesis, concurso, emprendimiento)? ¿Qué logos y créditos se muestran?
2. **Acceso:** ¿cómo se prueba TruxUp hoy (enlace web, APK, tienda)? ¿Es gratis?
3. **Contacto:** ¿correo, WhatsApp o formulario?
4. **Dominio y alojamiento:** ¿cuál y quién lo administra?
5. **Datos del problema:** ¿hay una fuente local sobre personas con discapacidad visual en Trujillo y sobre su uso del transporte (INEI, CONADIS, asociaciones)?
6. **Voces de usuarios:** ¿existen entrevistas o pruebas con personas con discapacidad visual que se puedan citar con su consentimiento?
7. **Ranking:** ¿se muestra públicamente (con apodos) o solo se invita a colaborar?
8. **Tarifas:** ¿se muestran en la landing o solo dentro de la aplicación?
9. **Hoja de ruta:** ¿se confirman los puntos propuestos en §9.11?
10. **Idiomas:** ¿solo español, o también una versión en inglés para evaluadores?
11. **La landing que ya tienes:** adjúntala para auditarla con el *Prompt B*.

---

## 19. Lista de verificación antes de publicar

**Contenido**
- [ ] Ninguna afirmación de la tabla §8 aparece, ni siquiera de forma indirecta.
- [ ] Cada cifra está en §7, redondeada y con fecha.
- [ ] No hay testimonios, premios ni alianzas inventados.
- [ ] El aviso de "no validado en campo / confirma con el conductor" es visible.
- [ ] Todos los `[POR VERIFICAR]` están resueltos o retirados.

**Diseño y animación**
- [ ] Tokens de §10 y contrastes comprobados con una herramienta.
- [ ] Los SVG de rutas se animan y tienen estado final estático.
- [ ] Con `prefers-reduced-motion` no hay ninguna animación ni count-up.

**Accesibilidad**
- [ ] Probado con NVDA, TalkBack y solo teclado; demo y mapa utilizables.
- [ ] Lista alternativa del mapa y transcripción de la demo presentes.
- [ ] Objetivos táctiles de 44 px; reflujo a 320 px; zoom al 200 %.

**Técnica**
- [ ] LCP < 2,5 s, CLS < 0,1, INP < 200 ms en 4G simulada; Lighthouse ≥ 90.
- [ ] Sin recursos de terceros que rastreen; fuentes autoalojadas.
- [ ] Atribución a OpenStreetMap (ODbL) en el pie y bajo el mapa.
- [ ] Vista previa correcta en WhatsApp; metadatos y datos estructurados.
