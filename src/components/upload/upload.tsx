"use client";

import { useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { UploadCloud, X, File, FileImage, FileSpreadsheet } from "lucide-react";
import { Progress } from "../ui/progress";
import { uploadfileAction } from "@/actions/upload-actions/uploadActions";

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Other = "other",
  csv = "csv",
}

interface FileUploadProgress {
  progress: number;
  file: File;
}

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const csvColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export default function ArquivoUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.csv)) {
      return {
        icon: <FileSpreadsheet size={40} className={csvColor.fillColor} />,
        color: csvColor.bgColor,
      };
    }

    return {
      icon: <UploadCloud size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  // Simulate upload progress for each file
  const simulateUploadProgress = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFilesToUpload((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, progress: Math.min(progress, 100) } : f,
        ),
      );
      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFiles((prev) => [...prev, file]);
        setFilesToUpload((prev) => prev.filter((f) => f.file !== file));

        // Enviar o arquivo usando uploadfileAction
        const formData = new FormData();
        formData.append("file", file);

        startTransition(async () => {
          const result = await uploadfileAction(formData);

          setMessage(result.message);
          setError(result.error);
        });
      }
    }, 200);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (
          !filesToUpload.some((f) => f.file.name === file.name) &&
          !uploadedFiles.some((f) => f.name === file.name)
        ) {
          const fileWithProgress = { file, progress: 0 };
          setFilesToUpload((prev) => [...prev, fileWithProgress]);
          simulateUploadProgress(file);
        }
      });
    },
    [filesToUpload, uploadedFiles],
  );

  const removeFile = (file: File) => {
    setFilesToUpload((prev) => prev.filter((item) => item.file !== file));
    setUploadedFiles((prev) => prev.filter((item) => item !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: isPending,
  });

  return (
    <div>
      <div className="mx-auto h-30 w-1/2 min-w-75 max-w-100">
        <label
          {...getRootProps()}
          className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-2 py-10 md:py-14 ${
            isPending
              ? "cursor-not-allowed bg-gray-200"
              : "bg-gray-50 hover:bg-gray-100"
          } dark:bg-gray-800 dark:hover:bg-gray-700`}
        >
          <div className="text-center">
            <div className="mx-auto max-w-min rounded-md border p-2">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Arraste os arquivos</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Clique para fazer upload de arquivos (arquivos devem ter menos de
              10 MB)
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg, .csv, application/pdf"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
              Arquivos para upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => (
                <div
                  key={fileUploadProgress.file.name}
                  className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:pr-0 dark:border-slate-700"
                >
                  <div className="flex flex-1 items-center p-2">
                    <div className="text-white">
                      {getFileIconAndColor(fileUploadProgress.file).icon}
                    </div>

                    <div className="ml-2 w-full space-y-1">
                      <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground ">
                          {fileUploadProgress.file.name.slice(0, 25)}
                        </p>
                        <span className="text-xs">
                          {fileUploadProgress.progress}%
                        </span>
                      </div>
                      <Progress value={fileUploadProgress.progress} />
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(fileUploadProgress.file)}
                    className="hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
                    disabled={isPending}
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
            Arquivos enviados
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 transition-all hover:border-slate-300 hover:pr-0 dark:border-slate-700 dark:hover:border-slate-600"
              >
                <div className="flex flex-1 items-center p-2">
                  <div className="text-white">
                    {getFileIconAndColor(file).icon}
                  </div>
                  <div className="ml-2 w-full space-y-1">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground ">
                        {file.name.slice(0, 25)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
                  disabled={isPending}
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isPending && (
        <div className="mt-4 flex items-center justify-center">
          <p className="text-blue-500">Enviando arquivo...</p>
        </div>
      )}

      {message && (
        <p className={error ? "text-red-500" : "text-green-500"}>{message}</p>
      )}
    </div>
  );
}
