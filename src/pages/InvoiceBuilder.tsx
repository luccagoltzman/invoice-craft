import { useState } from 'react';
import ClientForm, { ClientFormData } from '../components/ClientForm';
import ServicesForm, { ServiceItem } from '../components/ServicesForm';
import InvoicePreview from '../components/InvoicePreview';
import PDFButton from '../components/PDFButton';
import Layout from '../components/Layout';
import { FaUserEdit, FaList, FaEye, FaArrowDown } from 'react-icons/fa';

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
    <Layout>
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Gerador de Faturas</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Crie faturas profissionais em segundos. Preencha os dados, visualize em tempo real e baixe como PDF.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna de Formulários */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center mb-4">
                <FaUserEdit className="text-primary mr-2 h-6 w-6" />
                <h2 className="text-xl font-semibold">Dados do Cliente</h2>
              </div>
              
              <ClientForm 
                onSubmitData={handleClientDataSubmit} 
                defaultValues={clientData} 
              />
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <FaList className="text-primary mr-2 h-6 w-6" />
                <h2 className="text-xl font-semibold">Serviços Prestados</h2>
              </div>
              
              <ServicesForm 
                onSubmitData={handleServicesSubmit} 
                defaultValues={services} 
              />
            </div>
            
            <div className="flex justify-end mt-8 print-hidden">
              <PDFButton 
                clientData={clientData} 
                services={services} 
                isDataComplete={isDataComplete()} 
              />
            </div>
          </div>
          
          {/* Coluna de Visualização */}
          <div className="lg:sticky lg:top-6 self-start print-hidden">
            <div className="card">
              <div className="flex items-center mb-4">
                <FaEye className="text-primary mr-2 h-6 w-6" />
                <h2 className="text-xl font-semibold">Visualização</h2>
              </div>
              
              <p className="text-neutral-600 mb-4">
                Esta é a aparência da sua fatura. As alterações são refletidas em tempo real.
              </p>
              
              <div className="flex justify-center mb-6">
                <div className="p-2 rounded-full bg-neutral-100 text-neutral-500 animate-bounce">
                  <FaArrowDown />
                </div>
              </div>
              
              <InvoicePreview 
                clientData={clientData} 
                services={services} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceBuilder; 