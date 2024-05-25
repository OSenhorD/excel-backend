projeto=excel

local_frontend=/opt/clientes/99-excel/excel-frontend
local_backend=/opt/clientes/99-excel/excel-backend

server_frontend=/var/www/excel.davidmarques.com.br
server_backend=/opt/excel

angular_name=excel

pm2_backend_id=3

ssh_alias=diamond

#
# Execução da build do frontend
#

echo ""
echo "Frontend - [1/2] Preparando o build"
echo ""

cd $local_frontend

if [ -f "./$local_frontend/dist" ]; then
  rm -rf "$local_frontend/dist"
fi

ng build --configuration production

echo ""
echo "Frontend - [2/2] Comprimindo arquivos do dist"
echo ""

if [ -f "./$projeto-frontend.tar" ]; then
    rm "./$projeto-frontend.tar"
    echo "Arquivo removido com sucesso."
fi

mv ./dist/$angular_name/browser/* ./dist
rm -rf ./dist/$angular_name
cd ./dist
tar acf ../$projeto-frontend.tar .
cd ..

#
# Execução da build do backend
#

echo ""
echo "Backend - [1/2] Preparando o build"
echo ""

cd $local_backend

if [ -f "./$local_backend/dist" ]; then
  rm -rf "$local_backend/dist"
fi

git checkout .

rm -rf ./src/shared/infra/typeorm/seed

yarn build

git checkout .

echo ""
echo "Backend - [2/2] Comprimindo arquivos do dist"
echo ""

if [ -f "./$projeto-backend.tar" ]; then
    rm "./$projeto-backend.tar"
    echo "Arquivo removido com sucesso."
fi

tar acf $projeto-backend.tar ./dist

#
# Execução no/para o servidor
#

echo ""
echo "Servidor - [1/2] Movendo arquivos para o servidor"
echo ""

scp $local_frontend/$projeto-frontend.tar $ssh_alias:/tmp
scp $local_backend/$projeto-backend.tar $ssh_alias:/tmp

rm "$local_frontend/$projeto-frontend.tar"
rm "$local_backend/$projeto-backend.tar"

rm -rf "$local_frontend/dist"
rm -rf "$local_backend/dist"

# Comando a serem executados dentro do ssh

echo ""
echo "Servidor - [2/2] Executando comandos no servidor"
echo ""

server_cmd=""

server_cmd=$server_cmd" cd $server_frontend;"
server_cmd=$server_cmd" rm -rf ./*;"
server_cmd=$server_cmd" mv /tmp/$projeto-frontend.tar .;"
server_cmd=$server_cmd" tar -xf ./$projeto-frontend.tar;"
server_cmd=$server_cmd" rm ./$projeto-frontend.tar;"

server_cmd=$server_cmd" pm2 stop $pm2_backend_id;"
server_cmd=$server_cmd" cd $server_backend/;"
server_cmd=$server_cmd" mv /tmp/$projeto-backend.tar .;"
server_cmd=$server_cmd" rm -rf ./dist;"
server_cmd=$server_cmd" tar -xf ./$projeto-backend.tar;"
server_cmd=$server_cmd" rm ./$projeto-backend.tar;"
server_cmd=$server_cmd" pm2 start $pm2_backend_id;"

ssh $ssh_alias "$server_cmd"
