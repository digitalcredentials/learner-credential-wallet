import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Handlebars from 'handlebars';
import { Credential } from '../types/credential';
import { PDF } from '../types/pdf';

export async function convertSVGtoPDF(
  credential: Credential, publicLink: string | null, qrCodeBase64: string | null): Promise<PDF | null> {
  if (!credential['renderMethod'] || !publicLink || !qrCodeBase64) {
    return null;  // Ensure we have the necessary data
  }

  const templateURL = credential.renderMethod?.[0].id; // might want to sort if there are more than one renderMethod
 
  let source = '';
  const data = { credential: credential, qr_code: qrCodeBase64 };

  // Fetch the template content
  if (templateURL) {
    try {
      const response = await fetch(templateURL);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      source = await response.text();
    } catch (e) {
      console.log('Error fetching template:', e);
    }
  }

  source = source.replace('{{ qr_code }}', `'${'data:image/png;base64, ' + qrCodeBase64}'`); 
  const template = Handlebars.compile(source);
  const svg = template(data);

  const options = {
    html: svg,
    fileName: `${credential.name} Credential`,
    base64: false,
  };
  const pdf = await RNHTMLtoPDF.convert(options);

  return pdf;
}