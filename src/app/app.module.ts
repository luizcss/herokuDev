import { LoginFormComponent } from './seguranca/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';

import { CavaleteListComponent } from './features/Cavaletes/presentation/screens/cavalete-list/cavalete-list.component';
import { CavaleteFormComponent } from './features/Cavaletes/presentation/screens/cavalete-form/cavalete-form.component';
import { CavaletesRepository } from './features/Cavaletes/domain/repositories/cavaletes.repository';
import { CavaletesRepositoryImpl } from './features/Cavaletes/data/repositories/cavaletes.repository.impl';
import { CavaleteDataSource, CavaletesDataSourceImpl } from './features/Cavaletes/data/datasources/cavaletes.data-sources';
import { CavaleteService } from './features/Cavaletes/cavalete.service';
import { PaginatorBR } from './utils/paginatorBR';
import { SegurancaModule } from './seguranca/seguranca.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    CavaleteListComponent,
    CavaleteFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslocoRootModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.dominiosLiberados],
        disallowedRoutes: [environment.oauthTokenUrl]
      }
    }),
    SegurancaModule
  ],
  providers: [
    CavaleteService,
    { provide: CavaletesRepository, useClass: CavaletesRepositoryImpl },
    { provide: CavaleteDataSource, useClass: CavaletesDataSourceImpl },
    MaterialModule, { provide: MatPaginatorIntl, useClass: PaginatorBR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

