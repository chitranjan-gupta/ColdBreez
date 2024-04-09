import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("@/components/thanks"), {
  loading: () => <p>Loading...</p>,
});

export default function ThankYou() {
  return <DynamicHeader />;
}
