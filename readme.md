# Incidencias

Este proyecto está diseñado para abordar las incidencias que enfrentan campus en la gestión de las mismas, desde el control de inventario hasta el seguimiento de historiales y la administración de productos. Mediante la implementación de una  base de datos y la creación de endpoints que permiten consultas precisas, nuestro sistema busca simplificar y optimizar el registro de incidencias 

## __Instalacion:__

* Asegurarse de tener instalado Node.js y npm en tu sistema

**Clonar Repositorio:** Clona este repositorio copiando el siguiente comando en tu terminal:

``git clone https://github.com/LauraRamirezCampus/MongoIncidencia.git``

**1. Configura las variables de entorno:** Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Hay un ejemplo de las variables requeridas en el archivo `.env`.

(las variables vienen por defecto en el proyecto como usuario root )

**2. Instalar dependencias:** En la raiz de el proyecto encontraras un archivo llamado  ``package.json`` en el cual se encuentran las dependecias necesarias para que todo funcione,para instalarlas y compilar los archivos DTO debes ejecutar los siguientes comandos:

``npm install``

Con el anterior comando se instalara automaticamente todas las dependencias que se encuentran en el archivo 

``package.json``

**3. Creacion de la base datos:**  En el proyecto encontraras un archivo llamado ``data.mongodb`` en la ruta "MongoIncidencia\db\data.mongodb" donde podras ejecutar el script con la creacion de la base de datos e insercion de datos de prueba.

**4. Iniciar el servidor:** Para iniciar el servidor debes ejecutar el siguiente comando:

``npm run dev``

* Para utilizar cada endPoint primero necesitas un token de verificacion(Un token diferente por rol), el cual se genera utilizando la extensión "Thunder Client" en tu entorno de desarrollo de la siguiente manera:

1.Abre la extensión **"Thunder Client"** en tu entorno de desarrollo.

2.Crea una nueva solicitud **GET** a continuacion el ejemplo de URL para el  endPoint de productos:

``http://127.10.10.05:5105/token``

en el body debes enviar el nombre del usuario que deseas utilizar, de la siguiente manera:

```
{
  "nombre":"Miguel"
}
```


* Esta te generara el token de permiso para la peticion a las versiones a las cuales este usuario este actualizado.

* Una vez tengas el token debes incluirlo en el encabezado( header) de tu solicitud llamado Authorization

El proyecto tiene los siguientes endPoints:

**METODO:GET**

* listar las trainers

Una vez ingresado el token en el encabezado(header) de tu solicitudes puedes hacer esta peticion con esta URL:

``http://127.1.1.1:5507/trainer``

<hr>

**METODO:GET**

* listar las incidencias

Una vez ingresado el token en el encabezado(header) de tu solicitudes puedes hacer esta peticion con esta URL:

``http://127.1.1.1:5507/incidencias``

<hr>
