# Quickstart
Essa é uma estrutura de projeto básica de Node.js com Sequelize, Apollo, MySQL, webpack, babel, JWT, express e ESLint (standart js).

## Como rodar
### Pré-requisitos
É necessário instalar o MySQL e o NodeJS antes de rodar o projeto. Para fazer isso:

### No Windows

No Windows é recomendado utilizar a ferramenta de linha de comando [winget](https://github.com/microsoft/winget-cli) para instalar os pacotes.

```powershell
winget install -e --id OpenJS.Nodejs
winget install -e --id MariaDB.Server
```  

#### No Linux

Tudo o que é necessário pode ser instalado utilizando o gerenciador de pacotes da sua distribuição, para o Debian ou Ubuntu seria:

 ```bash
 sudo apt install nodejs npm mariadb-server
 ```

 ### Configure o MySQL
 Após instalar é muito importante configurar os usuários e configurações iniciais do seu banco de dados, para isso rode o seguinte comando em seu terminal:
  ```
 mysql_secure_installation
 ```
 **Obs**: no Linux esse comando precisa ser executado como administrador (sudo)

 A inicialização irá fazer algumas perguntas em inglês é importante respondê-las com cuidado e propriamente para que não tenha problemas, caso queira se tiver dificuldade com o inglês [esse guia](https://www.redehost.com.br/duvidas/como-fao-uma-instalao-seguro-do-mysql--1437) poderá ajudá-lo!

 ### Iniciando o projeto
 1. Clone o repositório
 ```bash
git clone https://github.com/fabsoftwareifrs/node-quickstart.git
```
2. Entre na pasta do projeto e delete a pasta oculta .git
```bash
cd node-quickstart
rm -Rf .git
```
3. Renomeie a pasta
```bash
cd ..
mv node-quickstart nomedoseuprojeto
```
4. Entre na pasta e crie o arquivo .env
```bash
cd nomedoseuprojeto
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
DB_NAME=nomedoseubanco
DB_USERNAME=root
DB_PASSWORD=[a senha do seu usuário MySQL]

# JWT
AUTH_SECRET=[Qualquer palavra secreta]

# E-mail
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASSWORD=
```
5. Crie seu banco:
```bash 
mysql -u root -p # entre a senha do seu usuário
```
```SQL
MariaDB [(none)]> CREATE DATABASE nomedoseubanco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
MariaDB [(none)]> exit;
```
6. instale todas as dependências
```bash
npm i
```

7. Migre o banco de dados
```
npx sequelize-cli db:migrate
```

8. inicie o projeto
**Terminal 1**:
```bash
npm run watch:src
```
**Terminal 2**:
```
npm run watch:dist
```
vá para a URL http://localhost:4000/graphql em seu navegador e se ver a ferramenta de queries do GraaphQL tudo funcionou corretamente! Aproveite!

## Autores
- **Thyago Salvá** - [Github](https://github.com/Salvah)
- **Maurício Covolan Rosito** - [Github](https://github.com/mauriciorostio)
- **Leonardo Alvarenga Pereira** - [Github](https://github.com/leonardoalvarengapereira)
- **Camilo Cunha de Azevedo** - [Github](https://github.com/Camilotk)

## Licença
MIT