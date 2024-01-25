# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
