import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacadeService } from 'src/app/shared/services/facade.service';

@Component({
    selector: 'app-bs-element',
    templateUrl: './bs-element.component.html',
    styleUrls: ['./bs-element.component.scss'],
    animations: [routerTransition()]
})
export class BsElementComponent implements OnInit {
    formaInventarioFisico: FormGroup;

    constructor(private facadeService: FacadeService) {
        this.formaInventarioFisico = new FormGroup({
            'codigoProducto': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(4)]),
            'nombreProducto': new FormControl(null, Validators.required),
            'numBolsas': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
            'fechaInventario': new FormControl(null, [Validators.required]),
            'folioRemision': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
        })
    }

    ngOnInit() {}
    onSubmit() {
        let inventarioFisico = {
            codigoProducto: null,
            nombreProducto: null,
            numBolsas: null,
            fechaInventario: null,
            folioRemision: null
        }
        inventarioFisico.codigoProducto = this.formaInventarioFisico.value.codigoProducto;
        inventarioFisico.nombreProducto = this.formaInventarioFisico.value.nombreProducto;
        inventarioFisico.numBolsas = this.formaInventarioFisico.value.numBolsas;
        inventarioFisico.fechaInventario = this.formaInventarioFisico.value.fechaInventario;
        inventarioFisico.folioRemision = this.formaInventarioFisico.value.folioRemision;

        this.facadeService.PostInventarioFisico(inventarioFisico).subscribe(res => {
            if(res.exitoso) { console.log("funka la wea")} else {
                console.log(`Tronó esta madre ${res.mensajeError}`);
            }
        });
        this.formaInventarioFisico.reset();
    }
}
