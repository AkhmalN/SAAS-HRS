import * as DocumentPicker from "expo-document-picker";

export const getDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (result) {
      return result.assets;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
};
