import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Conversor from "./components/Conversor";
import FileConverter from "./components/ConversorAquivos";
import Login from "./components/Login"; // Importe o componente Login
import Rodape from "./components/Rodape";


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Atualiza o estado de autenticação
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/converter-imagem" element={<Conversor />} />
          <Route path="/converter-arquivo" element={<FileConverter />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Rota para o Login */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <Rodape/>
    </div>
  );
}

export default App;