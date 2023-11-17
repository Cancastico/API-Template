export interface IProduct {
    id: number| undefined;
    id_sirius?: number | null;
    codProduto: string;
    descricao: string;
    codEAN: string;
    ncm: string;
    cfop: string;
    unCom?: string | null;
    qtdCom?: number | null;
    vlrUnCom?: number | undefined;
    vlrProd?: number | null;
    codEANTrib?: string | null;
    unTrib?: string | null;
    qtdTrib?: number | null;
    vlrUnTrib?: number | null;
    saldo: number;
    status: string;
  }