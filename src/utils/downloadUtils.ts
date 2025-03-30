import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const fileName = (index: number) => `phototalk_${index + 1}.jpg`;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// 한 장 다운로드
export const downloadImage = (url: string, index: number) => {
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName(index);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 여러 장 다운로드
export const downloadSelectedImages = async (selectedImages: string[]) => {
  // 10개 이상이면 zip 다운
  if (selectedImages.length >= 10) {
    const zip = new JSZip();
    const folder = zip.folder('phototalk-images');

    await Promise.all(
      selectedImages.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();

        folder?.file(fileName(index), blob);
      }),
    );

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'phototalk_images.zip');
  } else {
    // 10개 미만이면 순차 다운
    for (let index = 0; index < selectedImages.length; index++) {
      const url = selectedImages[index];
      const link = document.createElement('a');

      link.href = url;
      link.download = fileName(index);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await delay(500);
    }
  }
};
