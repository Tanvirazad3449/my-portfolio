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

function MainContentContainer({ children, loading = false, error }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="h-full relative"
        aria-busy={loading}
      >
        {/* Subtle top progress bar */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="topbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute  top-0 left-1/24 h-0.5 w-22/24 right-1/24 overflow-hidden"
            >
              <motion.div
                className="absolute h-full w-1/4 bg-primary/80"
                initial={{ x: -400 }}
                animate={{ x: 400 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Card
          className={`h-full rounded-2xl border overflow-hidden flex flex-col shadow-none transition-opacity 
            ${loading ? "opacity-80 pointer-events-none" : "opacity-100"}
            `}
        >
          {(error && error.message) ?
            <>
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className={`text-2xl font-bold text-red-500`}>Error</CardTitle>
              </CardHeader>

              <CardContent className="grow overflow-auto">
                <p className="text-red-500">{error.message || "Unknown error occured"}</p>
              </CardContent>
            </>
            :
            <>
              <CardHeader className="flex flex-row justify-between">
                <MainContentHeader />
              </CardHeader>

              <CardContent className="grow overflow-auto">
                {children}
              </CardContent>
            </>
          }
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default MainContentContainer;
