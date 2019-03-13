export interface productoCompaq{
    codigoProducto: string;
    nombreProducto: string;
    razonSocial: string;
    cantidadPiezas: string;
}

export interface pedidoCliente{
    productosContpaq: productoCompaq[];
    fechaEntrega: Date;
}