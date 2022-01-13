<img src="https://user-images.githubusercontent.com/7339800/129089107-fa190c95-76fd-4a93-8e36-ff4d3ae5681c.png" alt="icon" width="100px" />

# eduWallet

[![Lint](https://github.com/atomicjolt/learner-credential-wallet/actions/workflows/lint-project.yml/badge.svg)](https://github.com/atomicjolt/learner-credential-wallet/actions/workflows/lint-project.yml)

eduWallet is a cross-platform iOS and Android mobile application for storing and sharing digital learner credentials as specified in the [learner credential wallet specification](https://digitalcredentials.mit.edu/docs/Learner-Credential-Wallet-Specification-May-2021.pdf) developed by the [Digital Credentials Consortium](https://digitalcredentials.mit.edu/). The learner credential wallet specification is based on the draft [W3C Universal Wallet interoperability specification](https://w3c-ccg.github.io/universal-wallet-interop-spec/) and the draft [W3C Verifiable Credentials data model](https://w3c.github.io/vc-data-model/).

Install [eduWallet](https://eduwallet.app/) for your mobile!

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

Optionally, if you use the `asdf` version manager run `asdf install` to install the correct version of Node. Clone down this repository, run `npm i` to install the React Native dependencies and also `npx pod-install` to install iOS Cocoapods. You can start the project with `npm run ios` or `npm run android`.

This project was started with Expo, but had to be ejected because some libraries did not support it. Do not develop using Expo, even if it might still launch. That being said, we are still using [unimodules](https://github.com/unimodules/react-native-unimodules), so feel free to install and use packages from the Expo community.

If you get cryptic errors like the following:

```
** BUILD FAILED **

The following build commands failed:
	CompileC /Users/jc/Library/Developer/Xcode/DerivedData/eduwallet-cikpfctcsrnvkqflqlievgbjvnfr/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/RealmJS.build/Objects-normal/x86_64/RealmReact.o /Users/jc/gitlab\ github/digitalcredentials/learner-credential-wallet/node_modules/realm/react-native/ios/RealmReact/RealmReact.mm normal x86_64 objective-c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'RealmJS' from project 'Pods')
(1 failure)
```

Then check your version of cocoa pods.  If it is 1.9.3, try upgrading it to something newer, like 1.11.2_1

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

## Privacy Policy 
This Privacy Policy explains how eduWallet collects, uses, and processes personal information about our learners.

### What Personal Information We Collect
We do not collect any personal information.

### Additional Information
We may change this Privacy Policy from time to time. If we make any significant changes in the way we treat your personal information we will make this clear on our website or by contacting you directly.

The controller for your personal information is the eduWallet project at MIT. We can be contacted at eduwallet-support@mit.edu.

## Terms of Service

### Disclaimers of Warranty / Limitations of Liability
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgements
Initial development was supported by the U.S. Department of Education (Contract Number: 91990020C0105). The opinions expressed herein do not necessarily represent the positions or policies of the U.S. Department of Education, and no official endorsement by the U.S. Department of Education should be inferred.​

Initial development was also supported by the Massachusetts Institute of Technology. Continued development is supported by members of the Digital Credentials Consortium.

### Contributions
To be added shortly.

### License

[MIT License](https://github.com/digitalcredentials/learner-credential-wallet/blob/main/LICENSE) Copyright (c) 2021 Massachusetts Institute of Technology

All files located in external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms above.

