import {FaceRecognitionResponse} from "../model/face.recognition.response";
import {Injectable, Input} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SquareDrawerService {
  @Input() faceApiResponse: FaceRecognitionResponse[];

  constructor() {
  }
}
