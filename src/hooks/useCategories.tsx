import {useEffect, useState} from 'react';
import productosApi from '../api/productosApi';
import {CategoriesResponse, Categoria} from '../interfaces/interfaces';

const useCategories = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const obtenerCategorias = async () => {
    const resp = await productosApi.get<CategoriesResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);
  return {
    categories,
    isLoading,
  };
};

export default useCategories;
