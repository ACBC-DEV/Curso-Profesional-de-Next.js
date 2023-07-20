import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { CheckIcon, XCircleIcon } from '@heroicons/react/solid';
import Modal from '@common/Modal';
import FormProduct from '@components/FormProduct';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { deleteProduct } from '@services/api/products';
import Link from 'next/link';
// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

export default function Products() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.products.allProducts);
      setProducts(response.data);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleDelete = (id) => {
    deleteProduct(id).then(() => {
      setAlert({
        active: true,
        type: 'error',
        message: 'Delete Product successfully',
        autoClose: true,
      });
    });
  };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">list of Products</h2>
          <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"></div>
        </div>
        <div className="flex mt-5 mb-2 lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add Prouduct
            </button>
          </span>
        </div>
      </div>
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
                        <Link href={`/dashboard/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => handleDelete(product.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </>
  );
}
