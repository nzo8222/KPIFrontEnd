import { Component, OnInit, ViewChild } from '@angular/core';
import { clienteDTO, productoDTO, pedidoSemanalDTO, pedidoDiarioDTO, PedidosSemanalesGrid, PedidoSemanalEdit } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { pedidoCliente } from 'src/app/shared/interfaces/models';
import { NotificationService } from 'src/app/shared/services/notifications.service';
@Component({
  selector: 'app-forma-pedido-cliente',
  templateUrl: './forma-pedido-cliente.component.html',
  styleUrls: ['./forma-pedido-cliente.component.scss']
})
export class FormaPedidoClienteComponent implements OnInit {
  // @ViewChild('formaProductos') pedidoClienteForm: NgForm;
  public idxSelectedItem: number;
  public selectedKeys: string[] = [];
  public valorCliente: string = '';
  public valorProducto: string = '';
  public listaGridPedidos: PedidosSemanalesGrid[] = [];
  formaPedido: FormGroup;
  public lstClientes: clienteDTO[];
  public lstProductosCliente: productoDTO[];
  constructor(private facadeService: FacadeService, private notifications: NotificationService) { }
  public esperawe: boolean = false;
  OnClickDeletePedido() {
    if(this.listaGridPedidos.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]))
    {
      var idx = this.listaGridPedidos.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]);
    }
    else
    {
      this.notifications.showError("Seleccioné un pedido valido");
      return
    }
    if (idx > -1) { this.idxSelectedItem = idx; }

    let idPedidoSemanal: string = this.selectedKeys[0];
    this.facadeService.DeletePedidoSemanal(idPedidoSemanal).subscribe(res => {
      if (res.exitoso) {
        this.notifications.showSuccess('Se eliminó el pedido correctamente.');
        this.OnClickObtenerPedidos();
      } else {
        this.notifications.showError(res.mensajeError);
      }
    });


    this.esperawe = true;
    // this.formaProducto.disable();
    this.selectedKeys = [];
    let interval = setInterval(() => {
      this.OnClickObtenerPedidos();
      this.esperawe = false;
      // this.formaProducto.enable();
      clearInterval(interval);
    }, 2000)
  }
  OnClickEditPedido() {
    if(this.listaGridPedidos.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]))
    {
      var idx = this.listaGridPedidos.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]);
    }
    else
    {
      this.notifications.showError("Seleccioné un pedido valido");
      return
    }

    if (idx > -1) { this.idxSelectedItem = idx; }

    // Actualiza los valores.
    if (this.idxSelectedItem > -1) {
      if (this.valorCliente
        && this.valorProducto
        && this.formaPedido.value.piezasLunes
        && this.formaPedido.value.piezasMartes
        && this.formaPedido.value.piezasMiercoles
        && this.formaPedido.value.piezasJueves
        && this.formaPedido.value.piezasViernes
        && this.formaPedido.value.piezasSabado
        && this.formaPedido.value.piezasDomingo
        && this.formaPedido.value.fechaInicio
        && this.formaPedido.value.fechaFin) {
          if(!this.lstProductosCliente)
          {
            this.notifications.showError("Seleccioné un cliente y producto valido");
            return
          }
        let producto = this.lstProductosCliente.find(c => c.nombreProducto === this.valorProducto);
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
          if (!res.exitoso) {
            this.notifications.showError(res.mensajeError);
            return;
          } else {
            this.notifications.showSuccess('Se edito el pedido correctamente.');
          }
        });
      }
    }
    else {
      console.log('Debe Ingresar valores a la forma');
    }
    this.esperawe = true;
    // this.formaProducto.disable();
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
      // this.formaProducto.enable();
      clearInterval(interval);
    }, 2000);
  }
  OnClickObtenerPedidos() {
    var selectedItem;
    if(this.lstClientes.find(c => c.razonSocial === this.valorCliente))
    {
      selectedItem = this.lstClientes.find(c => c.razonSocial === this.valorCliente);
    }
    else
    {
      this.notifications.showError("Seleccione un cliente valido.");
      return
    }

    this.facadeService.GetPedidoSemanalPorCliente(selectedItem.idCliente).subscribe(
      res => {
        if(!res.exitoso){
          this.notifications.showError(res.mensajeError);
          return;
        }
        const pedidosSenales = res.payload as PedidosSemanalesGrid[];
        this.listaGridPedidos = pedidosSenales;
        this.notifications.showSuccess('Se cargaron los productos del cliente');
          
      });
    this.esperawe = true;
    let interval = setInterval(() => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000);
  }
  onSubmitFormaProducto() {
    let pedidoDiario: pedidoDiarioDTO[] = [];
    let pedidoSemanal: pedidoSemanalDTO = {
      fechaF: new Date,
      fechaI: new Date,
      // idPedidoSemanal: '',
      pedidoDiarioDTO: pedidoDiario
    };


    var producto: productoDTO;
    if(!this.lstProductosCliente){
      this.notifications.showError("Seleccioné un producto valido.");
      return
    }
    if(this.lstProductosCliente.find(p => p.nombreProducto === this.valorProducto))
    {
      producto = this.lstProductosCliente.find(p => p.nombreProducto === this.valorProducto);
    }
    else
    {
      this.notifications.showError("Seleccione un cliente valido.");
      return
    }
 
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

    this.facadeService.PostPedidoSemanal(pedidoSemanal).subscribe(RespuestaServidor => 
      {
      if (RespuestaServidor.exitoso) 
      {
      this.notifications.showSuccess('Se agrego el pedido correctamente'); 
    } 
    else 
    {
      this.notifications.showError(RespuestaServidor.mensajeError);
      }
    });
    this.formaPedido.reset();
    this.esperawe = true;
    let interval = setInterval(() => {
      this.loadListClientes();
      this.esperawe = false;
      clearInterval(interval);
    }, 2000);
  }

  ngOnInit() {

    this.formaPedido = new FormGroup({
      'piezasLunes': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'piezasMartes': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'piezasMiercoles': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'piezasJueves': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'piezasViernes': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'piezasSabado': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'piezasDomingo': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6)]),
      'fechaInicio': new FormControl(null, [Validators.required]),
      'fechaFin': new FormControl(null, [Validators.required])
    });
    this.loadListClientes();
    
  }

  OnClickObtenerProductos() {

    //selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === codigoProducto);
    if(this.lstClientes.find(c => c.razonSocial === this.valorCliente))
    {
      var clienteSeleccionado = this.lstClientes.find(c => c.razonSocial === this.valorCliente);
    }
    else
    {
      this.notifications.showError("Seleccioné un cliente valido.");
      return
    }
    this.facadeService.GetProductosPedido(clienteSeleccionado).subscribe(
      res => {
        if(!res.exitoso){
          this.notifications.showError(res.mensajeError);
          return;
        }
        const productosClientes = res.payload as productoDTO[]
        this.lstProductosCliente = productosClientes;
        this.notifications.showSuccess('Se cargaron los productos del cliente');
      });
    this.esperawe = true;
    let interval = setInterval(() => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000);
  }

  OnClickObtenerClientes() {
this.loadListClientes();
  }

  loadListClientes(){
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        if(!res.exitoso)
        {
          this.notifications.showError(res.mensajeError);
          return;
        }
        const pedidos = res.payload as clienteDTO[];
        this.lstClientes = pedidos;
        this.notifications.showSuccess('Se cargaron las listas');
      });


    this.esperawe = true;
    let interval = setInterval(() => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000);

  }

  onDropDownItemSelected() {

  }

}
