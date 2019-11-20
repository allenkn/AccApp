import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainWindowComponent } from './pages/main-window/main-window.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';
import { MainLedgerComponent } from './pages/main-ledger/main-ledger.component';
import { EntryMainComponent } from './pages/entry-main/entry-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    ClientListComponent,
    SalesReportComponent,
    MainLedgerComponent,
    EntryMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
