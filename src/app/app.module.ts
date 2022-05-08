import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MainComponent} from './component/main/main.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {FaceRecognitionService} from './service/face-recognition.service';
import {TableComponent} from './component/table/table.component';

/**
 * The main module of the application.
 */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    TableComponent,
  ],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [
    FaceRecognitionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
