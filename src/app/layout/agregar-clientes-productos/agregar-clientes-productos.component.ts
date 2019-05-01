import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/interfaces/entities';
import { State } from '@progress/kendo-data-query';
import { clienteDTOSinID } from 'src/app/shared/interfaces/DTOs';

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
  public selectedKeys: string[] = [];
  constructor(private facadeService: FacadeService) { }

  ngOnInit() {
    this.formaCliente = new FormGroup({ 
      'razonSocial': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$'), Validators.minLength(5)]),
     });
  }
  obtenerClientes(){
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        this.listaGridClientes = res;
      });
  }
  
  selectedKeysChange(value: any) {

  }
  onSubmitFormaCliente(){
    let cliente: clienteDTOSinID = {razonSocial: ''};
    cliente.razonSocial = this.formaCliente.value.razonSocial;
    this.facadeService.PostCliente(cliente).subscribe(res => {
      if (res.exitoso) { console.log("Wii, funka la wea") } else {
        console.log(`Tronó esta madre ${res.mensajeError}`);
      }
    });
    this.formaCliente.reset();
  }

}
