# FastSurvey Console

_more documentation coming soon_

## How to select the backend url?

```ts
const VITE_ENV = import.meta.env.VITE_ENV;
const VITE_API_URL = import.meta.env.VITE_API_URL;

let baseUrl =
    VITE_ENV === 'development' ? 'dev.fastsurvey.de' : 'fastsurvey.de';

let apiUrl =
    VITE_API_URL !== undefined ? VITE_API_URL : `https://api.${baseUrl}`;
```

By setting the env var `VITE_ENV`, you can switch between dev-backend and regular backend. This `baseUrl` is also used in the links to login/register on the landing page.

By setting the env var `VITE_API_URL`, you can overwrite the used `apiUrl`.

If you have a `.env` file in you project directory. Those variable will be used in `yarn develop` and `yarn build && yarn serve`.
