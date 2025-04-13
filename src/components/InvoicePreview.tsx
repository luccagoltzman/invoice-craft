import { ClientFormData } from './ClientForm';
import { ServiceItem } from './ServicesForm';

interface InvoicePreviewProps {
  clientData: ClientFormData;
  services: ServiceItem[];
}

const InvoicePreview = ({ clientData, services }: InvoicePreviewProps) => {
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

  return (
    <div className="card invoice-preview print:shadow-none">
      <h2 className="text-xl font-semibold mb-6 print-hidden">Pré-visualização da Fatura</h2>

      <div className="p-4 border rounded-lg">
        {/* Cabeçalho */}
        <div className="invoice-header">
          <div>
            <h2 className="invoice-title">FATURA</h2>
            <p className="invoice-number">#{clientData.invoiceNumber}</p>
          </div>
          <div className="invoice-meta">
            <p className="invoice-meta-label">Data de Emissão</p>
            <p className="invoice-meta-value">{formatDate(clientData.invoiceDate)}</p>
          </div>
        </div>

        {/* Informações do Cliente */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-neutral-800">Cliente</h3>
          <div className="invoice-section invoice-section-client p-4">
            <p className="font-bold">{clientData.clientName}</p>
            <p>{clientData.clientEmail}</p>
            <p className="whitespace-pre-line">{clientData.clientAddress}</p>
          </div>
        </div>

        {/* Tabela de Serviços */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-neutral-800">Serviços</h3>
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Descrição</th>
                  <th className="text-center">Qtd</th>
                  <th className="text-right">Valor Unit.</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td className="font-medium">{service.description}</td>
                    <td className="text-center">{service.quantity}</td>
                    <td className="text-right">{formatCurrency(service.unitPrice)}</td>
                    <td className="text-right font-medium">{formatCurrency(calculateSubtotal(service))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-right p-4 font-bold">Total:</td>
                  <td className="text-right p-4 font-bold bg-primary-light bg-opacity-10">{formatCurrency(calculateTotal())}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Observações */}
        {clientData.notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-neutral-800">Observações</h3>
            <div className="p-4 bg-neutral-50 border rounded whitespace-pre-line">
              {clientData.notes}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="text-center text-sm text-neutral-500 mt-12 pt-4 border-t">
          <p>Gerado por InvoiceCraft • Um gerador de faturas simples e elegante</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview; 