FROM node:18-alpine

WORKDIR /app

# Instalar curl para health checks
RUN apk add --no-cache curl

# Copiar package files
COPY package*.json ./

# Instalar dependencias (cambiado de npm ci a npm install)
RUN npm install --omit=dev

# Copiar código fuente
COPY . .

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Cambiar ownership
RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["npm", "start"]