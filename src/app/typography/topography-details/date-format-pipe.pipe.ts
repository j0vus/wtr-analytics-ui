import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormatPipe",
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date(value);
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }
}
