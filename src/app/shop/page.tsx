import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

// const mockUrls = [
//   "https://utfs.io/f/gjQG2fzhdjEbeBleGL0NFCi3YljM2kSELaKgvoGVOBtc1wZQ",
//   "https://utfs.io/f/gjQG2fzhdjEbdt7XrR41tNb30nuvJDm7Cy1AaXo8Eec9glk5",
//   "https://utfs.io/f/gjQG2fzhdjEbQVipOmjXKmuda7s2lyDvYNjC5fSxGgIwbiAZ",
//   "https://utfs.io/f/gjQG2fzhdjEbkTkxBRvY0wvJTtA39LnOSm7ehGM8fHbqKVP5",
// ];

// const mockImages = mockUrls.map((url, index) => ({
//   id: index + 1,
//   url,
// }));

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   img_key_1: string;
//   img_url_1: string;
// }

const Products = async () => {
  const products = await db.query.product.findMany({
    orderBy: (model: any, { asc }) => asc(model.id),
  });

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
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
              </a>
              <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                ${product.price}
              </p>
              <a
                href="#"
                className="inline-flex items-center border-slate-300 bg-black px-3 py-2 text-center text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-4 focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-black dark:focus:ring-zinc-800"
              >
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Products />
    </main>
  );
}

{
  /* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>  


          <div key={image.id} className="w-64">
            <img src={image.url} alt={`Image ${image.id}`}  />
          </div>
          */
}

// export default function HomePage() {
//   return (
//     <main >
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
//         <h1 className="text-4xl font-bold text-center">
//           ZFWeb Hello World
//         </h1>

//       </div>
//     </main>
//   );
// }

{
  /* <svg
className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 14 10"
>
<path
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  d="M1 5h12m0 0L9 1m4 4L9 9"
/>
</svg> */
}
