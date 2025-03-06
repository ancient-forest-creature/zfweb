import FullPageProductView from "~/app/admin/_components/ProductEdit";

export default function PhotoModal({
  params: { id: productId },
}: {
  params: { id: string };
}) {
  //const photoId = (await params).id;
  // const idAsNumber = Number(photoId);
  // if (isNaN(idAsNumber)) throw new Error("Invalid Photo ID");
  return <FullPageProductView id={Number(productId)} />;
}
