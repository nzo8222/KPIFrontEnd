import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { Producto } from 'src/app/shared/interfaces/entities';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { productoCompaq, pedidoCliente } from 'src/app/shared/interfaces/models';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
  private producto: Producto;
  public form: FormGroup;
  private productos: Producto[];
  public listaGridProductos: productoCompaq[] = [];
  public lstProductosContpaq: productoCompaq[];
  public cantidadPiezas: string;
  constructor(private facadeService: FacadeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      fechaEntrega: [new Date(), Validators.required]
    });

    this.loadLists();
  }
  onDropDownItemSelected(producto: string) {

    let selectedItem ;
    selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === producto);

    this.listaGridProductos.push(selectedItem);
  }
  loadLists() {
    // this.facadeService.GetProductos().subscribe(respose => {
    //   this.productos = respose;
    // });

    this.facadeService.GetProductosContpaq().subscribe(res => {
      this.lstProductosContpaq = res;
    });
  }

  onSubmitPedidoCliente() {
    // Aquí comienza la lógica para el guardado.

    if (!this.form.valid) { return; }

    const pedidoCliente = this.form.value as pedidoCliente;

    // Agrega los productos
    pedidoCliente.productosContpaq = this.listaGridProductos;

    this.facadeService.PostPedidoCliente(pedidoCliente).subscribe(res => {
      if (res.exitoso) { console.log("Wii, funka la wea") } else {
        console.log(`Tronó esta madre ${res.mensajeError}`);
      }
    });
    this.listaGridProductos = [];
  }
}
