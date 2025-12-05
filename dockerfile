# ----------------------------
# Etapa 1: Construcción (Build)
# ----------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar la caché de Docker
COPY package.json package-lock.json ./

# Instalamos las dependencias usando 'npm ci' (más rápido y seguro para CI/CD)
RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Compilamos la aplicación para producción
RUN npm run build

# ----------------------------
# Etapa 2: Servidor Web (Nginx)
# ----------------------------
FROM nginx:alpine

# Copiamos la configuración personalizada de Nginx (creada en el paso 2)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos compilados desde la etapa 'build'
# NOTA: En Angular moderno, la ruta suele ser dist/<nombre-proyecto>/browser
COPY --from=build /app/dist/ghg-emissions-dashboard/browser /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
