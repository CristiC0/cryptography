import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptographyFormComponent } from './cryptography-form/cryptography-form.component';
import { OperationsService } from './operations.service';
import { AESOperationsService } from './aesoperations.service';
import { AESGridComponent } from './aes-grid/aes-grid.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [AppComponent, CryptographyFormComponent, AESGridComponent, GridComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [OperationsService, AESOperationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
