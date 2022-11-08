import { Issuer } from '../../../../types/credential';
import { imageSourceFrom } from './image';

type IssuerInfo = {
  issuerName: string | null;
  issuerUrl: string | null;
  issuerId: string | null;
  issuerImage: string | null;
};

export function issuerRenderInfoFrom(issuer: Issuer): IssuerInfo {
  const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? null;
  const issuerUrl = (typeof issuer === 'string' ? null : issuer?.url) ?? null;
  const issuerId = typeof issuer === 'string' ? null : issuer?.id;
  const issuerImage = typeof issuer === 'string' ? null : imageSourceFrom(issuer.image);

  return {
    issuerName,
    issuerUrl,
    issuerId,
    issuerImage
  };
}
