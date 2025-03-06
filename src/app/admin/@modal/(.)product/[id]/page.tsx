import FullPageProductEdit from "~/app/admin/_components/ProductEdit";
import { Modal } from "./modal";

export default function PhotoModal({
  params: { id: productId },
}: {
  params: { id: string };
}) {
  //const photoId = (await params).id;
  // const idAsNumber = Number(photoId);
  // if (isNaN(idAsNumber)) throw new Error("Invalid Photo ID");
  return (
    <Modal>
      <FullPageProductEdit id={Number(productId)} />{" "}
      {/* moved all error handing to the component and cast the photoId in the props handoff */}
    </Modal>
  );
}
