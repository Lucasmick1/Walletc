import React, { useEffect, useState} from 'react';
import api from '../../services/api';
import { 
    FiDollarSign, 
    FiEdit2, 
    FiPlusCircle,
    FiCornerUpLeft} from 'react-icons/fi';

import './styles.css';

import {Link, useHistory} from 'react-router-dom';




export default function SettingsMenu(props){
    const history = useHistory();



   
    
    
    async function handleLogout(e){
        e.preventDefault();

        localStorage.removeItem('id');
        localStorage.removeItem('nome');
        setTimeout(()=>{
            history.push('/');
        },400)
        

    }

    async function handleUpdateSalario(e){
        e.preventDefault();

        try{
            api.put('users/salario',{novoSalario:props.alterarSalario},{
                headers:{
                    authorization:props.user_id
                }
            }).then(response => {
                props.setSalario(response.data);
            })
        }catch(erro){

        };
   }

   async function handleUpdateCarteira(e){
        e.preventDefault();
        try{
            api.put('users/carteiraBd',{update:props.alterarCarteira}, {
                headers : {
                    authorization:props.user_id
                }
            }).then(response =>{
               props.setCarteiraBd(response.data)
            })
        }catch(erro){
            console.log(erro)
        }
   }

   async function handleAdicionarFundos(e){
        e.preventDefault();
        try{
            api.put('users/carteiraBd/adiciona',{fundosCarteiraBd:props.adicionarFundos},{
                headers:{
                    authorization: props.user_id
                }
            }).then(response =>{
                props.setCarteiraBd(response.data)
            })

        }catch(erro){

        }
   }
    return (
        <div className="settings">
                <div className="settingsDefault">
               
                    <div>

                        <p>Seu salario: <FiDollarSign size={16} color="#17A100" style={{verticalAlign:"text-bottom"}}/>{props.salario}</p>
                        <button style={{marginLeft:"9%"}} onClick={(e)=>{
                            const target = document.querySelector('.settingsDefault');
                            const display = document.querySelector('.settingsSalario');
                            setTimeout(()=>{
                                target.style.display ='none';
                                display.style.display = 'block';

                            }, 300)
                           
                        }} ><FiEdit2 size={18} color="#17A100"/></button>

                    </div>

                    <div>

                        <p>Sua carteira: <FiDollarSign size={16} color="#17A100" style={{verticalAlign:"text-bottom"}}/>{props.carteira}</p>
                        <button style={{marginLeft:"5%"}} onClick={(e)=>{
                            const target = document.querySelector('.settingsDefault');
                            const display = document.querySelector('.settingsCarteira');
                            setTimeout(()=>{
                                target.style.display ='none';
                                display.style.display = 'block';

                            }, 300)
                           
                        }} ><FiEdit2 size={18} color="#17A100"/></button>

                    </div>
                    
                    <div>
                        <p>Adicionar Dinheiro</p>
                        <button style={{marginLeft:"10%"}} onClick={(e)=>{
                                const target = document.querySelector('.settingsDefault');
                                const display = document.querySelector('.settingsAdicionar');
                                setTimeout(()=>{
                                    target.style.display ='none';
                                    display.style.display = 'block';

                                }, 300)
                            
                            }}><FiPlusCircle size={18} color="#17A100"/></button>
                        
                    </div>
                    
                    <button>Alterar dados</button>
                    <button onClick={handleLogout}>Sair</button>
                </div>

                <div className="settingsSalario">
                    <p>Alterar Salário</p>
                    <div>
                        <FiDollarSign size={20} color="#17A100"/>
                        <input type="text"
                                 placeholder="Valor" 
                                 value={props.alterarSalario}
                                 onChange={e => {
                                     
                                    if(isNaN(e.target.value)){
                                        let valorCampo = e.target.value;
                                        e.target.value = valorCampo.substr(0, valorCampo.length -1);
                                    }else{
                                        props.setAlterarSalario(Number(e.target.value))
                                        
                                    }
                                        
                                    }}       
                        />
                    </div>
                    <div className="btnActions">
                        <button onClick={(e)=>{
                            const target = document.querySelector('.settingsSalario');
                            const display = document.querySelector('.settingsDefault');
                            
                                target.style.display ='none';
                                display.style.display = 'block';
                            
                        }}><FiCornerUpLeft size={18} color="F0F0F0"/></button>

                        <button onClick={(e)=>{
                            const target = document.querySelector('.settingsSalario');
                            const display = document.querySelector('.settingsDefault');
                            
                            handleUpdateSalario(e)
                            setTimeout(()=>{
                                target.style.display ='none';
                                display.style.display = 'block';
                            },300)
                        }}>Alterar</button>
                    </div>
                    
                    
                </div>

                <div className="settingsCarteira">
                    <p>Alterar Carteira</p>
                        <div>
                            <FiDollarSign size={20} color="#17A100"/>
                            <input type="text"
                                    placeholder="Valor" 
                                    value={props.alterarCarteira}
                                    onChange={e => {
                                        
                                        if(isNaN(e.target.value)){
                                            let valorCampo = e.target.value;
                                            e.target.value = valorCampo.substr(0, valorCampo.length -1);
                                        }else{
                                            props.setAlterarCarteira(Number(e.target.value))
                                            
                                        }
                                            
                                        }}       
                            />
                        </div>
                        <div className="btnActions">
                            <button onClick={(e)=>{
                                const target = document.querySelector('.settingsCarteira');
                                const display = document.querySelector('.settingsDefault');
                                
                                    target.style.display ='none';
                                    display.style.display = 'block';
                                
                            }}><FiCornerUpLeft size={18} color="F0F0F0"/></button>
                            
                            <button onClick={(e)=>{
                                const target = document.querySelector('.settingsCarteira');
                                const display = document.querySelector('.settingsDefault');
                                
                                handleUpdateCarteira(e)
                                setTimeout(()=>{
                                    target.style.display ='none';
                                    display.style.display = 'block';
                                },300)
                            }}>Alterar</button>
                        </div>
                        

                </div>

                <div className="settingsAdicionar">
                    <p>Adicionar Fundos</p>
                        <div>
                            <FiDollarSign size={20} color="#17A100"/>
                            <input type="text"
                                    placeholder="Valor" 
                                    value={props.adicionarFundos}
                                    onChange={e => {
                                        
                                        if(isNaN(e.target.value)){
                                            let valorCampo = e.target.value;
                                            e.target.value = valorCampo.substr(0, valorCampo.length -1);
                                        }else{
                                            props.setAdicionarFundos(Number(e.target.value))
                                            
                                        }
                                            
                                        }}       
                            />
                        </div>
                        <div className="btnActions">
                            <button onClick={(e)=>{
                                    const target = document.querySelector('.settingsAdicionar');
                                    const display = document.querySelector('.settingsDefault');
                                    
                                        target.style.display ='none';
                                        display.style.display = 'block';
                                    
                                }}><FiCornerUpLeft size={18} color="F0F0F0"/></button>

                                <button onClick={(e)=>{
                                    const target = document.querySelector('.settingsAdicionar');
                                    const display = document.querySelector('.settingsDefault');
                                    
                                    handleAdicionarFundos(e)
                                    setTimeout(()=>{
                                        target.style.display ='none';
                                        display.style.display = 'block';
                                    },300)
                                }}>Alterar</button>
                        </div>

                        

                </div>
                
                    
    
                
            </div>
    
    )
}