import dynamic from "next/dynamic";
import { AuthContextProvider } from "@/context/AuthContext";

const DynamicHeader = dynamic(() => import("@/components/profile"), {
  loading: () => <p>Loading...</p>,
});

export default function Index() {
  return (
    <AuthContextProvider>
      <DynamicHeader />
    </AuthContextProvider>
  );
}
