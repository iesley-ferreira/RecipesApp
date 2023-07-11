import propTypes from 'prop-types';
import profileIcon from '../images/iconePerfil.png';
import './styles/Header.css';
import SeachIcon from './SearchIcon';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';

function Header({ title }) {
  const { pathname } = window.location;
  const redirectToProfile = () => {
    if (pathname === '/profile') return;
    window.location.href = '/profile';
  };

  let search = true;

  if (pathname === '/meals' || pathname === '/drinks') {
    search = true;
  } else {
    search = false;
  }

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={ iconeRecipes2 } alt="logo1recipes" />
        <img src={ logoRecipes } alt="logo2recipes" />
      </div>
      <div className="links-container">
        {
          search && (<SeachIcon />)
        }
        <button onClick={ redirectToProfile }>
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </button>
      </div>
      {/* <h1 data-testid="page-title">{title}</h1> */}
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
