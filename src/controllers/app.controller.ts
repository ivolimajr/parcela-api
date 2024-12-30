import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { BaseService } from '../services/application/base.service';
import { ConsultaPlacaResponse } from '../models/application/consultaPlaca/ConsultaPlacaResponse';
import { ConsultaDebitoRequest } from '../models/application/consultaDebito/ConsultaDebitoRequest';
import { ConsultaDebitoResponse } from '../models/application/consultaDebito/ConsultaDebitoResponse';
import { ConsultaPedidoResponse } from '../models/application/consultaPedido/ConsultaPedidoResponse';
import { ConsultaPedidoRequest } from '../models/application/consultaPedido/ConsultaPedidoRequest';
import { ConsultaPlacaRequest } from '../models/application/consultaPlaca/ConsultaPlacaRequest';
import {
  ProcessaPagamentoRequest,
  ProcessaPagamentoResponse,
} from '../models/application';

@ApiSecurity('x-api-key')
@ApiTags('Veicular')
@Controller('veiculo')
export class AppController {
  constructor(private readonly baseService: BaseService) {}

  /**
   * Consulta o status de um pedido pelo número.
   * @param params
   * @type ConsultaPedidoRequest
   */
  @ApiOperation({ summary: 'Consultar o status de um pedido' })
  @ApiParam({
    name: 'numeroPedido',
    description: 'Numero do pedido',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Informações do pedido',
    type: ConsultaPedidoResponse,
  })
  @Get('consultar-pedido/:numeroPedido')
  async consultarPedido(
    @Param() params: ConsultaPedidoRequest,
  ): Promise<ConsultaPedidoResponse> {
    try {
      return await this.baseService.consultarPedido(
        Number(params.numeroPedido),
      );
    } catch (error) {
      throw error
    }
  }

  /**
   * Consulta as informações de um veículo pela placa.
   * @param params
   * @type ConsultaPlacaRequest
   */
  @ApiOperation({ summary: 'Consultar veículo pela placa' })
  @ApiParam({ name: 'placa', description: 'Placa do veículo', type: String })
  @ApiResponse({
    status: 200,
    description: 'Informações do veículo retornadas com sucesso',
    type: ConsultaPlacaResponse,
  })
  @Get('consultar-placa/:placa')
  async consultarPlaca(
    @Param() params: ConsultaPlacaRequest,
  ): Promise<ConsultaPlacaResponse> {
    try {
      return await this.baseService.consultarPlaca(params.placa);
    } catch (error) {
      throw error
    }
  }

  /**
   * Consulta débitos associados a um veículo.
   * @param data Dados para consulta de débitos (placa, email, telefone).
   */
  @ApiOperation({ summary: 'Consultar os débitos de um veículo pela placa' })
  @ApiBody({ type: ConsultaDebitoRequest })
  @ApiResponse({
    status: 200,
    description: 'Informações do veículo retornadas com sucesso',
    type: ConsultaDebitoResponse,
  })
  @Post('consultar-debitos')
  async consultarDebitos(
    @Body() data: ConsultaDebitoRequest,
  ): Promise<ConsultaDebitoResponse> {
    try {
      return await this.baseService.consultaDebitos(data);
    } catch (error) {
      throw error
    }
  }

  /**
   * Consulta débitos associados a um veículo.
   * @param data Dados para consulta de débitos (placa, email, telefone).
   */
  @ApiOperation({ summary: 'Consultar os débitos de um veículo pela placa' })
  @ApiBody({ type: ProcessaPagamentoRequest })
  @ApiResponse({
    status: 200,
    description: 'Informações do veículo retornadas com sucesso',
    type: ProcessaPagamentoResponse,
  })
  @Post('processa-pagamento')
  async processaPagamento(
    @Body() data: ProcessaPagamentoRequest,
  ): Promise<ProcessaPagamentoResponse> {
    try {
      return await this.baseService.processaPagamento(data);
    } catch (error) {
      throw error
    }
  }
}
