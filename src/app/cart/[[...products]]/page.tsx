import React from "react";

interface ProductsPageProps {
  params?: { products?: string[] };
}

const ProductsPage = ({ params }: ProductsPageProps) => {
  console.log("✅✅✅✅", params);
  return (
    <div
      className="fixi-height text-3xl font-bold
    p-5"
    >
      product page
      <ul className="mt-7">
        {params?.products?.map((route, id) => (
          <li key={id} className="font-normal text-xl text-gray-600">
            {route}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;

// import React from "react";

// const page = () => {
//   return (
//     <div
//       className="fixi-height text-3xl font-bold
//         p-5"
//     >
//       Cart Page
//     </div>
//   );
// };

// export default page;
