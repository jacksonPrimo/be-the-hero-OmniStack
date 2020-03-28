import React, {useState} from 'react'

import './style.css'

import {Link, useHistory} from 'react-router-dom'

import LogoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function NewIncident(){
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[value, setValue] = useState('')

    const history = useHistory()
    const OngId = localStorage.getItem('OngId')

    async function handleNewIncident(e){
        e.preventDefault()
        
        const data ={
            title,
            description,
            value,
        }
        try{
            await api.post('/incidents', data, {
                headers:{
                    authorization: OngId,
                }
            })
            history.push('/profile')
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }

    return(
        <div className='new-incident-container'>
            <div className="content">
                <section>
                    <img src={LogoImg} alt="be the hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolve-lo.</p>

                    <Link className="black-link" to="/profile">
                        voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor Em Reais"
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}