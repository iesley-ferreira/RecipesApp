import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer">
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="" />
      </Link>

      <Link to="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="" />
      </Link>
    </div>
  );
}

export default Footer;
