import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  const redirectToProfile = () => {
    const { pathname } = window.location;
    if (pathname === '/profile') return;
    window.location.href = '/profile';
  };

  return (
    <div>
      <button onClick={ redirectToProfile }>
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default Header;
