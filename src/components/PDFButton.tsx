import { FaFilePdf, FaSpinner } from 'react-icons/fa';
import { ClientFormData } from './ClientForm';
import { ServiceItem } from './ServicesForm';
import generatePDF from '../utils/pdfGenerator';
import { useState } from 'react';

interface PDFButtonProps {
  clientData: ClientFormData;
  services: ServiceItem[];
  isDataComplete: boolean;
}

const PDFButton = ({ clientData, services, isDataComplete }: PDFButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGeneratePDF = () => {
    if (!isDataComplete) return;
    
    setIsGenerating(true);
    
    // Pequeno delay para mostrar o spinner e permitir que a UI atualize
    setTimeout(() => {
      try {
        generatePDF(clientData, services);
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };
  
  return (
    <button
      onClick={handleGeneratePDF}
      disabled={!isDataComplete || isGenerating}
      className={`btn btn-lg btn-accent btn-icon ${
        isDataComplete && !isGenerating
          ? 'shadow'
          : 'disabled cursor-not-allowed'
      }`}
      title={!isDataComplete ? "Preencha todos os campos obrigatórios" : "Baixar PDF da fatura"}
    >
      {isGenerating ? (
        <>
          <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
          <span>Gerando PDF...</span>
        </>
      ) : (
        <>
          <FaFilePdf className="w-4 h-4 mr-2" />
          <span>Baixar PDF</span>
        </>
      )}
    </button>
  );
};

export default PDFButton; 