import { Link } from 'react-router-dom';
import './styles/Footer.css';
import iconeBebida from '../images/iconeBebida.png';
import iconePrato from '../images/iconePrato.png';

function Footer() {
  return (
    <div className="footer-container" data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <img data-testid="drinks-bottom-btn" src={ iconeBebida } alt="icone de bebida" />
      </Link>

      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ iconePrato }
          alt="icone de prato"
        />
      </Link>
    </div>
  );
}

export default Footer;
