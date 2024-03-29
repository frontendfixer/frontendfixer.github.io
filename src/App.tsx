import { Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import Navigation from './routes/navigation';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
