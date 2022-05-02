import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FaceRecognitionResponse } from '../models/face.model';

@Injectable()
export class FaceRecognitionService {
  constructor(private httpClient: HttpClient) {}

  sendImageToAPI(imageUrl: string) {
    const headers = this.getHeaders(environment.subscriptionKey);
    const params = this.getParameters();
    const body = { url : imageUrl };
    return this.httpClient.post<FaceRecognitionResponse>(environment.endpoint, body, { headers, params });
  }

  private getHeaders(subscriptionKey: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);

    return headers;
  }

  private getParameters() {
    const httpParams = new HttpParams()
      .set(
        'returnFaceAttributes',
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      );

    return httpParams;
  }
}
