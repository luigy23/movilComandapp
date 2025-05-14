import axiosClient from "@/lib/axios";
import { AxiosError } from "axios";

//enums:
export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export enum ProductCategoryStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}


export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    status: ProductStatus;
    categoryId: number;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    imageUrl?: string;
    status: ProductStatus;
    file?: File;
}

export type UpdateProductData = CreateProductData;

// Product Categories
export interface CreateCategoryData {
    name: string;
    description: string;
}

export type UpdateCategoryData = CreateCategoryData;

export interface GetProductsParams {
    page?: number;
    pageSize?: number;
    categoryId?: number;
    search?: string;
    status?: ProductStatus;
}

export type PaginatedProducts = {
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

interface ApiError {
    message: string;
}

export const productsService = {
    async getProducts(params?: GetProductsParams): Promise<Product[] | PaginatedProducts> {
        try {
            const { data } = await axiosClient.get('/products', { params });
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al obtener productos:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al obtener productos');
        }
    },
    async getProductById(id: number): Promise<Product> {
        try {
            const { data } = await axiosClient.get(`/products/${id}`);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al obtener producto:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al obtener producto');
        }
    },
    async createProduct(productData: CreateProductData): Promise<Product> {
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price.toString());
            formData.append('stock', productData.stock.toString());
            formData.append('categoryId', productData.categoryId.toString());
            formData.append('status', productData.status);
            
            if (productData.file) {
                formData.append('image', productData.file);
            }

            const { data } = await axiosClient.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al crear producto:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al crear producto');
        }
    },
    async updateProduct(id: number, productData: UpdateProductData): Promise<Product> {
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price.toString());
            formData.append('stock', productData.stock.toString());
            formData.append('categoryId', productData.categoryId.toString());
            formData.append('status', productData.status);
            
            if (productData.file) {
                formData.append('image', productData.file);
            }

            const { data } = await axiosClient.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al actualizar producto:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al actualizar producto');
        }
    },
    async deleteProduct(id: number): Promise<{ message: string }> {
        try {
            const { data } = await axiosClient.delete(`/products/${id}`);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al eliminar producto:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al eliminar producto');
        }
    },
};

export const productCategoriesService = {
    async getCategories(): Promise<Category[]> {
        try {
            const { data } = await axiosClient.get('/product-categories');
            return data;
        }
        catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al obtener categorías:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al obtener categorías');
        }
    },
    async getCategoryById(id: number): Promise<Category> {
        try {
            const { data } = await axiosClient.get(`/product-categories/${id}`);
            return data;
        }
        catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al obtener categoría:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al obtener categoría');
        }
    },
    async createCategory(categoryData: CreateCategoryData): Promise<Category> {
        try {
            const { data } = await axiosClient.post('/product-categories', categoryData);
            return data;
        }
        catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al crear categoría:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al crear categoría');
        }
    },
    async updateCategory(id: number, categoryData: UpdateCategoryData): Promise<Category> {
        try {
            const { data } = await axiosClient.put(`/product-categories/${id}`, categoryData);
            return data;
        }
        catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al actualizar categoría:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al actualizar categoría');
        }
    },
    async deleteCategory(id: number): Promise<{ message: string }> {
        try {
            const { data } = await axiosClient.delete(`/product-categories/${id}`);
            return data;
        }
        catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            console.error('Error al eliminar categoría:', axiosError);
            throw new Error(axiosError.response?.data?.message || 'Error al eliminar categoría');
        }
    }
}


