# FastSurvey Console

Hello GitHub,

we are pivoting towards open-source and self-hosting fastsurvey instead of hosting it for you.

Website, demos, guides and documentation coming soon!

<br/>

## Basic server setup

You will need to set up three servers from the repositories:
1. https://github.com/fastsurvey/backend
2. https://github.com/fastsurvey/console (this one)
3. https://github.com/fastsurvey/frontend

The backend requires a https://postmarkapp.com/ api token (100 emails/month are free) as well as a MongoDB database (we recommend, running it on MongoDB Atlas https://www.mongodb.com/).

<br/>

**We will simplify this server setup very soon!**

<br/>

## How to select the backend url?

By setting the environment variable `VITE_API_URL`, you can overwrite the default `https://api.fastsurvey.de`.

If you have a `.env` file in you project directory. Those variable will be used in `yarn develop` and `yarn build && yarn serve`.
