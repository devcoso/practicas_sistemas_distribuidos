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
