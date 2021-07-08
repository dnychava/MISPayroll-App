
export class AppConstants{
    public static BASE_URL: string = 'http://localhost:8082';
    public static START: string = "START";

    public static END: string = "END";
    
    public static CUSTOM_DATE_FORMATS = {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        },
      };
}

