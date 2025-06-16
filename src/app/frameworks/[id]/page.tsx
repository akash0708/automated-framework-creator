import FrameworkDetails from "@/pages/frameworks/FrameworkDetails";

export default function FrameworkDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <FrameworkDetails id={params.id} />;
}
