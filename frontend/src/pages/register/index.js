import React, {useState} from 'react'
import './style.css'
import LogoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
export default function Register(){
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[whatsapp, setWhatsapp] = useState('')
    const[city, setCity] = useState('')
    const[uf, setUF] = useState('')

    const history = useHistory()
    
    async function handleRegister(e){
        e.preventDefault(); //aqui pegamos o evento de submit e previnimos que a pagina seja recarregada
        
        const data= {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            const response = await api.post('ongs', data)
            alert('seu Id de cadastro: ' + response.data.id)
            history.push('/')
        }catch(err){
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return(
        <div className='register-container'>
            <div className="content">
                <section>
                    <img src={LogoImg} alt="be the hero"/>
                    <h1>cadastro</h1>
                    <p>faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos na sua ONG.</p>

                    <Link className="black-link" to="/">
                        Ja possuo cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange = {e=>setName(e.target.value)}
                    />
                    <input type='email'placeholder="E-mail"
                        value={email}
                        onChange = {e=>setEmail(e.target.value)}
                    />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange = {e=>setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input placeholder="cidade"
                            value={city}
                            onChange = {e=>setCity(e.target.value)}
                        />
                        <input placeholder="Uf" style={{width:80}}
                            value={uf}
                            onChange = {e=>setUF(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}