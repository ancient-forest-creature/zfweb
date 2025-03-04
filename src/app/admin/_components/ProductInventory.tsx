import { db } from "~/server/db";
import { getProducts } from "~/server/queries";

export const dynamic = "force-dynamic";

// export const ProductInventory = async () => {
//   const products = await db.query.product.findMany({
//     orderBy: (model: any, { asc }) => asc(model.id),
//   });

export const ProductInventory = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <div className="relative max-w-sm">
            <a href="#">
              <img src={product.imgUrl[0]} alt={`Image ${product.id}`} />
            </a>
            <div className="flex flex-col items-center p-5">
              <a href="#">
                <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h1>
              </a>
              <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
