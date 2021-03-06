import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'entrada-almacen', loadChildren: './entrada-almacen/entrada-almacen.module#EntradaAlmacenModule' },
            { path: 'forma-pedido-cliente', loadChildren: './forma-pedido-cliente/forma-pedido-cliente.module#FormaPedidoClienteModule' },
            { path: 'agregar-clientes-productos', loadChildren: './agregar-clientes-productos/agregar-clientes-productos.module#AgregarClientesProductosModule' },
            { path: 'administrar-productos', loadChildren: './administrar-productos/administrar-productos.module#AdministrarProductosModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
