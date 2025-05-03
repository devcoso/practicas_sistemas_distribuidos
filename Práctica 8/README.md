# TASKS PWA 📋🔐

Tasks PWA es una aplicación progresiva diseñada para la gestión eficiente de tareas, integrando de forma segura las funcionalidades de Task API y Auth API para ofrecer una experiencia personalizada y sincronizada para cada usuario.

---

## 🚀 Instalación y Ejecución

### **1️⃣ Requisitos Previos**
- Tener **Node.js** instalado (versión 14 o superior).
- Tener **npm** instalado.

---

### **2️⃣ Instalar dependencias**
```bash
npm install
```

---

### **3️⃣ Construir o desarrollar**

Para desarrollo 
```bash
npm run dev
```

Para producción
 ```bash
npm run build
```

---

### **4️⃣ Iniciar el servidor de autenticación**
```bash
cd ../Práctica\ 7
node auth.js
```
📍 Corre en `http://localhost:8000`

---

### **5️⃣ Iniciar el servidor de tareas**
```bash
cd ../Práctica\ 7
node tasks.js
```
📍 Corre en `http://localhost:8001`

---

## 📱**Cómo instalar una PWA**

1. **Abrir la aplicación en el navegador**  
    Accede a la aplicación desde un navegador compatible con PWA, como Google Chrome o Microsoft Edge.

2. **Verificar el soporte de PWA**  
    Asegúrate de que la aplicación muestra un icono o mensaje indicando que es instalable. Esto suele aparecer en la barra de direcciones o en el menú del navegador.

3. **Instalar la aplicación**  
    - En Chrome:  
      - Haz clic en el icono de instalación en la barra de direcciones (un símbolo de computadora con una flecha).  
      - Confirma la instalación en el cuadro de diálogo que aparece.  
    - En Edge:  
      - Haz clic en el menú (tres puntos en la esquina superior derecha).  
      - Selecciona "Aplicaciones" > "Instalar esta aplicación".  

4. **Acceder desde el escritorio o menú de aplicaciones**  
    Una vez instalada, la PWA estará disponible como una aplicación independiente en tu escritorio, menú de inicio o lanzador de aplicaciones.

5. **Disfrutar de la experiencia offline**  
    Si la PWA está configurada correctamente, podrás usarla incluso sin conexión a internet.


## 🛠 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **React** + **Vite**: Biblioteca para construir interfaces de usuario con un entorno de desarrollo rápido.
- **React Router DOM**: Librería para manejar el enrutamiento en aplicaciones React.
- **Tailwind CSS**: Framework de utilidades para estilizar componentes de manera eficiente.

