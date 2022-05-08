import {FaceRecognitionResponse} from "../model/face.recognition.response";
import {Injectable, Input} from "@angular/core";

/**
 * Square drawer service
 */
@Injectable({
  providedIn: 'root'
})
export class SquareDrawerService {


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
   * Calculate the location of the faces on the image.
   * @param faceApiResponse - The face recognition response.
   * @param index - The index of the face.
   * @param imageUrl - The image url.
   */
  public calculateRectanglePositions(faceApiResponse: FaceRecognitionResponse[], index: number, imageUrl: string): string {
    let img = new Image();
    img.src = imageUrl;

    let heightMultiplier = SquareDrawerService.calculateHeightMultiplier(img);
    let widthMultipliter = SquareDrawerService.calculateWidthMultiplier(img);

    return SquareDrawerService.constructRectangleDimensions(faceApiResponse, index, heightMultiplier, widthMultipliter);
  }

  /**
   * Calculate the location of the numbered faces text on the image.
   * @param faceApiResponse - The face recognition response.
   * @param index - index of the face
   * @param imageUrl - image url
   */
  public calculateTextPositions(faceApiResponse: FaceRecognitionResponse[], index: number, imageUrl: string): string {
    let img = new Image();
    img.src = imageUrl;

    let heightMultiplier = SquareDrawerService.calculateHeightMultiplier(img);
    let widthMultipliter = SquareDrawerService.calculateWidthMultiplier(img);

    return SquareDrawerService.constructTextDimensions(faceApiResponse, index, heightMultiplier, widthMultipliter);
  }

  /**
   * Construct the rectangle dimensions.
   * @param faceApiResponse - The face api response.
   * @param index - index of the face
   * @param heightMultiplier - height multiplier
   * @param widthMultipliter - width multiplier
   * @private
   */
  private static constructRectangleDimensions(faceApiResponse: FaceRecognitionResponse[], index: number, heightMultiplier: number, widthMultipliter: number): string {
    let height = faceApiResponse[index].faceRectangle.height * heightMultiplier;
    let top = faceApiResponse[index].faceRectangle.top * heightMultiplier;
    let left = faceApiResponse[index].faceRectangle.left * widthMultipliter + 30;
    let width = faceApiResponse[index].faceRectangle.width * widthMultipliter;

    return `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; `;
  }

  /**
   * Construct the text dimensions.
   * @param faceApiResponse - The face api response.
   * @param index - index of the face
   * @param heightMultiplier - height multiplier
   * @param widthMultipliter - width multiplier
   * @private
   */
  private static constructTextDimensions(faceApiResponse: FaceRecognitionResponse[], index: number, heightMultiplier: number, widthMultipliter: number) {
    let top = faceApiResponse[index].faceRectangle.top * heightMultiplier;
    let left = faceApiResponse[index].faceRectangle.left * widthMultipliter + 35;
    return `left: ${left}px; top: ${top}px; `;
  }
}
