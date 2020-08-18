interface IArgs {
  suite: string;
  device: string;
  env: string;
  randRunId: string;
  os: string;
  browser: string;
  client: string;
  suiteID: number;
  projectID: number;
  url: string;
}

declare namespace NodeJS {
  interface Global {
    ARGS: IArgs;
    test: WebdriverIO.Test;
    session_id: string;
  }
}
declare var ARGS: IArgs;
