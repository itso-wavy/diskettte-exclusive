export const convertToBase64: (file: File) => Promise<string> = (
  file: File
) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const result = fileReader.result;

      if (!result || result instanceof ArrayBuffer) return;
      resolve(result);
    };

    fileReader.onerror = error => {
      console.log(error);
      reject(error);
    };
  });
};
