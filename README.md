# Prácticas de Sistemas Distribuidos
Repositiorio para subir las prácticas de sistemas distribuidos por **Medina Paredes José David**
## Práctica 1 - Hios e Procesos
Una práctica que utiliza hilos para la multiplicación de matrices dividiendo el cálculo en múltiples tareas que se ejecutan simultáneamente. En lugar de procesar cada elemento de forma secuencial, se asignan fragmentos del trabajo a diferentes hilos, optimizando el uso del procesador y reduciendo el tiempo de ejecución.

Esta técnica mejora el rendimiento en sistemas con múltiples núcleos, permitiendo un procesamiento más eficiente.
## Práctica 2 - Sockets Cliente - Servidor
Una práctica en la que un cliente envía matrices a un servidor para que realice la multiplicación distribuye el procesamiento entre dos sistemas. El cliente construye y envía las matrices al servidor a través de una conexión de red utilizando sockets. El servidor recibe los datos, ejecuta la multiplicación y devuelve el resultado al cliente.

Este enfoque permite descargar la carga computacional en un servidor más potente, mejorando el rendimiento en dispositivos con recursos limitados. Además, facilita la centralización del procesamiento en aplicaciones distribuidas.