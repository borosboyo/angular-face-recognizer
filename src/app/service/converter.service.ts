import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  /**
   * Convert the given gender response to Hungarian string.
   * @param arg
   */
  public convertGender(arg: string): string {
    if (arg === 'male') {
      return 'Férfi'
    } else {
      return 'Nő'
    }
  }

  /**
   * Convert the given glasses response to Hungarian string.
   * @param arg
   */
  public convertGlasses(arg: string): string {
    if (arg === 'ReadingGlasses') {
      return 'Olvasó szemüveg';
    } else {
      return 'Nem szemüveges'
    }
  }

  /**
   * Convert the given boolean to Hungarian string.
   * @param arg
   */
  public convertBoolean(arg: boolean): string {
    return arg ? 'Igen' : 'Nem';
  }
}

