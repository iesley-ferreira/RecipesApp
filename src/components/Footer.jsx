import { Link } from 'react-router-dom';
import './styles/Footer.css';
// import iconeBebida from '../images/iconeBebida.png';
// import iconePrato from '../images/iconePrato.png';

function Footer() {
  return (
    <div className="footer-container" data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          alt="icone de bebida"
        />
      </Link>

      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src="../images/mealIcon.svg"
          alt="icone de prato"
        />
      </Link>
    </div>
  );
}

export default Footer;
