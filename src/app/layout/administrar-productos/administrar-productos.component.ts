import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { clienteDTO, productoDTO, productoDTOConCliente } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';
import { NotificationService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.scss']
})
export class AdministrarProductosComponent implements OnInit {
  formaProducto: FormGroup;
  constructor(private facadeService: FacadeService, private notifications: NotificationService) { }
  public lstClientes: clienteDTO[];
  public listaGridProductos: productoDTO[] = [];
  public esperawe: boolean = false;
  public idxSelectedItem: number;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public selectedKeys: string[] = [];
  ngOnInit() {
    this.loadClienteList();
    this.formaProducto = new FormGroup({ 
      'clientes': new FormControl(null, [Validators.required]),
      'nombreProducto': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]*$'), Validators.minLength(5), Validators.maxLength(20)]),
      'codigo': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(4),Validators.maxLength(4)]),
    });
  }
  OnClickObtenerProductosPorCliente(){
    if(!this.lstClientes)
    {
      this.notifications.showError("Seleccioné un cliente valido.");
      return
    }
 
    let nombreCliente = this.formaProducto.value.clientes;
    let selectedItem;
    if(!this.lstClientes.find(c => c.razonSocial === this.formaProducto.value.clientes))
    {
      this.notifications.showError("Seleccioné un cliente valido.");
      return
    }
    selectedItem = this.lstClientes.find(c => c.razonSocial === nombreCliente);
    
    this.facadeService.GetProductosPedido(selectedItem).subscribe(
     res => {
       if(!res.exitoso){
        this.notifications.showError(res.mensajeError);
        return;
       }
       const listaProductosGrid = res.payload as productoDTO[];

       this.listaGridProductos = listaProductosGrid;
       this.notifications.showSuccess('Se cargaron los productos');
     });
     this.esperawe = true;
     let interval = setInterval( () => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000);
  }
  selectedKeysChange(value: any) {

  }
  loadClienteList(){

    this.facadeService.GetClientesPedido().subscribe(
      res => {
        if(!res.exitoso){
          this.notifications.showError(res.mensajeError);
          return;
        }
        const cliente = res.payload as clienteDTO[];

        this.lstClientes = cliente;

        this.notifications.showSuccess('Se cargaron las listas');
      });
      this.selectedKeys = [];
      this.esperawe = true;
      let interval = setInterval( () => {
        this.esperawe = false;
        clearInterval(interval);
      }, 2000);
  }
  OnClickObtenerClientes(){
   this.loadClienteList();
  }
  onSubmitFormaProducto(){

    let productoDTOConCliente: productoDTOConCliente = {
      idProducto: '',
      codigoProducto: 0,
      idCliente: '',
      nombreProducto: ''
    };
    let nombreCliente = this.formaProducto.value.clientes;
    let selectedItem;
    if(!this.lstClientes)
    {
      this.notifications.showError("Seleccioné un cliente valido.");
      return
    }
    if(!this.lstClientes.find(c => c.razonSocial === nombreCliente))
    {
      this.notifications.showError("Seleccioné un cliente valido.");
      return
    }
    selectedItem = this.lstClientes.find(c => c.razonSocial === nombreCliente);
    
    productoDTOConCliente.codigoProducto = this.formaProducto.value.codigo;
    productoDTOConCliente.idCliente = selectedItem.idCliente;
    productoDTOConCliente.nombreProducto = this.formaProducto.value.nombreProducto;

    this.facadeService.PostProducto(productoDTOConCliente).subscribe(res => {
      if (res.exitoso) 
      {
        this.notifications.showSuccess("Se agrego el producto correctamente.");
        } 
        else 
        {
          this.notifications.showError(res.mensajeError);
      }
    });
    this.formaProducto.disable();
    this.selectedKeys = [];
    this.esperawe = true;
    let interval = setInterval( () => {
      this.esperawe = false;
      this.OnClickObtenerProductosPorCliente();
      this.formaProducto.controls['codigo'].reset();
      this.formaProducto.controls['nombreProducto'].reset();
      this.formaProducto.enable();
      clearInterval(interval);
    }, 2000);
  }
  OnClickDeleteProducto() {
    this.esperawe = true;
    if(!this.listaGridProductos){
      this.notifications.showError("No hay productos en la tabla.");
      return
    }
    const idx = this.listaGridProductos.findIndex(e => e.idProducto === this.selectedKeys[0]);
    if(!this.listaGridProductos.find(c => c.idProducto === this.selectedKeys[0]))
    {
      this.notifications.showError("No se encontro el producto seleccionado.");
      return
    }
    const producto = this.listaGridProductos.find(c => c.idProducto === this.selectedKeys[0]);
    if (idx > -1) {
      this.idxSelectedItem = idx;
      this.facadeService.DeleteProducto(producto.idProducto).subscribe(res => {
        if (res.exitoso) {
          this.notifications.showSuccess("Se eliminó el producto correctamente.");
        } 
        else 
        {
          this.notifications.showError(res.mensajeError);
        }
      });
    }
    this.formaProducto.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.esperawe = false;
      this.OnClickObtenerProductosPorCliente();
      this.formaProducto.controls['codigo'].reset();
      this.formaProducto.controls['nombreProducto'].reset();
      this.formaProducto.enable();
      clearInterval(interval);
    }, 2000);

  }
  OnClickEditProducto() {
    
    //  const idx = this.listaGridProductos.findIndex(e => e.codigoProducto === this.selectedKeys[0]);
    // Obtiene el indice seleccionado.
    if(!this.listaGridProductos)
    {
      this.notifications.showError("No hay productos en la tabla.");
      return
    }
    if(!this.listaGridProductos.findIndex(e => e.idProducto === this.selectedKeys[0]))
    {
      this.notifications.showError("No se encontró el producto seleccionadó.");
      return
    }
    const idx = this.listaGridProductos.findIndex(e => e.idProducto === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }

    // Actualiza los valores.
    if (this.idxSelectedItem > -1) {
      if (this.formaProducto.value.nombreProducto && this.formaProducto.value.codigo) {
        this.listaGridProductos[this.idxSelectedItem].nombreProducto = this.formaProducto.value.nombreProducto;
        this.listaGridProductos[this.idxSelectedItem].codigoProducto = this.formaProducto.value.codigo;
        let productoEdit = this.listaGridProductos[this.idxSelectedItem] as productoDTO;
        this.facadeService.PutProducto(productoEdit).subscribe(res => {
          if (res.exitoso) 
          { 
            this.notifications.showSuccess("Se editó el producto correctamente."); 
          } 
          else 
          {
            this.notifications.showError(res.mensajeError);
          }
        });
      } else { this.notifications.showError("Ingrese un nombre y un codigo de producto."); return}
    } else {
      this.notifications.showError("Debe seleccionar un producto.");
      return
    }
    this.formaProducto.disable();
    this.selectedKeys = [];
    this.esperawe = true;
    let interval = setInterval( () => {
      this.esperawe = false;
      this.OnClickObtenerProductosPorCliente();
      this.formaProducto.controls['codigo'].reset();
      this.formaProducto.controls['nombreProducto'].reset();
      this.formaProducto.enable();
      clearInterval(interval);
    }, 2000);

  }
}
