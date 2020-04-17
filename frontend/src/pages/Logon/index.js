import React , {useState} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';

export default function Logon(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [menssagemErro, setMenssagemErro] = useState('');

async function handleEmailLogin(e){
    e.preventDefault();

    const data = {
        email
    }

    const campoEmail = document.querySelector('.campoEmail');
    const inputSenha = document.querySelector('.inputSenha');

    

    try{
        const resposta = await api.post('users/profile/email', data);
        
        localStorage.setItem('id', resposta.data.id);

        campoEmail.classList.add('campoEmailActive');

        setTimeout(()=>{
            campoEmail.children[0].children[1].children[0].children[2].style.display = 'none';

             inputSenha.style.display = 'block';
             
            campoEmail.classList.remove('campoEmailActive');

            setTimeout(()=>{
                campoEmail.children[0].children[1].children[0].children[1].style.display = 'block';
                inputSenha.style.width = '100%';
                
                campoEmail.children[0].children[1].children[0].children[4].style.display = 'none';
                campoEmail.children[0].children[1].children[0].children[5].style.display = 'block';
                campoEmail.children[0].children[1].children[0].children[6].style.display = 'none';
            },100)
            
        },900)

    }catch(erro){
        setMenssagemErro('Email não encontrado ou incorreto!')
            setEmail('');

            setTimeout(()=>{
                setMenssagemErro('');
            },5500)
    }
}
function handleChangeEmail(e){
    e.preventDefault();
    
    const campoEmail = document.querySelector('.campoEmail');
    const inputSenha = document.querySelector('.inputSenha');

    campoEmail.classList.add('campoEmailActive');
    inputSenha.style.width = '1px'
    campoEmail.children[0].children[1].children[0].children[1].style.display = 'none';
       setTimeout(()=>{
        
             inputSenha.style.display = 'none';
            campoEmail.children[0].children[1].children[0].children[2].style.display = 'block';

             
             
            campoEmail.classList.remove('campoEmailActive');

            setTimeout(()=>{
                
                
                
                campoEmail.children[0].children[1].children[0].children[5].style.display = 'none';
                campoEmail.children[0].children[1].children[0].children[4].style.display = 'block';
                campoEmail.children[0].children[1].children[0].children[6].style.display = 'block';
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
            setMenssagemErro('Erro Senha incorreta!')
            setPassword('');

            setTimeout(()=>{
                setMenssagemErro('');
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
            <div className="campoEmail">

                <div className="conteudoLogon">
                    <div className="campoErro">
                        <p className="menssagemErro" >{menssagemErro}</p>
                    </div>

                    <section>

                        <form style={{transition:'.5s'}}>
                            <h1>Fazer login</h1>
                            <p style={{display:'none'}}>{email}<button onClick={handleChangeEmail}style={{marginLeft:'10px'}}>Alterar</button></p>
                            <input type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="teste"
                            />
                            <input type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                                className="inputSenha"
                                style={{display: 'none',transition: '.5s'}}
                                />

                            <button type="submit" onClick={handleEmailLogin} className="continuar" >Continuar</button>

                            <button type="submit" onClick={handleLogon}className="entrar" style={{display:'none'}}>Entrar</button>

                            <p style={{transition:'.5s'}}>É novo por aqui?<Link to="/register" style={{marginLeft:'10px'}}>Cadastre-se</Link></p>
                        </form> 

                    </section>
        
                </div>

        </div>
        
       

        </div>
        
        
    )
}