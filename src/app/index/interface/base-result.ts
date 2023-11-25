export interface IBaseCollectionResult<T> {
    results?: T;
    status?: boolean;
    status_code?: string;
    message?: string;
    errorMessage?: string;
    error?:string;
}

export interface IBaseSingleResult<T> {
    result?: T;
    status?: boolean;
    status_code?: string;
    message?: string;
    errorMessage?: string;
    error?:string;
}

export interface IBaseCollectionWithPangingResult<T> {
    results?: T;
    status?: boolean;
    status_code?: string;
    totalRecord?: any|number;
    page?: any|number;
    perPage?: any|number;
    message?: string;
    errorMessage?: string;
}
export class ILogin {      
    username: string | undefined;    
    password: string | undefined;    
  }  