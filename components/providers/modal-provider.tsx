"use client";

import { useEffect, useState } from "react";
import { UploadCodeModal } from "@/components/models/upload-code-model";




export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UploadCodeModal />
      
    </>
  );
};
