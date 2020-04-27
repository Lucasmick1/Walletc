import React , {useState} from 'react';

import './styles.css';
import userIcon from '../../assets/user.svg';


import {Link, useHistory} from 'react-router-dom';
import {FiLogIn, FiUser} from 'react-icons/fi';

import api from '../../services/api';

export default function Register(){
    const [nome , setNome] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [message, setMessage] = useState('');
    
    const [ salario , setSalario] = useState('');

    const history = useHistory();

    const infoSpace = document.querySelector('.infSpace');
    const messageBox = document.querySelector('.messageBox');

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
            
            try{
                await api.post('users', dados);
                history.push('/');
            }catch(err){

                infoSpace.style.marginTop = '0%';
                infoSpace.style.visibility = 'visible';
                infoSpace.style.opacity = '1';
                messageBox.style.display = 'block'
                setMessage(`Erro ao cadastrar. Tente Novamente!  ${err}`);
                
                setTimeout(()=>{
                    messageBox.style.display = 'none';
                    infoSpace.style.opacity = '0';
                    infoSpace.style.visibility = 'hidden';
                    setMessage('');
                        
                },5500)
            }
        }else {

            infoSpace.style.marginTop = '16.5%';
            infoSpace.style.visibility = 'visible';
            infoSpace.style.opacity = '1';
            messageBox.style.display = 'block'
            setMessage('As senhas não conferem');

            setTimeout(()=>{
                messageBox.style.display = 'none';
                infoSpace.style.opacity = '0';
                infoSpace.style.visibility = 'hidden';
                setMessage('');
            },5500)
        }
        
    }
     function handlePassword(e){
         
        let typing = document.querySelector('#confpass');

        let typedPassword = password.substr(0, typing.value.length);
        
        
       if(typing.value === typedPassword ){
           e.target.className = 'right'
       }else {
            infoSpace.style.marginTop = '16.5%';
            infoSpace.style.visibility = 'visible';
            infoSpace.style.opacity = '1';
            messageBox.style.display = 'block'
            setMessage('As senhas não conferem');

            setTimeout(()=>{
                messageBox.style.display = 'none';
                infoSpace.style.opacity = '0';
                infoSpace.style.visibility = 'hidden';
                setMessage('');
            },2000)
       }
          
    }
    function confCaractPassword(e){
        const passwordTyp = e.target.value;
        const displayMaiu = document.querySelector('#maiu');
        const displayMin = document.querySelector('#minu');
        const displayNum = document.querySelector('#num');
        const displayCaract = document.querySelector('#caract');

        const min = /^[a-z]{1,}$/g;
        const maiu =/^[A-Z]{1,}$/g;
        const num = /^[\d]{1,}$/g;
        const minMaiu =/^[a-zA-z]+$/g;
        const minNum =/^[a-z]+\d+$|^\d+[a-z]+$/g;
        const maiuNum =/^[A-Z]+\d+$|^\d+[A-Z]+$/g;
        const minMaiuNum =/^[a-z]+|\d+|[A-Z]+$/g;
        const final = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g;

        displayMin.style.opacity = '1';
        displayMaiu.style.opacity = '1';
        displayNum.style.opacity = '1';
        displayCaract.style.opacity = '1';


        if(min.test(passwordTyp)){
            displayMin.style.opacity = '0.1';
        }else if(maiu.test(passwordTyp)){
            displayMaiu.style.opacity = '0.1';
        }else if(num.test(passwordTyp)){
            displayNum.style.opacity = '0.1';
        }else if(minMaiu.test(passwordTyp)){
            displayMin.style.opacity = '0.1';
            displayMaiu.style.opacity = '0.1';
        }else if(minNum.test(passwordTyp)){
            displayMin.style.opacity = '0.1';
            displayNum.style.opacity = '0.1';
        }else if(maiuNum.test(passwordTyp)){
            displayMaiu.style.opacity = '0.1';
            displayNum.style.opacity = '0.1';
        }else if(minMaiuNum.test(passwordTyp)){
            displayMin.style.opacity = '0.1';
            displayMaiu.style.opacity = '0.1';
            displayNum.style.opacity = '0.1';
        }
         if(final.test(passwordTyp)){
            displayMin.style.opacity = '0.1';
            displayMaiu.style.opacity = '0.1';
            displayNum.style.opacity = '0.1';
            displayCaract.style.opacity = '0.1';
        }

    }

    return(
        <div>
            
         
            
            <div className="registerContainer">
                
                <div className="registerContent">

                    <div className="formContainer">

                        <h2 style={{color:'#FFFFFF', margin:'3% 0 3% 0', fontSize:'2em'}}>
                            Novo Usuário
                        </h2>

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
                        
                            <div className="passwordContainer">

                                <div className="passwordBox">
                                    <input type="password"
                                    className="password" 
                                    placeholder="Senha" 
                                    required
                                    onChange={e => {setPassword(e.target.value)
                                                    confCaractPassword(e)}}
                                   
                                    onFocus={()=>{
                                        const target = document.querySelector('.infSpace');
                                        const content = document.querySelector('.infPassword');

                                        content.style.display ='block';

                                        target.style.marginTop = '0%';
                                        target.style.visibility = 'visible';
                                        target.style.opacity = '1';
                                      
                                    }}
                                    onBlur={()=>{
                                        const target = document.querySelector('.infSpace');
                                        const content = document.querySelector('.infPassword');

                                        content.style.display ='none'
                                        target.style.visibility = 'hidden';
                                        target.style.opacity = '0';
                                        
                                        
                                    }}
                                    />

                                    <input type="password"
                                    placeholder="Confirme a Senha"
                                    id="confpass"
                                    required
                                    onChange={e => setConfPassword(e.target.value)}
                                    onInput={(e) => handlePassword(e)}
                                    onFocus={()=>{
                                        const input = document.querySelector('.password');
                                        const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g;
                                        const target = document.querySelector('.infSpace');
                                        const content = document.querySelector('.messageBox');

                                        if(!regex.test(input.value)){
                                            setMessage('');
                                            input.focus()
                                            
                                        }else {
                                            content.style.display ='block';
                                            setMessage('Repita a senha');
                                            target.style.marginTop = '16.5%';
                                            target.style.visibility = 'visible';
                                            target.style.opacity = '1';
                                        }
                                   
                                 
                                    }}
                                    onBlur={()=>{
                                        const target = document.querySelector('.infSpace');
                                        const content = document.querySelector('.messageBox');

                                        
                                        content.style.display ='none'
                                        target.style.visibility = 'hidden';
                                        target.style.opacity = '0';
                          
                                    }}
                                    
                                    />

                                    <input type="number" 
                                    placeholder="Salário" 
                                    required
                                    value={salario}
                                    onChange={e=> setSalario(e.target.value)}
                                    />
                                </div>

                                <div className="infSpace">
                                    <ul className="infPassword">
                                        <li>Deve conter pelo menos:</li>
                                        <li id='maiu'>- Uma letra maiúscula;</li>
                                        <li id='minu'>- Uma letra minúscula;</li>
                                        <li id='num'>- Um número;</li>
                                        <li id='caract'>- Mínimo oito caracteres.</li>
                                    </ul>
                                    <ul className="messageBox">
                                        <li>{message}</li>
                                    </ul>
                                </div>


                            </div>
                            <div className="userPictSpace">

                                <div className="userPict">
                                    <FiUser size={100} style={{strokeWidth:'1px', marginTop:'5px'}} color="#02622b"/>
                                </div>

                                <div className="userPictInf">
                                    <h2>Defina sua foto de perfil</h2>
                                    <p>Você pode definir agora ou depois em "Alterar dados"</p>
                                </div>
                                
                            </div>
                            <button className="button" type="submit">Cadastrar</button>
                        </form>

                    </div>

                   

                    <p style={{margin:'3% 0 1% 23%'}}>
                        <Link to="/" style={{textDecoration:"none", color:"#FFFFFF"}}>
                            <FiLogIn style={{transform:"rotate(180deg)",
                                            verticalAlign:"text-bottom",
                                            marginRight:"5px"}} size={18} color="#02622b"/>
                            Voltar à tela de logon 
                        </Link>
                        
                    </p>
                </div>

               
            </div>
                
        </div>
    )
}