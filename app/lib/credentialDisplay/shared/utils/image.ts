import { ImageObject } from '../../../../types/credential';

function isImageObject(obj: unknown): obj is ImageObject {
  const imageObject = obj as ImageObject;
  return typeof imageObject === 'object' && 'id' in imageObject && 'type' in imageObject;
}

export function imageSourceFrom(image?: ImageObject | string | null): string | null {
  if (image === undefined) return null;
  if (isImageObject(image)) return image.id;
  if (typeof image === 'string') return image;

  return null;
}
