# Endpoints

-   El sistema debe contar con tres endpoints:
    -   Un endpoint para el servicio de Login
   
        http://localhost:3000/login?usuario=xaa&password=ABCcd
        Params: usuario, password
    -   Un segundo endpoint para el registro de clientes
 
	    http://localhost:3000/register?nombre=a&usuario=xaac&password=ABCcd
	    Params: nombre, usuario, password
    -   Un tercer endpoint que permita el cambio de métodos de encriptación y loggers en tiempo de ejecución.
 
		http://localhost:3000/configuration?encryptType=2&logType=url
		Params: encryptType, logType
# Repositorio
	Link: https://github.com/Eamll/solid_nodejs
# Notas

Existen dos tipos de encriptación y tiene que ponerce 1 o 2 para cambiar entre ellas.

Los tres tipos de log están como: file, database, url.