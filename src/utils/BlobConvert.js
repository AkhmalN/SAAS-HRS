export const convertToBlob = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error converting to blob:", error);
    throw error;
  }
};
