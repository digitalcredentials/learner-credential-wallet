<img src="https://user-images.githubusercontent.com/7339800/129089107-fa190c95-76fd-4a93-8e36-ff4d3ae5681c.png" alt="icon" width="100px" />

# EDU Wallet

[![Lint](https://github.com/atomicjolt/learner-credential-wallet/actions/workflows/lint-project.yml/badge.svg)](https://github.com/atomicjolt/learner-credential-wallet/actions/workflows/lint-project.yml)

eduWallet is a cross-platform iOS and Android mobile application for storing and sharing digital learner credentials as specified in the [learner credential wallet specification](https://docs.google.com/document/d/1vPqb4bJ6pfuAPYF_fMW_Lb-7GZugasWKfrSCotpuv6o/edit?usp=sharing) developed by the [Digital Credentials Consortium](https://digitalcredentials.mit.edu/). The learner credential wallet specification is based on the draft [W3C Universal Wallet interoperability specification](https://w3c-ccg.github.io/universal-wallet-interop-spec/) and the draft [W3C Verifiable Credentials data model](https://w3c.github.io/vc-data-model/).

## Goals
This learner credential wallet includes the features and technical requirements ultimately enabling individuals to curate and present their learning and employment records to others—for example, as applicants to educational programs or to apply for jobs with employers—in an interoperable manner. 

* Receive digital credentials from standards compliant issuers via link or QR code
* Store credentials on their mobile device
* Keep credential access safe with strong encryption best practices
* Create and share a presentation that collates any number of credentials in their wallet
* Backup and restore their wallet

## Pilot
The Digital Credentials Consortium is working with a number of colleges and universities to pilot test eduWallet. Please see our Frequently Asked Questions.

## Development Setup

### Dependencies

Prerequisite peer dependencies:
* [Node.js](https://nodejs.org/en/)
* [Cocoapods](https://cocoapods.org/)
* [XCode](https://developer.apple.com/xcode/)
* [Android Studio](https://developer.android.com/studio)

Optionally, if you use the `asdf` version manager run `asdf install` to install the correct version of Node. Clone down this repository, run `npm` to install the React Native dependencies and also `npx pod-install` to install iOS Cocoapods. You can start the project with `npm run ios` or `npm run android`.

This project was started with Expo, but had to be ejected because some libraries did not support it. Do not develop using Expo, even if it might still launch. That being said, we are still using [unimodules](https://github.com/unimodules/react-native-unimodules), so feel free to install and use packages from the Expo community.

### Environment

This project uses TypeScript and React Native. It would be best to use an editor that can hook into the TypeScript language server (VSCode does this with Intellisense, Vim does it with CoC). We also use eslint to catch common mistakes and formatting errors. Most editors should support dynamic linting support while editing. If your editor does not, you can manually lint by running `npm run lint` in the project root.

### Project Structure

```
├── app
│   ├── assets ← Image assets 
│   ├── components ← React components
│   ├── hooks ← This is where custom hooks are defined (usually wraps lib methods)
│   ├── lib ← Location for utility methods
│   ├── mock ← Location for mock data, usually used for testing
│   ├── model ← Database access objects and connections
│   ├── navigation ← React Navigation structure
│   ├── screens ← Individual screen views
│   ├── store ← Redux and Redux Toolkit definitions
│   │   └── slices ← Redux Toolkit slices (add new Redux state here)
│   ├── styles ← All app style definitions
│   └── types ← General place for defining types (usually DCC types for Credential, Presentation, etc...)
├── android ← Auto-generated android build folder, can still be manually edited if needed
└── ios ← Same as android, except it also uses Cocoapods for dependency management
```
## Acknowledgements
Initial development was supported by the U.S. Department of Education (Contract Number: 91990020C0105). The opinions expressed herein do not necessarily represent the positions or policies of the U.S. Department of Education, and no official endorsement by the U.S. Department of Education should be inferred.​

Initial development was also supported by the Massachusetts Institute of Technology. Continued development is supported by members of the Digital Credentials Consortium.

### Contributions
To be added shortly.

### License

Copyright (c) 2021 Massachusetts Institute of Technology

Check back shortly for an open source license for this repository.
