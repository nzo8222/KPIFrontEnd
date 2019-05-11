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
    turno: string;
    folioRemision: number;
}
export interface MovimientoAlmacenEdit {
    // public Guid IdMovimientoAlmacen { get; set; }
    idMovimientoAlmacen: string;
        // public Guid IdProducto { get; set; }
    idProducto:string;
       // public string TipoMovimiento { get; set; }
    tipoMovimiento: string;
        // public int NumBolsas { get; set; }
    numBolsas: number;
     // public DateTime FechaMovimiento { get; set; }
    fechaMovimiento: Date;
    // public string Turno { get; set; }
    turno: string;
      // public int FolioRemision { get; set; }
    folioRemision: number;
}