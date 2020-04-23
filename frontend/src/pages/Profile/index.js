import React, { useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiFilePlus, 
        FiDollarSign, 
        FiEdit2, 
        FiTrash,
        FiCircle, 
        FiSettings,
        } from 'react-icons/fi';

import './styles.css'; 

import SettingsMenu from '../Settings';



export default function Profile(){
    const history = useHistory();
    const user_id = localStorage.getItem('id');
    const user_name = localStorage.getItem('nome').split(' ');

    const [carteira, setCarteira] = useState('');
    
    const [carteiraBd, setCarteiraBd] = useState('');

    const [salario, setSalario] = useState('');

    const [contas, setContas] = useState([]);

    const [valorTotalContas, setValorTotalContas] = useState('');

    const [alterarSalario, setAlterarSalario] = useState('');

    const [alterarCarteira, setAlterarCarteira] = useState('');

    const [adicionarFundos, setAdicionarFundos] = useState('');
    
    const [testa, setTesta] = useState('');

    let toggleActnSettings = true;
    
    
    function toggleSettings(e){
        e.preventDefault();

        const settings = document.querySelector('.settings');
        
        
        if(toggleActnSettings){
            setTimeout(()=>{
            
                settings.classList.add('settingsActive')
            },6)

            toggleActnSettings = false;
        }else{
            setTimeout(()=>{
                settings.classList.remove('settingsActive')
            },6)

            toggleActnSettings = true;
        }

    } 
    async function toggleSituation(conta_id, e){
        const conta = conta_id;

        let toggleActnSituation = ''; 

        const botaoSituation = e.target;
        
        try{
           const response = await api.get(`contas/situation/${conta}`,{
                headers: {
                    authorization: user_id
                }
            });


            toggleActnSituation = response.data;
            
        }catch(erro){
            console.log(erro);
        }

        if(toggleActnSituation === "red"){
            toggleActnSituation = "green";
        }else if(toggleActnSituation === "green"){
            toggleActnSituation = "red";
        }

   
        try{
            api.put(`contas/situation/${conta}`,{

                situacao : toggleActnSituation
                
                },{
                headers: {
                    authorization : user_id
                }
            })
            
        }catch(erro){
            console.log(erro)
        }

        botaoSituation.style.color = '';
        botaoSituation.style.color = toggleActnSituation;
          
    }


    function toggleHeader(e){
  
        if(e.target.classList.value === "cabecalho"){

            let toggleActnHeader = e.target.getAttribute('data-toggleHeader');
            const id = e.target.getAttribute('id');

            let conteudo = document.querySelector(`#C${id}`);
    
            if(toggleActnHeader === "true"){
                conteudo.classList.add('contentActive');
                e.target.setAttribute('data-toggleHeader', "false")
            
            }else if(toggleActnHeader === 'false'){
                conteudo.classList.remove('contentActive');
                e.target.setAttribute('data-toggleHeader', "true")
            }
            
        }
           
    }

    async function handleDeleteConta(id){
        try{

            await api.delete(`contas/${id}`, {
                headers: {
                    authorization : user_id
                }
            });

            setContas(contas.filter(contas => contas.id !== id));

        }catch(erro){
            console.log(erro)
        }
    }

    async function handleEdit(id){
        console.log(id)
    }

    async function handleLogout(e){
        e.preventDefault();

        localStorage.removeItem('id');
        localStorage.removeItem('nome');
        setTimeout(()=>{
            history.push('/');
        },400)
        

    }

    useEffect(()=>{

        api.get('users/contas',{
            headers:{
                authorization : user_id
            }
        }).then(response => {
            setContas(response.data);
            
        });

        

       api.get('users/salario',{
            headers:{
                authorization : user_id
            }
        }).then(response => {
            setSalario(response.data);
            
            
        });

        api.get('users/carteira',{
            headers:{
                authorization : user_id
            }
        }).then(response => {
            setCarteira(response.data);
            
        });

        api.get('users/carteiraBd',{
            headers: {
                authorization: user_id
            }
        }).then(response => {
            setCarteiraBd(response.data)
        })

        
        
    }, [user_id, salario]);

    useEffect(()=>{

        let array = []
        let valor = contas.map(contas => array.push(contas.valor))
        let total = array.reduce((total, numero)=>{ return total + numero},0);
       
        setValorTotalContas(total);
        
           

    },[contas])

   useEffect(()=>{

    const novaCarteira = carteiraBd - valorTotalContas;
    if(novaCarteira !== 0){
        api.put('/users/carteira', {novaCarteira},{
            headers:{
                authorization: user_id
            }
        }).then((response)=>{
            setCarteira(response.data)
        })
    }
     
    
   
   }, [valorTotalContas, carteiraBd])
    

    return (
        

        <div>

            <div className="headerProfile">
                <h1>WALLETC</h1>

                <Link to="contas/add" className="btnAdd">
                    <FiFilePlus size={25} color="#F0F0F0"/>
                </Link>
                <div>
                    <p>{`Olá, ${user_name[0]}`}</p>


                    <FiDollarSign size={18} color="#17A100"/>
                    
                    <p>{carteira}</p>

                    
                    

                    <button onClick={toggleSettings}><FiSettings size={18} color="#F0F0F0"/></button>
                
                </div>
                
                
            </div>
            
            <div className="longBar"></div>

            
            <SettingsMenu user_id={user_id}
                              carteira={carteira} setCarteira={setCarteira}
                              carteiraBd={carteiraBd} setCarteiraBd={setCarteiraBd}
                              salario={salario} setSalario={setSalario}
                              alterarSalario={alterarSalario} setAlterarSalario={setAlterarSalario}
                              alterarCarteira={alterarCarteira} setAlterarCarteira={setAlterarCarteira}
                              adicionarFundos={adicionarFundos} setAdicionarFundos={setAdicionarFundos}
                              />
            
            
            <section>
            
                <ul>
                    {
                        contas.map(contas=>{
                            
                            return <li key={contas.id}>
                                <div className="cabecalho" data-toggleHeader="true" id={contas.id} onClick={(e)=>toggleHeader(e)}>
                                    <div className="contaInf">
                                        <p>{contas.nome}</p>
                                        <FiDollarSign size={18} color="#17A100"/>
                                        <p>{contas.valor}</p>
                                    </div>
                                    <div className="contaActions">
                                        <button onClick={()=>handleEdit(contas.id)}>
                                            <FiEdit2 size={18} color="#F0F0F0"/>
                                        </button>
                                        <button onClick={()=>handleDeleteConta(contas.id)}>
                                            <FiTrash size={18} color="#F0F0F0"/>
                                        </button>
                                        <button onClick={async(e)=>{
                                    
                                            await toggleSituation(contas.id, e);
                                  
                                        }}
                                        id="situation" className="situation">
                                            <FiCircle size={18} style={{transition:'0.5s'}}color={`${contas.situacao}`} />
                                        </button>
                                        
                                    </div>
                                    
                                </div>
                                <div id={`C${contas.id}`} className="content">
                                <table>
                                    <thead>
                                        <tr>
                                        <th>Descrição</th>
                                        <th>Vencimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{contas.descricao}  </td>
                                        <td>{contas.vencimento} </td>
                                        </tr>
                                    </tbody>
                                    </table>

                                </div>
            
                            </li>
                        })
                    }
                </ul>
            </section>
                
               
        </div>
    )
    
}