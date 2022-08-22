import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
import CryptoJS from 'crypto-js';

import { ProfileRecord } from '../model';
import { LOCKED_PROFILE_PREFIX, LOCKED_WALLET_PREFIX } from './export';
import { CredentialImportReport } from '../types/credential';
import { HumanReadableError } from './error';

export type ReportDetails = Record<string, string[]>;

export type ImportParams = {
  onImportStart: () => void;
  onRequestPassword: () => Promise<string>;
}

async function pickAndReadFile(): Promise<string> {
  const { uri } = await DocumentPicker.pickSingle({
    type: DocumentPicker.types.allFiles,
  });

  return RNFS.readFile(uri.replace('%20', ' '));
}

function credentialReportDetailsFrom(report: CredentialImportReport): ReportDetails {
  const sectionText: Record<string, (n: number, s: string) => string> = {
    success: (n, s) => `${n} item${s} successfully imported`,
    duplicate: (n, s) => `${n} duplicate item${s} ignored`,
    failed: (n, s) => `${n} item${s} failed to complete`,
  };

  return Object.fromEntries<string[]>(
    Object.entries(report)
      .filter(([, value]) => value.length > 0)
      .map(([key, value]) => {
        const plural = value.length !== 1 ? 's' : '';
        const headerText = sectionText[key](value.length, plural);

        return [headerText, value];
      }),
  );
}

function aggregateCredentialReports(reports: CredentialImportReport[]): CredentialImportReport {
  return reports.reduce((prevValue, curValue) => ({
    success: prevValue.success.concat(curValue.success),
    duplicate: prevValue.duplicate.concat(curValue.duplicate),
    failed: prevValue.failed.concat(curValue.failed),
  }));
}

export async function importProfile({
  onImportStart,
  onRequestPassword,
}: ImportParams): Promise<ReportDetails> {
  let data = await pickAndReadFile();

  onImportStart();

  if (data.startsWith(LOCKED_PROFILE_PREFIX)) {
    const passphrase = await onRequestPassword();
    const encryptedProfile = data.replace(LOCKED_PROFILE_PREFIX, '');
    try {
      data = CryptoJS.AES.decrypt(encryptedProfile, passphrase).toString(CryptoJS.enc.Utf8);
    } catch (err) {
      throw new HumanReadableError('Invalid password');
    }
  }

  const profileImportReport = await ProfileRecord.importProfileRecord(data);
  const userIdStatusText = `User ID ${profileImportReport.userIdImported ? 'successfully imported' : 'failed to import'}`;
  const reportDetails = {
    [userIdStatusText]: [],
    ...credentialReportDetailsFrom(profileImportReport.credentials),
  };

  return reportDetails;
}

export async function importWallet({
  onImportStart,
  onRequestPassword,
}: ImportParams): Promise<ReportDetails> {
  let data = await pickAndReadFile();

  onImportStart();

  if (data.startsWith(LOCKED_WALLET_PREFIX)) {
    const passphrase = await onRequestPassword();
    const encryptedProfile = data.replace(LOCKED_WALLET_PREFIX, '');
    try {
      data = CryptoJS.AES.decrypt(encryptedProfile, passphrase).toString(CryptoJS.enc.Utf8);
    } catch (err) {
      throw new HumanReadableError('Invalid password');
    }
  }

  const items: unknown[] = JSON.parse(data);

  const reports = await Promise.all(items.map(async (item) => {
    const rawWallet = JSON.stringify(item);
    return ProfileRecord.importProfileRecord(rawWallet);
  }));

  const credentialReports = reports.map(({ credentials }) => credentials);
  const totalCredentialsReport = aggregateCredentialReports(credentialReports);
  const reportDetails = credentialReportDetailsFrom(totalCredentialsReport);

  return reportDetails;
}
