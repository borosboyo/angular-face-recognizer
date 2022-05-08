import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  /**
   * Convert the given gender response to Hungarian string.
   * @param arg - the gender to convert
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
   * @param arg - the glasses to convert
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
   * @param arg - The boolean to convert.
   */
  public convertBoolean(arg: boolean): string {
    return arg ? 'Igen' : 'Nem';
  }

  /**
   * Convert the given color response to Hungarian string.
   * @param color - The color to convert.
   */
  public convertHairColor(color: string) {
    switch (color) {
      case 'black':
        return 'Fekete';
      case 'brown':
        return 'Barna';
      case 'blond':
        return 'Szőke';
      case 'red':
        return 'Vörös';
      case 'gray':
        return 'Ősz';
      case 'other':
        return 'Egyéb';
      case 'white':
        return 'Fehér';
    }
  }
}

