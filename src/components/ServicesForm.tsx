import { useFieldArray, useForm } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';

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
    <div className="card mt-6">
      <h2 className="text-xl font-semibold mb-4">Serviços</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qtd
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Unit.
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="px-2 py-2">
                    <input
                      className="form-input"
                      {...register(`services.${index}.description` as const, {
                        required: 'Descrição é obrigatória',
                      })}
                    />
                    {errors.services?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.services[index]?.description?.message}
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2 w-24">
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
                    {errors.services?.[index]?.quantity && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.services[index]?.quantity?.message}
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2 w-32">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                      {...register(`services.${index}.unitPrice` as const, {
                        required: 'Obrigatório',
                        valueAsNumber: true,
                        min: { value: 0, message: 'Min 0' },
                      })}
                    />
                    {errors.services?.[index]?.unitPrice && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.services[index]?.unitPrice?.message}
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2 w-32">
                    <div className="form-input bg-gray-50">
                      {calculateSubtotal(services[index]).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                  <td className="px-2 py-2 w-20 text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                      className={`p-2 rounded-full ${
                        fields.length === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-500 hover:bg-red-100'
                      }`}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="px-2 py-4">
                  <button
                    type="button"
                    onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <FaPlus className="w-3 h-3 mr-1" />
                    Adicionar Serviço
                  </button>
                </td>
              </tr>
              <tr className="border-t-2 border-gray-300">
                <td colSpan={3} className="px-2 py-4 text-right font-bold">
                  Total:
                </td>
                <td className="px-2 py-4 font-bold">
                  {calculateTotal().toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ServicesForm; 