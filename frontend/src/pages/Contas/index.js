import React, { useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FiDollarSign} from 'react-icons/fi'

import logo from '../../assets/logo.svg';

import './styles.css';

export default function AdicionaContas(){

    const user_id = localStorage.getItem('id');
    const user_name = localStorage.getItem('nome').split(' ');

    const [carteira, setCarteira] = useState('');

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState(' ');
    const [vencimento, setVencimento] = useState('');
    const situacao = 'red';

    useEffect(()=>{
        api.get('users/carteira',{
            headers:{
                authorization : user_id
            }
        }).then(response => {
            setCarteira(response.data);
            
        });

            
    }, [user_id]);

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

    return (
        <div>

             <div className="headerContas">
                <h1>WALLETC</h1>
                <div>
                <p>{`Olá, ${user_name[0]}`}</p>
                <FiDollarSign size={18} color="#17A100"/>
                <p>{carteira}</p>
                </div>
            </div>

            <div className="longBar"></div>

            <div className="conteudo">
                <section className="logoWalletc">
                    <img src={logo} alt=""/>
                </section>
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
