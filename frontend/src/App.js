import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/HomePageComponents/Footer'; // Import the Footer

function App() {
  return (
    // Use the className "app" for the main container
    <div className="app">
      <Navbar />
      <HomePage />
      <Footer /> {/* Add the Footer at the end */}
    </div>
  );
}

export default App;