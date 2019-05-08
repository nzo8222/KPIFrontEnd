export interface Cliente {

    idCliente: string;
    razonSocial: string;
}

export interface Pedido {
    idPedido: string;
    cliente: Cliente;
    productos: Producto[];
}

export interface Producto {
    idProducto: string;
    precio: number;
    descripcion: string;
}

export interface ProductoDetalle {
    idProductoDetalle: string;
    producto: Producto;
    cantidad: number;
    costoUnitario: number;
    total: number;
}
export interface MovimientoAlmacen {
    idMovimientoAlmacen: string;
    codigoProducto: number;
    nombreProducto: string;
    tipoMovimiento: string;
    numBolsas: number;
    fechaMovimiento: Date;
    Turno: string;
    folioRemision: number;
}