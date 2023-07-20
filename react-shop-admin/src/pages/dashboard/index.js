import { useState } from 'react';
import { Chart } from '@common/Chart';
import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import Paginate from '@components/Paginate';
import Link from 'next/link';
const PRODUCT_LIMIT = 5;
// const PRODUCT_OFFSET = 5;

const data = {
  datasets: [
    {
      label: 'Categories',
      data: ['Shoes', 'Electronics', 'Others', 'Furniture', 'Others'],
      borderWidth: 2,
      backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
    },
  ],
};
export default function Dashboard() {
  const [offsetProducts, setOffsetProducts] = useState(0);
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts));
  const totalProducts = useFetch(endPoints.products.getProducts(0, 0)).length;

  const categoryName = products?.map((prouduct) => prouduct.category);
  const categoryCount = categoryName?.map((category) => category.name);

  const countOccurrences = (array) => array.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <Chart className="mt-2 mb-8 " chartData={data} />
      {totalProducts > 0 && <Paginate totalItems={totalProducts} itemsPerPage={PRODUCT_LIMIT} setOffset={setOffsetProducts} neighbours={3}></Paginate>}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-10 h-10 rounded-full" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">${product.price}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{product.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Link href={`dashboard/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a href="/edit" className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
