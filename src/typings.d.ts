// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare module 'webstomp-client' {
  interface Webstomp {
    over(socketType: any): WebstompClient;
  }
  interface WebstompClient {
    connect(headers: {login: string; passcode: string}, connectCallback: () => any, errorCallback?: (error: any) => any);
    subscribe(destination: string, callback: (message: StompMessage) => any);
  }
  interface StompMessage {
    body: string;
  }
  const Webstomp: Webstomp;
  export = Webstomp;
}
