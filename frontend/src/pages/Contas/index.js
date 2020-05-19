import React, { useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiDollarSign,FiSettings} from 'react-icons/fi';


import logo from '../../assets/logo.svg';

import './styles.css';

import SettingsMenu from '../Settings';

export default function AdicionaContas(){

    const user_id = localStorage.getItem('id');
    const user_name = localStorage.getItem('nome').split(' ');

    const [carteira, setCarteira] = useState('');
    
    const [carteiraBd, setCarteiraBd] = useState('');

    const [salario, setSalario] = useState('');

    const [alterarSalario, setAlterarSalario] = useState('');

    const [alterarCarteira, setAlterarCarteira] = useState('');

    const [adicionarFundos, setAdicionarFundos] = useState('');

    const diferenca = carteiraBd - carteira;

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState(' ');
    const [vencimento, setVencimento] = useState('');
    const situacao = 'red';

    let toggleActnSettings = true;

    useEffect(()=>{
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

    
    async function handleAddConta(e){
        e.preventDefault();
        const dados = {
            nome,
            valor,
            descricao,
            vencimento,
            situacao
        }

        try{
            api.post('contas', dados, {
                headers: {
                    authorization: user_id
                }
            })

        }catch(erro){
            console.log(erro)
        }

        setNome('');
        setValor('');
        setDescricao('');
        setVencimento('');
    }

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

    return (
        <div>

             <div className="headerContas">

                    <h1>WALLETC</h1>
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

            <div className="conteudo">
                
                <section className="formAdd">
                    <form onSubmit={e=> handleAddConta(e)}>
                        <div className="cabecalhoAddConta">
                            <div className="InfAddConta">
                                <input type="text"
                                placeholder="Nome da Conta"
                                required
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                />

                                <FiDollarSign size={22} color="#17A100" style={{marginRight:"5px"}}/>

                                <input type="number"
                                 placeholder="Valor" 
                                 required
                                 value={valor}
                                 onChange={e => setValor(e.target.value)}
                                 min="1"
                                 step="0.010"
                                 />
                                 
                            </div>        
                        </div>

                        <div className="contentAddConta">
                            <table>
                                <thead>
                                    <tr>
                                    <th>Descrição</th>
                                    <th>Vencimento</th>
                                     </tr>
                                </thead>
                            </table>
                            <div className="detalhesAddConta">

                                <textarea cols="10" rows="2" 
                                placeholder="Descrição Opcional"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                ></textarea>

                                <input type="text" 
                                placeholder="dd/mm" 
                                required
                                value={vencimento}
                                onChange={e => setVencimento(e.target.value)}
                                />
                            </div>
                            
                        </div>
                        <div className="btnGroup">
                            
                            <Link to="/users/contas">
                            <button type="submit" className="btnCancelar">Cancelar</button>
                            </Link>
                            <button className="btnAdicionar">Adicionar</button>
                            
                        </div>
                        
                       
                        
                    </form>
    
                </section>
    
            </div>
            
        </div>
    );
}
