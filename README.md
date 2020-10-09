# Quickstart
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

### Start
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
URL_API=localhost:5000

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

6. Migrate the database:
```
npx sequelize-cli db:migrate
```

7. install all dependencies
```bash
npm i
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
go to URL http://localhost:5000 in your browser and if you see 'IFRS API' on it everything is working! Enjoy!

## DEV
Comands and another details.

## License
MIT