"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadImageProps {
  initialImageUrl?: string;
  id: string;
}

function Profile_Photo({ initialImageUrl, id }: UploadImageProps) {
  const [image, setImage] = useState<string>(initialImageUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const { startUpload } = useUploadThing("offreImages", {
    onUploadError: (err) => {
      setError(err.message);
      setLoading(false);
    },
    onUploadProgress: (p) => setProgress(p),
  });

  useEffect(() => {
    if (initialImageUrl) {
      setImage(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    setError(null);
    const res = await startUpload(acceptedFiles);
    setLoading(false);
    if (res && res.length > 0) {
      const uploadedUrl = res[0].url;
      setImage(uploadedUrl);
      try {
        const response = await fetch(
          `http://localhost:4000/users/${id}`,

          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              profileImage: uploadedUrl,
            }),
          }
        );
        console.log("response", response);
        if (response.status === 200) {
        }
        console.log("Profile updated successfully");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="relative mb-16">
      <div className="h-48 md:h-64 bg-teal-600 relative rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('/placeholder.svg?height=400&width=1200')`,
          }}
        />
        <Button
          variant="outline"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Cover
        </Button>
      </div>

      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="absolute -bottom-16 left-8 w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg cursor-pointer overflow-hidden group"
          >
            <input {...getInputProps()} />
            <div className="w-full h-full relative">
              <Image
                src={image || "/placeholder.svg?height=200&width=200"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all">
                <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        )}
      </Dropzone>

      {/* Error */}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Profile_Photo;
