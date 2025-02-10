import { useState } from "react";
import { jsPDF } from "jspdf";
import JSZip from "jszip";
import fileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("pdf");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    const fileName = file.name.split(".")[0];
    let convertedBlob = null;
    let convertedFileName = `${fileName}.${format}`;

    try {
      const fileBuffer = await file.arrayBuffer();

      switch (format) {
        case "pdf":
          convertedBlob = convertToPdf(fileBuffer);
          break;
        case "docx":
          convertedBlob = await convertToDocx(fileBuffer);
          break;
        case "txt":
          convertedBlob = convertToTxt(fileBuffer);
          break;
        case "csv":
          convertedBlob = convertToCsv(fileBuffer);
          break;
        default:
          alert("Formato não suportado ainda!");
          return;
      }

      fileDownload(convertedBlob, convertedFileName);
      alert(`Arquivo convertido para: ${convertedFileName}`);
    } catch (error) {
      console.error("Erro na conversão:", error);
      alert("Erro ao converter o arquivo.");
    }
  };

  const convertToPdf = (buffer) => {
    const doc = new jsPDF();
    const text = new TextDecoder().decode(buffer);
    doc.text(text, 10, 10);
    return doc.output("blob");
  };

  const convertToDocx = async (buffer) => {
    const text = new TextDecoder().decode(buffer);
    const zip = new JSZip();
    const doc = zip.folder("word");

    doc.file("document.xml", `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
          <w:p>
            <w:r>
              <w:t>${text}</w:t>
            </w:r>
          </w:p>
        </w:body>
      </w:document>
    `);

    const content = await zip.generateAsync({ type: "blob" });
    return content;
  };

  const convertToTxt = (buffer) => {
    const text = new TextDecoder().decode(buffer);
    return new Blob([text], { type: "text/plain" });
  };

  const convertToCsv = (buffer) => {
    const text = new TextDecoder().decode(buffer);
    return new Blob([text], { type: "text/csv" });
  };

  return (
    <div className="converter-container">
      <h2 className="titulo">Conversor de Arquivos</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="busca-arquivo" />
      <select onChange={(e) => setFormat(e.target.value)} className="seleciona-arquivo">
        <option value="pdf">PDF</option>
        <option value="docx">DOCX (Word)</option>
        <option value="txt">TXT</option>
        <option value="csv">CSV</option>
      </select>
      <div className="conteiner-botoes">
        <button onClick={handleConvert} className="btn-converter">
          Converter
        </button>
        <button onClick={handleBack} className="btn-voltar">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default FileConverter;