import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando para navegação

const Conversor = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const navigate = useNavigate(); // Função de navegação

  const handleConvert = () => {
    if (!file) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Define o tamanho do canvas com base na imagem
        canvas.width = img.width;
        canvas.height = img.height;

        // Desenha a imagem no canvas
        ctx.drawImage(img, 0, 0);

        // Converte a imagem para o formato escolhido
        const convertedDataUrl = canvas.toDataURL(`image/${format}`);

        // Cria um link para download da imagem convertida
        const link = document.createElement("a");
        link.href = convertedDataUrl;
        link.download = `converted.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file); // Lê o arquivo de imagem selecionado
  };

  // Função de navegação para voltar à tela anterior
  const handleBack = () => {
    navigate(-1); // Isso vai fazer com que o usuário volte para a página anterior
  };

  return (
    <div className="conversor-container">
      <h2 className="titulo">Conversor de Imagens</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="input-file"
      />
    <div className="select-format-wrapper">
      <select
      onChange={(e) => setFormat(e.target.value)}
      className="seleciona-arquivo"
    >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
        <option value="gif">GIF</option>
        <option value="bmp">BMP</option>
        <option value="ico">ICO</option>
        <option value="tiff">TIFF</option>
        <option value="svg">SVG</option>
        <option value="dds">DDS</option>
        <option value="psd">PSD</option>
        <option value="avif">AVIF</option>
        <option value="cur">CUR</option>
        <option value="hdr">HDR</option>
        <option value="tga">TGA</option>
        <option value="jif">JIF</option>
        <option value="jp2">JP2 (JPEG 2000)</option>
        <option value="jxr">JXR (JPEG XR)</option>
        <option value="heic">HEIC (High Efficiency Image Format)</option>
        <option value="heif">HEIF</option>
        <option value="raw">RAW</option>
        <option value="pcx">PCX</option>
        <option value="exr">EXR</option>
        <option value="xcf">XCF (GIMP)</option>
        <option value="ai">AI (Adobe Illustrator)</option>
        <option value="eps">EPS (Encapsulated PostScript)</option>
        <option value="pdf">PDF</option>
        <option value="cdr">CDR (CorelDRAW)</option>
        <option value="wmf">WMF (Windows Metafile)</option>
        <option value="emf">EMF (Enhanced Metafile)</option>
        <option value="dcm">DCM (DICOM - Imagem médica)</option>
        <option value="icns">ICNS (Ícones MacOS)</option>
       </select>
    </div>
      <div className="buttons-container">
        <button onClick={handleConvert} className="btn-converter">
          Converter
        </button>

        {/* Botão de Voltar */}
        <button onClick={handleBack} className="btn-voltar">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Conversor;
