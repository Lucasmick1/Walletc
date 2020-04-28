import React , {useState} from 'react';

import api from '../../services/api';

import './styles.css';

import {Link, useHistory} from 'react-router-dom';

import {FiEdit, FiLogIn} from 'react-icons/fi'

export default function Logon(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [message, setMessage] = useState('');

    const inputEmail = document.querySelector('.inputEmail');
    const inputPassword = document.querySelector('.inputPassword');
    const changeEmail = document.querySelector('.changeEmail');
    const btnContinue = document.querySelector('.btnContinue');
    const btnLogin = document.querySelector('.btnLogin');
    const newGroup = document.querySelector('.newGroup');

    

    async function handleEmailLogin(e){
        e.preventDefault();

        const data = {
            email
        }

        try{
            const response = await api.post('users/profile/email', data);
            
            localStorage.setItem('id', response.data.id);

            inputEmail.style.width = '1px'; 
            
            setTimeout(()=>{
                inputEmail.style.display = 'none';
                inputPassword.style.display = 'block';
                
                setTimeout(()=>{
                    changeEmail.style.display = 'block';
                    inputPassword.style.width = '100%';
                    
                    btnContinue.style.display = 'none'; 
                    btnLogin.style.display = 'block'; 
                    newGroup.style.display = 'none'; 
                },100);
                
            },900)

        }catch(erro){
            const messageDisplay = document.querySelector('.messageDisplay');
            messageDisplay.style.visibility = "visible";
            messageDisplay.style.opacity = "1";
            
            if(erro.message === 'Request failed with status code 405'){
                setMessage('Email não encontrado ou incorreto!')
            }else if(erro.message === 'Network Error'){
                setMessage('Erro ao fazer login. Verifique sua conexão, ou contate nosso suporte!')
            }
            
            setTimeout(()=>{
                messageDisplay.style.visibility = "hidden";
                 messageDisplay.style.opacity = "0";
                setMessage('');
            },5500)
        }
    }

    function handleChangeEmail(e){

        e.preventDefault();
        inputPassword.style.width = '1px'
        changeEmail.style.display = 'none';

        setTimeout(()=>{

            inputPassword.style.display = 'none';
            inputEmail.style.display = 'block';
            inputEmail.style.width = '1px';

            setTimeout(()=>{

                inputEmail.style.width = '100%'; 
                btnLogin.style.display = 'none';
                btnContinue.style.display = 'block'; 
                newGroup.style.display = 'block'; 

            },100);

        },900);

    }

    async function handleLogon(e){
        e.preventDefault();

        const data = {
            email:email,
            senha:password
        }

        try{
            const response = await api.post('users/profile', data);
                
            localStorage.setItem('id',response.data.id);
            localStorage.setItem('nome', response.data.nome);

            history.push('/users/contas');
        }catch(erro){

            const messageDisplay = document.querySelector('.messageDisplay');
            messageDisplay.style.visibility = "visible";
            messageDisplay.style.opacity = "1";

            setMessage('Senha incorreta!')
            
            setTimeout(()=>{
                messageDisplay.style.visibility = "hidden";
                messageDisplay.style.opacity = "0";
                setMessage('');
            },5500)
                
        }
        
    }


    document.addEventListener('keypress', (e)=>{
        if(e.keyCode == 13){
            e.preventDefault();
        }
    });

    return (
        <div>
            <div className="containerLogon">

                <div className="contentLogon">
                    
                    <section className="formLogon">

                        <form style={{transition:'.5s'}}>

                            <h1 style={{color:'#FFFFFF'}}>Fazer login</h1>

                            <p style={{display:'none', fontSize:'16px', marginTop:'10px'}}
                               className="changeEmail">
                                {email}
                                <button onClick={handleChangeEmail}style={{marginLeft:'10px', color:'#FFFFFF'}}>
                                    Alterar
                                </button>
                            </p>
                           
                            <input type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="inputEmail"
                            />
                            <input type="password"
                                placeholder="Senha"
                                onChange={e=> setPassword(e.target.value)}
                                className="inputPassword"
                                style={{display: 'none',transition: '.5s', width:"1px"}}
                            />

                            <button type="submit"
                             onClick={handleEmailLogin} 
                             className="btnContinue">
                                 Continuar
                            </button>

                            <button type="submit"
                             onClick={handleLogon}
                              className="btnLogin"
                               style={{display:'none'}}>
                                   Entrar
                            </button>

                            <div className="newGroup">
                                <p style={{color:'#FFFFFF'}}>É novo por aqui?
                                    <Link to="/register" style={{marginLeft:'10px', color:'#FFFFFF', fontWeight:'bold'}}>
                                        Cadastre-se
                                        <FiLogIn style={{verticalAlign:"text-bottom",
                                                         marginLeft:"5px",
                                                         }} size={18} color="black"/>
                                    </Link>
                                </p>

                            </div>
                            <div className="messageDisplay">
                                <p style={{width:'190px', 
                                        lineHeight:'20px',
                                        fontSize:'15px',
                                        marginTop:'5px'}}>

                                    {message}
                                </p>
                            </div>
                           
                        </form> 

                    </section>
        
                </div>

            </div>
        
        </div>
         
    )
}