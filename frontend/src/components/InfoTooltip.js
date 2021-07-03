import Yes from "../images/Yes.png"
import No from "../images/No.png"

function InfoTooltip({openPopup, yesOrNot, closePopup}) {
    return (
        <section className={`popup popup_infoTooltip ${openPopup && "popup_is-opened"}`}>
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    type="button"
                    onClick={closePopup}
            ></button>
                <img className="popup__infoTooltip-img" alt="Картинка" src={`${yesOrNot ? Yes : No}`}></img>
                <h2 className="popup__infoTooltip-message">{`${yesOrNot ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}`}</h2>

            </div>
        </section>
    )
}

export default InfoTooltip;