export interface productoCompaqDTO{
    idProductoInventario: string;
    codigoProducto: string;
    nombreProducto: string;
    razonSocial: string;
    cantidadBolsas: string;
    cumplimiento: number;
    devoluciones: number;
   
}

export interface pedidoClienteDTO{
    fechaRegistro: Date;
    productosContpaq: productoCompaqDTO[];
    fechaEntrega: Date;
}