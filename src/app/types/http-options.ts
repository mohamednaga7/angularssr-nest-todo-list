import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions {
    headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined;
    reportProgress?: boolean | undefined;
    observe?: string
    context?: HttpContext | undefined;
    params?: HttpParams | undefined;
    responseType?: "json" | undefined;
    withCredentials?: boolean | undefined;
}