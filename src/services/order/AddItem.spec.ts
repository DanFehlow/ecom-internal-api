import { describe, it, expect, vi, Mock } from 'vitest';
import { AddItemService } from './AddItemService';
import prismaClient from '../../prisma';

// Mock do prismaClient para evitar interações reais com o banco de dados
vi.mock('../../prisma', () => ({
  default: {
    item: {
      create: vi.fn(),
    },
  },
}));

describe('AddItemService', () => {
  it('deve criar um item com os dados corretos', async () => {
    const addItemService = new AddItemService();

    // Dados de exemplo para a execução do serviço
    const itemData = {
      order_id: 'order123',
      product_id: 'product123',
      amount: 2,
    };

    // Simula o retorno do Prisma ao criar um item
    const mockOrder = {
      id: 'item123',
      ...itemData,
    };
    (prismaClient.item.create as Mock).mockResolvedValue(mockOrder);

    // Chama o serviço
    const result = await addItemService.execute(itemData);

    // Verifica se o Prisma foi chamado com os dados corretos
    expect(prismaClient.item.create).toHaveBeenCalledWith({
      data: itemData,
    });

    // Verifica se o retorno do serviço está correto
    expect(result).toEqual(mockOrder);
  });

  it('deve lançar um erro se o prisma falhar', async () => {
    const addItemService = new AddItemService();

    const itemData = {
      order_id: 'order123',
      product_id: 'product123',
      amount: 2,
    };

    // Simula um erro ao criar o item
    (prismaClient.item.create as Mock).mockRejectedValue(new Error('Erro ao criar o item'));

    // Verifica se o serviço lança o erro corretamente
    await expect(addItemService.execute(itemData)).rejects.toThrow('Erro ao criar o item');
  });
});
