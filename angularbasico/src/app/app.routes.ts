import { Routes } from '@angular/router';
import { ProdutoComponent } from './component/produto-component/produto-component';
import { HomeComponent } from './component/home-component/home-component';

export const routes: Routes = [
{path: 'produtos', component: ProdutoComponent},
{path: '', component: HomeComponent}

];
