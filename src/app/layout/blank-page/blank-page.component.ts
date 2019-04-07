import { Component, OnInit, ViewChild } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { Producto } from 'src/app/shared/interfaces/entities';
import { FormBuilder, Validators, FormGroup, NgForm, FormsModule } from '@angular/forms';
import { productoCompaq, pedidoCliente } from 'src/app/shared/interfaces/models';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {

  // Constantes KendoGrid
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public formGroup: FormGroup;

  public selectedKeys: string[] = [];

  public idxSelectedItem: number;


  private producto: productoCompaq;
  public form: FormGroup;
  // private productos: Producto[];
  public listaGridProductos: productoCompaq[] = [];
  public lstProductosContpaq: productoCompaq[];
  public cantidad: string = '';
  constructor(private facadeService: FacadeService, private fb: FormBuilder) { }
  @ViewChild('formaProductos') pedidoClienteForm: NgForm;
  @ViewChild('formaPedidos') guardarClienteForm: NgForm;
  ngOnInit() {
    this.form = this.fb.group({
      fechaEntrega: [new Date(), Validators.required]
    });

    this.loadLists();
  }
  //producto: string
  onDropDownItemSelected() {

    let codigoProducto = this.pedidoClienteForm.value.codigo;
    let cantidadBolsas = this.pedidoClienteForm.value.cantidad;
    let selectedItem;
    selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === codigoProducto);
    selectedItem.cantidadBolsas = cantidadBolsas;
    this.listaGridProductos.push(selectedItem);
    this.pedidoClienteForm.reset();
  }
  loadLists() {
    // this.facadeService.GetProductos().subscribe(respose => {
    //   this.productos = respose;
    // });

    this.facadeService.GetProductosContpaq().subscribe(res => {
      this.lstProductosContpaq = res;
    });
  }


  selectedKeysChange(value: any) {

  }
  onProductoEdit() {
    // Obtiene el indice seleccionado.
    const idx = this.listaGridProductos.findIndex(e => e.codigoProducto === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }

    // Actualiza los valores.
    if (this.idxSelectedItem > -1) {
      this.listaGridProductos[this.idxSelectedItem].cantidadBolsas = this.pedidoClienteForm.value.cantidad;
      // this.listaGridProductos[this.idxSelectedItem].codigoProducto = this.pedidoClienteForm.value.codigo;
    } else {
      console.log('Debe seleccionar un elemento');
    }
  }

  onProductoDelete() {
    const idx = this.listaGridProductos.findIndex(e => e.codigoProducto === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }
    if (this.idxSelectedItem > -1) {
      this.listaGridProductos.splice(this.idxSelectedItem, 1);
      // this.listaGridProductos[this.idxSelectedItem].codigoProducto = this.pedidoClienteForm.value.codigo;
    } else {
      console.log('Debe seleccionar un elemento');
    }
  }

  onSubmitPedidoCliente() {
    // Aquí comienza la lógica para el guardado.

    // if (!this.form.valid) { return; }

    // const pedidoCliente = this.form.value as pedidoCliente;
    let pedidoCliente = {
      productosContpaq: null,
      fechaEntrega: null
    };
    pedidoCliente.fechaEntrega = new Date();
    pedidoCliente.productosContpaq = [];
    let fechaPedido = this.guardarClienteForm.value.fechaPedido
    pedidoCliente.fechaEntrega = fechaPedido;
    // Agrega los productos
    pedidoCliente.productosContpaq = this.listaGridProductos;

    this.facadeService.PostPedidoCliente(pedidoCliente).subscribe(res => {
      if (res.exitoso) { console.log("Wii, funka la wea") } else {
        console.log(`Tronó esta madre ${res.mensajeError}`);
      }
    });
    this.listaGridProductos = [];
    this.guardarClienteForm.reset();
  }

}
