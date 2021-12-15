import React, {createContext, useEffect, useState} from 'react';
import {Producto, ProductsResponse} from '../interfaces/interfaces';
import productosApi from '../api/productosApi';
import {ImagePickerResponse} from 'react-native-image-picker';

type ProductContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (categoryId: string) => Promise<void>;
  loadProductId: (categoryId: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductContext = createContext({} as ProductContextProps);

const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    const resp = await productosApi.get<ProductsResponse>(
      '/productos?limite=50',
    );
    setProducts([...resp.data.productos]);
  };
  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const data = {
      nombre: productName,
      categoria: categoryId,
    };
    const resp = await productosApi.post<Producto>(`/productos`, data);
    setProducts([...products, resp.data]);
    return resp.data;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const data = {
      nombre: productName,
    };
    const resp = await productosApi.put<Producto>(
      `/productos/${productId}`,
      data,
    );
    setProducts(products.map(p => (p._id === productId ? resp.data : p)));
  };
  const deleteProduct = async (categoryId: string) => {};
  const loadProductId = async (id: string): Promise<Producto> => {
    const resp = await productosApi.get<Producto>(`productos/${id}`);
    return resp.data;
  };
  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    if (!data.assets) return;
    const {uri, type, fileName} = data.assets[0];
    const fileUpload = {
      uri,
      type,
      name: fileName,
    };
    const formData = new FormData();
    formData.append('archivo', fileUpload);
    const resp = await productosApi.put(`/cargar/productos/${id}`, formData);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductId,
        uploadImage,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
