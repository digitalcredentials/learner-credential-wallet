To setup the development environment for Android on linux (Ubuntu 20.04), follow these steps:

- Install node (it is recommended to use nvm for managing multiple node version)
    - See https://github.com/nvm-sh/nvm for instructions on setting up nvm
    - At the time of writing node v16.13.2 was used
- Follow the instructions from the [React Native documentation](https://reactnative.dev/docs/environment-setup)
    - Choose the "React Native CLI Quickstart" tab at the top
    - and select "linux" and "android" underneath.
- Clone this repo `git clone https://github.com/digitalcredentials/learner-credential-wallet.git`
- Install the node dependencies `npm i`
- Start metro `npm run start`
- Start the app `npm run android`

In the future it would be a good idea to use docker for building the app to isolate the developer's system from possibly malicious code installed through dependencies. This could possibly work: https://github.com/react-native-community/docker-android
