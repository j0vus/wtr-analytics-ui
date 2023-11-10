export class utilityMethods {
  uriPath(dateRange: string, issuerId?: number, type?: string): string {
    let uri: string;
    if (type && issuerId) {
      if (dateRange != null) {
        let date = dateRange.split(":");
        if (date[1] != "" && date[2] != "") {
          uri = `?endDate=${date[2]}&${type}=${issuerId}&startDate=${date[1]}`;
        } else {
          uri = `?endDate=${this.getCurrentDate(
            false,
            0
          )}&${type}=${issuerId}&startDate=${this.getCurrentDate(true, 30)}`;
        }
      } else {
        uri = `?endDate=${this.getCurrentDate(
          false,
          0
        )}&${type}=${issuerId}&startDate=${this.getCurrentDate(true, 30)}`;
      }
    } else {
      if (dateRange != null) {
        let date = dateRange.split(":");
        if (date[1] != "" && date[2] != "") {
          uri = `?endDate=${date[2]}&startDate=${date[1]}`;
        } else {
          uri = `?endDate=${this.getCurrentDate(
            false,
            0
          )}&startDate=${this.getCurrentDate(true, 30)}`;
        }
      } else {
        uri = `?endDate=${this.getCurrentDate(
          false,
          0
        )}&startDate=${this.getCurrentDate(true, 30)}`;
      }
    }

    return uri;
  }

  getCurrentDate(isPrevious: boolean, days: number): string {
    const currentDate = new Date();
    if (isPrevious) {
      currentDate.setDate(currentDate.getDate() - days);
    }
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    // 2023-08-31 in this format
    return `${year}-${month}-${day}`;
  }

  //2023-09-03 in this format
  convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('/');
  
    if (parts.length === 3) {
      const month = parseInt(parts[0]);
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);

      const date = new Date(year, month - 1, day); 

      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
    }

    return '';
  }

}
