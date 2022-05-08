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
    squareDrawerService.faceApiResponse = this.faceApiResponse;
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
        console.log(this.faceApiResponse);
        console.log(response);
        this.processingApiRequest = false;
      }
    );
  }

  /**
   * Calculate the location of the faces on the image.
   * @param index
   * @param imageUrl
   */
  public calculateRectanglePositions(index: number, imageUrl: string): string {
    let img = new Image();
    img.src = imageUrl;

    let heightMultiplier = MainComponent.calculateHeightMultiplier(img);
    let widthMultipliter = MainComponent.calculateWidthMultiplier(img);

    return this.constructRectangleDimensions(index, heightMultiplier, widthMultipliter);
  }

  /**
   * Calculate the height multiplier.
   * @param img - The image to be drawn
   * @private
   */
  private static calculateHeightMultiplier(img: HTMLImageElement): number {
    return document.getElementById('img').getBoundingClientRect().height / img.height;
  }

  /**
   * Calculate the width multiplier.
   * @param img - The image to be drawn.
   * @private
   */
  private static calculateWidthMultiplier(img: HTMLImageElement): number {
    return document.getElementById('img').getBoundingClientRect().width / img.width;
  }

  /**
   * Construct the rectangle dimensions.
   * @param index - index of the face
   * @param heightMultiplier - height multiplier
   * @param widthMultipliter - width multiplier
   * @private
   */
  private constructRectangleDimensions(index: number, heightMultiplier: number, widthMultipliter: number): string {
    let height = this.faceApiResponse[index].faceRectangle.height * heightMultiplier;
    let top = this.faceApiResponse[index].faceRectangle.top * heightMultiplier;
    let left = this.faceApiResponse[index].faceRectangle.left * widthMultipliter + 30;
    let width= this.faceApiResponse[index].faceRectangle.width * widthMultipliter;

    return `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; `;
  }

  /**
   * Calculate the location of the numbered faces text on the image.
   * @param index - index of the face
   * @param imageUrl - image url
   */
  public calculateTextPositions(index: number, imageUrl: string): string {
    let img = new Image();
    img.src = imageUrl;

    let heightMultiplier = MainComponent.calculateHeightMultiplier(img);
    let widthMultipliter = MainComponent.calculateWidthMultiplier(img);

    return this.constructTextDimensions(index, heightMultiplier, widthMultipliter);
  }

  /**
   * Construct the text dimensions.
   * @param index - index of the face
   * @param heightMultiplier - height multiplier
   * @param widthMultipliter - width multiplier
   * @private
   */
  private constructTextDimensions(index: number, heightMultiplier: number, widthMultipliter: number) {
    let top = this.faceApiResponse[index].faceRectangle.top * heightMultiplier;
    let left = this.faceApiResponse[index].faceRectangle.left * widthMultipliter + 35;
    return `left: ${left}px; top: ${top}px; `;
  }
}
