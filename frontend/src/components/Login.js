import Header from "./Header";
import { useState, React } from "react";
import api from "../utils/api"
import { useHistory } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";

function Login({ 
    handleLogin,
    isInfoTooltipPopupOpen,
    onInfoTooltip,
    closePopup,
}) {
    const history = useHistory();


    const [state, setState] = useState({
        email: "",
        password: ""
    })


    function handleChange(e) {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const {email, password} = state;

        if (!email || !password){
            return;
        }
        
        api.login(email, password)
        .then((res) => {
            if (!res.ok) {
                onInfoTooltip();
                return Promise.reject(`Error: ${res.status}`);
            } return res.json();
        })
        .then((data) => {
            if (data.token){
                setState({
                    ...state,
                    email: '',
                    password: ''
                })
                localStorage.setItem('token', data.token)
                handleLogin()
                history.push('/')
                return data
            } 
        })
    }

    return (
    <>
        <Header 
            text='Регистрация'
            exit={() => history.push('/register')}
        />

        <div className="formAuth">
        
        <form onSubmit={handleSubmit}>
            <h2 className={`formAuth__title login__title`}>Вход</h2>
            <input className={`formAuth__input login__input-email`} name="email" type="email" value={state.email} onChange={handleChange} placeholder="Email"></input>
            <input className={`formAuth__input login__input-password`} name="password" value={state.password} onChange={handleChange} placeholder="Password" type="password"></input>
            <button className={`formAuth__button-submit login__button-submit`} type="submit">Войти</button>
        </form>

    </div>
    <InfoTooltip
            openPopup= {isInfoTooltipPopupOpen}
            yesOrNot={false}
            closePopup={closePopup}
        />

    </>
    );
}

export default Login;