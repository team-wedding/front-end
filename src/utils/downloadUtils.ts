import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const setFileName = (index: number) => `phototalk_${index + 1}.jpg`;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// 이미지 URL에서 Blob 객체로 바꾸고, 파일 이름을 반환
const fetchImageAsBlob = async (url: string, index: number) => {
  try {
    const bustingUrl = `${url}?cache_bust=${Date.now()}`;
    const response = await fetch(bustingUrl);
    const blob = await response.blob();
    return { blob, fileName: setFileName(index) };
  } catch (err) {
    console.error('Download error: ', err);
    return null;
  }
};

// Blob 객체를 파일로 다운로드
const downloadBlob = (blob: Blob, fileName: string) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); // Blob을 URL로 변환
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 여러 이미지를 zip 파일로 압축해서 다운로드
const downloadZip = async (images: string[]) => {
  const zip = new JSZip();
  const folder = zip.folder('phototalk-images');

  const downloadPromises = images.map(async (url, index) => {
    const result = await fetchImageAsBlob(url, index);

    if (result) {
      folder?.file(result.fileName, result.blob);
    }
  });

  await Promise.all(downloadPromises);
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'phototalk_images.zip');
};

// 한 장 다운로드
export const downloadImage = async (url: string, index: number) => {
  const result = await fetchImageAsBlob(url, index);

  if (result) {
    downloadBlob(result.blob, result.fileName);
  }
};

// 여러 장 다운로드
export const downloadSelectedImages = async (selectedImages: string[]) => {
  const imageAmount = selectedImages.length;

  if (imageAmount >= 10) {
    await downloadZip(selectedImages);
  } else {
    for (let index = 0; index < imageAmount; index++) {
      const url = selectedImages[index];
      const result = await fetchImageAsBlob(url, index);

      if (result) {
        downloadBlob(result.blob, result.fileName);
      }

      await delay(500);
    }
  }
};
