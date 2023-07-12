import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div className="profile-page-container">
      <Header title="Profile" />
      <h1 data-testid="page-title">Profile</h1>
      <Footer />
    </div>
  );
}

export default Profile;
