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

export default credential;
