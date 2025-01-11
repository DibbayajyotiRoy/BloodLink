import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DonorForm from './pages/UserRegister';
import BloodBankRegister from './pages/bloodBankregister';
import BloodSeekersPage from './dashboard/landing/page';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
         <Route path="/" element={<BloodSeekersPage />} />
       <Route path="/register/donor" element={<DonorForm />} />
         <Route path="/register/blood-bank" element={<BloodBankRegister />} />
       </Routes>
     </Router>
    </>
    
  );
}

export default App;

