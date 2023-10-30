import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Handlebars from 'handlebars';
import { Credential } from '../types/credential';
import { PDF } from '../types/pdf';

export async function convertSVGtoPDF(credential: Credential): Promise<PDF | null> {
  if (!credential['renderMethod']) {
    return null;
  }
  const templateURL = credential.renderMethod?.[0].id; // might want to sort if there are more than one renderMethod
  let source = '';
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

  const template = Handlebars.compile(source);

  const data = { 'credential': credential };
  const svg = template(data);

  const options = {
    html: svg,
    fileName: `${credential.name} Credential`,
    base64: false,
  };
  const pdf = await RNHTMLtoPDF.convert(options);
  return pdf;
}