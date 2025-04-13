import { useForm } from 'react-hook-form';
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaHashtag, FaStickyNote } from 'react-icons/fa';

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
  notes: string;
}

const ClientForm = ({ onSubmitData, defaultValues }: ClientFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    defaultValues: defaultValues || {
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      notes: '',
    }
  });

  const onSubmit = (data: ClientFormData) => {
    onSubmitData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label htmlFor="clientName" className="form-label flex items-center">
            <FaUserAlt className="mr-2 text-neutral-500" size={14} />
            <span>Nome do Cliente</span>
          </label>
          <input
            id="clientName"
            type="text"
            className="form-input"
            placeholder="Nome completo"
            {...register('clientName', { required: 'Nome é obrigatório' })}
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-danger">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="clientEmail" className="form-label flex items-center">
            <FaEnvelope className="mr-2 text-neutral-500" size={14} />
            <span>Email</span>
          </label>
          <input
            id="clientEmail"
            type="email"
            className="form-input"
            placeholder="email@exemplo.com"
            {...register('clientEmail', { 
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              }
            })}
          />
          {errors.clientEmail && (
            <p className="mt-1 text-sm text-danger">{errors.clientEmail.message}</p>
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
            <p className="mt-1 text-sm text-danger">{errors.clientAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="invoiceNumber" className="form-label flex items-center">
              <FaHashtag className="mr-2 text-neutral-500" size={14} />
              <span>Número da Fatura</span>
            </label>
            <input
              id="invoiceNumber"
              type="text"
              className="form-input"
              {...register('invoiceNumber', { required: 'Número da fatura é obrigatório' })}
            />
            {errors.invoiceNumber && (
              <p className="mt-1 text-sm text-danger">{errors.invoiceNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="invoiceDate" className="form-label flex items-center">
              <FaCalendarAlt className="mr-2 text-neutral-500" size={14} />
              <span>Data da Fatura</span>
            </label>
            <input
              id="invoiceDate"
              type="date"
              className="form-input"
              {...register('invoiceDate', { required: 'Data é obrigatória' })}
            />
            {errors.invoiceDate && (
              <p className="mt-1 text-sm text-danger">{errors.invoiceDate.message}</p>
            )}
          </div>
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