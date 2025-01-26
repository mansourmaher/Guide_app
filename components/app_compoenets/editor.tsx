"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  width?: string;
}

export const Editor = ({ onChange, value, width }: EditorProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(
        () => import("react-quill"),

        { ssr: false, loading: () => <Skeleton className="h-[86px] w-full" /> }
      ),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        {...(width && { style: { width } })}
      />
    </div>
  );
};
