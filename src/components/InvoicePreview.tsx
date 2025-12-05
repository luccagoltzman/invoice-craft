import { ClientFormData } from './ClientForm';
import { ServiceItem } from './ServicesForm';

interface InvoicePreviewProps {
  clientData: ClientFormData;
  services: ServiceItem[];
}

const InvoicePreview = ({ clientData, services }: InvoicePreviewProps) => {
  console.log('🟢 InvoicePreview - clientData recebido:', clientData);
  console.log('🟢 InvoicePreview - respectNoteColor:', clientData.respectNoteColor);
  
  const calculateSubtotal = (item: ServiceItem) => {
    return item.quantity * item.unitPrice;
  };

  const calculateTotal = () => {
    return services.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getDocumentTypeLabel = () => {
    switch (clientData.documentType) {
      case 'invoice':
        return 'Fatura';
      case 'subscription':
        return 'Mensalidade';
      case 'service-order':
        return 'Ordem de Serviço';
      default:
        return 'Fatura';
    }
  };

  return (
    <div style={{ 
      background: '#ffffff',
      padding: '0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#1a1a1a',
      maxWidth: '210mm',
      margin: '0 auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header com logo e informações principais */}
      <div style={{
        background: clientData.respectNoteColor 
          ? `linear-gradient(135deg, ${clientData.respectNoteColor} 0%, ${clientData.respectNoteColor}dd 100%)`
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: '#ffffff',
        padding: '3rem 2.5rem',
        position: 'relative'
      }}>
        {clientData.companyLogo && (
          <div style={{ marginBottom: '2rem' }}>
            <img 
              src={clientData.companyLogo} 
              alt="Logo" 
              style={{ 
                maxHeight: '50px', 
                maxWidth: '180px', 
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)'
              }}
            />
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ 
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.8,
              marginBottom: '0.5rem'
            }}>
              {getDocumentTypeLabel()}
            </div>
            <div style={{ 
              fontSize: '2.5rem',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              marginBottom: '0.25rem'
            }}>
              {clientData.invoiceNumber}
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                fontSize: '0.75rem',
                opacity: 0.7,
                marginBottom: '0.25rem'
              }}>
                Emissão
              </div>
              <div style={{ 
                fontSize: '1rem',
                fontWeight: 500
              }}>
                {formatDate(clientData.invoiceDate)}
              </div>
            </div>
            {clientData.dueDate && (
              <div>
                <div style={{ 
                  fontSize: '0.75rem',
                  opacity: 0.7,
                  marginBottom: '0.25rem'
                }}>
                  Vencimento
                </div>
                <div style={{ 
                  fontSize: '1rem',
                  fontWeight: 500
                }}>
                  {formatDate(clientData.dueDate)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div style={{ padding: '2.5rem' }}>
        {/* Informações do Cliente */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6b7280',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            Cliente
          </div>
          <div style={{
            borderLeft: '3px solid #1a1a1a',
            paddingLeft: '1.25rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
          }}>
            <div style={{ 
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#1a1a1a'
            }}>
              {clientData.clientName}
            </div>
            <div style={{ 
              fontSize: '0.9375rem',
              color: '#6b7280',
              marginBottom: '0.25rem'
            }}>
              {clientData.clientEmail}
            </div>
            <div style={{ 
              fontSize: '0.9375rem',
              color: '#6b7280',
              whiteSpace: 'pre-line',
              lineHeight: '1.6'
            }}>
              {clientData.clientAddress}
            </div>
          </div>
        </div>

        {/* Tabela de Serviços */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6b7280',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            Itens
          </div>
          
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0
          }}>
            <thead>
              <tr style={{
                borderBottom: '2px solid #e5e7eb'
              }}>
                <th style={{
                  textAlign: 'left',
                  padding: '0.875rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#6b7280',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Descrição
                </th>
                <th style={{
                  textAlign: 'center',
                  padding: '0.875rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#6b7280',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  width: '10%'
                }}>
                  Qtd
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.875rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#6b7280',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  width: '20%'
                }}>
                  Unitário
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '0.875rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#6b7280',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  width: '20%'
                }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr 
                  key={index}
                  style={{
                    borderBottom: index < services.length - 1 ? '1px solid #f3f4f6' : 'none'
                  }}
                >
                  <td style={{
                    padding: '1rem 0',
                    fontSize: '0.9375rem',
                    color: '#1a1a1a'
                  }}>
                    {service.description}
                  </td>
                  <td style={{
                    padding: '1rem 0',
                    fontSize: '0.9375rem',
                    color: '#1a1a1a',
                    textAlign: 'center'
                  }}>
                    {service.quantity}
                  </td>
                  <td style={{
                    padding: '1rem 0',
                    fontSize: '0.9375rem',
                    color: '#6b7280',
                    textAlign: 'right'
                  }}>
                    {formatCurrency(service.unitPrice)}
                  </td>
                  <td style={{
                    padding: '1rem 0',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    textAlign: 'right'
                  }}>
                    {formatCurrency(calculateSubtotal(service))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '300px',
            borderTop: '2px solid #1a1a1a',
            paddingTop: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>
                Total
              </span>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#1a1a1a',
                letterSpacing: '-0.02em'
              }}>
                {formatCurrency(calculateTotal())}
              </span>
            </div>
          </div>
        </div>

        {/* Observações */}
        {clientData.notes && (
          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6b7280',
              marginBottom: '0.75rem',
              fontWeight: 600
            }}>
              Observações
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: '#4b5563',
              lineHeight: '1.7',
              whiteSpace: 'pre-line'
            }}>
              {clientData.notes}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        background: '#f9fafb',
        padding: '1.5rem 2.5rem',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '0.75rem',
          color: '#9ca3af'
        }}>
          Gerado por InvoiceCraft
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
