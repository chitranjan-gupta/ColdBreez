import dynamic from "next/dynamic";
import { AuthContextProvider } from "@/context/AuthContext";

const DynamicHeader = dynamic(() => import("@/components/signout"), {
  loading: () => <p>Signing out...</p>,
});

export default function SignOut() {
  return (
    <AuthContextProvider>
      <DynamicHeader />
    </AuthContextProvider>
  );
}
