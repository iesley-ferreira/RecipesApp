import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/iconePerfil.png';
import './styles/Header.css';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';
import searchIcon from '../images/iconePesquisar.png';
import receitasContext from '../context/ReceitasContext';
import PageDrink from '../images/PageDrink.png';
import iconePrato from '../images/iconePrato.png';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import Favorites from '../images/Favorites.png';
import DoneRecipes from '../images/DoneRecipes.png';

function Header(props) {
  const { showBtn } = props;
  const { pathname } = window.location;
  const history = useHistory();

  const str = pathname;
  const novaStr = str.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());

  const {
    showInput,
    setShowInput,
  } = useContext(receitasContext);

  const redirectToProfile = () => {
    history.push('/profile');
  };

  const showSearchInputs = () => {
    setShowInput(!showInput);
  };

  // const title = pathname === '/meals' ? 'Meals' : 'Drinks';
  // const icon = pathname === '/meals' ? iconePrato : iconeBebida;

  const getHeaderImage = (title) => {
    switch (title) {
    case 'Meals':
      return iconePrato;
    case 'Drinks':
      return PageDrink;
    case 'Favorite Recipes':
      return Favorites;
    case 'Profile':
      return profileIcon;
    case 'Done Recipes':
      return DoneRecipes;
    default:
      return '';
    }
  };

  return (
    <div className="header-container">
      <div className="header-superior">
        <div className="logo-container">
          <img src={ iconeRecipes2 } alt="logo1recipes" />
          <img src={ logoRecipes } alt="logo2recipes" />
        </div>
        <header className="links-container">
          {
            showBtn && (
              <input
                type="image"
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search icon"
                onClick={ showSearchInputs }
              />
            )
          }
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
            onClick={ redirectToProfile }
          />
        </header>
      </div>
      <div className="title-container">
        <img src={ getHeaderImage(novaStr) } alt={ novaStr } />
        <h1 data-testid="page-title">{ novaStr }</h1>
      </div>
    </div>
  );
}

Header.propTypes = {
  showBtn: PropTypes.bool.isRequired,
};

export default Header;
