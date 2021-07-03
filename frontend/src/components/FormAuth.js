function FormAuth({
    className,
    title,
    buttonTitle,
    state,
    handleChange,
    handleSubmit
}) {
    return(
        <>
            <div className="formAuth">
        
                <form onSubmit={handleSubmit}>
                    <h2 className={`formAuth__title ${className}__title`}>{title}</h2>
                    <input className={`formAuth__input ${className}__input-email`} name="email" type="email" value={state.email} onChange={handleChange} placeholder="Email"></input>
                    <input className={`formAuth__input ${className}__input-password`} name="password" value={state.password} onChange={handleChange} placeholder="Password" type="password"></input>
                    <button className={`formAuth__button-submit ${className}__button-submit`} type="submit">{buttonTitle}</button>
                </form>
                {(className === 'register') &&
                    <button className="formAuth__register-button-login-bottom" type="button">Уже зарегестрированы? Войти</button>
                }

            </div>
        </>
    )
}

export default FormAuth;