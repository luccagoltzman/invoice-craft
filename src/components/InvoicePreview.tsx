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
    <div className="card print:shadow-none">
      <h2 className="text-xl font-semibold mb-6 print:hidden">Pré-visualização da Fatura</h2>

      <div className="invoice-preview p-6 border border-gray-200 rounded-lg bg-white">
        {/* Cabeçalho */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">FATURA</h2>
            <p className="text-gray-600">#{clientData.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Data de Emissão:</p>
            <p>{formatDate(clientData.invoiceDate)}</p>
          </div>
        </div>

        {/* Informações do Cliente */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Cliente</h3>
          <div className="pl-2 border-l-4 border-blue-500">
            <p className="font-bold">{clientData.clientName}</p>
            <p>{clientData.clientEmail}</p>
            <p className="whitespace-pre-line">{clientData.clientAddress}</p>
          </div>
        </div>

        {/* Tabela de Serviços */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Serviços</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border border-gray-300">Descrição</th>
                <th className="text-center p-2 border border-gray-300 w-20">Qtd</th>
                <th className="text-right p-2 border border-gray-300 w-32">Valor Unit.</th>
                <th className="text-right p-2 border border-gray-300 w-32">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 border border-gray-300">{service.description}</td>
                  <td className="text-center p-2 border border-gray-300">{service.quantity}</td>
                  <td className="text-right p-2 border border-gray-300">{formatCurrency(service.unitPrice)}</td>
                  <td className="text-right p-2 border border-gray-300">{formatCurrency(calculateSubtotal(service))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right p-2 border border-gray-300 font-bold">Total:</td>
                <td className="text-right p-2 border border-gray-300 font-bold bg-blue-50">{formatCurrency(calculateTotal())}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Observações */}
        {clientData.notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Observações</h3>
            <div className="p-4 bg-gray-50 border rounded whitespace-pre-line">
              {clientData.notes}
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="text-center text-sm text-gray-500 mt-12 pt-4 border-t">
          <p>Gerado por InvoiceCraft</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview; 