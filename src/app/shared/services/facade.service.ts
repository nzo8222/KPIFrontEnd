import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Producto } from '../interfaces/entities';
import { productoCompaq, pedidoCliente, movimientoAlmacen, SolicitudFechas, DatosGraficaCumplimiento } from '../interfaces/models';
import { RespuestaServidor } from '../interfaces/response';
import { pedidoClienteDTO, productoCompaqDTO, DatosInventarioFisicoDTO, productoPedidoKPI, clienteDTO, productoDTO, pedidoSemanalDTO, clienteDTOSinID, productoDTOConCliente } from '../interfaces/DTOs';

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
  public PostDatosGraficaCumplimientoProducto(periodo: SolicitudFechas): Observable<DatosGraficaCumplimiento[]> {
    return this.request.doPost<DatosGraficaCumplimiento[]>(`PedidoCliente/GetGraficaCumplimiento`, periodo);
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
}
