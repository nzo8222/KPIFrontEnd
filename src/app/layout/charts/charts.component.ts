import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { SolicitudGraficaCumplimiento } from 'src/app/shared/interfaces/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { clienteDTO, SolicitudGraficaCumplimientioDTO, PedidoSemanalGraficaDTO } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';
import { NotificationService } from 'src/app/shared/services/notifications.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    // bar chart
    formaGrafica: FormGroup;
    public esperawe: boolean = false;
    public listaGridPedidosSemanal: PedidoSemanalGraficaDTO[] = [];
    public idxSelectedItem: number;
    public lstClientes: clienteDTO[] = [];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
      };
      public selectedKeys: string[] = [];
      selectedKeysChange(value: any) {

    }
    onClickObtenerGrafica(){
        this.loadedChart = false;
        this.lineChartData = [];
        this.barChartData = [];
        if(!this.listaGridPedidosSemanal)
        {
            this.notifications.showError("Seleccioné un pedido valido.");
            return
        }
        if(!this.listaGridPedidosSemanal.find(e => e.idPedidoSemanal === this.selectedKeys[0]))
        {
            this.notifications.showError("Seleccioné un pedido valido.");
            return
        }
        const idx = this.listaGridPedidosSemanal.findIndex(e => e.idPedidoSemanal === this.selectedKeys[0]);
        if (idx > -1) { this.idxSelectedItem = idx; }
        if (this.idxSelectedItem > -1) {
            var solicitudGraficaCumplimiento = new SolicitudGraficaCumplimiento();
            //   this.listaGridProductos[this.idxSelectedItem].cantidadBolsas = this.pedidoClienteForm.value.cantidad;
        solicitudGraficaCumplimiento.idPedidoSemanal = this.listaGridPedidosSemanal[this.idxSelectedItem].idPedidoSemanal;

        this.servicio.PostDatosGraficaCumplimientoProducto(solicitudGraficaCumplimiento).subscribe(res => {
            // Rellena eje Y con información (ChartLabelData).
            res.forEach(c => {
                this.lineChartData.push({
                    data: c.cumplimientos,
                    label: c.nombreProducto
                })
            });
            // TODO: Preguntar qué va en eje X (ChartLabel)
            this.loadedChart = true;
        });
        this.servicio.PostDatosGraficaBarrasCumplimientoProducto(solicitudGraficaCumplimiento).subscribe(
            res => {
                res.forEach(c => {
                    this.barChartData.push({
                        data: c.numBolsasEntregadas,
                        label: "Bolsas Entregadas"
                    })
                    this.barChartData.push({
                        data: c.numBolsasPedidoDiario,
                        label: "Bolsas Pedidas"
                    })
                })
            }
        )
        
        }
    }

    onSubmitFormaGrafica(){
        if(!this.lstClientes)
        {
            this.notifications.showError("Seleccioné un cliente valido.");
            return
        }
        if(!this.lstClientes.find(c=> c.razonSocial===this.formaGrafica.value.clientes))
        {
            this.notifications.showError("Seleccioné un cliente valido.");
            return
        }

        var clienteSeleccionado = this.lstClientes.find(c=>c.razonSocial===this.formaGrafica.value.clientes)
       
        let solicitud: SolicitudGraficaCumplimientioDTO = {fechaFin: new Date,
                                                           fechaInicio: new Date,
                                                           idCliente: ''};
 
        solicitud.idCliente = clienteSeleccionado.idCliente;
        solicitud.fechaInicio = this.formaGrafica.value.fechaInicio;
        solicitud.fechaFin = this.formaGrafica.value.fechaFin;
        this.servicio.PostSolicitudPedidosSemanales(solicitud).subscribe(
            res => {
                if(res.exitoso)
                {
                    this.notifications.showSuccess("Se cargo la lista de pedidos semanales correctamente.");
                    const listaPedidosSemanales = res.payload as PedidoSemanalGraficaDTO[];
                    this.listaGridPedidosSemanal = listaPedidosSemanales;
                }else
                {
                    this.notifications.showError(res.mensajeError);
                }
            
          });
    }
    loadListCliente(){
        this.servicio.GetClientesPedido().subscribe(
            res => {
  
              if(!res.exitoso) { 
                  this.notifications.showError(res.mensajeError);
                  return;
              };
  
              const pedidos = res.payload as clienteDTO[];
              this.lstClientes = pedidos;
              this.notifications.showSuccess('Se cargaron la lista de clientes correctamente.');
  
            });
    }
    OnClickObtenerClientes(){
        this.loadListCliente();
      }
    // CreationFlags
    public loadedChart: boolean;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo'
    ];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[] = [
        // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string;

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string;

    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string;

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean;

    public polarAreaChartType: string;

    // lineChart
    // public lineChartData: Array<any> = [
    //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    //     { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    // ];

    public lineChartData: any[] = [];

    public lineChartLabels: Array<any> = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor(private servicio: FacadeService, private notifications: NotificationService) { }

    ngOnInit() {
        this.formaGrafica = new FormGroup({ 
            'clientes': new FormControl(null, [Validators.required]),
            //[a-z|A-Z|0-9|\s]*
            'fechaInicio': new FormControl(null, [Validators.required]),
            'fechaFin': new FormControl(null, [Validators.required]),
          });
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.doughnutChartType = 'doughnut';
        this.radarChartType = 'radar';
        this.pieChartType = 'pie';
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
        this.lineChartLegend = true;
        this.lineChartType = 'line';

        this.loadListCliente();
    }
}
