# Deploy de API

Nos vamos a Google Cloud, a la sección de Cloud Run. Ahí creamos un servicio siguiendo los pasos a continuación

* Clicamos en **Continuously deploy new revisions from a source repository**
* Clicamos en **Set up with cloud build**
* Seleccionamos GitHub y, particularmente, nuestro repositorio
* Clicamos en **Next**
* Seleccionamos la opción de **Dockerfile** y escribimos */api/Dockerfile*
* Guardamos
* En la sección de **Autoscaling** colcamos 1 y 10, respectivamente en los campos.
* En **Ingress** seleccionamos la primera de las 3 opciones
* En **Authetication** seleccionamos la primera opción también
* Creamos las siguientes variables de entorno:
  - NODE_ENV: production
  - PORT_FRONT: 9000
  - URL_DB: <url de tu BD>
  - HOST_API: <link que generará nuestro servicio después de creado>
  - JWT_SECRET: VEFMTEVSREVERVNBUlJPTExPREVTT0ZUV0FSRTIwMjItMUpXVEtFWTEwMTAxMDEwLi4tLSwse3vCtMK0Kys=
* Guardamos y finalizamos la creación del servicio

Hasta este punto, hemos terminado de crear el contenedor para nuestra página. Lo que vamos a hacer ahora, es el activador de este contendor para hacer el deployment.

* En Cloud Run, accedemos a la configuración de nuestro contenedor recién creado y clicamos en el botón **Edit Continuous Deployment**
* Cambiamos el nombre (opcional)
* Añadimos una variable de ambiente:
  - _HOST_API: https://g3-proytaller-back-dzyqzrqika-uc.a.run.app/api/v1
* Guardamos la configuración

# Deploy de Landing

Nos vamos a Google Cloud, a la sección de Cloud Run. Ahí creamos un servicio siguiendo los pasos a continuación

* Clicamos en **Continuously deploy new revisions from a source repository**
* Clicamos en **Set up with cloud build**
* Seleccionamos GitHub y, particularmente, nuestro repositorio
* Clicamos en **Next**
* Seleccionamos la opción de **Dockerfile** y escribimos */landing/Dockerfile*
* Guardamos
* En la sección de **Autoscaling** colcamos 1 y 10, respectivamente en los campos.
* En **Ingress** seleccionamos la primera de las 3 opciones
* En **Authetication** seleccionamos la primera opción también
* Creamos las siguientes variables de entorno:
  - HOST_API: <link que generará nuestro servicio después de creado>
* Guardamos y finalizamos la creación del servicio

Hasta este punto, hemos terminado de crear el contenedor para nuestra página. Lo que vamos a hacer ahora, es el activador de este contendor para hacer el deployment.

* En Cloud Run, accedemos a la configuración de nuestro contenedor recién creado y clicamos en el botón **Edit Continuous Deployment**
* Cambiamos el nombre (opcional)
* Abrimos el editor del **YAML** y colocamos lo siguiente en la línea 6:
~~~
- '--build-arg'
- 'HOST_API=https://g3-proytaller-back-dzyqzrqika-uc.a.run.app/api/v1'
~~~
* Guardamos la configuración

También debemos cambiar el link que aparece en la *page* **mapVista**  en la línea 120. Este debe ser cambiado por el link que le hayas asignado a tu máquina virtual; se explica en el siguiente tutorial.

# Creación de MV
  
  Aquí, crearemos un máquina virtual que se encargará de recibir los datos que obtenga el/los GPS
  
  * Vamos a Compute Engine
  * Creamos una instancia VM
  * Cambiamos el nombre (opcional)
  * Cambiamos el SO de deploy a Ubuntu 20.04 LTS (puede ser más actual)
  * Permitimos tráfico HTTPS y HTTP
  * Iniciamos la máquina con SSH
  * Instalamos node.js
  * Clonamos el repositorio de GitHub
  * Creamos un dominio, ya sea en google cloud o en otra página de dominios gratis
  * De aquí en adelante, debemos seguir el tutorial del siguiente video. Con este video certificaremos nuestra máquina virtual (video no personal):
    - https://www.youtube.com/watch?v=x1GK-g-ZQ1c
