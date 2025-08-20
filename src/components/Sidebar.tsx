
import { useEffect, useState } from 'react';

interface Product {
    category: string;
}

interface FetchResponse {
    products: Product[];
}

const Sidebar = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "banana",
        "cherry",
        "date",
        "elderberry",
        "fig",
        "grape",
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data: FetchResponse = await response.json();
                const uniqueCategories = Array.from(
                    new Set(data.products.map((products) => products.category))
                );
                setCategories(uniqueCategories);

            } catch (error) {
                console.error('Error in fetching data')
            }
        };
        fetchCategories();
    })

    return (
        <div className='w-64 p-5 h-screen'>
            <h1 className='text-2xl font-bold mb-10 mt-4'>KP Store</h1>
            <section>
                <input type="text" className="border-2 rounded px-2 py-3 sm:mb-2" placeholder="Search a Product" />
                <div className="flex justify-center items-center">
                    <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder='Min' />
                    <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder='Max' />
                </div>


                {/* Categories Section*/}
                <section>
                    <div className="my-5">
                        <h2 className="text-xl font-semibold mb-3">Categories</h2>
                    </div>
                    {categories.map((category, index) => (
                        <label key={index} className='block mb-2'>
                            <input type="radio" name="category" className="mr-2 w-[16px] h-[16px]" />
                            {category.toUpperCase()}
                        </label>
                    ))}
                </section>

                {/**Keryword Section */}

                <div className="text-xl font-semibold my-5">
                    Keywords

                    <div>
                        {keywords.map((keyword, index) => (
                            <button key={index} className='block my-2 px-4 py-2 w-full text-left border-1 rounded hover:bg-gray-100'>
                                {keyword.toUpperCase()}
                            </button>
                        )

                        )}
                    </div>
                </div>
 
                <button className="w-full mb-[4rem] py-2 bg-black  text-white rounded  mt-5">
                    Reset Filters
                </button>

            </section>

        </div>
    )
}

export default Sidebar