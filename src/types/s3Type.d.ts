export interface S3UploadResponse {
  imageUrls: string[];
}

export interface S3UploadRequest {
  imageFiles: File[];
  directory: string;
}
