import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class DateFormatPipe implements PipeTransform {
  private timeZones: JsonModel[] = [];

  constructor(private http: HttpClient) {
    this.loadTimeZones();
  }

  private loadTimeZones() {
    this.http.get<JsonModel[]>("/assets/timezone.json").subscribe((data) => {
      this.timeZones = data;
    });
  }

  transform(value: Date | string | number | undefined): string {
    if (!value) return "";

    let locale = localStorage.getItem("userLocale") ?? "tr-TR";

    const date = new Date(value);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  }
}

export class JsonModel {
  locale?: string;
  name?: string;
  currency?: string;
  timezones?: TimezoneModel[];
}

export class TimezoneModel {
  name?: string;
}
