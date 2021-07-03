import logo from "../images/logo.svg";

function Header({
  text,
  email,
  exit,
}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="logo" />
      {email && <h3 className="header__email">{email}</h3>}
      <button className="header__button-login" type="button" onClick={exit}>{text}</button>
    </header>
  );
}

export default Header;
