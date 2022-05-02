import { Component } from '@angular/core';
import { FaceRecognitionService } from '../services/face-recognition.service';
import { FaceRecognitionResponse } from '../models/face.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent {
  faceApiResponse: FaceRecognitionResponse;
  imageUrl: string;

  constructor(
    private faceRecognitionService: FaceRecognitionService
  ) {}

  processImage() {
    if (!this.imageUrl) {
      return;
    }

    this.faceRecognitionService.sendImageToAPI(this.imageUrl).subscribe(
      (response: FaceRecognitionResponse) => {
        this.faceApiResponse = response;
        console.log(this.faceApiResponse);
      }
    );
  }

}
