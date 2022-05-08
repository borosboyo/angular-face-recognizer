import {Component, Output} from '@angular/core';
import {FaceRecognitionService} from '../../service/face-recognition.service';
import {FaceRecognitionResponse} from '../../model/face.recognition.response';
import {SquareDrawerService} from "../../service/square.drawer.service";

/**
 *  Content Component
 */
@Component({
  selector: 'app-content',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @Output() faceApiResponse: FaceRecognitionResponse[];
  imageUrl: string;
  processingApiRequest: boolean;
  freshResult: boolean;


  /**
   * Constructor
   * @param faceRecognitionService - Face Recognition Service
   * @param squareDrawerService - Square Drawer Service
   */
  constructor(private faceRecognitionService: FaceRecognitionService, public squareDrawerService: SquareDrawerService) {
    this.processingApiRequest = false;
  }

  /**
   * Set the state of the webpage.
   */
  public changeFreshResult() {
    this.freshResult = false;
  }

  /**
   * Process the image from the pasted URL.
   */
  processImage() {
    this.processingApiRequest = true;
    if (!this.imageUrl) {
      return;
    }
    this.sendRequestToApi();
    this.freshResult = true;
  }

  /**
   * Call faceRecognitionService to send request to API with the image and headers
   * @private
   */
  private sendRequestToApi() {
    this.faceRecognitionService.sendImageToAPI(this.imageUrl).subscribe(
      (response: FaceRecognitionResponse) => {
        this.faceApiResponse = JSON.parse(JSON.stringify(response));
        this.processingApiRequest = false;
      }
    );
  }

  /**
   * Draw the squares indicating the faces on the image.
   * @param index - Index of the face
   * @param imageUrl - Image URL
   */
  public drawFacesSquares(index: number, imageUrl: string): string {
    return this.squareDrawerService.calculateRectanglePositions(this.faceApiResponse, index, imageUrl);
  }

  /**
   * Draw the texts indicating the faces number on the image.
   * @param index - Index of the face
   * @param imageUrl - Image URL
   */
  public drawFacesText(index: number, imageUrl: string): string {
    return this.squareDrawerService.calculateTextPositions(this.faceApiResponse, index, imageUrl);
  }

}
