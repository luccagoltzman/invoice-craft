import jsPDF from 'jspdf';
import { ClientFormData } from '../components/ClientForm';
import { ServiceItem } from '../components/ServicesForm';

const generatePDF = (clientData: ClientFormData, services: ServiceItem[]): void => {
  const doc = new jsPDF();
  
  // Configurações gerais
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Cores e estilos
  const primaryColor = [0, 83, 166]; // RGB azul
  const grayColor = [100, 100, 100]; // RGB cinza
  const lightGray = [240, 240, 240]; // RGB cinza claro
  
  // Funções de formatação
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const calculateSubtotal = (item: ServiceItem): number => {
    return item.quantity * item.unitPrice;
  };
  
  const calculateTotal = (): number => {
    return services.reduce((total, item) => total + calculateSubtotal(item), 0);
  };
  
  // Função para adicionar texto com quebra de linha
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: "left" | "center" | "right" | "justify" = "left"
  ): number => {
    if (!text) return y;
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y, { align });
    return y + lineHeight * lines.length;
  };
  
  // Cabeçalho da fatura
  let yPos = 20;
  
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('FATURA', margin, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.text(`#${clientData.invoiceNumber}`, margin, yPos);
  
  doc.setFontSize(10);
  doc.text(`Data de Emissão: ${formatDate(clientData.invoiceDate)}`, pageWidth - margin, yPos, { align: 'right' });
  yPos += 10;
  
  // Linha separadora
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  // Informações do cliente
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Cliente', margin, yPos);
  yPos += 6;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  yPos = addWrappedText(clientData.clientName, margin, yPos, contentWidth, 5);
  yPos = addWrappedText(clientData.clientEmail, margin, yPos, contentWidth, 5);
  yPos = addWrappedText(clientData.clientAddress, margin, yPos, contentWidth, 5);
  yPos += 10;
  
  // Tabela de serviços
  doc.setFontSize(12);
  doc.text('Serviços', margin, yPos);
  yPos += 8;
  
  // Cabeçalho da tabela
  const colWidths = [
    contentWidth * 0.5,  // Descrição
    contentWidth * 0.1,  // Quantidade
    contentWidth * 0.2,  // Valor Unitário
    contentWidth * 0.2,  // Subtotal
  ];
  
  const colPos = [
    margin,
    margin + colWidths[0],
    margin + colWidths[0] + colWidths[1],
    margin + colWidths[0] + colWidths[1] + colWidths[2],
  ];
  
  // Cabeçalho da tabela
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(margin, yPos, contentWidth, 7, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text('Descrição', colPos[0] + 2, yPos + 5);
  doc.text('Qtd', colPos[1] + 2, yPos + 5);
  doc.text('Valor Unit.', colPos[2] + 2, yPos + 5);
  doc.text('Subtotal', colPos[3] + 2, yPos + 5, { align: 'left' });
  
  // Linhas da tabela
  yPos += 7; // altura do cabeçalho
  let rowHeight = 7;
  
  // Desenha as linhas
  services.forEach((service, index) => {
    if (yPos > 250) {
      // Nova página
      doc.addPage();
      yPos = 20;
    }
    
    // Fundo zebrado
    if (index % 2 === 1) {
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, yPos, contentWidth, rowHeight, 'F');
    }
    
    // Conteúdo
    doc.text(service.description, colPos[0] + 2, yPos + 5);
    doc.text(String(service.quantity), colPos[1] + 2, yPos + 5);
    doc.text(formatCurrency(service.unitPrice), colPos[2] + 2, yPos + 5);
    doc.text(formatCurrency(calculateSubtotal(service)), colPos[3] + 2, yPos + 5, { align: 'left' });
    
    // Linha separadora
    doc.setDrawColor(210, 210, 210);
    doc.line(margin, yPos + rowHeight, margin + contentWidth, yPos + rowHeight);
    
    yPos += rowHeight;
  });
  
  // Total
  doc.setFillColor(230, 240, 255);
  doc.rect(colPos[2], yPos, colWidths[2] + colWidths[3], rowHeight, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", 'bold');
  doc.text('Total:', colPos[2] + 2, yPos + 5);
  doc.text(formatCurrency(calculateTotal()), colPos[3] + 2, yPos + 5, { align: 'left' });
  doc.setFont("helvetica", 'normal');
  
  yPos += rowHeight + 10;
  
  // Observações
  if (clientData.notes) {
    yPos = Math.min(yPos, 200); // Limitar a posição para a visualização não ficar muito abaixo
    
    doc.setFontSize(12);
    doc.text('Observações', margin, yPos);
    yPos += 6;
    
    doc.setFontSize(9);
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(margin, yPos, contentWidth, 20, 'F');
    yPos = addWrappedText(clientData.notes, margin + 2, yPos + 5, contentWidth - 4, 5);
    yPos += 10;
  }
  
  // Rodapé
  const footerYPos = 270;
  doc.setFontSize(9);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.text('Gerado por InvoiceCraft', pageWidth / 2, footerYPos, { align: 'center' });
  
  // Salvar o PDF
  doc.save(`Fatura_${clientData.invoiceNumber}.pdf`);
};

export default generatePDF; 