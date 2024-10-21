// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    interface Window {
      dataLayer?: { [k: string]: unknown }[];
      gtag?: unknown;
      fbq?: (name: 'track', event: string, data: { [k: string]: unknown }) => void;
      _learnq?: unknown[][];
      ElevarInvalidateContext?: () => void;
      ElevarDataLayer?: { [k: string]: unknown }[];
    }
  
    namespace App {
      // interface Error {}
      // interface Locals {}
      // interface Platform {}
    }
  }
  
  export {};
  