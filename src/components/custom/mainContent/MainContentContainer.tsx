"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import MainContentHeader from "./MainContentHeader";
import { FirestoreError } from "@firebase/firestore";

type Props = {
  children: ReactNode;
  loading: boolean;
  error: FirestoreError | null;
};
export function FlashingBar() {
  return (
    <div className="w-full h-0.5 overflow-hidden relative">
      <motion.div
        className="absolute top-0 left-0 h-1 w-1/3 bg-gradient-to-r from-transparent to-primary/20"
        animate={{ x: ["-200%", "400%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </div>
  );
}
function MainContentContainer({ children, loading = false, error }: Props) {
  return (
      <div className="h-full relative">

        <Card className="h-full p-0 pt-0 pb-0 md:pt-4 m-0 gap-y-0 md:pb-0 rounded-none border-none md:bg-border md:rounded-2xl overflow-hidden flex flex-col shadow-none transition-opacity">
          {(error && error.message) ?
            <>
              <CardHeader className="flex flex-row justify-between pb-4 md:pb-4">
                <CardTitle className={`text-2xl font-bold`}>Error</CardTitle>
              </CardHeader>

              <CardContent className="grow overflow-auto pt-2">
                <p className="text-red-500">{error.message || "Unknown error occured"}</p>
              </CardContent>
            </>
            :
            <>
              <CardHeader className="flex flex-row justify-between pb-4 md:pb-4">
                <MainContentHeader/>
              </CardHeader>

              <CardContent className="grow overflow-auto md:pt-2">
                {children}
              </CardContent>
        {loading && <FlashingBar/>}
            </>
          }

        </Card>
      </div>
  );
}

export default MainContentContainer;
