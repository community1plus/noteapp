import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CommunityPlusLandingPage from './CommunityPlusLandingPage';
import SignInRegister from '../src/SignInRegister';

function App() {
  return (
      <Routes>
        <Route path="/" element={<CommunityPlusLandingPage />} />
        <Route path="/register" element={<SignInRegister />} />
      </Routes>  
  );
}



export default App;