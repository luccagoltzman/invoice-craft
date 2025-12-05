import jsPDF from 'jspdf';
import { ClientFormData } from '../components/ClientForm';
import { ServiceItem } from '../components/ServicesForm';

const generatePDF = async (clientData: ClientFormData, services: ServiceItem[]): Promise<void> => {
  console.log('🔴 PDF Generator - clientData recebido:', clientData);
  console.log('🔴 PDF Generator - respectNoteColor:', clientData.respectNoteColor);
  console.log('🔴 PDF Generator - tipo de respectNoteColor:', typeof clientData.respectNoteColor);
  
  const doc = new jsPDF();
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  
  // Paleta de cores profissional
  const darkBg: [number, number, number] = [26, 26, 26];
  const textPrimary = [17, 24, 39];
  const textSecondary = [75, 85, 99];
  const textLight = [156, 163, 175];
  const borderColor = [229, 231, 235];
  const bgLight = [249, 250, 251];
  
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

  const getDocumentTypeLabel = (): string => {
    switch (clientData.documentType) {
      case 'invoice':
        return 'FATURA';
      case 'subscription':
        return 'MENSALIDADE';
      case 'service-order':
        return 'ORDEM DE SERVIÇO';
      default:
        return 'FATURA';
    }
  };
  
  const calculateSubtotal = (item: ServiceItem): number => {
    return item.quantity * item.unitPrice;
  };
  
  const calculateTotal = (): number => {
    return services.reduce((total, item) => total + calculateSubtotal(item), 0);
  };
  
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: "left" | "center" | "right" = "left"
  ): number => {
    if (!text) return y;
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y, { align });
    return y + (lineHeight * lines.length);
  };

  let yPos = 0;
  
  // ========== HEADER COM COR PERSONALIZADA (COMPACTO) ==========
  const headerHeight = 55;
  
  // Converter cor hex para RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ];
    }
    return darkBg;
  };
  
  // Usar cor personalizada se disponível, senão usar cor padrão
  const headerColor = clientData.respectNoteColor && clientData.respectNoteColor.trim() !== '' && clientData.respectNoteColor !== '#1a1a1a'
    ? hexToRgb(clientData.respectNoteColor)
    : darkBg;
  
  console.log('🔴 PDF Generator - headerColor aplicado:', headerColor);
  console.log('🔴 PDF Generator - respectNoteColor original:', clientData.respectNoteColor);
  
  doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');
  
  // Logo - converter via canvas com alta qualidade e proporção correta
  if (clientData.companyLogo && clientData.companyLogo.trim() !== '') {
    try {
      const logoY = 12;
      const logoX = margin;
      const maxLogoWidth = 80; // Reduzido para não sobrepor
      const maxLogoHeight = 30;
      
      const logoData = clientData.companyLogo.trim();
      
      // Aguardar carregamento e converter via canvas
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          try {
            // Calcular proporção para manter aspecto original
            const imgAspectRatio = img.width / img.height;
            let logoWidth = maxLogoWidth;
            let logoHeight = maxLogoHeight;
            
            // Ajustar para manter proporção
            if (imgAspectRatio > (maxLogoWidth / maxLogoHeight)) {
              // Imagem é mais larga - usar largura máxima
              logoHeight = maxLogoWidth / imgAspectRatio;
            } else {
              // Imagem é mais alta - usar altura máxima
              logoWidth = maxLogoHeight * imgAspectRatio;
            }
            
            // Criar canvas com alta qualidade (2x para melhor resolução)
            const scale = 2; // Aumentar resolução para melhor qualidade
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              // Configurar alta qualidade de renderização
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              
              // Desenhar imagem no canvas com alta qualidade
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              // Converter canvas para PNG com alta qualidade
              const canvasDataUrl = canvas.toDataURL('image/png', 1.0);
              
              // Extrair apenas o base64 (sem o prefixo data:image/png;base64,)
              const base64Data = canvasDataUrl.split(',')[1];
              
              if (base64Data && base64Data.length > 10) {
                // Adicionar imagem ao PDF com tamanho calculado
                doc.addImage(base64Data, 'PNG', logoX, logoY, logoWidth, logoHeight, undefined, 'FAST');
              }
            }
          } catch (error) {
            console.warn('Erro ao converter logo via canvas:', error);
            // Tentar método alternativo: usar data URL completo
            try {
              const imgAspectRatio = img.width / img.height;
              let logoWidth = maxLogoWidth;
              let logoHeight = maxLogoHeight;
              
              if (imgAspectRatio > (maxLogoWidth / maxLogoHeight)) {
                logoHeight = maxLogoWidth / imgAspectRatio;
              } else {
                logoWidth = maxLogoHeight * imgAspectRatio;
              }
              
              const base64Data = logoData.split(',')[1];
              if (base64Data) {
                let imageType = 'PNG';
                if (logoData.includes('data:image/jpeg') || logoData.includes('data:image/jpg')) {
                  imageType = 'JPEG';
                } else if (logoData.includes('data:image/png')) {
                  imageType = 'PNG';
                }
                doc.addImage(base64Data, imageType, logoX, logoY, logoWidth, logoHeight, undefined, 'FAST');
              }
            } catch (fallbackError) {
              console.warn('Erro no método alternativo:', fallbackError);
            }
          }
          resolve();
        };
        
        img.onerror = () => {
          console.warn('Erro ao carregar logo para conversão');
          resolve();
        };
        
        img.src = logoData;
      });
    } catch (error) {
      console.warn('Erro ao processar logo:', error);
      // Continuar sem logo
    }
  }
  
  // Tipo de documento e número - posicionar à direita do header
  const documentInfoRightX = pageWidth - margin;
  
  // Tipo de documento (à direita)
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text(getDocumentTypeLabel(), documentInfoRightX, headerHeight - 25, { align: 'right' });
  
  // Número do documento (à direita)
  doc.setFontSize(22);
  doc.setFont("helvetica", "normal");
  doc.text(clientData.invoiceNumber, documentInfoRightX, headerHeight - 12, { align: 'right' });
  
  // Datas (lado direito)
  const dateX = pageWidth - margin;
  doc.setFontSize(6);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 200);
  doc.text('Emissão', dateX, headerHeight - 25, { align: 'right' });
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(formatDate(clientData.invoiceDate), dateX, headerHeight - 18, { align: 'right' });
  
  if (clientData.dueDate) {
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 200, 200);
    doc.text('Vencimento', dateX, headerHeight - 6, { align: 'right' });
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(formatDate(clientData.dueDate), dateX, headerHeight, { align: 'right' });
  }
  
  yPos = headerHeight + 18;
  
  // ========== INFORMAÇÕES DO CLIENTE ==========
  doc.setFontSize(7);
  doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
  doc.setFont("helvetica", "bold");
  doc.text('CLIENTE', margin, yPos);
  yPos += 7;
  
  // Box do cliente
  const clientBoxY = yPos;
  const clientBoxHeight = 35;
  
  // Borda esquerda decorativa
  doc.setFillColor(textPrimary[0], textPrimary[1], textPrimary[2]);
  doc.rect(margin, clientBoxY, 2, clientBoxHeight, 'F');
  
  // Fundo do box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.5);
  doc.rect(margin + 2, clientBoxY, contentWidth - 2, clientBoxHeight, 'FD');
  
  // Conteúdo do cliente
  doc.setFontSize(10);
  doc.setTextColor(textPrimary[0], textPrimary[1], textPrimary[2]);
  doc.setFont("helvetica", "bold");
  yPos = addWrappedText(clientData.clientName, margin + 6, clientBoxY + 6, contentWidth - 12, 6);
  
  doc.setFontSize(8);
  doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
  doc.setFont("helvetica", "normal");
  yPos = addWrappedText(clientData.clientEmail, margin + 6, yPos, contentWidth - 12, 5);
  yPos = addWrappedText(clientData.clientAddress, margin + 6, yPos, contentWidth - 12, 5);
  
  yPos = clientBoxY + clientBoxHeight + 15;
  
  // ========== TABELA DE SERVIÇOS ==========
  doc.setFontSize(7);
  doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
  doc.setFont("helvetica", "bold");
  doc.text('ITENS', margin, yPos);
  yPos += 8;
  
  // Cabeçalho da tabela
  const colWidths = [
    contentWidth * 0.50,  // Descrição
    contentWidth * 0.12,  // Quantidade
    contentWidth * 0.19,  // Valor Unitário
    contentWidth * 0.19,  // Total
  ];
  
  const colPos = [
    margin,
    margin + colWidths[0],
    margin + colWidths[0] + colWidths[1],
    margin + colWidths[0] + colWidths[1] + colWidths[2],
  ];
  
  // Cabeçalho da tabela
  const headerRowHeight = 9;
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.roundedRect(margin, yPos, contentWidth, headerRowHeight, 1, 1, 'F');
  
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  const headerY = yPos + 7;
  doc.text('DESCRIÇÃO', colPos[0] + 3, headerY);
  doc.text('QTD', colPos[1] + colWidths[1] / 2, headerY, { align: 'center' });
  doc.text('UNITÁRIO', colPos[2] + colWidths[2] - 3, headerY, { align: 'right' });
  doc.text('TOTAL', colPos[3] + colWidths[3] - 3, headerY, { align: 'right' });
  
  yPos += headerRowHeight;
  
  // Linhas da tabela
  let rowHeight = 10;
  
  services.forEach((service, index) => {
    // Fundo alternado
    if (index % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    }
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.3);
    doc.rect(margin, yPos, contentWidth, rowHeight, 'FD');
    
    // Conteúdo
    doc.setFontSize(9);
    doc.setTextColor(textPrimary[0], textPrimary[1], textPrimary[2]);
    doc.setFont("helvetica", "normal");
    
    const descLines = doc.splitTextToSize(service.description, colWidths[0] - 8);
    const firstLineY = yPos + 7;
    doc.text(descLines, colPos[0] + 3, firstLineY);
    
    doc.text(String(service.quantity), colPos[1] + colWidths[1] / 2, firstLineY, { align: 'center' });
    
    doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
    doc.text(formatCurrency(service.unitPrice), colPos[2] + colWidths[2] - 3, firstLineY, { align: 'right' });
    
    doc.setTextColor(textPrimary[0], textPrimary[1], textPrimary[2]);
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(calculateSubtotal(service)), colPos[3] + colWidths[3] - 3, firstLineY, { align: 'right' });
    
    yPos += Math.max(rowHeight, descLines.length * 5.5);
  });
  
  // Linha antes do total
  yPos += 5;
  doc.setDrawColor(textPrimary[0], textPrimary[1], textPrimary[2]);
  doc.setLineWidth(1);
  doc.line(colPos[2], yPos, pageWidth - margin, yPos);
  yPos += 7;
  
  // ========== TOTAL ==========
  doc.setFontSize(7);
  doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
  doc.setFont("helvetica", "bold");
  doc.text('TOTAL', colPos[2] + 3, yPos);
  
  doc.setFontSize(16);
  doc.setTextColor(textPrimary[0], textPrimary[1], textPrimary[2]);
  doc.setFont("helvetica", "normal");
  doc.text(formatCurrency(calculateTotal()), pageWidth - margin, yPos, { align: 'right' });
  
  yPos += 15;
  
  // ========== OBSERVAÇÕES (COMPACTO) ==========
  if (clientData.notes) {
    // Verificar se cabe na página
    const notesSpace = 25;
    if (yPos + notesSpace > pageHeight - 20) {
      // Reduzir ainda mais o espaço anterior se necessário
      yPos -= 5;
    }
    
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    doc.setFontSize(7);
    doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
    doc.setFont("helvetica", "bold");
    doc.text('OBSERVAÇÕES', margin, yPos);
    yPos += 6;
    
    // Box de observações
    const notesBoxHeight = 22;
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, yPos, contentWidth, notesBoxHeight, 1, 1, 'FD');
    
    doc.setFontSize(8);
    doc.setTextColor(textSecondary[0], textSecondary[1], textSecondary[2]);
    doc.setFont("helvetica", "normal");
    addWrappedText(clientData.notes, margin + 5, yPos + 6, contentWidth - 10, 5);
    yPos += notesBoxHeight;
  }
  
  // ========== FOOTER (COMPACTO) ==========
  const footerY = pageHeight - 10;
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.5);
  doc.line(0, footerY - 8, pageWidth, footerY - 8);
  doc.rect(0, footerY - 8, pageWidth, 8, 'F');
  
  doc.setFontSize(7);
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFont("helvetica", "normal");
  doc.text('Gerado por InvoiceCraft', pageWidth / 2, footerY - 2, { align: 'center' });
  
  // Salvar
  const documentTypePrefix = clientData.documentType === 'invoice' ? 'Fatura' : 
                            clientData.documentType === 'subscription' ? 'Mensalidade' : 
                            'OrdemServico';
  doc.save(`${documentTypePrefix}_${clientData.invoiceNumber}.pdf`);
};

export default generatePDF;
