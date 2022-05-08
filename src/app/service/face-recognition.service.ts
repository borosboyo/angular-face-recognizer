import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../enviroment/environment';
import {FaceRecognitionResponse} from '../model/face.recognition.response';

/**
 * Face recognition service
 */
@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * @description - This method is used to get the face recognition results.
   * @param imageUrl - The image url.
   */
  sendImageToAPI(imageUrl: string) {
    const headers = FaceRecognitionService.getHeaders(environment.subscriptionKey);
    const params = FaceRecognitionService.getParameters();
    const body = {url: imageUrl};
    return this.httpClient.post<FaceRecognitionResponse>(environment.endpoint, body, {headers, params});
  }

  /**
   * @description - This method is used to set the subscription key of the user.
   * @param subscriptionKey
   * @private
   */
  private static getHeaders(subscriptionKey: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);

    return headers;
  }

  /**
   * @description - This method is used to set the parameters of the request.
   * @private
   */
  private static getParameters() {
    return new HttpParams()
      .set(
        'returnFaceAttributes',
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      );
  }
}
