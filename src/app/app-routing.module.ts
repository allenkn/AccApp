import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainWindowComponent} from './pages/main-window/main-window.component';
import {ClientListComponent} from './pages/client-list/client-list.component';
import {SalesReportComponent} from './pages/sales-report/sales-report.component';
import {MainLedgerComponent} from './pages/main-ledger/main-ledger.component';
import {EntryMainComponent} from './pages/entry-main/entry-main.component';

const routes: Routes = [
   {path: '', component: MainWindowComponent},
   {path: 'client-list', component: ClientListComponent},
   {path: 'sales-report', component: SalesReportComponent},
   {path: 'main-ledger', component: MainLedgerComponent},
   {path: 'entry-main', component: EntryMainComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
