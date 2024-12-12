import { convertSVGtoPDF } from '../app/lib/svgToPdf'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Handlebars from 'handlebars';
import { mockCredential } from '../app/mock/credential';

// Mocks
jest.mock('react-native-html-to-pdf', () => ({
  convert: jest.fn(),
}));

jest.mock('handlebars', () => ({
  compile: jest.fn(),
}));

global.fetch = jest.fn();

describe('convertSVGtoPDF', () => {
  const publicLink = 'https://example.com/publicLink';
  const qrCodeBase64 = 'testBase64QRCode';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if required data is missing', async () => {
    // Missing publicLink
    expect(await convertSVGtoPDF(mockCredential, null, qrCodeBase64)).toBeNull();

    // Missing qrCodeBase64
    expect(await convertSVGtoPDF(mockCredential, publicLink, null)).toBeNull();
  });

  it('should handle fetch errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const result = await convertSVGtoPDF(mockCredential, publicLink, qrCodeBase64);

    // If fetch fails, the result should be null
    expect(result).toBeNull();
  });

  it('should handle invalid HTTP response when fetching template', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await convertSVGtoPDF(mockCredential, publicLink, qrCodeBase64);

    // If response is not OK, the result should be null
    expect(result).toBeNull();
  });
});