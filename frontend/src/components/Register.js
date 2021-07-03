import Header from "./Header";
import { useState, React } from "react";
import api from "../utils/api"
import { useHistory } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";


function Register({
    onInfoTooltip,
    closePopup,
    isInfoTooltipPopupOpen
}) {

    const [yesOrNot, setYesorNot] = useState(false);

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
        api.register(email, password).then((res) => {
            if(res.status === 200){
                setYesorNot(true)
                onInfoTooltip()
                setTimeout(function() {
                    closePopup()
                }, 1200);

                setTimeout(function() {
                    history.push('/login');
                }, 1300);

            } else {
                setYesorNot(false)
                onInfoTooltip()
                return Promise.reject(`Error: ${res.status}`)
            }
            
        })
    }

    function toLogin() {
        history.push('/login')
    }

    return (
    <>
        <Header 
            text='Войти'
            exit={toLogin}
        />
        <div className="formAuth">
        
            <form onSubmit={handleSubmit}>
                <h2 className={`formAuth__title register__title`}>Регистрация</h2>
                <input className={`formAuth__input register__input-email`} name="email" type="email" value={state.email} onChange={handleChange} placeholder="Email"></input>
                <input className={`formAuth__input register__input-password`} name="password" value={state.password} onChange={handleChange} placeholder="Password" type="password"></input>
                <button className={`formAuth__button-submit register__button-submit`} type="submit">Зарегестрироваться</button>
            </form>
                <button className="formAuth__register-button-login-bottom" type="button" onClick={toLogin}>Уже зарегестрированы? Войти</button>

        </div>
        <InfoTooltip
            openPopup= {isInfoTooltipPopupOpen}
            yesOrNot={yesOrNot}
            closePopup={closePopup}
        />

    </>
    );
}

export default Register;