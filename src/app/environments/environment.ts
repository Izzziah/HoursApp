// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  baseURL: '/',

  birchBaseURL: 'http://localhost:61183/',
  // birchBaseURL: 'http://birch.wpengine.com/',
  // birchBaseURL: 'https://www.birchequipment.com/',

  // birchAPI: 'https://api.birchequipment.com/',
  birchAPI: 'http://localhost:61183/',
  // birchAPI: 'https://qc.birchequipment.com/BirchAPI_QC/',
};
