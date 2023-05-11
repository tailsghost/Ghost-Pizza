import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/pages/Home';
import NotFound from './Components/pages/NotFound';
import Cart from './Components/pages/Cart';
import './style.scss';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
