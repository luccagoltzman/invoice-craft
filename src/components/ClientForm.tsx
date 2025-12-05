import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaHashtag, FaStickyNote, FaImage, FaFileInvoice, FaCalendarCheck, FaPalette, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface ClientFormProps {
  onSubmitData: (data: ClientFormData) => void;
  defaultValues?: ClientFormData;
}

export interface ClientFormData {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  documentType: 'invoice' | 'subscription' | 'service-order';
  companyLogo: string | null;
  notes: string;
  respectNoteColor: string;
}

const ClientForm = ({ onSubmitData, defaultValues }: ClientFormProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(defaultValues?.companyLogo || null);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ClientFormData>({
    defaultValues: defaultValues || {
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      documentType: 'invoice',
      companyLogo: null,
      notes: '',
      respectNoteColor: '#1a1a1a',
    }
  });

  const documentType = watch('documentType');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        setValue('companyLogo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setValue('companyLogo', null);
  };

  const onSubmit = (data: ClientFormData) => {
    console.log('🔵 ClientForm - onSubmit - respectNoteColor:', data.respectNoteColor);
    console.log('🔵 ClientForm - onSubmit - dados completos:', data);
    onSubmitData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Logo da Empresa */}
        <div>
          <label htmlFor="companyLogo" className="form-label flex items-center">
            <FaImage className="mr-2 text-neutral-500" size={14} />
            <span>Logo da Empresa</span>
            <span className="text-xs text-neutral-500 ml-2">(Opcional)</span>
          </label>
          {logoPreview ? (
            <div className="logo-preview-container">
              <img 
                src={logoPreview} 
                alt="Logo da empresa"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="logo-remove-btn"
                title="Remover logo"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="mt-2">
              <label
                htmlFor="companyLogo"
                className="logo-upload-label"
              >
                <FaImage className="text-neutral-500" size={16} />
                <span>Clique para adicionar logo</span>
              </label>
              <input
                id="companyLogo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
          )}
          <p className="mt-1 text-xs text-neutral-500">Formatos aceitos: JPG, PNG, GIF (máx. 2MB)</p>
        </div>

        {/* Tipo de Documento */}
        <div>
          <label htmlFor="documentType" className="form-label flex items-center">
            <FaFileInvoice className="mr-2 text-neutral-500" size={14} />
            <span>Tipo de Documento</span>
          </label>
          <select
            id="documentType"
            className="form-input"
            {...register('documentType', { required: 'Tipo de documento é obrigatório' })}
          >
            <option value="invoice">Fatura</option>
            <option value="subscription">Mensalidade</option>
            <option value="service-order">Ordem de Serviço</option>
          </select>
          {errors.documentType && (
            <p className="mt-1 text-sm text-danger" style={{ marginTop: '0.5rem' }}>{errors.documentType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="clientName" className="form-label flex items-center">
            <FaUserAlt className="mr-2 text-neutral-500" size={14} />
            <span>Nome do Cliente</span>
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="clientName"
              type="text"
              className="form-input"
              placeholder="Nome completo do cliente"
              style={{
                paddingRight: watch('clientName') && !errors.clientName ? '2.5rem' : '1rem',
                borderColor: errors.clientName ? '#ef4444' : watch('clientName') && !errors.clientName ? '#10b981' : undefined,
                transition: 'all 0.3s ease'
              }}
              {...register('clientName', { required: 'Nome do cliente é obrigatório' })}
            />
            {watch('clientName') && !errors.clientName && (
              <FaCheckCircle 
                style={{ 
                  color: '#10b981',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  pointerEvents: 'none'
                }} 
                size={16} 
              />
            )}
            {errors.clientName && (
              <FaExclamationCircle 
                style={{ 
                  color: '#ef4444',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  pointerEvents: 'none'
                }} 
                size={16} 
              />
            )}
          </div>
          {errors.clientName && (
            <p className="mt-1 text-sm text-danger" style={{ 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <FaExclamationCircle size={12} />
              {errors.clientName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="clientEmail" className="form-label flex items-center">
            <FaEnvelope className="mr-2 text-neutral-500" size={14} />
            <span>Email</span>
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="clientEmail"
              type="email"
              className="form-input"
              placeholder="email@exemplo.com"
              style={{
                paddingRight: watch('clientEmail') && !errors.clientEmail ? '2.5rem' : '1rem',
                borderColor: errors.clientEmail ? '#ef4444' : watch('clientEmail') && !errors.clientEmail ? '#10b981' : undefined,
                transition: 'all 0.3s ease'
              }}
              {...register('clientEmail', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                }
              })}
            />
            {watch('clientEmail') && !errors.clientEmail && (
              <FaCheckCircle 
                style={{ 
                  color: '#10b981',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  pointerEvents: 'none'
                }} 
                size={16} 
              />
            )}
            {errors.clientEmail && (
              <FaExclamationCircle 
                style={{ 
                  color: '#ef4444',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  position: 'absolute',
                  pointerEvents: 'none'
                }} 
                size={16} 
              />
            )}
          </div>
          {errors.clientEmail && (
            <p className="mt-1 text-sm text-danger" style={{ 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <FaExclamationCircle size={12} />
              {errors.clientEmail.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="clientAddress" className="form-label flex items-center">
            <FaMapMarkerAlt className="mr-2 text-neutral-500" size={14} />
            <span>Endereço</span>
          </label>
          <textarea
            id="clientAddress"
            rows={3}
            className="form-input"
            placeholder="Endereço completo"
            {...register('clientAddress', { required: 'Endereço é obrigatório' })}
          />
          {errors.clientAddress && (
            <p className="mt-1 text-sm text-danger" style={{ marginTop: '0.5rem' }}>{errors.clientAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="invoiceNumber" className="form-label flex items-center">
              <FaHashtag className="mr-2 text-neutral-500" size={14} />
              <span>Número do Documento</span>
            </label>
            <input
              id="invoiceNumber"
              type="text"
              className="form-input"
              placeholder={documentType === 'invoice' ? 'INV-2024-001' : documentType === 'subscription' ? 'MEN-2024-001' : 'OS-2024-001'}
              {...register('invoiceNumber', { required: 'Número do documento é obrigatório' })}
            />
            {errors.invoiceNumber && (
              <p className="mt-1 text-sm text-danger" style={{ marginTop: '0.5rem' }}>{errors.invoiceNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="invoiceDate" className="form-label flex items-center">
              <FaCalendarAlt className="mr-2 text-neutral-500" size={14} />
              <span>Data de Emissão</span>
            </label>
            <input
              id="invoiceDate"
              type="date"
              className="form-input"
              {...register('invoiceDate', { required: 'Data de emissão é obrigatória' })}
            />
            {errors.invoiceDate && (
              <p className="mt-1 text-sm text-danger" style={{ marginTop: '0.5rem' }}>{errors.invoiceDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="form-label flex items-center">
            <FaCalendarCheck className="mr-2 text-neutral-500" size={14} />
            <span>Data de Vencimento</span>
          </label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            {...register('dueDate')}
          />
          <p className="mt-1 text-xs text-neutral-500">Data limite para pagamento (opcional)</p>
        </div>

        <div>
          <label htmlFor="notes" className="form-label flex items-center">
            <FaStickyNote className="mr-2 text-neutral-500" size={14} />
            <span>Observações</span>
          </label>
          <textarea
            id="notes"
            rows={3}
            className="form-input"
            placeholder="Informações adicionais (opcional)"
            {...register('notes')}
          />
        </div>

        {/* Seletor de Cor */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          marginTop: '1.5rem'
        }}>
          <label htmlFor="respectNoteColor" className="form-label flex items-center" style={{ marginBottom: '1rem' }}>
            <FaPalette className="mr-2 text-neutral-500" size={14} />
            <span>Cor Personalizada</span>
            <span className="text-xs text-neutral-500 ml-2">(Opcional)</span>
          </label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label htmlFor="respectNoteColor" style={{ 
              fontSize: '0.875rem', 
              color: '#4b5563',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Selecione uma cor:</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                id="respectNoteColor"
                type="color"
                {...register('respectNoteColor')}
                onChange={(e) => {
                  const newColor = e.target.value;
                  console.log('🎨 ClientForm - Cor alterada (color picker):', newColor);
                  setValue('respectNoteColor', newColor, { shouldValidate: true });
                }}
                style={{
                  width: '50px',
                  height: '40px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  padding: '2px',
                  background: 'white',
                  position: 'relative',
                  zIndex: 10
                }}
              />
              <input
                type="text"
                value={watch('respectNoteColor') || '#1a1a1a'}
                onChange={(e) => {
                  const value = e.target.value;
                  console.log('🎨 ClientForm - Cor alterada (text input):', value);
                  setValue('respectNoteColor', value, { shouldValidate: true });
                }}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  position: 'relative',
                  zIndex: 10
                }}
                placeholder="#1a1a1a"
              />
            </div>
          </div>
          
          {/* Preview da cor */}
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            background: watch('respectNoteColor') || '#1a1a1a',
            color: '#ffffff',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'background-color 0.3s ease',
            minHeight: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span>Preview da cor selecionada: {watch('respectNoteColor') || '#1a1a1a'}</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Atualizar Informações
          </button>
        </div>
      </div>
    </form>
  );
};

export default ClientForm; 