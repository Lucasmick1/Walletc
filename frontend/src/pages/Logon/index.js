import React , {useState} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import {FiEdit, FiLogIn} from 'react-icons/fi'

export default function Logon(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');

async function handleEmailLogin(e){
    e.preventDefault();

    const data = {
        email
    }

    const logonContainer = document.querySelector('.logonContainer');
    const inputPassword = document.querySelector('.inputPassword');

    

    try{
        const response = await api.post('users/profile/email', data);
        
        localStorage.setItem('id', response.data.id);

        logonContainer.classList.add('logonContainerActive');

        logonContainer.children[0].children[1].children[0].children[2].style.width = '1px';
        
        setTimeout(()=>{
            
            logonContainer.children[0].children[1].children[0].children[2].style.display = 'none';

             inputPassword.style.display = 'block';
             
            logonContainer.classList.remove('logonContainerActive');

            setTimeout(()=>{
                logonContainer.children[0].children[1].children[0].children[1].style.display = 'block';
                inputPassword.style.width = '100%';
                
                logonContainer.children[0].children[1].children[0].children[4].style.display = 'none';
                logonContainer.children[0].children[1].children[0].children[5].style.display = 'block';
                logonContainer.children[0].children[1].children[0].children[6].style.display = 'none';
            },100)
            
        },900)

    }catch(erro){
        setErrorMessage('Email não encontrado ou incorreto!')
            setEmail('');

            setTimeout(()=>{
                setErrorMessage('');
            },5500)
    }
}
function handleChangeEmail(e){
    e.preventDefault();
    
    const logonContainer = document.querySelector('.logonContainer');
    const inputPassword = document.querySelector('.inputPassword');

    logonContainer.classList.add('logonContainerActive');
    inputPassword.style.width = '1px'
    logonContainer.children[0].children[1].children[0].children[1].style.display = 'none';
       setTimeout(()=>{
        
             inputPassword.style.display = 'none';
             
            logonContainer.children[0].children[1].children[0].children[2].style.display = 'block';
            logonContainer.children[0].children[1].children[0].children[2].style.width = '1px';
            

             
             
            logonContainer.classList.remove('logonContainerActive');

            setTimeout(()=>{
                logonContainer.children[0].children[1].children[0].children[2].style.width = '100%'; 
                
                
                logonContainer.children[0].children[1].children[0].children[5].style.display = 'none';
                logonContainer.children[0].children[1].children[0].children[4].style.display = 'block';
                logonContainer.children[0].children[1].children[0].children[6].style.display = 'block';
            },100)
            
            
        },900)

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
            setErrorMessage('Erro Senha incorreta!')
            setPassword('');

            setTimeout(()=>{
                setErrorMessage('');
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
            <div className="logonContainer">

                <div className="logonContent">
                    <div className="errorSpace">
                        <p className="errorMessage" >{errorMessage}</p>
                    </div>

                    <section>

                        <form style={{transition:'.5s'}}>

                            <h1>Fazer login</h1>

                            <p style={{display:'none', fontSize:'16px', marginTop:'10px'}}>

                                {email}

                                <button onClick={handleChangeEmail}style={{marginLeft:'10px', color:'#17A100'}}>
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
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                                className="inputPassword"
                                style={{display: 'none',transition: '.5s', width:"1px"}}
                                />

                            <button type="submit" onClick={handleEmailLogin} className="continue" >Continuar</button>

                            <button type="submit" onClick={handleLogon} className="login" style={{display:'none'}}>Entrar</button>

                            <div className="newGroup">
                                <p>É novo por aqui?
                                    <Link to="/register" style={{marginLeft:'10px'}}>
                                        Cadastre-se
                                        <FiLogIn style={{verticalAlign:"text-bottom",
                                                         marginLeft:"5px",
                                                         }} size={18} color="#17A100"/>
                                    </Link>
                                </p>

                            </div>
                           
                        </form> 

                    </section>
        
                </div>

        </div>
        
       

        </div>
        
        
    )
}