import { Route, Routes } from 'react-router-dom';

import { SEO } from '#/components/common/SEO';
import Navigation from '#routes/Navigation.tsx';

import Home from './routes/Home';

const App = () => {
  return (
    <>
      <SEO />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
