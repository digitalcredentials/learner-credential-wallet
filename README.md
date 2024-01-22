<img src="https://user-images.githubusercontent.com/7339800/129089107-fa190c95-76fd-4a93-8e36-ff4d3ae5681c.png" alt="icon" width="100px" />

# Learner Credential Wallet

Learner Credential Wallet is a cross-platform iOS and Android mobile application 
for storing and sharing digital learner credentials.

Install [Learner Credential Wallet](https://lcw.app/) for your mobile!

The wallet is based on the [learner credential wallet specification](https://digitalcredentials.mit.edu/docs/Learner-Credential-Wallet-Specification-May-2021.pdf) developed by the [Digital Credentials Consortium](https://digitalcredentials.mit.edu/). The learner credential wallet specification is based on the draft [W3C Universal Wallet interoperability specification](https://w3c-ccg.github.io/universal-wallet-interop-spec/) and the draft [W3C Verifiable Credentials data model](https://w3c.github.io/vc-data-model/).

The app has been compiled for iOS and Android and allows users to add and share credentials, as well as manage the wallet.

<img src="https://user-images.githubusercontent.com/20584379/234087398-2a8c2b54-66a3-4a56-8332-0e4bfc089a3b.png" alt="The Learner Credential Wallet startup screen, displaying the choice between quick and custom setup." width="24%" /> <img src="https://user-images.githubusercontent.com/20584379/234087758-f718942b-d9b7-47a6-846a-4ba5f9aea83a.png" alt="The “credential preview” screen, displaying information about an issued credential, including credential name, issuer, issuer date, credential description, criteria, and verification status." width="24%" /> <img src="https://user-images.githubusercontent.com/20584379/234087893-81573b7e-db33-48f5-8d51-23f845fb75a4.png" alt="The “share credential” screen, which allows the user to share their credentials with others through a public link or QR code, and includes the additional options to send the credential link or directly add it to LinkedIn through the app." width="24%" /> <img src="https://user-images.githubusercontent.com/20584379/234087959-4150b63a-c980-472a-bc54-7f8b0a9bbc5f.png" alt="The “verification status” screen, which shows whether the credential has been verified, and includes an additional breakdown of information including the last date verification status was checked, the validity of the credentials digital signature, expiration, and revocation status." width="24%" />


## Goals
This learner credential wallet includes the features and technical requirements 
ultimately enabling individuals to curate and present their learning and 
employment records to others—for example, as applicants to educational programs 
or to apply for jobs with employers—in an interoperable manner. 

* Receive digital credentials from standards compliant issuers via link or QR code
* Store credentials on their mobile device
* Keep credential access safe with strong encryption best practices
* Create and share a presentation that collates any number of credentials in their wallet
* Backup and restore their wallet

## Pilot
The Digital Credentials Consortium is working with a number of colleges and 
universities to [pilot test](https://lcw.app/pilot.html) the wallet.


## Development Setup

### Dependencies

**If you encouter any issues, visit the [Troubleshooting Page](https://github.com/digitalcredentials/learner-credential-wallet/wiki/Troubleshooting)**

Prerequisites:
* [Java](https://www.java.com/en/download/manual.jsp)
* [nvm](https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/) or [asdf](https://asdf-vm.com/guide/getting-started.html#getting-started)
* [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) or [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Node.js](https://nodejs.org/en/)
* [Cocoapods](https://cocoapods.org/)
* [XCode](https://developer.apple.com/xcode/)
* [Android Studio](https://developer.android.com/studio)

See [Installing on Linux](install-linux.md) on setting up the project on Linux.

### Setup of the LCW App
1. Clone this repository or `git pull`
2. In root of project, run `npm i --legacy-peer-deps` to install the React Native dependencies.
   * Note: The app will crash if you try to use just `npm i` or `yarn` for example
   * (Optionally, if you use the `asdf` version manager run `asdf install` to install - more info in asdf section below)
4. For ios, run `cd ios/ && npx pod-install` to install iOS Cocoapods. 

#### *If using asdf*
* Run `asdf install` to install the proper versions of the technologies used listed in the `.tool-versions` file
  * If you need to install anything, run `asdf plugin add [plugin-name]` to add it to your local machine
  * Here is a link if you need it to the [asdf installation documentation](https://asdf-vm.com/guide/getting-started.html#getting-started) _(homebrew is the easiest)_

### Running the LCW App
1) Run `yarn start` in one terminal
2) In another terminal run `yarn android`
  * When running on android, open Android Studio and make sure the device you want to run on is selected (whether that is an emulator or a real device). 
  * Note: You might need to hit the play button in Android Studio for it to fully register which device to set to be used from the command line.
3) In another terminal yarn `yarn ios [args]` where `[args]` depends on where you want to run the device 
  * To run on an iOS simulator, you'll need to use the args `--simulator [name-of-device]`. The name of the device you want to use must be an accessible simulator setup in XCode.
    * Example `yarn ios --simulator "iPhone 15 Pro Max"`
  * To run on a real iOS device you'll need to use the args `--device [name-of-plugged-in-device]` (you'll be prompted to install the tools needed if you don't have them in the error output)
    * The name of the device can be found in Settings -> General -> About -> `Name`
    * Example: `yarn ios --device "iPhone 15"` (where `iPhone 15` is the name listed in the settings)

### Environment

This project uses **TypeScript and React Native**. It would be best to use an 
editor that can hook into the TypeScript language server (VSCode does this with 
Intellisense, Vim does it with CoC). We also use eslint to catch common mistakes 
and formatting errors. Most editors should support dynamic linting support while 
editing. If your editor does not, you can manually lint by running `npm run lint` 
in the project root.

This project also uses **environment variables**, which are stored in `config.ts`.
These values can be overridden, but development values should not be committed to the repository.

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

#### Configuration

Overridable configuration lives in two places:

1. [`app.json`](./app.json) - created by Expo, contains app name, icon, splash
   page color, etc.
2. [`app/config/index.ts`](./app/config/index.ts) - contains everything else,
   including a list of Known DID Registries, deep link schemes, app website URLs,
   and so on.


### Adding a new credential

Issuer image (by [Devendra Karkar, IN, from the Noun Project](https://thenounproject.com/search/?q=university&i=1506846)):

![image](https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png)

VC1 (issuer image is embedded):

```js
const exampleVc = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1',
    'https://w3id.org/dcc/v1'
  ],
  id: 'https://cred.127.0.0.1.nip.io/api/issuance/12',
  type: [ 'VerifiableCredential', 'Assertion' ],
  issuer: {
    id: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
    name: 'Example University',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA0CAAAAADtDTRwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflCQ8XFAjmMrgkAAAEiElEQVRIx+2We0xbVRzHW4rlllugQOnCaEvKIwtMUMyAhfFYMpwdcUsxURfYI+JCBsQ5DaVdho+BoTCjLqwQNWg0yIYPmIwtghkLMhgTjMk6KDB5BZD3CoXRUs4593pu20FBgfqnid8/evv7/c7nnN/v/s45uayVTYTQZhHWZoGb9dAq4DRiOhTXMzgwMDBodBpZOsQJEGNJP6ApLOQM8sKOzKysrNeFz370MdYtZ5DnExchRIZoFy8vgRsrzewMkrAAVsBsVHLn7w1hAS3QqVUWAACG2OPIouR/5kBsgcT9aXg0v9zUiUbDdg07hch5z+3Zk3SHxi+sjFSbnUK8j7yU6JpZXVV1pSKcf8WJWpYP4lo6xYQ7FunOSTNth0DQsXtXOzC3NzTa1LdNYhD2qf19fHcoeylr67G2Lh+gsYsh5Kstd9L4QcUjaPttCajZiiji4I0lml66KSciP5/5G7QBQQs1+91iK+fo6Xv3pqi5qr1uCd8b0RYIMjcpeGGlExT4MdbTI7oWUJPacN6Rn01oEwSudGZ4St4fRAD9sjOi5OIz/rfx36ECqefJX1f+qS8Q9uSKfN94AHDQkrGzg6Z/E59YZvxdbwr93uqGcAMC0IhGxk9vszApAGNC8hI+mPK9c0zp0NJ+3COwcPjJe2DZgOlPI4mUn5bsOZtSw0Zoeuzpw0v2Gk2NLxK7y6ZsEINA43fxbnFX51eLRJVkemvbCfKrNY/xW+sQaENgl4K3OoUtzcX3vPkegvMLDi6cSATvsA5aEeryU+pRCkEHIcvdS5dal9f76LF87oeUDfnE48bwH+vVPzg0NNi/wTnUKCiyI5fZIkmgOICRVMr8SqRWSyyVrPkCxIESEcu+CuzKV8m56eq8PFVucMBZpTIvSpCjwlaOIEKpVJ4NCM7FlvqkW7Iq314LLo3+gl83NT4+PnJg3yJCVLb0/sT4+MR96WsIocV9B0ZwaKrBQ0sjuNpK6kuOJFQmCw4lkoxgBZ5xCQqRyUKCXDLxvWTcT4QGy2ShUnY55dB9qD8jkp3OSXGVf2PB1u1jvJjs7BjesVvM7qmSu6bknJb55nRBxw0D56MVFvo6WUtbF9ULC2i6QKi3TkvXktdpiyJyFq7fY4ZohZmqc6+xDoLdwgsUdUHYbR1E1bjXUWZFxDT4H/kvIPMxqYCuJ69Zu496/ApputCvx9b9a2Q9DVIjH63rPlhoDktsbishikYYa6ZacKqt7ZTg6gwz8WgRUdLWnBjcZAQOCFXr68IhSYLFfeUxzqvQnc0lSS6b9w6e+PFRLosgSY6Ld7XjTqYriLfLtVptaXg8c15yfDRlWm2ZxieDOS/x4aU4VK4itLTDPWYoJKv69PoeXVJUh0734KikpVev720Rp+p0uo6oJF2PXt/3A/+8Aawh77qzvYRYvlxXX/wgOD6M5cNxY3yuXMYnFLB5554gAKK7xcWaIkYa60NTbDWKbE6NPVRc3IqYDyeMTPY97Gc+irbVYP/DvkmMAEOqyN9piV6eB6wV09eqc05LXWliEkPUvxC+2P8C66mkboeuWsgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDktMTVUMjM6MjA6MDgtMDQ6MDBWFKI1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA5LTE1VDIzOjIwOjA4LTA0OjAwJ0kaiQAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAASUVORK5CYII='
  },
  issuanceDate: '2021-09-06T00:00:00.000Z',
  credentialSubject: {
    id: 'did:example:abc123',
    name: 'Ian Malcom',
    hasCredential: {
      id: 'https://cred.127.0.0.1.nip.io/api/claim/9c38ea72-b791-4510-9f01-9b91bab8c748',
      name: 'GT Guide',
      type: [
        'EducationalOccupationalCredential'
      ],
      description: 'The holder of this credential is qualified to lead new student orientations.',
      competencyRequired: 'Demonstrated knowledge of key campus locations, campus services, and student organizations.',
      credentialCategory: 'badge'
    }
  }
}
```

Example `did:key` DID and the corresponding public/private key pair:

```js
const keyPair = {
  id: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv#z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
  controller: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
  type: 'Ed25519VerificationKey2020',
  publicKeyMultibase: 'z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
  privateKeyMultibase: 'zrv2rP9yjtz3YwCas9m6hnoPxmoqZV72xbCEuomXi4wwSS4ShekesADYiAMHoxoqfyBDKQowGMvYx9rp6QGJ7Qbk7Y4'
}
```

Signed VC1 (by that key pair), and wrapped in a Verifiable Presentation (for encoding):

```js
const vp1 = {
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": "VerifiablePresentation",
  "verifiableCredential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1",
      "https://w3id.org/dcc/v1"
    ],
    "id": "https://cred.127.0.0.1.nip.io/api/issuance/12",
    "type": [
      "VerifiableCredential",
      "Assertion"
    ],
    "issuer": {
      "id": "did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv",
      "name": "Example University",
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA0CAAAAADtDTRwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflCQ8XFAjmMrgkAAAEiElEQVRIx+2We0xbVRzHW4rlllugQOnCaEvKIwtMUMyAhfFYMpwdcUsxURfYI+JCBsQ5DaVdho+BoTCjLqwQNWg0yIYPmIwtghkLMhgTjMk6KDB5BZD3CoXRUs4593pu20FBgfqnid8/evv7/c7nnN/v/s45uayVTYTQZhHWZoGb9dAq4DRiOhTXMzgwMDBodBpZOsQJEGNJP6ApLOQM8sKOzKysrNeFz370MdYtZ5DnExchRIZoFy8vgRsrzewMkrAAVsBsVHLn7w1hAS3QqVUWAACG2OPIouR/5kBsgcT9aXg0v9zUiUbDdg07hch5z+3Zk3SHxi+sjFSbnUK8j7yU6JpZXVV1pSKcf8WJWpYP4lo6xYQ7FunOSTNth0DQsXtXOzC3NzTa1LdNYhD2qf19fHcoeylr67G2Lh+gsYsh5Kstd9L4QcUjaPttCajZiiji4I0lml66KSciP5/5G7QBQQs1+91iK+fo6Xv3pqi5qr1uCd8b0RYIMjcpeGGlExT4MdbTI7oWUJPacN6Rn01oEwSudGZ4St4fRAD9sjOi5OIz/rfx36ECqefJX1f+qS8Q9uSKfN94AHDQkrGzg6Z/E59YZvxdbwr93uqGcAMC0IhGxk9vszApAGNC8hI+mPK9c0zp0NJ+3COwcPjJe2DZgOlPI4mUn5bsOZtSw0Zoeuzpw0v2Gk2NLxK7y6ZsEINA43fxbnFX51eLRJVkemvbCfKrNY/xW+sQaENgl4K3OoUtzcX3vPkegvMLDi6cSATvsA5aEeryU+pRCkEHIcvdS5dal9f76LF87oeUDfnE48bwH+vVPzg0NNi/wTnUKCiyI5fZIkmgOICRVMr8SqRWSyyVrPkCxIESEcu+CuzKV8m56eq8PFVucMBZpTIvSpCjwlaOIEKpVJ4NCM7FlvqkW7Iq314LLo3+gl83NT4+PnJg3yJCVLb0/sT4+MR96WsIocV9B0ZwaKrBQ0sjuNpK6kuOJFQmCw4lkoxgBZ5xCQqRyUKCXDLxvWTcT4QGy2ShUnY55dB9qD8jkp3OSXGVf2PB1u1jvJjs7BjesVvM7qmSu6bknJb55nRBxw0D56MVFvo6WUtbF9ULC2i6QKi3TkvXktdpiyJyFq7fY4ZohZmqc6+xDoLdwgsUdUHYbR1E1bjXUWZFxDT4H/kvIPMxqYCuJ69Zu496/ApputCvx9b9a2Q9DVIjH63rPlhoDktsbishikYYa6ZacKqt7ZTg6gwz8WgRUdLWnBjcZAQOCFXr68IhSYLFfeUxzqvQnc0lSS6b9w6e+PFRLosgSY6Ld7XjTqYriLfLtVptaXg8c15yfDRlWm2ZxieDOS/x4aU4VK4itLTDPWYoJKv69PoeXVJUh0734KikpVev720Rp+p0uo6oJF2PXt/3A/+8Aawh77qzvYRYvlxXX/wgOD6M5cNxY3yuXMYnFLB5554gAKK7xcWaIkYa60NTbDWKbE6NPVRc3IqYDyeMTPY97Gc+irbVYP/DvkmMAEOqyN9piV6eB6wV09eqc05LXWliEkPUvxC+2P8C66mkboeuWsgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDktMTVUMjM6MjA6MDgtMDQ6MDBWFKI1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA5LTE1VDIzOjIwOjA4LTA0OjAwJ0kaiQAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAASUVORK5CYII="
    },
    "issuanceDate": "2021-09-06T00:00:00.000Z",
    "credentialSubject": {
      "id": "did:example:abc123",
      "name": "Ian Malcom",
      "hasCredential": {
        "id": "https://cred.127.0.0.1.nip.io/api/claim/9c38ea72-b791-4510-9f01-9b91bab8c748",
        "name": "GT Guide",
        "type": [
          "EducationalOccupationalCredential"
        ],
        "description": "The holder of this credential is qualified to lead new student orientations.",
        "competencyRequired": "Demonstrated knowledge of key campus locations, campus services, and student organizations.",
        "credentialCategory": "badge"
      }
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2021-09-16T03:02:08Z",
      "verificationMethod": "did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv#z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv",
      "proofPurpose": "assertionMethod",
      "proofValue": "zxFfvBhwcFa99uLFaJgJ3VYFfomD5qQgpb6vvKR2TgRjHbB4WcCS8mLfvNdu9WrDUTt1m6xZHVc7Cjux5RkNynfc"
    }
  }
}
```

Verifiable Presentation, VP1 CBOR-LD encoded (4164 characters - close to the useful size limit of QR codes):
```
VP1-B3ECQDIYACEMHIGDODB6KOAMDCEKHO2DUORYHGORPF53TG2LEFZXXEZZPMRRWGL3WGEMHBAQCPASWG4TFMQXDCMRXFYYC4MBOGEXG42LQFZUW6L3BOBUS62LTON2WC3TDMUXTCMQYOKSRQ5AYPYMNIGTBIKZ3AGG4DDRBRXSYIF5C7JPGI3BS4XPIPY3I27DDIH5IYQS5IAA2NOLDLVD3CFI45KEMVRZHJBLURUK25XHXNGYO376ORNJAVSCG52T432A32K6FGUAHYXGEAMMOBAYZAQAVQIXNAHKYNS2CRLDSFB2YN55MV4ENH3ESCEE736724AMS5B4DM3IYDOQRSWBC5UA5LBWLIKFMOIUHLBXXVSXQRU7MSIIQT7P37LQBSLUHQNTNDAN2CGIYOWBBQ3AYQIMLZIYYOBZGI2LEHJSXQYLNOBWGKOTBMJRTCMRTDCUKMGDQQIBHQRDDOJSWILRRGI3S4MBOGAXDCLTONFYC42LPF5QXA2JPMNWGC2LNF44WGMZYMVQTOMRNMI3TSMJNGQ2TCMBNHFTDAMJNHFRDSMLCMFRDQYZXGQ4BQ5MBDCFBRGTYLNCGK3LPNZZXI4TBORSWIIDLNZXXO3DFMRTWKIDPMYQGWZLZEBRWC3LQOVZSA3DPMNQXI2LPNZZSYIDDMFWXA5LTEBZWK4TWNFRWK4ZMEBQW4ZBAON2HKZDFNZ2CA33SM5QW42L2MF2GS33OOMXBRHTFMJQWIZ3FDCQHQTCUNBSSA2DPNRSGK4RAN5TCA5DINFZSAY3SMVSGK3TUNFQWYIDJOMQHC5LBNRUWM2LFMQQHI3ZANRSWCZBANZSXOIDTOR2WIZLOOQQG64TJMVXHIYLUNFXW44ZODCXGQR2UEBDXK2LEMUMK42SJMFXCATLBNRRW63IYYKBBUYJVLIAAAGGGUMMHBAQZAQAVQIXNAHKYNS2CRLDSFB2YN55MV4ENH3ESCEE736724AMS5B4DM3IYDOQRSGFMPEDZ4ZDBORQTU2LNMFTWKL3QNZTTWYTBONSTMNBMNFLEET2SO4YEWR3HN5AUCQKBJZJVK2CFKVTUCQKBIREUCQKBIEYEGQKBIFAUCRDUIRKFE52BIFAUCQSHMRBFIVKFIFAUYR2QIMXXQ2CCKFAUCQKDIJVFGRSKJZAUCQRWJJTUCQLHJFIUCQKQN5AUCQKDIE3ECQKBMRKECQKBJ5YGOQKBIE3G2QKBIFDDGQ3DOVWEKOCBIFAUCQLNJJGFEMCRIEXTIZKQPJGDQQKBIFAUQZCFNRHFEULGNRBVCOCYIZAWU3KNOJTWWQKBIFCWSRLMIVIVMUSJPAVTEV3FGB4GEVSSPJEFONDSNRWGY5LHKFHW4Q3BIV3EWSLXORGVKTLZIFUGMRSZJVYHOZDDKVZXQVKSMZMUSK2KINBHGUJVIRQVMZDIN4VUE32UINVEY4LXKFHFOZZQPFEVSUDNJF3XIZ3INNGE22DHKRVE22ZWJNCEENKCLJCDGQ3PLBJFK4ZUGU4TG4DVGIYEMQTHMZYW42LEHAXWK5TWG4XWGN3ONZHC65RPOM2DK5LBPFLFIWKUKFNGQSCXLJXUOYRZMRAXCNCEKJUU62CULBGXUZ3XJVCEE33EIJYFUT3TKFFEKR2OJJIDMQLQJRHVCTJYONFU66SLPFZXETTFIZ5DGNZQJVSFS5C2GVCG4RLYMNUFESK2N5DHSODWM5JHG4T2MV3U223SIFAVM42CONLEQTDOG53TC2CBKMZVC4KWKVLUCQKDI4ZE6UCJN52VELZVNNBHGZ3DKQ4WCWDHGB3DS6SVNFKWERDEM4YDO2DDNA2XUKZTLJVTGU2IPBUSW43KIZJWE3SVJM4GUN3ZKU3EU4C2LBLFMMLQKNFWGZRYK5FFO4CZKA2GY3ZWPBMVCN2GOVXE6U2UJZ2GQMCEKFZVQ5CYJ55EGM2OPJKGCMKMMRHFS2CEGJYWMMJZMZEGG33FPFWHENRXI4ZEY2BLM5ZVS43IGVFXG5DEHFGDIULDKVVGCUDUORBWC2S2NFUWU2JUJEYGY3LMGY3EWU3DNFIDKLZVI43VCQSRKFZTCKZZGFUUWK3GN43FQ5RTOBYWSNLROIYXKQ3EHBRDAUSZJFGWUY3QMVDUO3CFPBKDITLEMJKESN3PK5KUUUDBMNHDMUTOGAYW6RLXKN2WIR22GRJXINDGKJAUIOLTNJHWSNKPJF5C64TGPAZTMRKDOFSWMSSYGFTCW4KTHBITS5KTJNTE4OJUIFEEIULLOJDXUZZWLIXUKNJZLFNHM6DEMJ3XEOJTOVYUOY2BJVBTASLII54GWOLWON5EC4CBI5HEGODIJEVW2UCLHFRTA6TQGBHEUKZTINHXOY2QNJFGKMSELJTU63CQJE2G2VLOGVRHGT22ORJXOMC2N5SXK6TQO4YHMMSHNMZE4TDYJM3XSNS2ONCUSTSBGQZWM6DCNZDFQNJRMVGFESSWNNSW25TCINTEW4SOLEXXQVZLONIWCRKOM5WDISZTJ5XVK5D2MNMDG5SQNNSWO5SNJRCGSNTDKNAVI5TTIE2WCRLFOJ4VKK3QKJBWWRKIJFRXMZCTGVSGC3BZMY3TMTCGHA3W6ZKVIRTG4RJUHBRHOSBLOZLFA6THGBHE42JPO5KG4VKLINUXSSJVMZNES23NM5HUSQ2SKZGXEOCTOFJFOU3ZPFLHEUDLIN4ESRKTIVRXKK2DOV5EWVRYNU2TMZLRHBIEMVTVMNGUEWTQKREXMU3QINVHO3DBJ5EUKS3QKZFDITSDJU3UM3DWOFVVON2JOEZTCNCMJRXTGK3HNQ4DGTSUGQVVA3SKM4ZXSSSDKZGGEMBPONKDIK2NKI4TMV3TJFXWGVRZIIYFU53BJNZEEUJQONVHKTTQJM3GW5KPJJDFC3KDO42GY23PPBTUEWRVPBBVC4KSPFKUWQ2YIRGHQ5SXKRRVINCRI54TEU3IKVXFSNJVMRBDS4KEHBVGW4BTJ5JVQR2WMYZFAQRROUYWU5SKNJZTOQTKMVZVM5SNG5YW2U3VGZRGW3SKMI2TK3SSIJ4HOMCEGU3E2VSGOZXTMV2VORREMOKVJRBTE2JWKFFWSM2UNN3FQ23UMRYGS6KKPFDHCN3GLE2FU33ILJWXCYZWFN4EI32MMR3WO42VMRKUQWLCKIYUKMLCNJMFKV22IZ4EIVBUJAXWW5SJKBGXQ4KZIN2UUNRZLJ2TIOJWF5AXA4DVORBXM6BZMI4WCMSRHFCFMSLKJA3DG4SQNRUG6RDLORZWE2LTNBUWWWKZME3FUYLDJNYXIN22KRTTMZ3XPI4FOZ2SKVSEYV3OIJVGGWSBKFHUGRSYOI3DQSLIKNMUYRTGMVKXQ6TROZIW4YZQNRJVGNTCHF3TMZJLKBDFETDPONTVGWJWJRSDOWDKKRYVS4TJJRTEY5CWOB2GCWDHHBRTCNLZMZCFE3CXNUZFU6DJMVCE6UZPPA2GCVJUKZFTI2LUJRKEIUCXLFXUUS3WGY4VA33FLBLEUVLIGA3TGNCLNFVXAVTFOY3TEMCSOAVXAMDVN43G6SSGGJIFQ5BPGNAS6KZYIFQXO2BXG5YXU5SZKJMXM3DYLBMC653HJ5CDMTJVMNHHQWJTPF2VQTKZNZDEYQRVGU2TIZ2BJNFTO6DDK5QUS22ZME3DATSUMJCFOS3CIU3E4UCWKJRTGSLRLFCHSZKNKRIFSOJXI5RSW2LSMJLFSUBPIR3GW3KNIFCU64LZJY4XA2KWGZSUENTXKYYDSZLRMMYDKTCYK5WGSRLLKBKXM6CDFMZFAOCDGY3G223CN5SXKV3TM5AUCQKBNRSEKVSZMRDVE2DEI5KTMWJTJJWFSWCSNRAUISLXJVVEK5CNIRVXITKUKZKU22SNGZGWUQJWJVCGO5CNIRITMTKEIJLUMS2JGFAUCQKBJJMFERSXJBJGWWKYKJWE63JROZNEO3DNMVIUC6KNIREXQTCUIE2UYVCFGFLEISL2J5VES52PNJATITCUIEYE62SBO5FDA23BNFIUCQKBIJWDAUSWNAYFKMRZNVSEQZDIMNWVKQK2GI2XMYSXKV2GGMSOPFNFOVTVMMZGQ5TEJ44EI5T2GRAUCQKBIFJVKVSPKJFTKQ2ZJFET2GFOOJCXQYLNOBWGKICVNZUXMZLSONUXI6I
```
Turned into an alphanumeric mode QR code:
![image](https://user-images.githubusercontent.com/947005/133546838-dda3695b-4476-4248-ae07-c9d5d7a82617.png)

And here's the same VP, but with the issuer image linked (instead of embedded);

```js
const exampleVp2 = {
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": "VerifiablePresentation",
  "verifiableCredential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/suites/ed25519-2020/v1",
      "https://w3id.org/dcc/v1"
    ],
    "id": "https://cred.127.0.0.1.nip.io/api/issuance/12",
    "type": [
      "VerifiableCredential",
      "Assertion"
    ],
    "issuer": {
      "id": "did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv",
      "name": "Example University",
      "image": "https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png"
    },
    "issuanceDate": "2021-09-06T00:00:00.000Z",
    "credentialSubject": {
      "id": "did:example:abc123",
      "name": "Ian Malcom",
      "hasCredential": {
        "id": "https://cred.127.0.0.1.nip.io/api/claim/9c38ea72-b791-4510-9f01-9b91bab8c748",
        "name": "GT Guide",
        "type": [
          "EducationalOccupationalCredential"
        ],
        "description": "The holder of this credential is qualified to lead new student orientations.",
        "competencyRequired": "Demonstrated knowledge of key campus locations, campus services, and student organizations.",
        "credentialCategory": "badge"
      }
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2021-09-16T03:02:08Z",
      "verificationMethod": "did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv#z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv",
      "proofPurpose": "assertionMethod",
      "proofValue": "z4R9GDmWuFCTceHWAwKrNEqJP5D1Ay1TAANgehjCje7FgqqmTyckUu19bChDtLWjbvhVDK9YqJi2y36ETNK8SYDGf"
    }
  }
}
```
Encoded, this VP is only 1191 characters:
```
VP1-B3ECQDIYACEMHIGDODB6KOAMDCEKHO2DUORYHGORPF53TG2LEFZXXEZZPMRRWGL3WGEMHBAQCPASWG4TFMQXDCMRXFYYC4MBOGEXG42LQFZUW6L3BOBUS62LTON2WC3TDMUXTCMQYOKSRQ5AYPYMNIGTBIKZ3AGG4DDRBRXSYIF5KVXW3GSKQNWIDCUMZ3NV2OWU2IU7HDAGZML4G5K3HANEJJ62UAFKJBH2PDN37OUWBY23H54CLTQVD47BH3EWVCGXVJXVTNWO5ODPHAQMOBAYZAQAVQIXNAHKYNS2CRLDSFB2YN55MV4ENH3ESCEE736724AMS5B4DM3IYDOQRSWBC5UA5LBWLIKFMOIUHLBXXVSXQRU7MSIIQT7P37LQBSLUHQNTNDAN2CGIYOWBBQ3AYQIMLZIYYOBZGI2LEHJSXQYLNOBWGKOTBMJRTCMRTDCUKMGDQQIBHQRDDOJSWILRRGI3S4MBOGAXDCLTONFYC42LPF5QXA2JPMNWGC2LNF44WGMZYMVQTOMRNMI3TSMJNGQ2TCMBNHFTDAMJNHFRDSMLCMFRDQYZXGQ4BQ5MBDCFBRGTYLNCGK3LPNZZXI4TBORSWIIDLNZXXO3DFMRTWKIDPMYQGWZLZEBRWC3LQOVZSA3DPMNQXI2LPNZZSYIDDMFWXA5LTEBZWK4TWNFRWK4ZMEBQW4ZBAON2HKZDFNZ2CA33SM5QW42L2MF2GS33OOMXBRHTFMJQWIZ3FDCQHQTCUNBSSA2DPNRSGK4RAN5TCA5DINFZSAY3SMVSGK3TUNFQWYIDJOMQHC5LBNRUWM2LFMQQHI3ZANRSWCZBANZSXOIDTOR2WIZLOOQQG64TJMVXHIYLUNFXW44ZODCXGQR2UEBDXK2LEMUMK42SJMFXCATLBNRRW63IYYKBBUYJVLIAAAGGGUMMHBAQZAQAVQIXNAHKYNS2CRLDSFB2YN55MV4ENH3ESCEE736724AMS5B4DM3IYDOQRSGFMQIBHQW3VONSXELLJNVQWOZLTFZTWS5DIOVRHK43FOJRW63TUMVXHILTDN5WS6OJUG4YDANJPGEZTGNJUGQ4TANBNGI4WINRRGM4WILJSMU3WELJUMZSTELLCGZSTSLJXMQYTAMRSMJRDMYJUGUXHA3THDCXHERLYMFWXA3DFEBKW42LWMVZHG2LUPE
```
As qr code:
![image](https://user-images.githubusercontent.com/947005/133546585-c56b00da-86cb-478f-9a1f-796d7c0655fc.png)

Multiple Credentials QR Code:

![image](https://user-images.githubusercontent.com/947005/135902835-0ebedf90-5a60-4fb1-8d52-9b7a0a7c6244.png)

Multiple Credentials, one with invalid signature:

![image](https://user-images.githubusercontent.com/947005/135905712-2e9baf4d-3489-40eb-966f-6e3da5cc2a3c.png)

Non-revoked credential with status:
```js
const exampleNonrevokedVc = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1",
    "https://w3id.org/dcc/v1",
    "https://w3id.org/vc/status-list/2021/v1"
  ],
  "type": [
    "VerifiableCredential",
    "Assertion"
  ],
  "issuer": {
    "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
    "name": "Example University",
    "url": "https://cs.example.edu",
    "image": "https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png"
  },
  "issuanceDate": "2020-08-16T12:00:00.000+00:00",
  "credentialSubject": {
    "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
    "name": "Kayode Ezike",
    "hasCredential": {
      "type": [
        "EducationalOccupationalCredential"
      ],
      "name": "GT Guide",
      "description": "The holder of this credential is qualified to lead new student orientations."
    }
  },
  "expirationDate": "2025-08-16T12:00:00.000+00:00",
  "credentialStatus": {
    "id": "https://digitalcredentials.github.io/credential-status-playground/JWZM3H8WKU#2",
    "type": "StatusList2021Entry",
    "statusPurpose": "revocation",
    "statusListIndex": 2,
    "statusListCredential": "https://digitalcredentials.github.io/credential-status-playground/JWZM3H8WKU"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2022-08-19T06:55:17Z",
    "verificationMethod": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC#z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
    "proofPurpose": "assertionMethod",
    "proofValue": "z4EiTbmC79r4dRaqLQZr2yxQASoMKneHVNHVaWh1xcDoPG2eTwYjKoYaku1Canb7a6Xp5fSogKJyEhkZCaqQ6Y5nw"
  }
};
```

Non-revoked credential with status QR code:
![qr-code-nonrevoked-credential-with-status](https://user-images.githubusercontent.com/8096163/185563761-01a8553f-4e36-43e6-9e6a-bbf4246d0155.gif)

Revoked credential with status:
```js
const exampleRevokedVc = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1",
    "https://w3id.org/dcc/v1",
    "https://w3id.org/vc/status-list/2021/v1"
  ],
  "type": [
    "VerifiableCredential",
    "Assertion"
  ],
  "issuer": {
    "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
    "name": "Example University",
    "url": "https://cs.example.edu",
    "image": "https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png"
  },
  "issuanceDate": "2020-08-16T12:00:00.000+00:00",
  "credentialSubject": {
    "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
    "name": "Kayode Ezike",
    "hasCredential": {
      "type": [
        "EducationalOccupationalCredential"
      ],
      "name": "GT Guide",
      "description": "The holder of this credential is qualified to lead new student orientations."
    }
  },
  "expirationDate": "2025-08-16T12:00:00.000+00:00",
  "credentialStatus": {
    "id": "https://digitalcredentials.github.io/credential-status-playground/JWZM3H8WKU#3",
    "type": "StatusList2021Entry",
    "statusPurpose": "revocation",
    "statusListIndex": 3,
    "statusListCredential": "https://digitalcredentials.github.io/credential-status-playground/JWZM3H8WKU"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2022-08-19T06:58:29Z",
    "verificationMethod": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC#z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
    "proofPurpose": "assertionMethod",
    "proofValue": "z33Wy3kvx8UEoPHdQWYHVCXAjW19AZpA88NnikwfJqcH9oNmHyqSkt6wiVS31ewytAX7m2vneVEm8Awo4xzqKHYUp"
  }
};
```

Revoked credential with status QR code:
![qr-code-revoked-credential-with-status](https://user-images.githubusercontent.com/8096163/185563090-4bcb51ad-deb0-4501-a5e4-5bafba9a414c.gif)


### Adding new credential display

A custom display can be created for different credentials, to do so:

- Create a new React component for your credential type in 
  [app/components/CredentialCard/](app/components/CredentialCard/) - 
  eg. `app/components/CredentialCard/YourNewTypeCard.tsx`
- Define addition styles in `app/components/CredentialCard/YourNewTypeCard.styles.tsx`
- Add a function to the `credentialTypes` list defined in 
  [app/components/CredentialCard/CredentialCard.tsx](app/components/CredentialCard/CredentialCard.tsx). 
  The function should return `{component: YourNewCredentialCard, title: 'the title of the credential that should be used when listing it elsewhere'}` or null if the credential isn't the appropriate type for you custom display
- **note**: the list will be scanned for the first function that returns a 
  component and title, so it's important that the type check is specific and 
  doesn't match any other types.


## Accessibility
We have conducted a Voluntary Product Accessibility Test, please review the
[Learner Credential Wallet Accessibility Conformance Report, December 2021](https://github.com/digitalcredentials/learner-credential-wallet/blob/769bacbc2bfed381a20e2927f2c32a18a6faacbb/docs/Learner%20Credential%20Wallet%20VPAT2.4Rev508-December%202021.pdf)

For more information on accessibility please visit the 
[MIT Accessibilty](https://accessibility.mit.edu) page.

## Privacy Policy 
This Privacy Policy explains how Learner Credential Wallet collects, uses, and 
processes personal information about our learners.

### What Personal Information We Collect
We do not collect any personal information.

### Additional Information
We may change this Privacy Policy from time to time. If we make any significant 
changes in the way we treat your personal information we will make this clear 
on our website or by contacting you directly.

The controller for your personal information is the Learner Credential Wallet 
project at MIT. We can be contacted at lcw-support@mit.edu.

## Terms and Conditions of Use

[Learner Credential Wallet Terms and Conditions of Use](https://lcw.app/terms.html)

## Acknowledgements
Initial development was supported by the U.S. Department of Education (Contract 
Number: 91990020C0105). The opinions expressed herein do not necessarily 
represent the positions or policies of the U.S. Department of Education, and no 
official endorsement by the U.S. Department of Education should be inferred.

Initial development was also supported by the Massachusetts Institute of 
Technology. Continued development is supported by members of the Digital 
Credentials Consortium.

### License

[MIT License](https://github.com/digitalcredentials/learner-credential-wallet/blob/main/LICENSE) Copyright (c) 2021 Massachusetts Institute of Technology

All files located in external directories are externally maintained libraries 
used by this software which have their own licenses; we recommend you read them, 
as their terms may differ from the terms above.
