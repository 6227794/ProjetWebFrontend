import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AddRecipePage from './pages/AddRecipePage';
import ConversionPage from './pages/ConversionPage';
import ErrorPage from './pages/ErrorPage';
import FAQPage from './pages/FAQPage';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import ProfilPage from './pages/ProfilPage';
import RecipeListPage from './pages/RecipeListPage';
import ViewRecipePage from './pages/ViewRecipePage';
import ConnexionPage from './pages/ConnexionPage';
import InscriptionPage from './pages/InscriptionPage';
import Header from './components/Header';
import Footer from './components/Footer';
import UpdateRecipePage from "./pages/UpdateRecipePage.jsx";
import PilotageCategoriesPage from "./pages/PilotageCategoriesPage.jsx";
import PilotageTagsPage from "./pages/PilotageTagsPage.jsx";
import {useEffect, useState} from "react";


function App() {
  const [trigger, setTrigger] = useState(false);
  const isConnected = localStorage.getItem('isConnected') === ('true');

  useEffect(() => {
    const handleStorageChange = () => {
      setTrigger(prev => !prev);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (

      <BrowserRouter>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Connexion" element={isConnected ? <Navigate to="/"/> : <ConnexionPage/>}/>
            <Route path="/Inscription" element={<InscriptionPage/>}/>
            <Route path="/Conversion" element={<ConversionPage/>}/>
            <Route path="/RecipeList" element={<RecipeListPage/>}/>
            <Route path="/ViewRecipe/:id" element={<ViewRecipePage/>}/>
            <Route path="/UpdateRecipe/:id" element={<UpdateRecipePage/>}/>
            <Route path="/About" element={<AboutPage/>}/>
            <Route path="/FAQ" element={<FAQPage/>}/>
            <Route path="/AddRecipe" element={isConnected ? <AddRecipePage/> : <Navigate to="/Connexion"/>}/>
            <Route path="/Profil/:id" element={isConnected ? <ProfilPage setTrigger={setTrigger}/> : <Navigate to="/Connexion"/>}/>
            <Route path="/MyRecipes" element={isConnected ? <MyRecipesPage setTrigger={setTrigger}/> : <Navigate to="/Connexion"/>}/>
            <Route path="/PilotageCategories" element={isConnected ? <PilotageCategoriesPage setTrigger={setTrigger}/> : <Navigate to="/Connexion"/>}/>
            <Route path="/PilotageTags" element={isConnected ? <PilotageTagsPage setTrigger={setTrigger}/> : <Navigate to="/Connexion"/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
  )
}

export default App;
