import { useState } from 'react';
import Header from '../components/Header';
import ClientForm, { ClientFormData } from '../components/ClientForm';
import ServicesForm, { ServiceItem } from '../components/ServicesForm';
import InvoicePreview from '../components/InvoicePreview';
import PDFButton from '../components/PDFButton';

const InvoiceBuilder = () => {
  const [clientData, setClientData] = useState<ClientFormData>({
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [services, setServices] = useState<ServiceItem[]>([
    { description: '', quantity: 1, unitPrice: 0 }
  ]);

  const handleClientDataSubmit = (data: ClientFormData) => {
    setClientData(data);
  };

  const handleServicesSubmit = (data: ServiceItem[]) => {
    setServices(data);
  };

  const isDataComplete = () => {
    // Verifica se os dados do cliente estão preenchidos
    const isClientComplete = 
      clientData.clientName.trim() !== '' && 
      clientData.clientEmail.trim() !== '' && 
      clientData.clientAddress.trim() !== '' && 
      clientData.invoiceNumber.trim() !== '' && 
      clientData.invoiceDate.trim() !== '';
    
    // Verifica se pelo menos um serviço tem descrição e preço
    const isServicesComplete = services.some(
      service => service.description.trim() !== '' && service.quantity > 0 && service.unitPrice > 0
    );
    
    return isClientComplete && isServicesComplete;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna de Formulários */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerador de Faturas</h1>
            
            <p className="text-gray-600 mb-8">
              Preencha os dados abaixo para gerar uma fatura profissional. Todos os campos marcados são obrigatórios.
            </p>
            
            <ClientForm 
              onSubmitData={handleClientDataSubmit} 
              defaultValues={clientData} 
            />
            
            <ServicesForm 
              onSubmitData={handleServicesSubmit} 
              defaultValues={services} 
            />
            
            <div className="mt-8 flex justify-end">
              <PDFButton 
                clientData={clientData} 
                services={services} 
                isDataComplete={isDataComplete()} 
              />
            </div>
          </div>
          
          {/* Coluna de Visualização */}
          <div className="lg:sticky lg:top-6 self-start">
            <InvoicePreview 
              clientData={clientData} 
              services={services} 
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>InvoiceCraft - Um gerador de faturas simples para freelancers e pequenos negócios</p>
        </div>
      </footer>
    </div>
  );
};

export default InvoiceBuilder; 