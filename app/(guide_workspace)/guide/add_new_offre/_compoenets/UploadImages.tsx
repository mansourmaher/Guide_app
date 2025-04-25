"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUploadThing } from "@/lib/uploadthing";
import { ImageIcon, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadImageProps {
  initialImageUrl?: string[];
  onImageChange(url: string[]): void;
}

function UploadImagesForOffers({
  initialImageUrl,
  onImageChange,
}: UploadImageProps) {
  const [images, setImages] = useState<string[]>(initialImageUrl as string[]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { startUpload } = useUploadThing("offreImages", {
    onUploadError: (error) => {
      setError(error.message);
      setLoading(false);
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });
  useEffect(() => {
    setImages(initialImageUrl as string[]);
  }, [initialImageUrl]);

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onImageChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="images" className="font-medium text-gray-700">
        Provide some images for the offer
      </Label>
      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
        <Dropzone
          onDrop={async (acceptedFiles) => {
            setLoading(true);
            setError(null);
            const res = await startUpload(acceptedFiles);
            setLoading(false);

            if (res) {
              const newUrls = res.map((r) => r.url);
              const updatedImages = [...images, ...newUrls];
              setImages(updatedImages);
              onImageChange(updatedImages);
              console.log(res);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col items-center">
              <input {...getInputProps()} />
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
              {loading && (
                <>
                  <span>
                    <p className="text-xs text-muted-foreground mt-2">
                      Uploading...
                    </p>
                  </span>
                  <Progress
                    value={progress}
                    className={cn(
                      "h-1 w-full max-w-xs",
                      progress === 100 ? "bg-primary" : "bg-gray-300"
                    )}
                  />
                </>
              )}
              {!loading && (
                <>
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div className="mt-4">
                    <Button variant="secondary" type="button">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended size: 1280x720px
                  </p>
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Images ({images.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                className="group relative aspect-square rounded-md overflow-hidden border border-gray-200"
              >
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Offer image ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Image {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImagesForOffers;
