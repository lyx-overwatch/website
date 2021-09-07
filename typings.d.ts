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
