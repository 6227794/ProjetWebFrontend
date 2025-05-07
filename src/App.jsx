import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AddRecipePage from './pages/AddRecipePage';
import ConversionPage from './pages/ConversionPage';
import ErrorPage from './pages/ErrorPage';
import FAQPage from './pages/FAQPage';
import FavoritePage from './pages/FavoritePage';
import ProfilPage from './pages/ProfilPage';
import RecipeListPage from './pages/RecipeListPage';
import ViewRecipePage from './pages/ViewRecipePage';
import ConnexionPage from './pages/ConnexionPage';
import InscriptionPage from './pages/InscriptionPage';
import Header from './components/Header';
import Footer from './components/Footer';
import RouteAccessible from "./components/Accessibilite";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Connexion" element={<ConnexionPage/>}/>
            <Route path="/Inscription" element={<InscriptionPage/>}/>
            <Route path="/Conversion" element={<ConversionPage/>}/>
            <Route path="/RecipeList" element={<RecipeListPage/>}/>
            <Route path="/ViewRecipe/:id" element={<ViewRecipePage/>}/>
            <Route path="/About" element={<AboutPage/>}/>
            <Route path="/FAQ" element={<FAQPage/>}/>

            {/* Routes protégées */}
            <Route element={<RouteAccessible/>}>
              <Route path="/AddRecipe" element={<AddRecipePage/>}/>
              <Route path="/Profil" element={<ProfilPage/>}/>
              <Route path="/FavoriteRecipe" element={<FavoritePage/>}/>
            </Route>

            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
  )
}

export default App;
