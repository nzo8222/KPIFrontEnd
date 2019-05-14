import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/interfaces/entities';
import { State } from '@progress/kendo-data-query';
import { clienteDTOSinID, clienteDTO } from 'src/app/shared/interfaces/DTOs';
import { NotificationService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-agregar-clientes-productos',
  templateUrl: './agregar-clientes-productos.component.html',
  styleUrls: ['./agregar-clientes-productos.component.scss']
})
export class AgregarClientesProductosComponent implements OnInit {
  formaCliente: FormGroup;
  listaGridClientes: Cliente[] = [];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public esperawe: boolean = false;
  public idxSelectedItem: number;
  public selectedKeys: string[] = [];
  constructor(private facadeService: FacadeService,
    private notifications: NotificationService) { }
  //^[a-zA-Z0-9_.-]*$ ----- /^[\w\s]+$/ -------- ^[a-zA-Z\s]+$ --------^[a-zA-Z0-9\s]*$
  ngOnInit() {
    this.formaCliente = new FormGroup({
      'razonSocial': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]*$'), Validators.minLength(5)]),
    });
  }
  obtenerClientes() {
    this.esperawe = true;
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        if(!res.exitoso)
        {
          this.notifications.showError(res.mensajeError);
        }
        const pedidos = res.payload as clienteDTO[];

        this.listaGridClientes = pedidos;
        

        // Muestra notificación
        
        this.notifications.showSuccess('Se cargaron las listas');

      });
      this.selectedKeys = [];
      let interval = setInterval( () => {
        this.esperawe = false;
        clearInterval(interval);
      }, 2000)
  }
  OnClickDeleteCliente() {
    const idx = this.listaGridClientes.findIndex(e => e.idCliente === this.selectedKeys[0]);
    const cliente = this.listaGridClientes.find(c => c.idCliente === this.selectedKeys[0]);
    if (idx > -1) {
      this.idxSelectedItem = idx;
      this.facadeService.DeleteCliente(cliente.idCliente).subscribe(res => {
        if (res.exitoso) {
          console.log("Wii, funka la wea")
          //this.listaGridClientes.splice(this.idxSelectedItem, 1);
        } 
        else 
        {
          console.log(`Tronó esta madre ${res.mensajeError}`);
        }
      });
    }
    this.formaCliente.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.obtenerClientes();
      this.formaCliente.reset();
      this.formaCliente.enable();
      clearInterval(interval);
    }, 2000)

  }
  OnClickEditCliente() {
    //  const idx = this.listaGridProductos.findIndex(e => e.codigoProducto === this.selectedKeys[0]);
    // Obtiene el indice seleccionado.
    const idx = this.listaGridClientes.findIndex(e => e.idCliente === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }

    // Actualiza los valores.
    if (this.idxSelectedItem > -1) {
      if (this.formaCliente.value.razonSocial) {
        this.listaGridClientes[this.idxSelectedItem].razonSocial = this.formaCliente.value.razonSocial;
        let clienteEdit = this.listaGridClientes[this.idxSelectedItem] as Cliente;
        this.facadeService.PutCliente(clienteEdit).subscribe(res => {
          if (res.exitoso) { console.log("Wii, funka la wea") } else {
            console.log(`Tronó esta madre ${res.mensajeError}`);
            this.formaCliente.reset();
          }
        });
      }
    } else {
      console.log('Debe seleccionar un elemento');
    }
    this.formaCliente.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.obtenerClientes();
      this.formaCliente.reset();
      this.formaCliente.enable();
      clearInterval(interval);
    }, 2000)

  }
  selectedKeysChange(value: any) {

  }
  onSubmitFormaCliente() {
    let cliente: clienteDTOSinID = { razonSocial: '' };
    cliente.razonSocial = this.formaCliente.value.razonSocial;
    this.facadeService.PostCliente(cliente).subscribe(res => {
      if (res.exitoso) { console.log("Wii, funka la wea") } else {
        console.log(`Tronó esta madre ${res.mensajeError}`);
      }
    });
    this.formaCliente.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.obtenerClientes();
      this.formaCliente.reset();
      this.formaCliente.enable();
      clearInterval(interval);
    }, 2000)

  }

}
