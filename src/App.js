import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Products from './components/Products';
import Footers from './components/Footers';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Product from './components/product';
import Cart from './components/Cart';
import Search from './components/search';

function App() {
  return (
    <div className="App">
      <>
    <Router>
      <Appbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/product/:product_id" element={<Product/>}/>
        <Route path="/cart"element={<Cart/>}/>
        <Route path="/search"element={<Search/>}/>




      </Routes>
      <Footers/>
    </Router>
    </>
    </div>
  );
}

export default App;
