import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { clienteDTO, productoDTO, productoDTOConCliente } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.scss']
})
export class AdministrarProductosComponent implements OnInit {
  formaProducto: FormGroup;
  constructor(private facadeService: FacadeService) { }
  public lstClientes: clienteDTO[];
  listaGridProductos: productoDTO[];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public selectedKeys: string[] = [];
  ngOnInit() {
    this.formaProducto = new FormGroup({ 
      'clientes': new FormControl(null, [Validators.required]),
      'nombreProducto': new FormControl(null, [Validators.required, Validators.pattern('[a-z|A-Z|0-9|\s]*'), Validators.minLength(5), Validators.maxLength(20)]),
      'codigo': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(4),Validators.maxLength(5)]),
    });
  }
  OnClickObtenerProductosPorCliente(){
    let nombreCliente = this.formaProducto.value.clientes;
    let selectedItem;
    selectedItem = this.lstClientes.find(c => c.razonSocial === nombreCliente);
    
    this.facadeService.GetProductosPedido(selectedItem).subscribe(
     res => {
       this.listaGridProductos = res;
     });
    
  }
  selectedKeysChange(value: any) {

  }
  OnClickObtenerClientes(){
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        this.lstClientes = res;
      });
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
    selectedItem = this.lstClientes.find(c => c.razonSocial === nombreCliente);
    
    productoDTOConCliente.codigoProducto = this.formaProducto.value.codigo;
    productoDTOConCliente.idCliente = selectedItem.idCliente;
    productoDTOConCliente.nombreProducto = this.formaProducto.value.nombreProducto;

    this.facadeService.PostProducto(productoDTOConCliente).subscribe(res => {
      if (res.exitoso) { console.log("Wii, funka la wea") } else {
        console.log(`Tronó esta madre ${res.mensajeError}`);
      }
    });
    this.formaProducto.reset();
  }
}
