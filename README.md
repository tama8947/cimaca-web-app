
## Cimaca App - Cuidado Integral de la Macarena

- aplicacion web para la gestion de procesos de la macarena cuidado integral

### Librerias Utilizadas

#### Frontend
- axios v1.5.0 o superior. Libreria para hacer peticiónes o llamadas al contenido de un enlace HTTP.
- next-auth v4.23.1 o superior. Libreria para implementar autenticación en Next.js.
- primereact v9.6.2 o superior. Libreria de componentes de UI PrimeFaces en su versión para React.
- primeflex v3.3.1 o superior. PrimeFlex es una libreria de utilidades CSS ligera y responsiva que acompaña también a las librerias Prime UI y a las páginas web estáticas.
- primeicons v6.0.1 o superior. Biblioteca de iconos de fuentes para bibliotecas Prime UI. 
- formik v2.4.3 o superior. Formik es la biblioteca de formularios de código abierto más popular del mundo para React y React Native.
- yup v1.2.0 o superior. Es un creador de esquemas para el análisis y validación de valores en tiempo de ejecución. Se utiliza junto a formik.

#### Backend
- axios v1.5.0 o superior. Libreria para hacer peticiónes o llamadas al contenido de un enlace HTTP.
- next-auth v4.23.1 o superior. Libreria para implementar autenticación en Next.js.
- @prisma/client v5.2.0 o superior. Prisma Client es un cliente de base de datos generado automáticamente que se adapta al esquema de su base de datos.
- jsonwebtoken v9.0.2 o superior. Implementación de JSON Web Tokens.
- nodemailer v6.9.5 o superior. Nodemailer es un paquete de distribución de Node. js que podemos integrar a nuestro proyecto y nos permite enviar email a un servidor SMTP en formato texto o HTML.
- bcrypt v5.1.1 o superior. Una biblioteca para ayudarle a codificar y verificar contraseñas.
- @aws-sdk/client-ses 3.414 o superior. Amazon Simple Email Service, AWS SDK para JavaScript SES Client para Node.js, Web y React Native.
- @aws-sdk/credential-provider-node 3.414.0 o superior. Este módulo proporciona una función de fábrica, fromEnv, que intentará obtener las credenciales de AWS de un entorno Node.JS.

### Comandos para Prisma ORM

##### Crear migración con los cambios realizados en el esquema:

```
npx prisma migrate dev --name nombre-migracion
```

##### Generar los artefactos de configuración de tipos y configuración general de prisma después de un cambio en el esquema:
```
npx prisma generate
```

##### Ejecutar el comando de seed para registrar información por defecto en la base de datos:
```
npx prisma db seed
```
