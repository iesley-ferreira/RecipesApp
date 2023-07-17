import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';
import Footer from '../components/Footer';
import Header from '../components/Header';
import doneRecipes from '../images/doneRecipes.png';
import logout from '../images/logout.png';
import favoriteRecipes from '../images/favoriteRecipes.png';
import './styles/Profile.css';

function Profile() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const data = localStorage.getItem('user');
<<<<<<< HEAD
    const email = JSON.parse(data);
    setUserEmail(email?.email);
=======
    if (data) {
      const { email } = JSON.parse(data);
      console.log(email);
      setUserEmail(email);
    } else {
      setUserEmail('Email não encontrado');
    }
>>>>>>> 6c0052525beabf7700cf14acc672a9e96778661e
  }, [userEmail]);

  const handleLogout = (path) => {
    localStorage.clear();
    history.push(path);
  };

  return (
    <div className="profile-page-container">
      <Header title="Profile" />
      <main className="profile-container">
        <h4 data-testid="profile-email">{ userEmail }</h4>
        <div className="profile-buttons-container">
          <button
            data-testid="profile-done-btn"
            onClick={ () => handleLogout('/done-recipes') }
          >
            <img src={ doneRecipes } alt="done-recipes" />
            <p>Done Recipes</p>
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => handleLogout('/favorite-recipes') }
          >
            <img src={ favoriteRecipes } alt="done-recipes" />
            <p>Favorite Recipes</p>
          </button>
          <button data-testid="profile-logout-btn" onClick={ () => handleLogout('/') }>
            <img src={ logout } alt="done-recipes" />
            <p>Logout</p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
