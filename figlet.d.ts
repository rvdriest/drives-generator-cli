declare module "figlet" {
  interface Fonts {
    [fontName: string]: string;
  }

  interface Options {
    font?: string;
    horizontalLayout?:
      | "default"
      | "full"
      | "fitted"
      | "controlled smushing"
      | "universal smushing";
    verticalLayout?:
      | "default"
      | "full"
      | "fitted"
      | "controlled smushing"
      | "universal smushing";
    width?: number;
    whitespaceBreak?: boolean;
  }

  type FigletCallback = (error: Error | null, result: string | null) => void;

  function text(str: string, callback: FigletCallback): void;
  function text(str: string, options: Options, callback: FigletCallback): void;
  function textSync(str: string, options?: Options): string;
  function loadFont(font: string, cb: FigletCallback): void;
  function loadFontSync(font: string): void;
  function defaults(opts: Options): void;
  function fonts(cb: (err: Error | null, fonts: string[]) => void): void;
  function fontsSync(): string[];
}
