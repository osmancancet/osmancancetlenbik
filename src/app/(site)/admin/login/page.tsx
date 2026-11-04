import { Suspense } from "react";
import { LoginClient } from "./LoginClient";

export default function AdminLoginPage() {
  // useSearchParams statik üretimde Suspense sınırı istiyor. Sınır sayfanın
  // içinde; segment loading.tsx tüm ağacı erken 200 ile akıtıyordu.
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
