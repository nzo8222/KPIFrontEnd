import { Component, OnInit, ViewChild } from '@angular/core';
import { clienteDTO, productoDTO, pedidoSemanalDTO, pedidoDiarioDTO, PedidosSemanalesGrid, PedidoSemanalEdit } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forma-pedido-cliente',
  templateUrl: './forma-pedido-cliente.component.html',
  styleUrls: ['./forma-pedido-cliente.component.scss']
})
export class FormaPedidoClienteComponent implements OnInit {
  // @ViewChild('formaProductos') pedidoClienteForm: NgForm;
  public idxSelectedItem: number;
  public selectedKeys: string[] = [];
  public listaGridPedidos: PedidosSemanalesGrid[] = [];
  formaPedido: FormGroup;
  formaProducto: FormGroup;
  public lstClientes: clienteDTO[];
  public lstProductosCliente: productoDTO[];
  constructor(private facadeService: FacadeService) { }
  public esperawe: boolean = false;
  OnClickDeletePedido(){
    const idx = this.listaGridPedidos.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }

    let idPedidoSemanal: string = this.selectedKeys[0];
    this.facadeService.DeletePedidoSemanal(idPedidoSemanal).subscribe(res => {
      if (res.exitoso) 
      { 
        console.log("Wii, funka la wea");
        this.OnClickObtenerPedidos();
      } else {
        console.log(`Tronó esta madre ${res.mensajeError}`);
      }
    });


    this.esperawe = true;
    this.formaProducto.disable();
    this.selectedKeys = [];
    let interval = setInterval(() => {
      this.OnClickObtenerPedidos();
      this.esperawe = false;
      this.formaProducto.enable();
      clearInterval(interval);
    }, 2000)
  }
  OnClickEditPedido() {
    const idx = this.listaGridPedidos.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }

    // Actualiza los valores.
    if (this.idxSelectedItem > -1) {
      if (this.formaProducto.value.producto
        && this.formaProducto.value.cliente
        && this.formaPedido.value.piezasLunes
        && this.formaPedido.value.piezasMartes
        && this.formaPedido.value.piezasMiercoles
        && this.formaPedido.value.piezasJueves
        && this.formaPedido.value.piezasViernes
        && this.formaPedido.value.piezasSabado
        && this.formaPedido.value.piezasDomingo
        && this.formaPedido.value.fechaInicio
        && this.formaPedido.value.fechaFin) {
          let producto = this.lstProductosCliente.find(c => c.nombreProducto === this.formaProducto.value.producto);
          let editPedido: PedidoSemanalEdit = {
            idPedidoSemanal: '',
            idProducto: '',
            numBolDomingo: 0,
            numBolJueves: 0,
            numBolLunes: 0,
            numBolMartes: 0,
            numBolMiercoles: 0,
            numBolSabado: 0,
            numBolViernes: 0,
            fechaFin: new Date,
            fechaInicio: new Date
          }
          editPedido.idProducto = producto.idProducto;
          editPedido.idPedidoSemanal = this.selectedKeys[0];
          editPedido.numBolLunes = this.formaPedido.value.piezasLunes;
          editPedido.numBolMartes = this.formaPedido.value.piezasMartes;
          editPedido.numBolMiercoles = this.formaPedido.value.piezasMiercoles;
          editPedido.numBolJueves = this.formaPedido.value.piezasJueves;
          editPedido.numBolViernes = this.formaPedido.value.piezasViernes;
          editPedido.numBolSabado = this.formaPedido.value.piezasSabado;
          editPedido.numBolDomingo = this.formaPedido.value.piezasDomingo;
          
        this.facadeService.PutPedidoSemanal(editPedido).subscribe(res => {
          if (res.exitoso) 
          { 
            console.log("Wii, funka la wea");
            this.OnClickObtenerPedidos();
          } else {
            console.log(`Tronó esta madre ${res.mensajeError}`);
          }
        });
      }
    } 
    else 
    {
      console.log('Debe Ingresar valores a la forma');
    }
    this.esperawe = true;
    this.formaProducto.disable();
    this.selectedKeys = [];
    let interval = setInterval(() => {
      this.OnClickObtenerPedidos();
      this.formaPedido.controls['piezasLunes'].reset();
      this.formaPedido.controls['piezasMartes'].reset();
      this.formaPedido.controls['piezasMiercoles'].reset();
      this.formaPedido.controls['piezasJueves'].reset();
      this.formaPedido.controls['piezasViernes'].reset();
      this.formaPedido.controls['piezasSabado'].reset();
      this.formaPedido.controls['piezasDomingo'].reset();
      this.esperawe = false;
      this.formaProducto.enable();
      clearInterval(interval);
    }, 2000)
  }
  OnClickObtenerPedidos() {

    let selectedItem = this.lstClientes.find(c => c.razonSocial === this.formaProducto.value.cliente);

    this.facadeService.GetPedidoSemanalPorCliente(selectedItem.idCliente).subscribe(
      res => {
        this.listaGridPedidos = res;
      });
    this.esperawe = true;
    let interval = setInterval(() => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000)
  }
  onSubmitFormaProducto() {
    let pedidoDiario: pedidoDiarioDTO[] = [];
    let pedidoSemanal: pedidoSemanalDTO = {
      fechaF: new Date,
      fechaI: new Date,
      // idPedidoSemanal: '',
      pedidoDiarioDTO: pedidoDiario
    };

    let nombreProducto = this.formaProducto.value.producto;
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
      if (RespuestaServidor.exitoso) { console.log("funka la wea") } else {
        console.log(`Tronó esta madre ${RespuestaServidor.mensajeError}`);
      }
    });
    this.formaPedido.reset();
  }

  ngOnInit() {
    this.formaProducto = new FormGroup({
      'cliente': new FormControl(null, [Validators.required]),
      'producto': new FormControl(null, [Validators.required]),
    });
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

  OnClickObtenerProductos() {

    //selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === codigoProducto);
    let clienteSeleccionado = this.lstClientes.find(c => c.razonSocial === this.formaProducto.value.cliente)
    this.facadeService.GetProductosPedido(clienteSeleccionado).subscribe(
      res => {
        this.lstProductosCliente = res;
      });
    this.esperawe = true;
    let interval = setInterval(() => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000)
  }

  OnClickObtenerClientes() {
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        this.lstClientes = res;
      });
    this.esperawe = true;
    let interval = setInterval(() => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000)
  }

  onDropDownItemSelected() {

  }

}
