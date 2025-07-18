import FetchedProducts from "@/components/fetchedProducts";
import { Suspense } from "react";
import Loading from "./loading";
import Filter from "@/components/filter";

export const revalidate = 20


export default async function Products({ searchParams }: { searchParams: { category?: string } }) {


    return (

        <div className="bg-gray-100 min-h-screen p-10">

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h1>


            <Filter />

            <Suspense fallback={<Loading />} >
                <FetchedProducts searchParams={searchParams} />

            </Suspense>

        </div>
    );
}
