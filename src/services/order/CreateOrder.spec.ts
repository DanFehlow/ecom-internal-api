import { describe, it, expect, vi, Mock } from 'vitest';
import { CreateOrderService } from './CreateOrderService';
import prismaClient from '../../prisma';

// Mock do prismaClient para evitar interações reais com o banco de dados
vi.mock('../../prisma', () => ({
  default: {
    order: {
      create: vi.fn(),
    },
  },
}));

describe('CreateOrderService', () => {
  it('deve criar um pedido com os dados corretos', async () => {
    const createOrderService = new CreateOrderService();

    // Dados de exemplo para a execução do serviço
    const orderData = {
      branch: 'Pedido 1',
      name: 'Fulanito Fehlow',
    };

    // Simula o retorno do Prisma ao criar um pedido
    const mockOrder = {
      id: 'order123',
      ...orderData,
    };
    (prismaClient.order.create as Mock).mockResolvedValue(mockOrder);

    // Chama o serviço
    const result = await createOrderService.execute(orderData);

    // Verifica se o Prisma foi chamado com os dados corretos
    expect(prismaClient.order.create).toHaveBeenCalledWith({
      data: orderData,
    });

    // Verifica se o retorno do serviço está correto
    expect(result).toEqual(mockOrder);
  });

  it('deve lançar um erro se o prisma falhar', async () => {
    const createOrderService = new CreateOrderService();

    const orderData = {
      branch: 'Pedido 1',
      name: 'Fulanito Fehlow',
    };

    // Simula um erro ao criar o pedido
    (prismaClient.order.create as Mock).mockRejectedValue(new Error('Erro ao criar o pedido'));

    // Verifica se o serviço lança o erro corretamente
    await expect(createOrderService.execute(orderData)).rejects.toThrow('Erro ao criar o pedido');
  });
});
