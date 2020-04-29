# README

## A princípio a arquitetura é um pouco diferente, apesar de preferir algo mais estruturado.

## Eu não tive muito tempo para desenvolver, mas dei o melhor.

## Primeiro preciso que você instale isso:
#### Verifique se você tem a versão mais recente do docker em funcionamento
#### Mas se você não fizer isso. Não se preocupe, vá em frente e faça o download no site do Docker

* [Mac users](https://docs.docker.com/docker-for-mac/install/)

* [Windows users](https://docs.docker.com/docker-for-windows/install/)

## docker-compose

get it [here](https://docs.docker.com/compose/install/)

Antes de executar o docker, renomeie o arquivo * .env.sample * para * .env *

```
$ docker-compose up
```

Quando o docker estiver pronto, vá para http://localhost:3002

````

então tudo foi configurado corretamente. Caso contrário, corra para as colinas e grite desesperadamente por ajuda e talvez alguém venha a seu favor ... talvez não.

## Rodando tests

```
$ docker-compose run --rm starter npm run test-dev
```
*Happy coding :)*