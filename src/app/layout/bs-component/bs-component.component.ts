import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { pedidoCliente, productoCompaq } from 'src/app/shared/interfaces/models';
import { State } from '@progress/kendo-data-query';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss']
})
export class BsComponentComponent implements OnInit {
    constructor(private facadeService: FacadeService) { }
    public listaGridPedidos: pedidoCliente[] = [];
    public listaProducto: productoCompaq[] = [];
    public pedidoSeleccionado: pedidoCliente;
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
    onSelect(pedido: pedidoCliente) {
        this.pedidoSeleccionado = pedido;
        this.listaProducto = pedido.productosContpaq;
        
    }
    onSubmit(){
        
        this.formaProducto.reset();
    }
}
