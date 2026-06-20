# Iagro — Sitio estático servido con Nginx
FROM nginx:alpine

# Configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el sitio
COPY index.html /usr/share/nginx/html/index.html
COPY privacidad.html /usr/share/nginx/html/privacidad.html
COPY terminos.html /usr/share/nginx/html/terminos.html
COPY contacto.html /usr/share/nginx/html/contacto.html
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY img/ /usr/share/nginx/html/img/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
