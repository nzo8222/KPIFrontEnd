export interface productoCompaq{
    codigoProducto: string;
    nombreProducto: string;
    razonSocial: string;
    cantidadBolsas: string;
    cumplimiento: number;
    devoluciones: number;
   
}

export interface pedidoCliente{
    productosContpaq: productoCompaq[];
    fechaEntrega: Date;
}

export interface movimientoAlmacen {
    
        // IdMovimientoAlmacen: string;
        CodigoProducto: string;
        NombreProducto:string;
        TipoMovimiento:string;
        NumBolsas: string;
        FechaMovimiento: Date;
        Turno:string;
        FolioRemision: string;
}

export class SolicitudFechas {
    public FechaI: Date;
    public FechaF: Date;
}

export interface DatosGraficaCumplimiento {
    nombreProducto: String;
    cumplimientos: number[];
}

export interface DatosInventarioFisico {
    idInventarioFisico: string;
    codigoProducto: string;
    nombreProducto: string;
    numBolsas: number;
    fechaInventario: Date;
    folioRemision: number;
}