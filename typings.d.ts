declare module '*.css';
declare module '*.png';
declare module '*.jpg';

declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare module '*.less' {
  type KeyValue = { [key: string]: string };
  const res: KeyValue;
  export default res;
}

declare var window: Window & typeof globalThis;
interface Window {
  HanziWriter: any;
}
declare interface SelfElement extends Element {
  onpointerdown?: (e: any) => void;
}

declare module 'emoji-mart';
