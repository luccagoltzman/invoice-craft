import { useState, useEffect } from 'react';
import ClientForm, { ClientFormData } from '../components/ClientForm';
import ServicesForm, { ServiceItem } from '../components/ServicesForm';
import InvoicePreview from '../components/InvoicePreview';
import PDFButton from '../components/PDFButton';
import Layout from '../components/Layout';
import { FaUserEdit, FaList, FaEye, FaArrowDown, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
  
  const [activeTab, setActiveTab] = useState<'client' | 'services'>('client');
  
  // Dicas rotativas
  const [currentTip, setCurrentTip] = useState<number>(0);
  const tips = [
    "Descreva cada serviço com detalhes para maior clareza",
    "Lembre-se de incluir o endereço completo do cliente",
    "Número da fatura único facilita o controle financeiro",
    "Adicione informações de pagamento nas observações"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [tips.length]);

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
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Gerador de Faturas</h1>
          <p className="page-description">
            Crie faturas profissionais em segundos. Preencha os dados, visualize em tempo real e baixe como PDF.
          </p>
        </header>
        
        <motion.div 
          className="tip-box"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FaLightbulb className="tip-icon" />
          <p className="tip-text">
            <span className="tip-label">Dica:</span> {tips[currentTip]}
          </p>
        </motion.div>
        
        {/* Tabs de navegação mobile */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => setActiveTab('client')}
          >
            <FaUserEdit className="tab-icon" /> Dados do Cliente
          </button>
          <button
            className={`tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FaList className="tab-icon" /> Serviços
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna de Formulários */}
          <div className="form-column">
            {/* Formulário do cliente */}
            <motion.div 
              className={`card ${activeTab === 'client' ? 'block' : 'hidden-mobile'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="card-header">
                <div className="card-icon">
                  <FaUserEdit />
                </div>
                <h2 className="card-title">Dados do Cliente</h2>
              </div>
              
              <ClientForm 
                onSubmitData={handleClientDataSubmit} 
                defaultValues={clientData} 
              />
            </motion.div>
            
            {/* Formulário de serviços */}
            <motion.div 
              className={`card ${activeTab === 'services' ? 'block' : 'hidden-mobile'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="card-header">
                <div className="card-icon">
                  <FaList />
                </div>
                <h2 className="card-title">Serviços Prestados</h2>
              </div>
              
              <ServicesForm 
                onSubmitData={handleServicesSubmit} 
                defaultValues={services} 
              />
            </motion.div>
            
            <motion.div 
              className="pdf-button-container print-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <PDFButton 
                clientData={clientData} 
                services={services} 
                isDataComplete={isDataComplete()} 
              />
            </motion.div>
          </div>
          
          {/* Coluna de Visualização */}
          <motion.div 
            className="preview-column"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card preview-card">
              <div className="card-header">
                <div className="card-icon">
                  <FaEye />
                </div>
                <h2 className="card-title">Visualização</h2>
              </div>
              
              <p className="preview-description">
                Esta é a aparência da sua fatura. As alterações são refletidas em tempo real.
              </p>
              
              <motion.div 
                className="preview-arrow-container"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="preview-arrow">
                  <FaArrowDown />
                </div>
              </motion.div>
              
              <motion.div 
                className="preview-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <InvoicePreview 
                  clientData={clientData} 
                  services={services} 
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceBuilder; 