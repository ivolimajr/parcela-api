import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pedido } from '../../models/domain/pedido.model';
import { Debito } from '../../models/domain/debito.model';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido)
    private readonly pedidoModel: typeof Pedido,
  ) {}

  /**
   * Busca um veículo pelo número do pedido.
   * @param pedido numero do pedido.
   * @returns Pedido encontrado ou null.
   */
  async buscarPorNumeroPedido(pedido: number): Promise<Pedido | null> {
    if (!pedido || pedido <= 0)
      throw new HttpException('Veiculo inválido', 400);

    return await this.pedidoModel.findOne({ where: { pedido } });
  }

  /**
   * Busca um veículo pelo número da placa.
   * @param veiculoId Id do veículo.
   * @returns Pedido encontrado ou null.
   */
  async buscarPorVeiculo(veiculoId: number): Promise<Pedido | null> {
    if (!veiculoId || veiculoId <= 0)
      throw new HttpException('Veiculo inválido', 400);

    return await this.pedidoModel.findOne({
      where: { veiculoId: veiculoId },
      order: [['created_at', 'DESC']],
      attributes: ['veiculoId', 'pedido', 'mensagem', 'created_at'],
      include: {
        model: Debito,
        as: 'debitos',
        attributes: [
          'id',
          'cod_fatura',
          'vencimento',
          'status_debito',
          'valor',
          'descricao',
        ],
      },
    });
  }

  /**
   * Cria um novo veículo no banco de dados.
   * @param data Dados do veículo.
   * @returns Veículo criado.
   */
  async create(data: Partial<Pedido>): Promise<Pedido> {
    try {
      return await this.pedidoModel.create(data);
    } catch (error) {
      console.log(error);
      throw new HttpException('Erro ao criar veículo', 500);
    }
  }

  async update(id: number, data: Partial<Pedido>): Promise<Pedido> {
    const pedido = await this.pedidoModel.findByPk(id);
    if (!pedido)
      throw new HttpException('Pedido não encontrado', 404);

    try {
      return await pedido.update(data);
    } catch (error) {
      console.error(error);
      throw new HttpException('Erro ao atualizar o pedido', 500);
    }
  }
}
