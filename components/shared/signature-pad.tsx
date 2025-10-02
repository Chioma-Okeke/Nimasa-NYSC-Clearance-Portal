"use client";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useWidth } from "@/hooks/use-width";

export default function SignaturePad({ setFileList }: { setFileList: (file: File | null) => void }) {
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const width = useWidth()

    const canvasWidth = width > 650 ? 500 : 250

    const clear = () => {
        sigCanvas.current?.clear();
        setImageURL(null);
    };

    const save = () => {
        if (sigCanvas.current?.isEmpty()) {
            alert("Please provide a signature first.");
            return;
        }
        const data = sigCanvas.current?.toDataURL("image/png");
        setImageURL(data || null);

        if (data) {
            convertImageToFile(data);
        }
    };

    const convertImageToFile = async (dataURL: string) => {
        const file = dataURLtoFile(dataURL, "signature.png");
        setFileList(file)
    };

    function dataURLtoFile(dataURL: string, filename: string) {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleImageCancellation = () => {
        clear()
        setFileList(null)
    }

    return (
        <div className="flex flex-col gap-4 items-center mt-4">
            <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                    width: canvasWidth,
                    height: 200,
                    className: "border-2 border-gray-400 rounded-md",
                }}
            />
            <div className="flex gap-3">
                <Button onClick={clear} className="px-3 py-1 bg-red-500 text-white rounded">
                    Clear
                </Button>
                <Button onClick={save} className="px-3 py-1 bg-blue-500 text-white rounded">
                    Save & Upload
                </Button>
            </div>
            {imageURL && (
                <div className="relative">
                    <p className="font-semibold mb-2">Preview:</p>
                    <img src={imageURL} alt="signature" className="size-28 border rounded-md" />
                    <button onClick={handleImageCancellation} aria-label='Remove attached file' title='Remove attached file' className='hover:scale-125 transition-all ease-in-out duration-300 absolute top-4 right-0'>
                        <X color='red' size={16} className='cursor-pointer' />
                    </button>
                </div>
            )}
        </div>
    );
}
