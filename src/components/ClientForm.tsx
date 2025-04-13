import { useForm } from 'react-hook-form';

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
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Dados do Cliente</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Cliente
            </label>
            <input
              id="clientName"
              type="text"
              className="form-input"
              {...register('clientName', { required: 'Nome é obrigatório' })}
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="clientEmail"
              type="email"
              className="form-input"
              {...register('clientEmail', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                }
              })}
            />
            {errors.clientEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <textarea
              id="clientAddress"
              rows={3}
              className="form-input"
              {...register('clientAddress', { required: 'Endereço é obrigatório' })}
            />
            {errors.clientAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.clientAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Número da Fatura
              </label>
              <input
                id="invoiceNumber"
                type="text"
                className="form-input"
                {...register('invoiceNumber', { required: 'Número da fatura é obrigatório' })}
              />
              {errors.invoiceNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.invoiceNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 mb-1">
                Data da Fatura
              </label>
              <input
                id="invoiceDate"
                type="date"
                className="form-input"
                {...register('invoiceDate', { required: 'Data é obrigatória' })}
              />
              {errors.invoiceDate && (
                <p className="mt-1 text-sm text-red-600">{errors.invoiceDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              id="notes"
              rows={3}
              className="form-input"
              {...register('notes')}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientForm; 