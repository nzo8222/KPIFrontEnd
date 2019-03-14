import { Component, OnInit, ViewChild } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { Producto } from 'src/app/shared/interfaces/entities';
import { FormBuilder, Validators, FormGroup, NgForm, FormsModule  } from '@angular/forms';
import { productoCompaq, pedidoCliente } from 'src/app/shared/interfaces/models';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
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
    let cantidadPiezas = this.pedidoClienteForm.value.cantidad;
    let selectedItem ;
    selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === codigoProducto);
    selectedItem.cantidadPiezas = cantidadPiezas;
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

  onSubmitPedidoCliente() {
    // Aquí comienza la lógica para el guardado.

    // if (!this.form.valid) { return; }

    // const pedidoCliente = this.form.value as pedidoCliente;
    let pedidoCliente = { productosContpaq: null,
      fechaEntrega: null};
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
