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
   * @param faceRecognitionService
   * @param squareDrawerService
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

  public calculateRectanglePositions(index: number, imageUrl: string): string {
    let img = new Image();
    img.src = imageUrl;

    let heightMultiplier = this.calculateHeightMultiplier(img);
    let widthMultipliter = this.calculateWidthMultiplier(img);

    return this.constructRectangleDimensions(index, heightMultiplier, widthMultipliter);
  }

  private calculateHeightMultiplier(img: HTMLImageElement): number {
    return document.getElementById('img').clientHeight / img.height;
  }

  private calculateWidthMultiplier(img: HTMLImageElement): number {
    return document.getElementById('img').clientWidth / img.width;
  }

  private constructRectangleDimensions(index: number, heightMultiplier: number, widthMultipliter: number): string {
    let height = this.faceApiResponse[index].faceRectangle.height * heightMultiplier;
    let top = this.faceApiResponse[index].faceRectangle.top * heightMultiplier;
    let left = this.faceApiResponse[index].faceRectangle.left * widthMultipliter;
    let width= this.faceApiResponse[index].faceRectangle.width * widthMultipliter;

    return `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; `;
  }

  public calculateTextPositions(index: number, imageUrl: string): string {
    let img = new Image();
    img.src = imageUrl;

    let heightMultiplier = this.calculateHeightMultiplier(img);
    let widthMultipliter = this.calculateWidthMultiplier(img);

    return this.constructTextDimensions(index, heightMultiplier, widthMultipliter);
  }

  private constructTextDimensions(index: number, heightMultiplier: number, widthMultipliter: number) {
    let top = this.faceApiResponse[index].faceRectangle.top * heightMultiplier;
    let left = this.faceApiResponse[index].faceRectangle.left * widthMultipliter + 5;
    return `left: ${left}px; top: ${top}px; `;
  }
}
