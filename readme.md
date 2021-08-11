# EDU Wallet

[![Lint](https://github.com/atomicjolt/learner-credential-wallet/actions/workflows/lint-project.yml/badge.svg)](https://github.com/atomicjolt/learner-credential-wallet/actions/workflows/lint-project.yml)

![icon](https://user-images.githubusercontent.com/7339800/129089107-fa190c95-76fd-4a93-8e36-ff4d3ae5681c.png)

EDU Wallet is a cross-platform mobile application for storing digital credentials as specified in the DCC Wallet [specification draft](https://cdn.filestackcontent.com/preview/FeqEJI3S5KelmLv8XJss) and [W3C VC data model](https://w3c.github.io/vc-data-model/).

## Goals
Allow a student to:
* Receive digital credentials from standards compliant issuers via link or QR code
* Store credentials on their mobile device
* Keep credential access safe with strong encryption best practices
* Create a presentation that collates any amount of credentials in their wallet

## Development Setup

Prerequisite peer dependencies:
* [Node.js](https://nodejs.org/en/)
* [Cocoapods](https://cocoapods.org/)
* [XCode](https://developer.apple.com/xcode/)
* [Android Studio](https://developer.android.com/studio)

Optionally, if you use the `asdf` version manager run `asdf install` to install the correct version of Node. Clone down this repository, run `yarn` to install the React Native dependencies and also `npx pod-install` to install iOS Cocoapods. You can start the project with `yarn ios` or `yarn android`.

This project was started with Expo, but had to be ejected because some libraries did not support it. Do not develop using Expo, even if it might still launch. That being said, we are still using [unimodules](https://github.com/unimodules/react-native-unimodules), so feel free to install and use packages from the Expo community.

## Environment

This project uses TypeScript and React Native. It would be best to use an editor that can hook into the TypeScript language server (VSCode does this with Intellisense, Vim does it with CoC). We also use eslint to catch common mistakes and formatting errors. Most editors should support dynamic linting support while editing. If your editor does not, you can manually lint by running `yarn lint` in the project root.

## Project Structure

├── app
│   ├── assets ← Image assets 
│   ├── components ← React components
│   ├── model ← Database access objects and connections
│   ├── navigation ← React Navigation structure
│   ├── screens ← Individual screen views
│   ├── store ← Redux and Redux Toolkit definitions
│   │   └── slices ← Redux Toolkit slices (add new Redux state here)
│   └── styles ← All app style definitions
├── android ← Auto-generated android build folder, can still be manually edited if needed
└── ios ← Same as android, except it also uses Cocoapods for dependency management
