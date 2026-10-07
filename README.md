# Descripción

## Correr en dev

1. Clonar el repositorio.
2. crear el archivo .env basado en el archivo .env.template
3. Instalar dependencias `npm install`
4. levantar base de datos docker con `compose up -d`
5. Correr las migraciones de prisma `npx prisma migrate dev`
6. Ejecutar el seed `npm run seed`
7. Correr el proyecto `npm run dev`

## Correr en prod
