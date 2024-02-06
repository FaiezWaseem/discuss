'use client';

import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
    children : React.ReactNode
}

export default function Providers(props : ProvidersProps){
  return <NextUIProvider>{props.children}</NextUIProvider>
}