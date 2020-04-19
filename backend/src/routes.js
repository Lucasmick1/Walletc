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

//request just for development
routes.get('/users', UsuarioController.index);

//create a new user
routes.post('/users',UsuarioController.create);

// logon for the user

routes.post('/users/profile/email', SessionController.index);

routes.post('/users/profile', SessionController.create);


//creating a new conta
routes.post('/contas', ContasController.create);

//list a conta
routes.get('/users/contas', ProfileController.index);

//request just for development 
routes.get('/contas', ContasController.index);

// delete a conta
routes.delete('/contas/:id', ContasController.delete);

//update a conta
routes.put('/contas/update/:id', ContasController.update);

//check situation
routes.get('/contas/situation/:id',SituationController.index);

//update the situtation
routes.put('/contas/situation/:id',SituationController.update);

// get salario
routes.get('/users/salario', SalarioController.indexSalario);

routes.put('/users/salario', SalarioController.updateSalario);

routes.get('/users/carteira', CarteiraController.indexCarteira);

routes.put('/users/carteira', CarteiraController.updateCarteira);

routes.put('/users/carteiraBd/adiciona', CarteiraBdController.adicionaFundosCarteiraBd);
//routes.put('/users/carteiraBd', CarteiraBdController.updateCarteiraBd);

routes.get('/users/carteiraBd', CarteiraBdController.indexCarteiraBd);
//update the salario mes





module.exports = routes;