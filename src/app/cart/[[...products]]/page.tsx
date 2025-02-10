interface ProductsPageProps {
  params: Promise<{ products?: string[] }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const paramData = await params;

  return (
    <div className="fix-height text-3xl font-bold p-5">
      Product Page
      <ul className="mt-7">
        {paramData?.products?.map((route, id) => (
          <li key={id} className="font-normal text-xl text-gray-600">
            {route}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
