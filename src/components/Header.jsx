import { useContext, useEffect } from 'react';
// import profileIcon from '../images/iconePerfil.png';
import './styles/Header.css';
import logoRecipes from '../images/logoRecipes.png';
import iconeRecipes2 from '../images/iconeRecipes2.png';
// import iconePesquisar from '../images/iconePesquisar.png';
import receitasContext from '../context/receitasContext';
import iconeBebida from '../images/iconeBebida.png';
import iconePrato from '../images/iconePrato.png';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pathname } = window.location;

  const str = pathname;
  const novaStr = str.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());

  const {
    usualRecipes,
    showInput,
    setShowInput,
  } = useContext(receitasContext);

  const recipes = usualRecipes;

  // redireciona para a página de detalhes da receita caso só tenha uma receita
  useEffect(() => {
    let array = [];
    if (recipes) {
      array = recipes.meals || recipes.drinks;
    }

    if (array && array.length === 1) {
      let id = 0;
      if (pathname === '/meals') {
        id = array[0].idMeal;
      } else { id = array[0].idDrink; }

      window.location.href = `${pathname}/${id}`;
    }
  }, [recipes, pathname]);
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

  const showSearchInputs = () => {
    setShowInput(!showInput);
  };

  const title = pathname === '/meals' ? 'Meals' : 'Drinks';
  const icon = pathname === '/meals' ? iconePrato : iconeBebida;

  return (
    <header className="header-container">
      <div className="header-superior">
        <div className="logo-container">
          <img src={ iconeRecipes2 } alt="logo1recipes" />
          <img src={ logoRecipes } alt="logo2recipes" />
        </div>
        <div className="links-container">
          {
            search && (
              <button
                data-testid="search-top-btn"
                src={ searchIcon }
                onClick={ showSearchInputs }
              >
                <img
                  src={ searchIcon }
                  alt="search icon"
                />
              </button>
            )
          }
          <button
            data-testid="profile-top-btn"
            src={ profileIcon }
            onClick={ redirectToProfile }
          >
            <img src={ profileIcon } alt="profile icon" />
          </button>
        </div>
      </div>
      <div className="title-container">
        <img alt={ title } src={ icon } />
        <h1 data-testid="page-title">{ novaStr }</h1>
      </div>
    </header>
  );
}

export default Header;
