# Microserviço de Autenticação

## Projeto

Esse é um projeto de microserviço de criação de usuário e autenticação desenvolvido em conjunto com o curso da Digital Innovation One. Esse projeto foi desenvolvido em padrão SOLID com o a infraestrutura completamente separada da integrações com o BD, sendo possível sua utilização, como microserviço, em qualquer aplicação.

## Ferramentas

Nesse projeto foi utilizado Typescript como linguagem de programação, Node.JS como lib para desenvolvimento com Typescript no Server-Side, JWT para criação de tokens de autenticação, Postgres como banco de Dados SQL em conjunto com o site Elephant SQL, celebrate para fazer a verificação primária dos dados recebidos na request, tsryinge para a injeção de dependência fortalecendo os princípios SOLID do projeto.

## Desafios

Apesar de desenvolver, em partes, em conjuntos com as aulas, tentei aplicar conceitos que aprendi em outros cursos, incluindo o padrão SOLID de arquitetura de projeto. Com isso, alguns passos, bibliotecas utilizadas e serviços foram executados de maneira diferente da que estava sendo apresentada pelo professor me incentivando a buscar as resoluções para os problemas nas documentações disponíveis na internet.
Nesse projeto aprendi que a ordem das importações de bibliotecas no Node.Js importa e muito para o bom andamento da aplicação. A biblioteca dotenv, assim como a express-async-errors para o tratamento de erros de maneira personalizada e reflect-metadata necessitam ser importadas logo no começo do arquivo principal da aplicação, correndo o risco de aprensentar erros que não permitem o funcionamento da aplicação.

## Rotas

O projeto foi desenvolvido utilizando o CRUD completo e possui apenas duas rotas possíveis:

### /users

 - GET: Necessita de autenticação e retorna todos os usuários cadastrados.
 - POST: Não necessita de autenticação e cria um novo usuário recebendo os dados username e password.
 - PUT: Necessita de autenticação e faz a atualização dos dados do usuário autenticado, pode receber username ou password (ou os dois).
 - DELETE: Necessita de autenticação e deleta o usuário que está autenticado.
 
### /session
  - POST: Não necessita de autenticação, recebe username e senha através da autenticação Basic do HTTP e retorna um token JWT para a sessão do usuário.
  - POST /refresh: Necessita de autenticação e recria o token se necessário, uma vez que este estiver expirado, retorna o novo token com mais um dia de duração.
  
 ----------
 
 ## Agradecimentos
 
 Obrigado à DIO pelo conteúdo incrivel e o cuidado que tem com os alunos da plataforma e ao professor Renan Johannsen pela ótima didática.
