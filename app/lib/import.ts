import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

import { db } from '../model';
import { WalletImportReport } from '../types/wallet';

export type ImportWalletParams = {
  onStart?: () => void;
  onFinish?: (report: WalletImportReport ) => void;
}

export async function importWallet({
  onStart = () => {},
  onFinish = () => {},
}: ImportWalletParams): Promise<void> {
  const { uri } = await DocumentPicker.pickSingle({
    type: DocumentPicker.types.allFiles,
  });

  const file = await RNFS.readFile(uri.replace('%20', ' '));

  onStart();
  const response = await db.import(file);

  const reportSectionText: Record<string, (n: number, s: string) => string> = {
    success: (n, s) => `${n} item${s} successfully imported`,
    duplicate: (n, s) => `${n} duplicate item${s} ignored`,
    failed: (n, s) => `${n} item${s} failed to complete`,
  };

  const report = Object.fromEntries(
    Object.entries(response)
      .filter(([, value]) => value.length > 0)
      .map(([key, value]) => {
        const plural = value.length !== 1 ? 's' : '';
        const headerText = reportSectionText[key](value.length, plural);

        return [headerText, value];
      }),
  );

  onFinish(report);
}
