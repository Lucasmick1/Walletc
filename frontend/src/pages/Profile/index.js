import React, { useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiPlus, FiDollarSign, FiEdit2, FiTrash, FiCircle, FiPower, FiClipboard} from 'react-icons/fi';

import './styles.css'; 



export default function Profile(){
    const history = useHistory();
    const user_id = localStorage.getItem('id');
    const user_name = localStorage.getItem('nome').split(' ');

    const [carteira, setCarteira] = useState('');
    
    const [carteiraBd, setCarteiraBd] = useState('');

    const [salario, setSalario] = useState('');

    const [contas, setContas] = useState([]);

    const [valorTotalContas, setValorTotalContas] = useState('');

    let toggle = true;
    
    let toggleSitn = ''; 
   
    async function toggleSituation(conta_id){
        const conta = conta_id;
        
        try{
           const response = await api.get(`contas/situation/${conta}`,{
                headers: {
                    authorization: user_id
                }
            });


            toggleSitn = response.data;
            
        }catch(erro){
            console.log(erro);
        }

        if(toggleSitn === "red"){
            toggleSitn = "green";
        }else if(toggleSitn === "green"){
            toggleSitn = "red";
        }

        
        const dados = {
            situacao : toggleSitn
        }

        try{
            api.put(`contas/situation/${conta}`, dados,{
                headers: {
                    authorization : user_id
                }
            })
            
            
           

        }catch(erro){
            console.log(erro)
        }
        

        
    }

     function toggleColor(e){

        
            e.style.color = '';
            e.style.color = toggleSitn;
       
       
        
    }

    function toggleHeader(e){

        if(e.target.classList.value === "cabecalho"){
            const id = e.target.getAttribute('id');

            

            let conteudo = document.querySelector(`#C${id}`);
    
            if(toggle){
                conteudo.classList.add('contentActive');
                toggle = false;
            }else {
                conteudo.classList.remove('contentActive');
                toggle = true;
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

        
        
    }, [user_id]);

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
    
    async function teste(e){
        e.preventDefault();
       /* const dados ={
            fundosCarteiraBd: -300
        }
        try{
            api.put('users/carteiraBd',dados, {
                headers : {
                    authorization: user_id
                }
            })
        }catch(erro){
            console.log(erro)
        }*/

        try{
            api.put('users/carteiraBd/adiciona',{fundosCarteiraBd:100},{
                headers:{
                    authorization: user_id
                }
            }).then(response =>{
                setCarteiraBd(response.data)
            })

        }catch(erro){

        }
    }
    
    function handleShowDetalhesConta(){
        const detalhes = document.querySelector('.detalhesCarteira');
        

        setTimeout(()=>{
            
            detalhes.classList.add('detalhesCarteiraActive')
        },6)
        
    }

    function handleHideDetalhesConta(){
        const detalhes = document.querySelector('.detalhesCarteira');

        setTimeout(()=>{
            detalhes.classList.remove('detalhesCarteiraActive')
        },6)
    }
    return (
        

        <div>

            <div className="headerProfile">
                <h1 onClick={teste}>WALLETC</h1>
                <div onMouseOver={handleShowDetalhesConta} onMouseOut={handleHideDetalhesConta}>
                <p>{`Olá, ${user_name[0]}`}</p>
                <p>Saldo atual:</p>
                <FiClipboard size={18} color="#94490b" style={{transform:"rotate(-90deg)"}}/>
                <p>{carteira }</p>
                <FiDollarSign size={18} color="#17A100"/>
                <button onClick={handleLogout}><FiPower size={18}/></button>
                </div>
                
                
            </div>
            
            <div className="longBar"></div>
            <div className="detalhesCarteira"
                 onMouseOver={handleShowDetalhesConta}
                 onMouseOut={handleHideDetalhesConta}
            >
                <p>{salario}</p>
            </div>
            <Link to="contas/add" >
                <FiPlus size={25}/>
            </Link>
            <section>
                <ul>
                    {
                        contas.map(contas=>{
                            
                            return <li key={contas.id}>
                                <div className="cabecalho" id={contas.id} onClick={(e)=>toggleHeader(e)}>
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
                                            
                                            const obj = e.target
                                            
                                            
                                            await toggleSituation(contas.id);
                                            
                                            toggleColor(obj)
                                            
                                            
                                            
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