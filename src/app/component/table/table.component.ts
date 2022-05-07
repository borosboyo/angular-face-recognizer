import { Component, OnInit, Input } from '@angular/core';
import { FaceRecognitionResponse } from '../../model/face.recognition.response';
import {ConverterService} from "../../service/converter.service";

/**
 * Component that contains the table with the face recognition results.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() faceApiResponse: FaceRecognitionResponse[];

  constructor(public converter: ConverterService) {
  }

  ngOnInit() {}
}
