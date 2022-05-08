import {FaceRecognitionResponse} from "../model/face.recognition.response";
import {Injectable, Input} from "@angular/core";

/**
 * Square drawer service
 */
@Injectable({
  providedIn: 'root'
})
export class SquareDrawerService {
  @Input() faceApiResponse: FaceRecognitionResponse[];

  constructor() {
  }
}
