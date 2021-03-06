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
export interface clienteDTO {
        idCliente: string;
        razonSocial: string;
}
export interface clienteDTOSinID {
    razonSocial: string;
}
export interface productoDTO {
    idProducto: string;
    codigoProducto: string;
    nombreProducto: string;
    
}
export interface pedidoDiarioDTO{
    // idPedidoDiario: string;
    IdProducto: string;
    numBolsas: number;
    numDia: number;
}
export interface pedidoSemanalDTO{
    // idPedidoSemanal: string;
    pedidoDiarioDTO: pedidoDiarioDTO[];
    fechaI: Date;
    fechaF: Date;
}
export interface pedidoCompletoDTO {
    idProducto: string;
    numBolsas: number;
    numDia: number;
    fechaInicio: Date;
    fechaFin: Date;
}
export interface productoDTOConCliente {
    idProducto: string;
    codigoProducto: number;
    nombreProducto: string;
    idCliente: string;
}
export interface LoginDTO {
    usuario: string;
    password: string;
    recordar: boolean;
}
export interface RegistroUsuarioDTO {
    usuario: string;
    password: string;
    email: string;
}
export interface PedidoSemanalGraficaDTO {
    idPedidoSemanal: string;
    nombreProducto: string;
    numBolsas: number;
    fechaInicio: Date;
    fechaFin:Date;
    promedioCumplimiento: number;
}
export interface SolicitudGraficaCumplimientioDTO {
    idCliente: string;
    fechaInicio: Date;
    fechaFin: Date;
}
export interface PedidosSemanalesGrid {
    idPedidoSemanal: string;
    nombreProducto: string;
    codigoProducto: number;
    cliente: string;
    numBolLunes:number;
    numBolMartes:number;
    numBolMiercoles:number;
    numBolJueves:number;
    numBolViernes:number;
    numBolSabado:number;
    numBolDomingo:number;
    fechaInicio: Date;
    fechaFin: Date;
}
export interface PedidoSemanalEdit {
    idPedidoSemanal: string;
    idProducto: string;
    numBolLunes:number;
    numBolMartes:number;
    numBolMiercoles:number;
    numBolJueves:number;
    numBolViernes:number;
    numBolSabado:number;
    numBolDomingo:number;
    fechaInicio: Date;
    fechaFin: Date;
}