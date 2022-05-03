import {AfterViewInit, Component, Output} from '@angular/core';
import {FaceRecognitionService} from '../services/face-recognition.service';
import {FaceRecognitionResponse} from '../models/face.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  @Output() faceApiResponse: FaceRecognitionResponse[];
  imageUrl: string;
  startedProcessing: boolean;

  constructor(
    private faceRecognitionService: FaceRecognitionService
  ) {
    this.startedProcessing = false;
  }

  processImage() {
    this.startedProcessing = true;
    if (!this.imageUrl) {
      return;
    }

    this.faceRecognitionService.sendImageToAPI(this.imageUrl).subscribe(
      (response: FaceRecognitionResponse) => {
        this.faceApiResponse = JSON.parse(JSON.stringify(response));
        console.log(this.faceApiResponse);
        console.log(response);
        this.startedProcessing = false;
      }
    );
  }
}
