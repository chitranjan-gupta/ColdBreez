import dynamic from "next/dynamic";
import { AuthContextProvider } from "@/context/AuthContext";

const DynamicHeader = dynamic(() => import("@/components/deleteaccount"), {
  loading: () => <p>Deleting...</p>,
});

export default function DeleteAccount() {
  return (
    <AuthContextProvider>
      <DynamicHeader />
    </AuthContextProvider>
  );
}