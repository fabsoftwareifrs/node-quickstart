# Quickstart
<div style="text-align: right;">[<a href="https://github.com/fabsoftwareifrs/node-quickstart/blob/main/README.md">🇺🇸 EN</a> |<a href="https://github.com/fabsoftwareifrs/node-quickstart/blob/main/README.pt-br.md">🇧🇷 PT-BR</a>]</div>

This is a basic structure for a Node.js with Sequelize, Apollo, MySQL, webpack, babel, JWT, express and ESLint (standart js).

## Setup
### Requirements
Is necessary install MySQL and NodeJS before run the project. To do this:

#### In Windows

In Windows is recomended to use [winget cli](https://github.com/microsoft/winget-cli) to install this packages.

```powershell
winget install -e --id OpenJS.Nodejs
winget install -e --id MariaDB.Server
```  

#### In Linux

 Everything can be installed using your distro package manager, for Debian or Ubuntu would it be:

 ```bash
 sudo apt install nodejs npm mariadb-server
 ```

 ### Configure your MySQL
 After install is really important to configure the initial users and configurations of your database, for this run the following command in your terminal:
 ```
 mysql_secure_installation
 ```
 **PS:** in Linux this command need to be run as root (sudo)

 The installation will prompt some questions about your database configuration, read them carefuly and answer them properly, them will have it all set.

### Start the project
1. Clone this repo
```bash
git clone https://github.com/fabsoftwareifrs/node-quickstart.git
```
2. Enter the project folder and delete the .git directory
```bash
cd node-quickstart
rm -Rf .git
```
3. Rename the folder
```bash
cd ..
mv node-quickstart myproject
```
4. Enter the project and create the .env
```bash
cd myproject
cp .env.example .env
code .env
code .env
```
**.env**
```
# API Domínio
URL_API=localhost:4000

# Banco de Dados
DB_HOSTNAME=localhost
DB_NAME=mydatabase
DB_USERNAME=root
DB_PASSWORD=[password you configured on MySQL]

# JWT
AUTH_SECRET=[Anything]

# E-mail
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASSWORD=
```

5. Setup your database:
```bash 
mysql -u root -p # enter your root password
```
```SQL
MariaDB [(none)]> CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
MariaDB [(none)]> exit;
```

6. install all dependencies
```bash
npm i
```

7. Migrate the database:
```
npx sequelize-cli db:migrate
```


8. start the project

**Terminal 1**:
```bash
npm run watch:src
```
**Terminal 2**:
```
npm run watch:dist
```
go to URL http://localhost:4000/graphql in your browser and if you see GraphQL prompt on it everything is working! Enjoy!

## Authors

- **Thyago Salvá** - [Github](https://github.com/Salvah)
- **Maurício Covolan Rosito** - [Github](https://github.com/mauriciorosito)
- **Leonardo Alvarenga Pereira** - [Github](https://github.com/leonardoalvarengapereira)
- **Camilo Cunha de Azevedo** - [Github](https://github.com/Camilotk)

## License
MIT