import { Credential } from '../types/credential';

const credential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1',
    'https://w3id.org/dcc/v1',
  ],
  id: 'https://cred.127.0.0.1.nip.io/api/issuance/12',
  type: [
    'VerifiableCredential',
    'Assertion',
  ],
  issuer: {
    id: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
    name: 'Example University',
    url: 'https://example.com',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA0CAAAAADtDTRwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflCQ8XFAjmMrgkAAAEiElEQVRIx+2We0xbVRzHW4rlllugQOnCaEvKIwtMUMyAhfFYMpwdcUsxURfYI+JCBsQ5DaVdho+BoTCjLqwQNWg0yIYPmIwtghkLMhgTjMk6KDB5BZD3CoXRUs4593pu20FBgfqnid8/evv7/c7nnN/v/s45uayVTYTQZhHWZoGb9dAq4DRiOhTXMzgwMDBodBpZOsQJEGNJP6ApLOQM8sKOzKysrNeFz370MdYtZ5DnExchRIZoFy8vgRsrzewMkrAAVsBsVHLn7w1hAS3QqVUWAACG2OPIouR/5kBsgcT9aXg0v9zUiUbDdg07hch5z+3Zk3SHxi+sjFSbnUK8j7yU6JpZXVV1pSKcf8WJWpYP4lo6xYQ7FunOSTNth0DQsXtXOzC3NzTa1LdNYhD2qf19fHcoeylr67G2Lh+gsYsh5Kstd9L4QcUjaPttCajZiiji4I0lml66KSciP5/5G7QBQQs1+91iK+fo6Xv3pqi5qr1uCd8b0RYIMjcpeGGlExT4MdbTI7oWUJPacN6Rn01oEwSudGZ4St4fRAD9sjOi5OIz/rfx36ECqefJX1f+qS8Q9uSKfN94AHDQkrGzg6Z/E59YZvxdbwr93uqGcAMC0IhGxk9vszApAGNC8hI+mPK9c0zp0NJ+3COwcPjJe2DZgOlPI4mUn5bsOZtSw0Zoeuzpw0v2Gk2NLxK7y6ZsEINA43fxbnFX51eLRJVkemvbCfKrNY/xW+sQaENgl4K3OoUtzcX3vPkegvMLDi6cSATvsA5aEeryU+pRCkEHIcvdS5dal9f76LF87oeUDfnE48bwH+vVPzg0NNi/wTnUKCiyI5fZIkmgOICRVMr8SqRWSyyVrPkCxIESEcu+CuzKV8m56eq8PFVucMBZpTIvSpCjwlaOIEKpVJ4NCM7FlvqkW7Iq314LLo3+gl83NT4+PnJg3yJCVLb0/sT4+MR96WsIocV9B0ZwaKrBQ0sjuNpK6kuOJFQmCw4lkoxgBZ5xCQqRyUKCXDLxvWTcT4QGy2ShUnY55dB9qD8jkp3OSXGVf2PB1u1jvJjs7BjesVvM7qmSu6bknJb55nRBxw0D56MVFvo6WUtbF9ULC2i6QKi3TkvXktdpiyJyFq7fY4ZohZmqc6+xDoLdwgsUdUHYbR1E1bjXUWZFxDT4H/kvIPMxqYCuJ69Zu496/ApputCvx9b9a2Q9DVIjH63rPlhoDktsbishikYYa6ZacKqt7ZTg6gwz8WgRUdLWnBjcZAQOCFXr68IhSYLFfeUxzqvQnc0lSS6b9w6e+PFRLosgSY6Ld7XjTqYriLfLtVptaXg8c15yfDRlWm2ZxieDOS/x4aU4VK4itLTDPWYoJKv69PoeXVJUh0734KikpVev720Rp+p0uo6oJF2PXt/3A/+8Aawh77qzvYRYvlxXX/wgOD6M5cNxY3yuXMYnFLB5554gAKK7xcWaIkYa60NTbDWKbE6NPVRc3IqYDyeMTPY97Gc+irbVYP/DvkmMAEOqyN9piV6eB6wV09eqc05LXWliEkPUvxC+2P8C66mkboeuWsgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDktMTVUMjM6MjA6MDgtMDQ6MDBWFKI1AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA5LTE1VDIzOjIwOjA4LTA0OjAwJ0kaiQAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAASUVORK5CYII=',
  },
  issuanceDate: '2021-09-06T00:00:00.000Z',
  expirationDate: '2022-03-02T21:18:45+00:00',
  credentialSubject: {
    id: 'did:example:abc123',
    name: 'Ian Malcom',
    hasCredential: {
      id: 'https://cred.127.0.0.1.nip.io/api/claim/9c38ea72-b791-4510-9f01-9b91bab8c748',
      name: 'GT Guide',
      type: [
        'EducationalOccupationalCredential',
      ],
      description: 'The holder of this credential is qualified to lead new student orientations.',
      competencyRequired: 'Demonstrated knowledge of key campus locations, campus services, and student organizations.',
      credentialCategory: 'badge',
    },
  },
  proof: {
    type: 'Ed25519Signature2020',
    created: '2021-09-16T03:02:08Z',
    verificationMethod: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv#z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
    proofPurpose: 'assertionMethod',
    proofValue: 'zxFfvBhwcFa99uLFaJgJ3VYFfomD5qQgpb6vvKR2TgRjHbB4WcCS8mLfvNdu9WrDUTt1m6xZHVc7Cjux5RkNynfc',
  },
};


//Issuer Name, Issuer Logo, Subject Photo, subjectName, Subject ID number, Subject Barcode and Subject QR Code
const studentCard : Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1',
    'https://w3id.org/dcc/v1',
  ],
  id: 'https://cred.127.0.0.1.nip.io/api/issuance/12',
  type: [
    'VerifiableCredential',
    'StudentId',
  ],
  issuer: {
    id: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
    name: 'Example University',
    url: 'https://example.com',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpSJVETtIcchQnSxIFXHUKhShQqgVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIj14Lgf7+497t4BQr3MNKtrAtB020wl4mImuyoGXiFgEP0IIyYzy5iTpCQ6jq97+Ph6F+VZnc/9OfrUnMUAn0g8ywzTJt4gnt60Dc77xCFWlFXic+Jxky5I/Mh1xeM3zgWXBZ4ZMtOpeeIQsVhoY6WNWdHUiKeII6qmU76Q8VjlvMVZK1dZ8578hcGcvrLMdZojSGARS5AgQkEVJZRhI0qrToqFFO3HO/jDrl8il0KuEhg5FlCBBtn1g//B726t/GTMSwrGge4Xx/kYBQK7QKPmON/HjtM4AfzPwJXe8lfqwMwn6bWWFjkCBraBi+uWpuwBlzvA8JMhm7Ir+WkK+TzwfkbflAWGboHeNa+35j5OH4A0dZW8AQ4OgbECZa93eHdPe2//nmn29wN/SHKsluE+pQAAAAlQTFRFAAAAAAAA////g93P0gAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5gIRDhwKkpCo7AAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABzSURBVDjLxdExCsAwCAVQA83exfs4tHsG//2vUkKDBGkwgUIcH8L/KNFwjhB4HSCrkFBWIUMD4AmA6xWAVOi7S5oC635SKnkKNNyQIbA4QBupyw7Ke14HuQP9BA4BEVgq7gFYKnB5UKrP2Q/ARmAHwP/wAP9Dq8BpjYtwAAAAAElFTkSuQmCC',
  },
  issuanceDate: '2021-09-06T00:00:00.000Z',
  credentialSubject: { //subjectName, Subject ID number, Subject Barcode and Subject QR Code
    id: 'did:example:abc123',
    name: 'Ian Malcom',
    image: 'data:image/png;base64,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',
    studentId: {
      id: '123456789012',
      barcode: '',
      qrCode: '',
    },
  },
}

const anotherCred = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  id: "http://example.edu/credentials/3732",
  type: [
    "VerifiableCredential",
    "UniversityDegreeCredential",
  ],
  issuer: "https://example.edu/issuers/565049",
  issuanceDate: "2010-01-01T00:00:00Z",
  credentialSubject: {
    id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
    degree: {
      type: "BachelorDegree",
      name: "Bachelor of Science and Arts",
    },
  },
}


const credentials = [
  credential,
  studentCard,
  anotherCred,
];


export default credential;
export {
  credentials
}
