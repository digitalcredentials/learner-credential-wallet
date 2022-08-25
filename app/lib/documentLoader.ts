import * as didKey from '@digitalcredentials/did-method-key';
import { Ed25519VerificationKey2020 }
  from '@digitalcredentials/ed25519-verification-key-2020';
import { X25519KeyAgreementKey2020 }
  from '@digitalcredentials/x25519-key-agreement-key-2020';
import { CachedResolver } from '@digitalcredentials/did-io';
import dccCtx from '@digitalcredentials/dcc-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';
import x25519 from 'x25519-key-agreement-2020-context';
import cred from 'credentials-context';
import vcStatusListCtx from '@digitalbazaar/vc-status-list-context';
import { JsonLdDocumentLoader } from 'jsonld-document-loader';
import { CryptoLD } from 'crypto-ld';
import * as didWeb from '@interop/did-web-resolver';
import { parseResponseBody } from './parseResponse';

const cryptoLd = new CryptoLD();
cryptoLd.use(Ed25519VerificationKey2020);
cryptoLd.use(X25519KeyAgreementKey2020);
const didWebDriver = didWeb.driver({ cryptoLd });

const {
  contexts: credentialsContext,
  constants: {
    CREDENTIALS_CONTEXT_V1_URL,
  },
} = cred;
const didKeyDriver = didKey.driver();
const resolver = new CachedResolver();
resolver.use(didKeyDriver);
resolver.use(didWebDriver);

export const httpClientHandler = {
  /**
   * @param {object} options - Options hashmap.
   * @param {string} options.url - Document URL.
   * @returns {Promise<{contextUrl: null, document, documentUrl}>} - Resolves
   *   with documentLoader document.
   */
  /* eslint-disable-next-line */
  async get(params: any) {
    if(!params.url.startsWith('http')) {
      throw new Error('NotFoundError');
    }
    let result;
    try {
      const headers: Record<string, string> = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };
      result = await fetch(params.url, { headers });
    } catch(e) {
      throw new Error('NotFoundError');
    }

    return parseResponseBody(result);
  }
};

/**
 * Because none of the credential libraries are typed, we need to use implicit
 * any here for the return type.
 */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export function securityLoader() {
  const loader = new JsonLdDocumentLoader();

  loader.addStatic(
    ed25519.constants.CONTEXT_URL,
    ed25519.contexts.get(ed25519.constants.CONTEXT_URL),
  );

  loader.addStatic(
    x25519.constants.CONTEXT_URL,
    x25519.contexts.get(x25519.constants.CONTEXT_URL),
  );

  loader.addStatic(
    didContext.constants.DID_CONTEXT_URL,
    didContext.contexts.get(didContext.constants.DID_CONTEXT_URL),
  );

  loader.addStatic(
    CREDENTIALS_CONTEXT_V1_URL,
    credentialsContext.get(CREDENTIALS_CONTEXT_V1_URL),
  );

  loader.addStatic(dccCtx.CONTEXT_URL_V1, dccCtx.CONTEXT_V1);

  loader.addStatic(vcStatusListCtx.CONTEXT_URL_V1, vcStatusListCtx.CONTEXT_V1);

  loader.setDidResolver(resolver);

  // Enable loading of arbitrary contexts from web
  loader.setProtocolHandler({protocol: 'http', handler: httpClientHandler});
  loader.setProtocolHandler({protocol: 'https', handler: httpClientHandler});

  return loader;
}
