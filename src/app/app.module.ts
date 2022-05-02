import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { FaceRecognitionService } from './services/face-recognition.service';
import { TableComponent } from './table/table.component';
import {BoolToYesNoPipe} from './pipes/bool-to-yes-no/bool-to-yes-no.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    TableComponent,
    BoolToYesNoPipe,
  ],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [
    FaceRecognitionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
