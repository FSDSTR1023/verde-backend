# Piclery

Piclery es una aplicación web desarrollada con Node.js, Express y React - estilos: Material UI -, perfecta para fotógrafos que quieren administrar sus clientes y galerías de fotos. La base de datos utilizada es MongoDB con Mongoose.

## Instalación

1. Clona este repositorio: `git clone https://github.com/FSDSTR1023/verde-backend.git`
2. Navega a la carpeta `verde-backend`
3. Instala las dependencias del servidor: `npm install`, `yarn install` o `pnpm i`

## Uso

1. Inicia el servidor: `npm start`, `yarn start` o `pnpm start`

## Configuración de la base de datos

Sigue los pasos a continuación para configurar la base de datos MongoDB:

1. En este repositorio hay un modelo de las variables de entorno que utiliza el proyecto para la base de datos [.env.template](./.env.template) :

```
MONGO_DB_URI=<tu URL de conexión con mongo>
```

2. Las entidades de la base de datos son 3 *photographer*, *customer* y *gallery*, con las siguientes propiedades:


>  **Photographer**:
> | Parámetro | Tipo          | Requerido | Por defecto |
> |---------:|---------------|:----------:|:-------------:|
> |   name    | string        |        sí |             |
> |  surname  | string        |        sí |             |
> |   email   | string        |        sí |             |
> | password  | string        |        sí |             |
> | customers | Array<string> |        no | []          |
> | gallery   | Array<string> |        no | []          |
> | isDeleted | bool          |        no | false       |

> **Customer**:
> | Parámetro | Tipo          | Requerido | Por defecto |
> |----------:|---------------|:---------:|:-----------:|
> |      name | string        |    sí     |             |
> |   surname | string        |    sí     |             |
> |     email | string        |    sí     |             |
> |    addres | string        |    no     |             |
> |     phone | string        |    no     |     []      |
> |   gallery | Array<string> |    no     |     []      |
> | isDeleted | bool          |    no     |    false    |

> **Gallery**:
> | Parámetro | Tipo   | Requerido | Por defecto |
> |----------:|--------|:---------:|:-----------:|
> |      tile | string |    sí     |             |
> |   photos  | string |    no     |             |
> | customer  | string |    sí     |             |
> | isDeleted | bool   |    no     |    false    |


## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un *fork* del repositorio
2. Crea una rama para tu contribución: `git checkout -b feature/AmazingFeature`
3. Realiza tus cambios y haz *commit*: `git commit -m 'Add some AmazingFeature'`
4. Haz *push* a la rama: `git push origin feature/AmazingFeature`
5. Abre una *pull request*

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## Contacto

Grupo verde - [appmygallety@gmail.com](mailto:appmygallety@gmail.com)

En caso de dudas o sugerencias, no dudes en contactarnos.