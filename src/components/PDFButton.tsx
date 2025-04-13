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
      className={`btn flex items-center justify-center space-x-2 w-full md:w-auto ${
        isDataComplete && !isGenerating
          ? 'btn-primary'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      {isGenerating ? (
        <>
          <FaSpinner className="w-4 h-4 animate-spin" />
          <span>Gerando PDF...</span>
        </>
      ) : (
        <>
          <FaFilePdf className="w-4 h-4" />
          <span>Baixar PDF</span>
        </>
      )}
    </button>
  );
};

export default PDFButton; 