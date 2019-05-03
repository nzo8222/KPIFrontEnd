import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FacadeService } from 'src/app/shared/services/facade.service';
import { SolicitudFechas } from 'src/app/shared/interfaces/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { clienteDTO } from 'src/app/shared/interfaces/DTOs';
import { State } from '@progress/kendo-data-query';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    // bar chart
    formaGrafica: FormGroup;
    public listaGridPedidosSemanal: any[];
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
      };
      public selectedKeys: string[] = [];
      selectedKeysChange(value: any) {

    }
    public lstClientes: clienteDTO[];
    onSubmitFormaGrafica(){

    }
    OnClickObtenerClientes(){
        this.servicio.GetClientesPedido().subscribe(
          res => {
            this.lstClientes = res;
          });
      }
    // CreationFlags
    public loadedChart: boolean;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
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

    constructor(private servicio: FacadeService) { }

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

        var solicitudFecha = new SolicitudFechas();

        solicitudFecha.FechaF = new Date(2019, 4, 5);
        solicitudFecha.FechaI = new Date(2019, 3, 29);

        this.servicio.PostDatosGraficaCumplimientoProducto(solicitudFecha).subscribe(res => {
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

    }
}
