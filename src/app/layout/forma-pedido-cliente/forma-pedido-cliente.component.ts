import { Component, OnInit, ViewChild } from '@angular/core';
import { clienteDTO, productoDTO } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forma-pedido-cliente',
  templateUrl: './forma-pedido-cliente.component.html',
  styleUrls: ['./forma-pedido-cliente.component.scss']
})
export class FormaPedidoClienteComponent implements OnInit {
  @ViewChild('formaProductos') pedidoClienteForm: NgForm;
 
  formaPedido: FormGroup;
  public lstClientes: clienteDTO[];
  public lstProductosCliente: productoDTO[];
  constructor(private facadeService: FacadeService) { }

  onSubmitFormaProducto(){

  }

  ngOnInit() {
    this.formaPedido = new FormGroup({
      'piezasLunes': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'piezasMartes': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'piezasMiercoles': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'piezasJueves': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'piezasViernes': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'piezasSabado': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'piezasDomingo': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }
  OnClickAgregarProducto() {

  }
  OnClickObtenerProductos(){
    
    //selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === codigoProducto);
   let clienteSeleccionado = this.lstClientes.find(c => c.razonSocial === this.pedidoClienteForm.value.cliente)
   this.facadeService.GetProductosPedido(clienteSeleccionado).subscribe(
    res => {
      this.lstProductosCliente = res;
    });
   
  }

  OnClickObtenerClientes(){
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        this.lstClientes = res;
      });
  }

  onDropDownItemSelected(){

  }

}
