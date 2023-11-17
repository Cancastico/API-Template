export interface IPedidoVenda {
    id: number;
    numero?: number | null;
    vendedor_id?: number | null;
    vendedor_nome?: string | null;
    vendedor_id_sirius?: number | null;
    cliente_id?: number | null;
    cliente_nome?: string | null;
    cliente_id_sirius?: number | null;
    usuario_id?: number | null;
    desconto?: number | null;
    valor_bruto?: number | null;
    valor_liquido?: number | null;
    forma_pagamento?: string | null;
    pagamento?: number | null;
    troco?: number | null;
    status?: string | null;
    cpf_cnpj?: string | null;
    observacoes?: string | null;
    data_criacao?: Date | null;
    cliente_contato?: string | null;
    data_realizacao?: Date | null;
    data_sincronizacao?: Date | null;
    condicao_pagamento_id?: number | null;
    entrega_cep?: string | null;
    entrega_logradouro?: string | null;
    entrega_numero?: string | null;
    entrega_complemento?: string | null;
    entrega_bairro?: string | null;
    entrega_cidade?: string | null;
    entrega_uf?: string | null;
    itens?:IPedidoItem[];
  }
export interface IPedidoItem {
    id: number;
    pedido_id: number;
    produto_id: number;
    produto_sirius_id?: number | null;
    descricao?: string | null;
    unidade?: string | null;
    quantidade?: number | null;
    valor_unitario?: number | null;
    valor_total?: number | null;
    ean?: string | null;
    codigo?: string | null; 
  }
