import type { PropsWithChildren } from "react";

export default function Brackets({ children }: PropsWithChildren) {
  return (
    <>
      <span>(</span>
      {children}
      <span>)</span>
    </>
  );
}
