import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
      <Loader2 className="h-7 w-7 text-zinc-500 animate-spin mr-2" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading ...</p>
    </div>
  );
};

export default Loader;
