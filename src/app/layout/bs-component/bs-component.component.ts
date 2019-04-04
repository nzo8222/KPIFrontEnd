import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { pedidoCliente } from 'src/app/shared/interfaces/models';
import { State } from '@progress/kendo-data-query';

@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss']
})
export class BsComponentComponent implements OnInit {
    constructor(private facadeService: FacadeService) { }
    public listaGridPedidos: pedidoCliente[] = [];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
      };
    ngOnInit() {
        this.facadeService.GetPedidosProductos().subscribe(res => {
            this.listaGridPedidos = res;
          });
    }
}
