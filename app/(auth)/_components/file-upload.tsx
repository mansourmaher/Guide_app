import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";


interface FileUploadProps {
  onChange: (url: string) => void;
  endpoint: keyof typeof ourFileRouter;
  onClientUploadComplete?: (res: any) => void;
  onUploadStart?: (file: any) => void;
  onUploadBegin?: (file: any) => void;
}

export const FileUpload = ({
  onChange,
  endpoint,
  onUploadBegin,
  onClientUploadComplete,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onUploadBegin={(file: any) => {
        if (onUploadBegin) {
          onUploadBegin(file);
        }
      }}
      onClientUploadComplete={(res: any) => {
        onChange(res?.[0].url);
         // Corrected: Invoking the toast.dismiss() function
        if (onClientUploadComplete) {
          onClientUploadComplete(res);
        }
      }}
      onUploadError={(error: any) => {
       
      }}
    />
  );
};
