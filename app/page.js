
import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()
  const productList = await GlobalApi.getAllProducts()
  // console.log(sliderList)
  return (
    <div className="">
      
      <Slider sliderList={sliderList}/>
      <CategoryList categoryList={categoryList}/>
      <ProductList productList={productList}/>
      <Image src='/banner.png' width={1000} height={300} alt="banner" className="w-full h-[400px] object-contain"/> 
      <Footer/>
    </div>
  );
}
