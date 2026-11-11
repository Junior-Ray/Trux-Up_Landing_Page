# Plan de la landing — TruxUp

Público: general, principalmente Trujillo (Perú). Poco texto, mucho mensaje visual.

## Objetivo
Que cualquier visitante entienda en 5 segundos: **TruxUp ayuda a personas con discapacidad visual a usar el transporte público de Trujillo, con voz, vibración y cámara.**

## Decisiones
- Stack: HTML + CSS + JS puro (sin build), mobile-first.
- Identidad: el logo manda (`assets/logo.png`). Paleta tomada de él: azul marino y naranja.
- CTA principal: lista de espera (la app aún no está publicada).
- Sin contactos ni redes sociales.
- Accesibilidad AAA en la propia landing: contraste alto, foco visible, áreas táctiles ≥ 48 px, `prefers-reduced-motion`, navegación por teclado.

## Paleta
| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#14487A` | Botones, títulos |
| `--ink` | `#0F2F4E` | Texto |
| `--orange` | `#F47C20` | Acentos, fondos (nunca texto pequeño) |
| `--orange-ink` | `#A84300` | Texto naranja con contraste AA+ |
| `--bg` | `#FAFAF8` | Fondo |

## Secciones
1. Header fijo (logo, enlaces, botón "Únete")
2. Hero (mensaje + teléfono con radar)
3. El problema (3 tarjetas)
4. Cómo funciona (4 pasos: voz → brújula → cámara → alerta de bajada)
5. Accesibilidad primero
6. Hecho para Trujillo (líneas reales)
7. Cifras (18 líneas · 490 calles · 22 rutas · 85 %)
8. Próximamente
9. Lista de espera
10. Footer (sin contactos)

## Archivos
```
index.html
css/styles.css
js/main.js
assets/logo.png
```

## Pasos
- [x] Plan y estructura
- [x] Maquetado HTML
- [x] Estilos y responsive (360 / 768 / 1024)
- [x] JS: menú, animaciones al scroll, formulario
- [x] Sección "Pruébala hoy" (guía Expo Go en 3 pasos; hero y header apuntan a ella)
- [ ] Colocar el QR final en `assets/qr.png` (mientras tanto se ve un recuadro vacío)
- [ ] Revisión en navegador y ajustes
- [ ] Conectar el formulario a un servicio real (hoy solo muestra confirmación)
