"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CommentaryRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/intro/beidou/commentary");
  }, [router]);
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
      跳转至北斗经注…
    </div>
  );
}
