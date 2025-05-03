# Prácticas de Sistemas Distribuidos
Repositiorio para subir las prácticas de sistemas distribuidos por **Medina Paredes José David**
## Práctica 1 - Hios e Procesos
Una práctica que utiliza hilos para la multiplicación de matrices dividiendo el cálculo en múltiples tareas que se ejecutan simultáneamente. En lugar de procesar cada elemento de forma secuencial, se asignan fragmentos del trabajo a diferentes hilos, optimizando el uso del procesador y reduciendo el tiempo de ejecución.

Esta técnica mejora el rendimiento en sistemas con múltiples núcleos, permitiendo un procesamiento más eficiente.
## Práctica 2 - Sockets Cliente - Servidor
Una práctica en la que un cliente envía matrices a un servidor para que realice la multiplicación distribuye el procesamiento entre dos sistemas. El cliente construye y envía las matrices al servidor a través de una conexión de red utilizando sockets. El servidor recibe los datos, ejecuta la multiplicación y devuelve el resultado al cliente.

Este enfoque permite descargar la carga computacional en un servidor más potente, mejorando el rendimiento en dispositivos con recursos limitados. Además, facilita la centralización del procesamiento en aplicaciones distribuidas.
## Práctica 3 - Sockets Múltiples Clientes - Servidor
En está práctica realice un TCP con HTTP Básico en Java, funciona estableciendo conexión a un servidor TCP que maneja múltiples conexiones concurrentes utilizando un pool de hilos. El servidor implementa un servicio HTTP básico que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre archivos. Cada cliente se comunica a través de solicitudes HTTP con soporte para los headers y manejo básico de errores que responden con status 404 y 500.
## Práctica 4 - Sockets Múltiples Clientes - Múltiples Servidores
Esta práctica emplea un método de sincronización para garantizar la consistencia de los archivos incluso cuando se utilizan múltiples servidores, donde la concurrencia puede afectar la integridad de los datos. Gracias a este mecanismo, se previenen conflictos y se asegura que todas las operaciones realizadas en los distintos servidores mantengan un estado coherente, evitando problemas como accesos simultáneos inconsistentes, pérdida de datos o desincronización entre copias de los archivos.
## Práctica 5 - Objetos Distribuidos.
En esta práctica, se implementó un sistema de invocación de métodos remotos (RMI) en Java para la multiplicación de matrices. RMI nos permite que un programa en una máquina llame a métodos de un objeto que reside en otra máquina, facilitando la comunicación distribuida.
## Práctica 6 - Servicios Web
En esta práctica, se desarrolló una API RESTful sencilla para la gestión de tareas (tasks) utilizando Java con Spring Boot. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas, proporcionando endpoints para interactuar con un sistema de almacenamiento en memoria.

La API incluye las siguientes funcionalidades:
- **Listar tareas**: Devuelve una lista de todas las tareas almacenadas.
- **Crear tareas**: Permite agregar nuevas tareas con un título y descripción.
- **Actualizar tareas**: Permite modificar los detalles de una tarea existente.
- **Eliminar tareas**: Elimina una tarea específica por su identificador.

Esta práctica introduce conceptos básicos de diseño y desarrollo de servicios web, incluyendo el manejo de solicitudes HTTP, serialización/deserialización de datos en formato JSON y el uso de controladores REST.

## Práctica 7 - Microservicios

En esta práctica, se desarrolló una API RESTful sencilla para la gestión de tareas (tasks) utilizando Java con Spring Boot. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas, proporcionando endpoints para interactuar con un sistema de almacenamiento en memoria.

Además, se integró un mecanismo básico de autenticación mediante tokens (JWT), lo cual permite proteger los endpoints y garantizar que solo usuarios autenticados puedan acceder a las funcionalidades del sistema.

- **Autenticación de usuarios**: Permite a los usuarios registrarse e iniciar sesión. Al autenticarse correctamente, se les proporciona un token JWT que deben incluir en las solicitudes posteriores para acceder a los recursos protegidos.
- **Listar tareas**: Devuelve una lista de todas las tareas almacenadas para el usuario autenticado.
- **Crear tareas**: Permite agregar nuevas tareas con un título y descripción, asociadas al usuario autenticado.
- **Actualizar tareas**: Permite modificar los detalles de una tarea existente, siempre que pertenezca al usuario que realiza la petición.
- **Eliminar tareas**: Elimina una tarea específica por su identificador, si está asociada al usuario autenticado.

## Práctica 8 - Progressive Web App

Tasks PWA es una aplicación web progresiva (PWA) centrada en la organización y gestión de tareas personales, desarrollada con tecnologías modernas para garantizar una experiencia rápida, intuitiva y adaptable a cualquier dispositivo. La aplicación emplea React Router DOM para una navegación fluida y sin recargas, lo que permite transiciones rápidas entre vistas sin perder el contexto de uso.

Su diseño responsivo está construido con TailwindCSS, lo que asegura una interfaz limpia, moderna y fácilmente adaptable tanto en móviles como en pantallas de escritorio. A nivel funcional, Tasks PWA se integra con dos APIs principales: Task API para la gestión CRUD de tareas, y Auth API para el manejo seguro de autenticación y autorización de usuarios, permitiendo así sesiones protegidas y personalizadas.

Además, la aplicación cuenta con un Service Worker configurado para cachear todas las respuestas de la red. Esto no solo mejora significativamente los tiempos de carga, sino que también permite el uso offline y una mayor resiliencia ante conexiones inestables. Gracias a estas características, Tasks PWA ofrece una experiencia casi nativa, combinando lo mejor del desarrollo web y móvil.