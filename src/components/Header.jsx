import PropTypes from "prop-types";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import receitasContext from "../context/ReceitasContext";
import profileIcon from "../images/iconePerfil.png";
import searchIcon from "../images/iconePesquisar.png";
import iconeRecipes2 from "../images/iconeRecipes2.png";
import logoRecipes from "../images/logoRecipes.png";
import "./styles/Header.css";

function Header(props) {
  const { showBtn } = props;
  // const { pathname } = window.location;
  const history = useHistory();

  // const str = pathname;
  // const novaStr = str
  //   .replace("/", "")
  //   .replace(/-/g, " ")
  //   .replace(/\b\w/g, (match) => match.toUpperCase());

  const { showInput, setShowInput } = useContext(receitasContext);

  const redirectToProfile = () => {
    history.push("/profile");
  };

  const showSearchInputs = () => {
    setShowInput(!showInput);
  };

  // const getHeaderImage = (title) => {
  //   switch (title) {
  //     case "Meals":
  //       return iconePrato;
  //     case "Drinks":
  //       return PageDrink;
  //     case "Favorite Recipes":
  //       return Favorites;
  //     case "Profile":
  //       return profileIcon;
  //     case "Done Recipes":
  //       return DoneRecipes;
  //     default:
  //       return "";
  //   }
  // };

  return (
    <div className='header-container'>
      <div className='header-superior'>
        <Link to='/meals' className='logo-container'>
          <img src={iconeRecipes2} alt='logo1recipes' />
          <img src={logoRecipes} alt='logo2recipes' />
        </Link>
        <header className='links-container'>
          {showBtn && (
            <input
              type='image'
              data-testid='search-top-btn'
              src={searchIcon}
              alt='search icon'
              onClick={showSearchInputs}
            />
          )}
          <input
            type='image'
            data-testid='profile-top-btn'
            src={profileIcon}
            alt='profile icon'
            onClick={redirectToProfile}
          />
        </header>
      </div>
      {/* <div className='title-container'>
        <img className='done-image' src={getHeaderImage(novaStr)} alt={novaStr} />
        <h1 data-testid='page-title'>{novaStr}</h1>
      </div> */}
    </div>
  );
}

Header.propTypes = {
  showBtn: PropTypes.bool.isRequired,
};

export default Header;
