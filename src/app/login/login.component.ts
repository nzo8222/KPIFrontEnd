import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { FacadeService } from '../shared/services/facade.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginDTO } from '../shared/interfaces/DTOs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    FormaLogIn: FormGroup;

    constructor(private facadeService: FacadeService,
        private translate: TranslateService,
        public router: Router,
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {
        //, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$")
        this.FormaLogIn = new FormGroup({
            'usuario': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required])
        })
    }

    onLoggedin() {
        // Si no es valido regresa.
        if (!this.FormaLogIn.valid) return;

        const login = this.FormaLogIn.value as LoginDTO;

        this.facadeService.Login(login).subscribe(
            res => {
                if(!res.exitoso) {
                    console.log(res.mensajeError);
                    return;
                } 

                // Agrega token de sesión.
                localStorage.setItem('isLoggedin', 'true')

                this.router.navigateByUrl('/dashboard');
            }
        );
    }
}
