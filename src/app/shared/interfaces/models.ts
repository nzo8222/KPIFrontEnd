export interface productoCompaq{
    codigoProducto: string;
    nombreProducto: string;
    razonSocial: string;
    cantidadBolsas: string;
    
}

export interface pedidoCliente{
    productosContpaq: productoCompaq[];
    fechaEntrega: Date;
}

export interface movimientoAlmacen {
    
        IdMovimientoAlmacen: string;
        CodigoProducto: string;
        NombreProducto:string;
        TipoMovimiento:string;
        NumBolsas: string;
        FechaMovimiento: Date;
        Turno:string;
     
}