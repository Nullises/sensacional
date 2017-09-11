 #Instrucciones

 1. Instalar paquetes requeridos:

 `sudo npm install`

 `bower install`

 2. Instalar Globalmente Sequelize-CLI:

 `sudo npm install -g sequelize-cli`

 3. Instalar Globalmente pg(6.4.1):

 `sudo npm install -g pg@6.4.1 pg-hstore `

4. Cambiar variables locales de la DB en `\server\config`

5. Dentro de /server correr

`sequelize db:migrate` //Migrar la DB

`sequelize db:seed:all` //Poblar la DB

6. Correr la app en raíz (/sensacional)

`npm start`
