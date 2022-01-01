import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

const dir = RNFS.DownloadDirectoryPath;
const temp = RNFS.TemporaryDirectoryPath;

export const CreateFile = async (fileName: string, content: string) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;

  const filePath = temp + '/' + fileName;
  const downloadFilePath = dir + '/' + fileName;

  if (isGranted) {
    const assetsDirExists = await RNFS.exists(dir);
    if (!assetsDirExists) {
      RNFS.mkdir(dir).then(async res => {
        await RNFS.writeFile(filePath, content);
        return RNFS.downloadFile({
          fromUrl: filePath,
          toFile: downloadFilePath,
        });
      });
    } else {
      return RNFS.writeFile(filePath, content);
    }
  }
};

export const GetFileUrl = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );

  const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
  if (isGranted) {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
        copyTo: 'cachesDirectory',
      });
      return res[0].fileCopyUri || '';
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        throw err;
      }
    }
  }
};

export const ReadFile = async () => {
  const fileCopyUri = await GetFileUrl();
  return RNFS.readFile(fileCopyUri || '', 'utf8');
};
