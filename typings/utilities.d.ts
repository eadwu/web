// Type definitions for utilities.ts
// Project: https://gitlab.com/bt-wcsp/web
// Definitions by: Edmund Wu <https://gitlab.com/eadwu>

declare function getRandomInteger (min: number, max: number): number;
declare function getOrdinalSuffix (num: number): string;
declare function forNDo (n: number, func: (index: number) => void): void;
declare function mapRange (n: number, func: (index: number) => any): any[];
