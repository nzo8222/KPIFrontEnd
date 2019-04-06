import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { pedidoCliente, productoCompaq } from 'src/app/shared/interfaces/models';
import { State } from '@progress/kendo-data-query';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pedidoClienteDTO, productoCompaqDTO } from 'src/app/shared/interfaces/DTOs';

@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss']
})
export class BsComponentComponent implements OnInit {
    constructor(private facadeService: FacadeService) { }
    public listaGridPedidos: pedidoClienteDTO[] = [];
    public listaProducto: productoCompaq[] = [];
    public pedidoSeleccionado: pedidoClienteDTO;
    formaProducto: FormGroup;

    
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
      };
    ngOnInit() {
        this.formaProducto = new FormGroup({
            'devolucionesProducto': new FormControl(null, [Validators.pattern('^[0-9]*$'), Validators.required])
        });
        this.facadeService.GetPedidosProductos().subscribe(res => {
            this.listaGridPedidos = res;
          });
          
    }
    onSelect(pedido: pedidoClienteDTO) {
        this.pedidoSeleccionado = pedido;
        this.listaProducto = pedido.productosContpaq;
        
    }
    //boton para modificar el numero de devoluciones de un pedido.
    onSubmit(productoSeleccionado: productoCompaqDTO){
        let productoCompaqDTO = {
            idProductoInventario: null,
            codigoProducto: null,
            nombreProducto: null,
            razonSocial: null,
            cantidadBolsas: null,
            cumplimiento: null,
            devoluciones: null,
        }
        productoCompaqDTO.idProductoInventario = productoSeleccionado.idProductoInventario;
        productoCompaqDTO.codigoProducto = productoSeleccionado.codigoProducto;
        productoCompaqDTO.nombreProducto = productoSeleccionado.nombreProducto;
        productoCompaqDTO.razonSocial = productoSeleccionado.razonSocial;
        productoCompaqDTO.cantidadBolsas = productoSeleccionado.cantidadBolsas;
        productoCompaqDTO.cumplimiento = productoSeleccionado.cumplimiento;
        productoCompaqDTO.devoluciones = this.formaProducto.value.devolucionesProducto;
        
        this.facadeService.PutProductoPedido(productoCompaqDTO).subscribe(RespuestaServidor => {
            if(RespuestaServidor.exitoso) { console.log("funka la wea" )} else {
              console.log(`Tronó esta madre ${RespuestaServidor.mensajeError}`);
            }
          });
        this.formaProducto.reset();
    }
}
