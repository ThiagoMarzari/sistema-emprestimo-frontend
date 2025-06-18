declare module 'quagga' {
  export interface QuaggaResult {
    codeResult: {
      code: string;
      format: string;
      start: number[];
      end: number[];
      [key: string]: any;
    };
    [key: string]: any;
  }
}
