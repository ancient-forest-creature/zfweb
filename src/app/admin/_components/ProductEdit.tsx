import { deleteProduct, getProductById } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";

export default async function FullPageProductView(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (isNaN(props.id)) throw new Error("Invalid Photo ID");
  const product = await getProductById(props.id);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex h-auto w-auto flex-shrink items-center justify-center">
        <img
          src={product.imgUrl[0]}
          alt={`Product ${product.id}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-x border-white">
        <div className="border-b border-white p-2 text-center text-lg">
          {product.title}
        </div>

        <div className="flex flex-col p-2">
          <span>Description:</span>
          <span>{product.description}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Price:</span>
          <span>{product.price}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Inventory:</span>
          <span>{product.inventory}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteProduct(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
