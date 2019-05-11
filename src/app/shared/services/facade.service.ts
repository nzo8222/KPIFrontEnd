import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Producto, MovimientoAlmacen, Cliente, MovimientoAlmacenEdit } from '../interfaces/entities';
import { productoCompaq, pedidoCliente, movimientoAlmacen, DatosGraficaCumplimiento, SolicitudGraficaCumplimiento, DatosGraficaBarraCumplimiento } from '../interfaces/models';
import { RespuestaServidor } from '../interfaces/response';
import { pedidoClienteDTO, productoCompaqDTO, DatosInventarioFisicoDTO, productoPedidoKPI, clienteDTO, productoDTO, pedidoSemanalDTO, clienteDTOSinID, productoDTOConCliente, LoginDTO, RegistroUsuarioDTO, SolicitudGraficaCumplimientioDTO, PedidoSemanalGraficaDTO, PedidosSemanalesGrid, PedidoSemanalEdit } from '../interfaces/DTOs';

class HttpRequestUtil {
  constructor(private http: HttpClient, public urlService: string) {}

  public doGet<T>(url: string): Observable<T> {
    const fullUrl = this.urlService + url;

    return this.http
      .get<T>(fullUrl, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': ['*']
        })
      })
      .pipe(
        map(result => {
          return result;
        }),
        catchError(ex => {
          // TODO: Agregar lógica para manejo de errores
          throw ex;
        })
      );
  }

  public doPost<T>(url: string, data: any): Observable<T> {
    const fullUrl = this.urlService + url;

    return this.http
      .post<T>(fullUrl, data, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': ['*']
        })
      })
      .pipe(
        map(result => {
          if (result) {
            return result;
          }
        }),
        catchError(ex => {
          // TODO: Agregar lógica para manejo de errores
          throw ex;
        })
      );
  }

  public doDelete<T>(url: string): Observable<T> {
    const fullUrl = this.urlService + url;

    return this.http
      .delete<T>(fullUrl, {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': ['*']
        })
      })
      .pipe(
        map(result => {
          if (result) {
            return result;
          }
        }),
        catchError(ex => {
          // TODO: Agregar lógica para manejo de errores
          throw ex;
        })
      );
  }
}

@Injectable()
export class FacadeService {
  private request: HttpRequestUtil;

  constructor(http: HttpClient) {
    const urlService = environment.API_URL;
    this.request = new HttpRequestUtil(http, urlService);
  } 
  public PutMovimientoAlmacen(movimiento: MovimientoAlmacenEdit): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`MovimientoAlmacen/PutMovimiento`, movimiento);
  }
  public DeletePedidoSemanal(idPedidoSemanal: string): Observable<RespuestaServidor> {
    return this.request.doDelete<RespuestaServidor>(`PedidoSemanal/DeletePedidoSemanal/${idPedidoSemanal}`);
  }
  public PutPedidoSemanal(pedidoSemanalEdit: PedidoSemanalEdit): Observable<RespuestaServidor> {
    return this.request.doPost<RespuestaServidor>(`PedidoSemanal/PutPedidoSemanal/`, pedidoSemanalEdit);
  }
  public GetPedidoSemanalPorCliente(idCliente: string): Observable<PedidosSemanalesGrid[]> {
    return this.request.doGet<PedidosSemanalesGrid[]>(`PedidoSemanal/GetPedidoSemanalPorIdCliente/${idCliente}`);
  }
  public PutProducto(producto: productoDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Producto/PutProducto`, producto);
  }
  public DeleteProducto(idProducto: string): Observable<RespuestaServidor>{
    return this.request.doDelete<RespuestaServidor>(`Producto/DeleteProducto/${idProducto}` );
  }
  public DeleteCliente(idCliente: string): Observable<RespuestaServidor>{
    return this.request.doDelete<RespuestaServidor>(`Cliente/DeleteCliente/${idCliente}` );
  }
  public PutCliente(cliente: Cliente): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Cliente/PutCliente`, cliente);
  }
  public GetMovimientosAlmacen(): Observable<MovimientoAlmacen[]> {
    return this.request.doGet<MovimientoAlmacen[]>(`MovimientoAlmacen/GetMovimientosAlmacen`);
  }
  public PostDatosGraficaBarrasCumplimientoProducto(solicitudGraficaCumplimiento: SolicitudGraficaCumplimiento): Observable<DatosGraficaBarraCumplimiento[]> {
    return this.request.doPost<DatosGraficaBarraCumplimiento[]>(`PedidoCliente/GetGraficaBarrasCumplimiento`, solicitudGraficaCumplimiento);
  }
  public PostSolicitudPedidosSemanales(solicitud: SolicitudGraficaCumplimientioDTO): Observable<PedidoSemanalGraficaDTO[]>{
    return this.request.doPost<PedidoSemanalGraficaDTO[]>(`PedidoSemanal/GetPedidosSemanal`, solicitud);
  }
  public PostProducto(producto: productoDTOConCliente): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Producto/PostProducto`, producto);
  }
  public PostCliente(cliente: clienteDTOSinID): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Cliente/PostCliente`, cliente);
  }
  public PostPedidoSemanal(pedidoSemanal: pedidoSemanalDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`PedidoCliente`, pedidoSemanal);
  }
   // Get Productos del cliente especificado para el pedido
   public GetProductosPedido(cliente: clienteDTO): Observable<productoDTO[]> {
    return this.request.doGet<productoDTO[]>(`producto/${cliente.idCliente}`);
  }
   // Get Clientes para el pedido
   public GetClientesPedido(): Observable<clienteDTO[]> {
    return this.request.doGet<clienteDTO[]>(`PedidoCliente/GetClientesPedido`);
  }
  //Post Inventario Fisico
  public PostInventarioFisico(inventarioFisico: DatosInventarioFisicoDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`InventarioFisico/PostInventarioFisico`, inventarioFisico);
  }
  public PostPedidoCliente(pedidoCliente: pedidoCliente): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`PedidoCliente`, pedidoCliente);
  }
  public PutProductoPedido(productoCompaqDTO: productoCompaqDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Producto/PutProductoPedido`, productoCompaqDTO);
  }
  // Get producto
  public PostDatosGraficaCumplimientoProducto(solicitudGraficaCumplimiento: SolicitudGraficaCumplimiento): Observable<DatosGraficaCumplimiento[]> {
    return this.request.doPost<DatosGraficaCumplimiento[]>(`PedidoCliente/GetGraficaLineaCumplimiento`, solicitudGraficaCumplimiento);
  }
  // Get Pedidos con sus productos
  public GetPedidosProductos(): Observable<productoPedidoKPI[]> {
    return this.request.doGet<productoPedidoKPI[]>(`PedidoCliente/GetPedidosProducto`);
  }

  // // Delte producto
  // public DeleteProducto(idProducto: string): Observable<Producto> {
  //   return this.request.doDelete<Producto>(`Producto/${idProducto}`);
  // }

  // Agregar movimiento al almacen
  public PostMovimientoAlmacen(movimeintoAlmacen: movimientoAlmacen): Observable<RespuestaServidor> {
    return this.request.doPost<RespuestaServidor>(`MovimientoAlmacen/PostMovimiento`, movimeintoAlmacen);
  }
  //se cambio el tipo de objeto que recibe a productoCompaq sin [] porque se perdio la vista que regresaba
  //el arreglo de productos
  public GetProductosContpaq(): Observable<productoCompaq[]>{
    return this.request.doGet<productoCompaq[]>(`Producto/GetContpaqProducts`);
  }

  public Login(loginDTO: LoginDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Login/Login`, loginDTO);
  }
  public RegistroUsuario(RegistroUsuario : RegistroUsuarioDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Login/Registro`, RegistroUsuario);
  }
}
