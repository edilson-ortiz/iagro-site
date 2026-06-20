# Iagro — Sitio web

Landing page + Política de Privacidad + Términos de Servicio + Contacto, para `iagro360.xyz`.
Pensado especialmente para cumplir los requisitos de Meta al configurar la app de **WhatsApp Business API**.

## Estructura

```
iagro-site/
├── index.html        → Landing principal
├── privacidad.html    → Política de privacidad (URL para Meta)
├── terminos.html       → Términos de servicio
├── contacto.html       → Contacto + formulario
├── 404.html
├── css/style.css
├── js/main.js
├── img/logo.png / logo.jpeg
├── Dockerfile
├── nginx.conf
└── docker-compose.yml
```

## Correr en local con Docker

Necesitás tener Docker instalado ([docker.com](https://www.docker.com/products/docker-desktop/)).

```bash
cd iagro-site
docker compose up --build
```

Abrí: **http://localhost:8080**

Para parar:
```bash
docker compose down
```

### Sin docker-compose (Docker plano)

```bash
docker build -t iagro-web .
docker run -d -p 8080:80 --name iagro-web iagro-web
```

## Páginas clave para Meta / WhatsApp Business API

Cuando configures tu app en [developers.facebook.com](https://developers.facebook.com), vas a necesitar estas URLs (una vez publicado el sitio):

- **Política de privacidad:** `https://iagro360.xyz/privacidad.html`
- **Términos de servicio:** `https://iagro360.xyz/terminos.html`

Verificá que ambas carguen con HTTPS antes de pegarlas en el panel de Meta.

## Desplegar con Cloudflare

Tenés dos caminos buenos, dependiendo de cómo quieras correrlo:

### Opción A — Cloudflare Tunnel (corriendo el Docker en tu PC/servidor local)

Esta es la que mencionaste: corrés el contenedor local y lo exponés con un túnel, sin abrir puertos en el router.

1. Instalá `cloudflared`: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
2. Autenticate:
   ```bash
   cloudflared tunnel login
   ```
3. Creá el túnel:
   ```bash
   cloudflared tunnel create iagro
   ```
4. Asociá el dominio (en Cloudflare Zero Trust > Tunnels, o por CLI):
   ```bash
   cloudflared tunnel route dns iagro iagro360.xyz
   ```
5. Levantá el contenedor (`docker compose up -d`) y corré el túnel apuntando al puerto local:
   ```bash
   cloudflared tunnel run --url http://localhost:8080 iagro
   ```

Mientras el contenedor y el túnel estén corriendo, `iagro360.xyz` queda accesible desde internet con HTTPS automático de Cloudflare.

> Nota: si tu PC se apaga, el sitio cae. Para algo que Meta valide de forma estable a largo plazo, considerá la Opción B con un servidor que quede siempre encendido (VPS barato), o Cloudflare Pages para el sitio estático.

### Opción B — Cloudflare Pages (recomendada si no necesitás Docker corriendo 24/7)

Como el sitio es 100% estático (HTML/CSS/JS, sin backend), podés subirlo directo a Cloudflare Pages sin Docker:

1. Subí esta carpeta a un repositorio de GitHub.
2. En Cloudflare Dashboard → Workers & Pages → Create → Pages → conectá el repo.
3. Build command: (vacío, no hace falta build)
   Output directory: `/` (raíz del repo, o donde estén los `.html`)
4. Apuntá `iagro360.xyz` como dominio personalizado del proyecto en Pages.

Esto te da HTTPS automático, CDN global, y no depende de que tu máquina esté encendida — ideal para que Meta pueda validar la URL en cualquier momento.

## Personalización pendiente

- Reemplazá el texto de ejemplo de la sección de servicios si tenés modelos de equipos específicos (nombres, precios).
- El formulario de contacto actualmente abre WhatsApp con el mensaje prellenado (no hay backend de envío de email todavía). Si querés que también llegue por email, hay que conectar un servicio tipo Formspree, o un backend propio.
- Verificá el mapa en `contacto.html` / `index.html`: el `iframe` usa un bounding box aproximado de Santa Cruz — podés ajustar las coordenadas exactas si querés el pin más preciso.
