export interface ProductMovimentacion {
    pm_pedido_venda_id: number | null;
    pm_produto_id: number;
    pm_usuario_id: number;
    pm_quantidade: number;
    pm_tipo_movimentacao: string;
    pm_numero_nota_fiscal: number | null;
    pm_observacao: string | null;
  }
export interface ParamFilter {
    field: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  }