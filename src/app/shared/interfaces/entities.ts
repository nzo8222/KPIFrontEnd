export interface Cliente {
    idCliente: string;
    nombre: string;
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
