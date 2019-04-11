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

export interface DatosInventarioFisicoDTO {
    codigoProducto: string;
    nombreProducto: string;
    numBolsas: number;
    fechaInventario: Date;
    folioRemision: number;
}
export interface productoPedidoKPI {
    idProductoInventario : string;
    razonSocial: string;
    nombreProducto: string;
    codigoProducto: number;
    cantidadBolsas: number;
    cumplimiento: number;
    devoluciones: number;
    discrepancia: number;
    fechaRegistro: Date;
    fechaEntrega: Date;    
}