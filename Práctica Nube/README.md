# 📋 Todo Microservices

Aplicación de gestión de tareas construida con arquitectura de microservicios usando Node.js, Express, MySQL y Docker.

## 🏗️ Arquitectura

- **auth-service**: Servicio de autenticación y gestión de usuarios (Puerto 8000)
- **tasks-service**: Servicio de gestión de tareas (Puerto 8001) 
- **nginx**: Reverse proxy y load balancer (Puerto 80)
- **mysql**: Base de datos MySQL (Puerto 3306)

## 🚀 Inicio Rápido

### Prerrequisitos
- Docker y Docker Compose instalados
- Git

### Configuración Local

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd todo-microservices
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus valores
```

3. **Ejecutar con Docker Compose**
```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en background
docker-compose up -d --build

# Ver logs
docker-compose logs -f
```

4. **Verificar que funciona**
```bash
# Health checks
curl http://localhost:8000/health  # Auth service
curl http://localhost:8001/health  # Tasks service  
curl http://localhost/health       # Nginx
```

## 📚 API Endpoints

### 🔐 Autenticación (http://localhost/auth/)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión |
| GET | `/auth/verify` | Verificar token JWT |

### 📝 Tareas (http://localhost/api/)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Obtener todas las tareas del usuario | ✅ |
| POST | `/api/tasks` | Crear nueva tarea | ✅ |
| PUT | `/api/tasks/:id` | Actualizar tarea | ✅ |
| DELETE | `/api/tasks/:id` | Eliminar tarea | ✅ |

## 🧪 Ejemplos de Uso

### Registrar Usuario
```bash
curl -X POST http://localhost/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Iniciar Sesión
```bash
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Crear Tarea
```bash
curl -X POST http://localhost/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Mi primera tarea"}'
```

### Obtener Tareas
```bash
curl http://localhost/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🛠️ Desarrollo

### Estructura del Proyecto
```
todo-microservices/
├── auth-service/          # Servicio de autenticación
│   ├── auth.js           # Código principal
│   ├── package.json      # Dependencias
│   └── Dockerfile        # Configuración Docker
├── tasks-service/         # Servicio de tareas
│   ├── tasks.js          # Código principal  
│   ├── package.json      # Dependencias
│   └── Dockerfile        # Configuración Docker
├── nginx/                 # Reverse proxy
│   └── nginx.conf        # Configuración Nginx
├── docker-compose.yml     # Orquestación de servicios
└── .env                  # Variables de entorno
```

### Comandos Útiles

```bash
# Reconstruir solo un servicio
docker-compose build auth-service

# Acceder a la base de datos
docker-compose exec mysql mysql -u root -p todoapp

# Ver logs de un servicio específico
docker-compose logs -f tasks-service

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v
```

## 🐳 Producción

### Variables de Entorno Requeridas
- `DB_HOST`: Host de la base de datos
- `DB_USER`: Usuario de la base de datos  
- `DB_PASSWORD`: Contraseña de la base de datos
- `SECRET_KEY`: Clave secreta para JWT
- `NODE_ENV`: Entorno (production/development)

### Despliegue en AWS
Ver documentación de despliegue para instrucciones detalladas sobre ECS, RDS y otros servicios de AWS.

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt
- Autenticación mediante JWT tokens
- Tokens expiran en 24 horas
- Validación de propiedad de tareas por usuario
- Variables de entorno para datos sensibles

## 📄 Licencia

MIT License

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request