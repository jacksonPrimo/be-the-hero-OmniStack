import React, {useState, useEffect} from 'react'
import './style.css'
import {Link, useHistory} from 'react-router-dom'
import LogoImg from '../../assets/logo.svg'
import api from '../../services/api'
export default function Profile(){
    const history = useHistory()

    const ongName = localStorage.getItem('OngName')
    const[incidents, setIncidents] = useState([])

    const OngId = localStorage.getItem('OngId')
    const OngName = localStorage.getItem('OngName')

    useEffect(()=>{
        api.get('/profile', {
            headers:{
                authorization: OngId
            }
        }).then(response=>{
            setIncidents(response.data)
        })
    },[OngId])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
            headers:{
                authorization: OngId,
            }
            })
        }catch(err){
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    return(
        <div className='profile-container'>
            <header>
                <img src={LogoImg} alt="be the hero"/>
                <span>Bem Vindo {ongName}</span>
                <Link className='button' to='/incidents/new'>Cadastrar Novo Caso</Link>
                <button onClick={handleLogout}type='button'>Sair</button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident =>(
                <li key={incident.id}>
                    <stroong>CASO: </stroong>
                    <p>{incident.title}</p>
                    
                    <strong>DESCRIÇÕES</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick={()=>handleDeleteIncident(incident.id)} className="profile-button" type="button">S</button>
                </li>
                ))}
            </ul>
        </div>
    )
}