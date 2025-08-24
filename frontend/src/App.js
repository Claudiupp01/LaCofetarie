import './App.css';
import Navbar from './components/Navbar';
import PageTitle from './components/PageTitle'; // <-- 1. Import the new component

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* 2. Use the component and pass a title to it */}
      <PageTitle title="Povestea noastra" /> 
      
      {/* The rest of your page content will go below here */}
    </div>
  );
}

export default App;