'use client';

import { useLoginModel } from "./login.model";
import { LoginView } from "./login.view";

export default function Home() {
  const methods = useLoginModel()

  return <LoginView {...methods} />
}
