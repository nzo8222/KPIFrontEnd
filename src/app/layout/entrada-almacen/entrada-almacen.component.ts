import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { clienteDTO, productoDTO } from 'src/app/shared/interfaces/DTOs';
import { MovimientoAlmacen, MovimientoAlmacenEdit } from 'src/app/shared/interfaces/entities';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-entrada-almacen',
  templateUrl: './entrada-almacen.component.html',
  styleUrls: ['./entrada-almacen.component.scss']
})
export class EntradaAlmacenComponent implements OnInit {
  formaAlmacen: FormGroup;
  listaGridMovimientos: MovimientoAlmacen[] = [];
  public esperawe: boolean = false;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public idxSelectedItem: number;
  public selectedKeys: string[] = [];
  tiposMovimientos = ['Entrada', 'Salida'];
  turnos = ['1', '3'];
  public lstClientes: clienteDTO[];
  public lstProductosCliente: productoDTO[];
  constructor(private facadeService: FacadeService) { }
  OnClickDeleteMovimiento(){
    this.esperawe = true;
    const idx = this.listaGridMovimientos.findIndex(e => e.idMovimientoAlmacen === this.selectedKeys[0]);
    if (idx > -1) { this.idxSelectedItem = idx; }
    if (this.idxSelectedItem > -1) {
      this.facadeService.DeleteMovimientoAlmacen(this.selectedKeys[0]).subscribe(
        res =>
        {
          if(res.exitoso)
          {
            console.log("Wii, funka la wea");
            this.OnClickObtenerMovimientos();
            this.formaAlmacen.reset();
          }
          else
          {
            console.log(`Tronó esta madre ${res.mensajeError}`);
          }
        }
      );
    }
    this.formaAlmacen.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.esperawe = false;
      this.OnClickObtenerMovimientos();
      this.formaAlmacen.controls['tipoMovimiento'].reset();
      this.formaAlmacen.controls['numeroBolsas'].reset();
      this.formaAlmacen.controls['turno'].reset();
      this.formaAlmacen.controls['folioRemision'].reset();
      this.formaAlmacen.enable();
      clearInterval(interval);
    }, 2000);
  }
  OnClickEditMovimiento() {
    this.esperawe = true;
    const idx = this.listaGridMovimientos.findIndex(e => e.idMovimientoAlmacen === this.selectedKeys[0]);

    if (idx > -1) { this.idxSelectedItem = idx; }

    // Actualiza los valores.
    if (this.idxSelectedItem > -1) {
      if (this.formaAlmacen.valid) 
      {
        var productoSeleccionado = this.lstProductosCliente.find(c => c.nombreProducto === this.formaAlmacen.value.nombreProducto);
        let movimientoEdit: MovimientoAlmacenEdit = {
          idMovimientoAlmacen: '',
          idProducto: '',
          turno: '',
          fechaMovimiento: new Date,
          folioRemision: 0,
          numBolsas: 0,
          tipoMovimiento: ''
        };
        if(this.selectedKeys[0]){
          movimientoEdit.idMovimientoAlmacen = this.selectedKeys[0];
        }
        else{
          return;
        }
        if(productoSeleccionado.idProducto){
          movimientoEdit.idProducto = productoSeleccionado.idProducto;
        }
        else{
          return;
        }
        movimientoEdit.numBolsas = this.formaAlmacen.value.numeroBolsas;
        movimientoEdit.tipoMovimiento = this.formaAlmacen.value.tipoMovimiento;
        movimientoEdit.turno = this.formaAlmacen.value.turno;
        if(this.formaAlmacen.value.folioRemision){
          movimientoEdit.folioRemision = this.formaAlmacen.value.folioRemision;
        }
        

        this.facadeService.PutMovimientoAlmacen(movimientoEdit).subscribe(
          res =>
          {
            if(res.exitoso)
            {
              console.log("Wii, funka la wea");
              this.OnClickObtenerMovimientos();
              this.formaAlmacen.reset();
            }
            else
            {
              console.log(`Tronó esta madre ${res.mensajeError}`);
            }
          });
      }
    }
    this.formaAlmacen.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.esperawe = false;
      this.OnClickObtenerMovimientos();
      this.formaAlmacen.controls['tipoMovimiento'].reset();
      this.formaAlmacen.controls['numeroBolsas'].reset();
      this.formaAlmacen.controls['turno'].reset();
      this.formaAlmacen.controls['folioRemision'].reset();
      this.formaAlmacen.enable();
      clearInterval(interval);
    }, 2000);
  }

  OnClickObtenerMovimientos() {
    this.esperawe = true;
    this.facadeService.GetMovimientosAlmacen().subscribe(
      res => {
        this.listaGridMovimientos = res;
      }
    );
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.esperawe = false;
      clearInterval(interval);
    }, 2000);
  }
  selectedKeysChange(value: any) {

  }
  ngOnInit() {
    this.formaAlmacen = new FormGroup({
      'clientes': new FormControl(null, [Validators.required]),
      //[a-z|A-Z|0-9|\s]*
      'nombreProducto': new FormControl(null, [Validators.required]),
      //'codigoProducto': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4)]),
      //'nombreProducto': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'tipoMovimiento': new FormControl('Entrada', Validators.required),
      'numeroBolsas': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'turno': new FormControl('1', Validators.required),
      'folioRemision': new FormControl(null, Validators.pattern('^[0-9]*$'))
    });
  }
  onSubmit() {
    let movimientoAlmacen = {
      // IdMovimientoAlmacen: null,
      CodigoProducto: null,
      NombreProducto: null,
      TipoMovimiento: null,
      NumBolsas: null,
      FechaMovimiento: null,
      Turno: null,
      FolioRemision: null
    }
    if (!this.lstProductosCliente) {
      return;
    }
    var productoSeleccionado = this.lstProductosCliente.find(c => c.nombreProducto === this.formaAlmacen.value.nombreProducto);
    movimientoAlmacen.CodigoProducto = productoSeleccionado.codigoProducto;
    movimientoAlmacen.NombreProducto = productoSeleccionado.nombreProducto;
    movimientoAlmacen.TipoMovimiento = this.formaAlmacen.value.tipoMovimiento;
    movimientoAlmacen.NumBolsas = this.formaAlmacen.value.numeroBolsas;
    movimientoAlmacen.Turno = this.formaAlmacen.value.turno;
    if (this.formaAlmacen.value.tipoMovimiento === "Salida") {
      movimientoAlmacen.FolioRemision = this.formaAlmacen.value.folioRemision;
    }
    this.facadeService.PostMovimientoAlmacen(movimientoAlmacen).subscribe(RespuestaServidor => {
      if (RespuestaServidor.exitoso) { console.log("funka la wea") } else {
        console.log(`Tronó esta madre ${RespuestaServidor.mensajeError}`);
      }
    });
    this.formaAlmacen.disable();
    this.selectedKeys = [];
    let interval = setInterval( () => {
      this.esperawe = false;
      this.OnClickObtenerMovimientos();
      this.formaAlmacen.controls['tipoMovimiento'].reset();
      this.formaAlmacen.controls['numeroBolsas'].reset();
      this.formaAlmacen.controls['turno'].reset();
      this.formaAlmacen.controls['folioRemision'].reset();
      this.formaAlmacen.enable();
      clearInterval(interval);
    }, 2000);
    //this.formaAlmacen.reset();
  }
  OnClickObtenerProductos() {
    this.esperawe = true;
    //selectedItem = this.lstProductosContpaq.find(p => p.codigoProducto === codigoProducto);
    let clienteSeleccionado = this.lstClientes.find(c => c.razonSocial === this.formaAlmacen.value.clientes)
    this.facadeService.GetProductosPedido(clienteSeleccionado).subscribe(
      res => {
        this.lstProductosCliente = res;
      });
      let interval = setInterval( () => {
        this.esperawe = false;
        clearInterval(interval);
      }, 2000);
  }

  OnClickObtenerClientes() {
    this.esperawe = true;
    this.facadeService.GetClientesPedido().subscribe(
      res => {
        this.lstClientes = res;
      });
      let interval = setInterval( () => {
        this.esperawe = false;
        clearInterval(interval);
      }, 2000);
  }

}
