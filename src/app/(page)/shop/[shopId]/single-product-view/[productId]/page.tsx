import { TProduct } from "@/app/type";
import { fetchProductById } from "@/data/shops";
import SingleProductDetails from "./SingleProductDetails";
type TPageProps = {
  productId: string;
  shopId: string;
};

export default async function Component({ params }: { params: TPageProps }) {
  const product: TProduct = await fetchProduct(params.productId);

  return <SingleProductDetails product={product} />;
}

const fetchProduct = async (proudctId: string) => {
  const fetchingProductResponse: any = await fetchProductById(proudctId);
  if (fetchingProductResponse.status === 200) {
    const responseJson = await fetchingProductResponse.json();
    return responseJson ?? [];
  } else {
    console.error("Failed to fetch product");
  }
};
