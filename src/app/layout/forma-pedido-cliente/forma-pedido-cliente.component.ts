import { Component, OnInit, ViewChild } from '@angular/core';
import { clienteDTO, productoDTO, pedidoSemanalDTO, pedidoDiarioDTO } from 'src/app/shared/interfaces/DTOs';
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
    let pedidoDiario: pedidoDiarioDTO[] = [];
    let pedidoSemanal: pedidoSemanalDTO = {fechaF:new Date,
                                           fechaI: new Date,
                                          // idPedidoSemanal: '',
                                        pedidoDiarioDTO: pedidoDiario      };
  
    let nombreProducto = this.pedidoClienteForm.value.nombreProducto;
    let producto: productoDTO;
    producto = this.lstProductosCliente.find(p => p.nombreProducto === nombreProducto)
    let pedidoDiario0 = {
      producto: null,
      numBolsas: null,
      numDia: null
    }
    let producto1: productoDTO;
    // producto1.idProducto = producto.idProducto;
    pedidoDiario0.producto = producto;
    pedidoDiario0.numBolsas = this.formaPedido.value.piezasLunes;
    pedidoDiario0.numDia = 0;
    
    let pedidoDiario00: pedidoDiarioDTO;
    pedidoDiario00 = {
      // idPedidoDiario: '2',{idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }
    pedidoDiario00.IdProducto = producto.idProducto;
    pedidoDiario00.numDia = pedidoDiario0.numDia;
    pedidoDiario00.numBolsas = pedidoDiario0.numBolsas;
    pedidoDiario.push(pedidoDiario00);

    let pedidoDiario1: pedidoDiarioDTO;

    pedidoDiario1 = {
      // idPedidoDiario: '2',{idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }

    pedidoDiario1.IdProducto = producto.idProducto;
    pedidoDiario1.numBolsas = this.formaPedido.value.piezasMartes;
    pedidoDiario1.numDia = 1;

    pedidoDiario.push(pedidoDiario1);

    let pedidoDiario2: pedidoDiarioDTO;
    pedidoDiario2 = {
      // idPedidoDiario: '2', {idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }
    pedidoDiario2.IdProducto = producto.idProducto;
    pedidoDiario2.numBolsas = this.formaPedido.value.piezasMiercoles;
    pedidoDiario2.numDia = 2;

    pedidoDiario.push(pedidoDiario2);

    let pedidoDiario3: pedidoDiarioDTO;

    pedidoDiario3 = {
      // idPedidoDiario: '2', {idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }

    pedidoDiario3.IdProducto = producto.idProducto;
    pedidoDiario3.numBolsas = this.formaPedido.value.piezasJueves;
    pedidoDiario3.numDia = 3;

    pedidoDiario.push(pedidoDiario3);

    let pedidoDiario4: pedidoDiarioDTO;

    pedidoDiario4 = {
      // idPedidoDiario: '2', {idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }

    pedidoDiario4.IdProducto = producto.idProducto;
    pedidoDiario4.numBolsas = this.formaPedido.value.piezasViernes;
    pedidoDiario4.numDia = 4;

    pedidoDiario.push(pedidoDiario4);

    let pedidoDiario5: pedidoDiarioDTO;

    pedidoDiario5 = {
      // idPedidoDiario: '2', {idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }

    pedidoDiario5.IdProducto = producto.idProducto;
    pedidoDiario5.numBolsas = this.formaPedido.value.piezasSabado;
    pedidoDiario5.numDia = 5;

    pedidoDiario.push(pedidoDiario5);

    let pedidoDiario6: pedidoDiarioDTO;

    pedidoDiario6 = {
      // idPedidoDiario: '2', {idProducto: '', codigoProducto: '2', nombreProducto:'nombre'}
      numBolsas: 2,
      numDia: 2,
      IdProducto: '2'
    }

    pedidoDiario6.IdProducto = producto.idProducto;
    pedidoDiario6.numBolsas = this.formaPedido.value.piezasDomingo;
    pedidoDiario6.numDia = 6;



    pedidoDiario.push(pedidoDiario6);
    pedidoSemanal.pedidoDiarioDTO = pedidoDiario;
    pedidoSemanal.fechaI = this.formaPedido.value.fechaInicio;
    pedidoSemanal.fechaF = this.formaPedido.value.fechaFin;

    this.facadeService.PostPedidoSemanal(pedidoSemanal).subscribe(RespuestaServidor => {
      if(RespuestaServidor.exitoso) {  console.log("funka la wea" )} else {
        console.log(`Tronó esta madre ${RespuestaServidor.mensajeError}`);
      }
    });
    this.formaPedido.reset();
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
      'fechaInicio': new FormControl(null, [Validators.required]),
      'fechaFin': new FormControl(null, [Validators.required])
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
