declare module 'random-animals-api' {
  export function cat(): Promise<string>;
  export function dog(): Promise<string>;
  export function bunny(): Promise<string>;
  export function duck(): Promise<string>;
  export function fox(): Promise<string>;
  export function lizard(): Promise<string>;
  export function shiba(): Promise<string>;
  export function panda(): Promise<string>;
}
