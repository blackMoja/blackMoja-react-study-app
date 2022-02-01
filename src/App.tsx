import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'routes/Home';
import Tv from 'routes/Tv';
import Search from 'routes/Search';
import Header from 'components/Header';

import type { FC } from 'react';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="movies/:movieId" element={<Home />}></Route>
        <Route path="tv" element={<Tv />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
