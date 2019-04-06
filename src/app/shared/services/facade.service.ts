import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Producto } from '../interfaces/entities';
import { productoCompaq, pedidoCliente, movimientoAlmacen } from '../interfaces/models';
import { RespuestaServidor } from '../interfaces/response';
import { pedidoClienteDTO, productoCompaqDTO } from '../interfaces/DTOs';

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
  public PostPedidoCliente(pedidoCliente: pedidoCliente): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`PedidoCliente`, pedidoCliente);
  }
  public PutProductoPedido(productoCompaqDTO: productoCompaqDTO): Observable<RespuestaServidor>{
    return this.request.doPost<RespuestaServidor>(`Producto/PutProductoPedido`, productoCompaqDTO);
  }
//  // Get producto
//  public GetProducto(idProducto: string): Observable<Producto> {
//   return this.request.doGet<Producto>(`Producto/${idProducto}`);
// }
  // Get Pedidos con sus productos
  public GetPedidosProductos(): Observable<pedidoClienteDTO[]> {
    return this.request.doGet<pedidoClienteDTO[]>(`Producto/GetPedidosProducto`);
  }

  // Delte producto
  public DeleteProducto(idProducto: string): Observable<Producto> {
    return this.request.doDelete<Producto>(`Producto/${idProducto}`);
  }

  // AddOrEdit producto
  public PostMovimientoAlmacen(movimeintoAlmacen: movimientoAlmacen): Observable<RespuestaServidor> {
    return this.request.doPost<RespuestaServidor>(`Producto`, movimeintoAlmacen);
  }

  public GetProductosContpaq(): Observable<productoCompaq[]>{
    return this.request.doGet<productoCompaq[]>(`Producto/GetContpaqProducts`);
  }
}
