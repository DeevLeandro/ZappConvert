import { Link } from "react-router-dom";
import { FileText, Image } from "lucide-react";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Conversores</h1>

      <div className="grid">
       {/* Card do Conversor de Imagens */}
        <Link to="/converter-imagem" className="card-imagem">
          <Image className="icon text-blue-500" />
          <span>Conversor de Imagens</span>
        </Link>
        
        
        {/* Card do Conversor de Documentos */}
        <Link to="/converter-arquivo" className="card-documento">
          <FileText className="icon text-green-500" />
          <span>Conversor de Documentos</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
