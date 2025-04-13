import { useFieldArray, useForm } from 'react-hook-form';
import { FaPlus, FaTrash, FaBox, FaHashtag, FaDollarSign } from 'react-icons/fa';

export interface ServiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface ServicesFormProps {
  onSubmitData: (data: ServiceItem[]) => void;
  defaultValues?: ServiceItem[];
}

const ServicesForm = ({ onSubmitData, defaultValues }: ServicesFormProps) => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      services: defaultValues || [{ description: '', quantity: 1, unitPrice: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  const services = watch('services');
  
  const calculateSubtotal = (item: ServiceItem) => {
    return item.quantity * item.unitPrice;
  };

  const calculateTotal = () => {
    return services.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const onSubmit = (data: { services: ServiceItem[] }) => {
    onSubmitData(data.services);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Subtotal</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className={index % 2 === 0 ? '' : 'bg-neutral-50'}>
                <td className="py-3">
                  <div className="flex items-center">
                    <FaBox className="text-neutral-400 mr-2" size={12} />
                    <input
                      className="form-input"
                      placeholder="Nome do serviço ou produto"
                      {...register(`services.${index}.description` as const, {
                        required: 'Descrição é obrigatória',
                      })}
                    />
                  </div>
                  {errors.services?.[index]?.description && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.services[index]?.description?.message}
                    </p>
                  )}
                </td>
                <td className="py-3 w-24">
                  <div className="flex items-center">
                    <FaHashtag className="text-neutral-400 mr-2" size={12} />
                    <input
                      type="number"
                      min="1"
                      className="form-input"
                      {...register(`services.${index}.quantity` as const, {
                        required: 'Obrigatório',
                        valueAsNumber: true,
                        min: { value: 1, message: 'Min 1' },
                      })}
                    />
                  </div>
                  {errors.services?.[index]?.quantity && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.services[index]?.quantity?.message}
                    </p>
                  )}
                </td>
                <td className="py-3 w-32">
                  <div className="flex items-center">
                    <FaDollarSign className="text-neutral-400 mr-2" size={12} />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      placeholder="0,00"
                      {...register(`services.${index}.unitPrice` as const, {
                        required: 'Obrigatório',
                        valueAsNumber: true,
                        min: { value: 0, message: 'Min 0' },
                      })}
                    />
                  </div>
                  {errors.services?.[index]?.unitPrice && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.services[index]?.unitPrice?.message}
                    </p>
                  )}
                </td>
                <td className="py-3 w-32">
                  <div className="form-input bg-neutral-50 text-right font-medium">
                    {calculateSubtotal(services[index]).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>
                </td>
                <td className="py-3 w-20 text-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className={`p-2 rounded-full ${
                      fields.length === 1
                        ? 'text-neutral-400 cursor-not-allowed'
                        : 'text-danger hover:bg-danger hover:bg-opacity-10'
                    }`}
                    title="Remover item"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="pt-4">
                <button
                  type="button"
                  onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
                  className="btn btn-sm btn-secondary btn-icon"
                >
                  <FaPlus className="w-3 h-3 mr-1" />
                  Adicionar Serviço
                </button>
              </td>
            </tr>
            <tr className="border-t border-t-neutral-200">
              <td colSpan={3} className="py-4 text-right font-bold">
                Total:
              </td>
              <td className="py-4 font-bold text-right bg-primary bg-opacity-5 rounded">
                {calculateTotal().toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={5} className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary float-right"
                >
                  Atualizar Serviços
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </form>
  );
};

export default ServicesForm; 