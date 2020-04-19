const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const ContasController = require('./controllers/ContasController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const SituationController = require('./controllers/SituationController');
const SalarioController = require('./controllers/SalarioController');
const CarteiraController = require('./controllers/CarteiraController');
const CarteiraBdController = require('./controllers/CarteiraBdController');



const routes = express.Router();

// Apenas para uso de desenvolvimento
routes.get('/users', UsuarioController.index);

// Criação de um novo usuário 
routes.post('/users',UsuarioController.create);

// Logon do usuário {
        //Requisição para a validação do email
routes.post('/users/profile/email', SessionController.index);
        //Validação do email e senha e retorno do nome e id
routes.post('/users/profile', SessionController.create);

// }

//Criação de uma nova conta/despesa
routes.post('/contas', ContasController.create);

//Listagem das contas/despesas do usuário específico
routes.get('/users/contas', ProfileController.index);

//Apenas para uso de desenvolvimento
routes.get('/contas', ContasController.index);

// Exclusão de uma conta/despesa
routes.delete('/contas/:id', ContasController.delete);

//Alteração de uma conta/despesa
routes.put('/contas/update/:id', ContasController.update);

//Checagem da situação de pagamento da conta/despesa
routes.get('/contas/situation/:id',SituationController.index);

//Atualização da situação de pagamento da conta/despesa
routes.put('/contas/situation/:id',SituationController.update);

// Listagem do salário do usuário
routes.get('/users/salario', SalarioController.indexSalario);

//Alteração do salário do usuário - Soma em carteiraBD a diferença entre no novo valor e o antigo valor
routes.put('/users/salario', SalarioController.updateSalario);

//Listagem do valor em carteira do usuário
routes.get('/users/carteira', CarteiraController.indexCarteira);

//Alteração do valor em carteira do usuário sempre que adicionado uma nova conta/despesa
routes.put('/users/carteira', CarteiraController.updateCarteira);

/** CarteiraBd é um valor do qual a carteira
  pega como base para fazer o abatimento do valor total de contas/despesa. Todos são inicialmente 
  referenciados com o mesmo valor de "salário" */


//Listagem do valor de CarteiraBd
routes.get('/users/carteiraBd', CarteiraBdController.indexCarteiraBd);

//Alteração do valor em CarteiraBd - O uso dessa rota permite a alteração para qualquer valor
routes.put('/users/carteiraBd', CarteiraBdController.updateCarteiraBd);

// Adicionando valores esporádicos a carteira - O Uso dessa rota permite apenas somar valores
// ao valor atual
routes.put('/users/carteiraBd/adiciona', CarteiraBdController.adicionaFundosCarteiraBd);



module.exports = routes;