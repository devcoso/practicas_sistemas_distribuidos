# Tutorial: Ejecutar un Proyecto RMI en Java

## Prerrequisitos
Antes de comenzar, asegúrate de tener instalado:

- **Java Development Kit (JDK)** (versión 8 o superior)
- **Compilador de Java (`javac`)**
- **Entorno de ejecución de Java (`java`)**

## 1. Compilar los archivos Java
Ejecuta el siguiente comando en la terminal dentro de la carpeta donde están los archivos `.java`:

```sh
javac *.java
```

Esto generará los archivos `.class` necesarios para la ejecución.

## 2. (Opcional) Generar los archivos stub (Solo en versiones antiguas de Java)
Si usas **Java 8 o anterior**, ejecuta:

```sh
rmic MatrixMultiplierImpl
```

A partir de **Java 9**, este paso no es necesario, ya que la generación de stubs es automática.

## 3. Iniciar el servidor RMI
Para registrar el objeto remoto en el `Registry`, ejecuta:

```sh
java Server
```

Deberías ver un mensaje similar a:

```plaintext
Multiplicador de matrices
Servidor RMI esperando...
```

## 4. Ejecutar el cliente RMI
En otra terminal o en otra máquina dentro de la misma red, ejecuta:

```sh
java Client
```

Si todo funciona correctamente, deberías recibir un matriz multiplicada.

## Notas Adicionales
- **Asegúrate de que el puerto 1099 está abierto** si ejecutas el servidor en otra máquina.
- Si el servidor y el cliente están en máquinas diferentes, en `Client.java` cambia `localhost` por la dirección IP del servidor.

Con esto, tu proyecto RMI debería estar funcionando correctamente. 🚀