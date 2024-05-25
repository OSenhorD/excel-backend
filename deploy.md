# Deploy da aplicação backend

Procedimento para realizar a base do deploy da aplicação

- [Clone do Projeto](#dados-do-projeto)
- [Variáveis de Ambiente](#variáveis)
- [Banco de dados](#postgresql)
- [Porta da Aplicação](#nginx---porta-da-aplicação)
- [Nginx](#nginx---configurações)
- [Certificado](#certificado)
- [PM2](#pm2)

## Dados do projeto

1. Clone do projeto

```yml
$ sudo mkdir -p /opt/excel
$ sudo chown -R $USER:$USER /opt/excel
$ cd /opt/excel
$ git clone https://github.com/OSenhorD/excel-backend.git
```

2. Ajuste da localização

```yml
$ cd /opt/excel/excel-backend
$ mv * /opt/excel
$ mv .* /opt/excel
$ cd /opt/excel
$ rm -r excel-backend
```

## Variáveis

```yml
$ cp .env.example .env
$ sudo vim /opt/excel/.env
```

Insira o seguinte conteúdo:

```yml
APP_API_URL=https://apiexcel.davidmarques.com.br
APP_FRONT_URL=https://excel.davidmarques.com.br
PORT=5500
```

## PostgreSQL

1. Criar usuário do banco de dados

```yml
$ sudo -u postgres createuser --interactive
```

Insira as seguintes respostas:

```yml
# Enter name of role to add: excel-user
# Shall the new role be a superuser? (y/n) y
```

2. Criar novo usuário no Linux

```yml
$ sudo adduser excel-user
```

3. Criar bancos de dados.

```yml
$ sudo -u postgres createdb -E 'UTF8' -O excel-user -T template0 excel-db
```

4. Alterar a senha do usuário

```yml
$ sudo -u postgres psql
```

Insira o seguinte conteúdo:

```yml
postgres=# ALTER USER "excel-user" PASSWORD '123456';
postgres=# \q
```

5. Tentar acessar o banco com o usuário

```yml
$ sudo -u excel-user psql -d excel-db
```

## Nginx - Porta da Aplicação

1. Definir a porta a ser usada pelo Node:

```yml
$ netstat -tulpan | grep node | grep ":::"

# tcp6       0      0 :::5500                 :::*                    LISTEN      161655/node
# A próxima será 5501
```

2. Confirmar disponibilidade da porta

```yml
$ lsof -i :5500
$ netstat -tulpan | grep 5500
```

## Nginx - Configurações

1- Criar arquivo de configuração Nginx:

```yml
$ sudo vim /etc/nginx/sites-available/apiexcel.davidmarques.com.br
```

Insira o seguinte conteúdo:

```yml
server {
  listen 80;
  listen [::]:80;

  server_name apiexcel.davidmarques.com.br;

  location / {
    proxy_pass http://localhost:5500;
  }
}
```

2- Criar link simbólico

```yml
$ sudo ln -s /etc/nginx/sites-available/apiexcel.davidmarques.com.br /etc/nginx/sites-enabled/
```

3- Testar e Reiniciar Nginx

```yml
$ sudo nginx -t
$ sudo service nginx stop
$ sudo service nginx start
```

## Certificado

1. Criar certificado

```yml
$ sudo certbot --nginx -d apiexcel.davidmarques.com.br
```

2. Testar se os certificados estão com a classificação "A"

https://ssllabs.com/ssltest/analyze.html?d=apiexcel.davidmarques.com.br

## PM2

1. Inclua o backend

```yml
$ cd /opt/excel
$ pm2 start "/bin/bash -c '/opt/excel/node_modules/.bin/ts-node -r tsconfig-paths/register /opt/excel/dist/shared/infra/http/server.js'" --name "excel"
```
