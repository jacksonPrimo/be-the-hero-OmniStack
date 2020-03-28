import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

import './style.css'
import '../../global.css'

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

import LoginIcon from '../../assets/loginIcon.png';

import api from '../../services/api'

export default function Logon(){
    const[id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault()
        try{
            const response = await api.post('session', {id})
            localStorage.setItem('OngId', id)
            localStorage.setItem('OngName', response.data.name)
            history.push('/profile')
        }catch(err){
            alert('Erro no Login, Tente novamente.')
        }
    }
    return(
        <div className='logon-container'>
            <section className='form'>
                <img src={logoImg}/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder='Sua ID'
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className='button' type='submit'>Entrar</button>
                    <Link className="black-link" to='/register'>
                        <img src={LoginIcon} padding-top = '100px' height = '20px' width = '20px'></img>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt='heros'/>
        </div>
    )
}
//link representa a tag "a" e to representa 'href', usa-se essa ferramenta do react para a linkagem não fazer com que o server teha que recarregar