import React , {useState} from 'react';

import './styles.css';
import userIcon from '../../assets/user.svg';
import logoImg from '../../assets/logo.svg';

import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

export default function Register(){
    const [nome , setNome] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [ salario , setSalario] = useState('');

    let alerta = document.querySelector('#passwordWrong');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        
        const dados = {
            nome:nome,
            email:email,
            senha:password,
            salario:salario,
            carteira: salario,
            carteiraBd: salario
        }
        
        if(password === confPassword){
            alerta.style.display = 'none';
            try{
                await api.post('users', dados);
                history.push('/')
            }catch(err){
                alert(`Erro ao cadastrar, tente novamente. erro: ${err}`)
            }
        }else {
            alerta.style.display = 'block';
        }
        
    }
     function handlePassword(e){
         
        let typing = document.querySelector('#confpass');

        let paswrd = password.substr(0, typing.value.length);
        
        
       if(typing.value === paswrd ){
           e.target.className = 'right'
       }else {
        e.target.className = 'wrong'
       }
          
    }

    return(
        <div>
            <header>
                <h1>WALLETC</h1>
            </header>
            <div className="longBar"></div>

            <div className="container">

                <div className="content">
                    <form onSubmit={handleRegister}>
                    <input type="text" 
                    placeholder="Nome"
                    required
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                     />

                    <input type="text"
                     placeholder="E-mail"
                     required
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     />
                
                    <div className="userBox">

                        <div className="passwordBox">
                            <input type="password" 
                            placeholder="Senha" 
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            />

                            <input type="password"
                             placeholder="Confirme a Senha"
                             id="confpass"
                             required
                             onChange={e => setConfPassword(e.target.value)}
                             onInput={(e) => handlePassword(e)}
                             
                             />

                            <input type="number" 
                            placeholder="Salário" 
                            required
                            value={salario}
                            onChange={e=> setSalario(e.target.value)}
                            />
                        </div>

                        <div className="imgBox">
                            <img src={userIcon}/>
                        </div>
                        

                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                    </form>
                    <div id="fildWrong"><h1 id="passwordWrong" >As senhas não batem!</h1></div>
                </div>

                <img src={logoImg}/>
            </div>
                
        </div>
    )
}