import axiosClient from "@/lib/axios";
import { AxiosError } from "axios";
// Enums
export enum TableStatus {
    AVAILABLE = 'AVAILABLE',
    OCCUPIED = 'OCCUPIED',
    BILL_PENDING = 'BILL_PENDING',
    DISABLED = 'DISABLED'
  }
  
  export enum TableCategoryStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }
  
  // Interfaces para Categorías
  export interface TableCategory {
    id: number;
    name: string;
    description: string;
    status: TableCategoryStatus;
    createdAt: string;
    updatedAt: string;
    tables?: Table[];
  }
  
  export interface CreateTableCategoryData {
    name: string;
    description: string;
    status: TableCategoryStatus;
  }
  
  export type UpdateTableCategoryData = CreateTableCategoryData;

  interface ApiError {
    message: string;
  }
  // Interfaces para Mesas
  export interface Table {
    id: number;
    number: string;
    description: string;
    capacity: number;
    status: TableStatus;
    categoryId?: number;
    createdAt: string;
    updatedAt: string;
    category?: {
      id: number;
      name: string;
      description: string;
    };
  }
  
  export interface CreateTableData {
    number: string;
    description: string;
    capacity: number;
    status: TableStatus;
    categoryId?: number;
  }
  
  export type UpdateTableData = CreateTableData;

// Servicio para Categorías de Mesas
export const tableCategoriesService = {
    // Obtener todas las categorías
    async getCategories(): Promise<TableCategory[]> {
      try {
        const { data } = await axiosClient.get('/table-categories');
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;   
        console.error('Error al obtener categorías:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al obtener categorías');
      }
    },
  
    // Obtener categoría por ID
    async getCategoryById(id: number): Promise<TableCategory> {
      try {
        const { data } = await axiosClient.get(`/table-categories/${id}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al obtener categoría:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al obtener categoría');
      }
    },
  
    // Crear nueva categoría
    async createCategory(categoryData: CreateTableCategoryData): Promise<TableCategory> {
      try {
        const { data } = await axiosClient.post('/table-categories', categoryData);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al crear categoría:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al crear categoría');
      }
    },
  
    // Actualizar categoría
    async updateCategory(id: number, categoryData: UpdateTableCategoryData): Promise<TableCategory> {
      try {
        const { data } = await axiosClient.put(`/table-categories/${id}`, categoryData);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al actualizar categoría:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al actualizar categoría');
      }
    },
  
    // Eliminar categoría
    async deleteCategory(id: number): Promise<{ message: string }> {
      try {
        const { data } = await axiosClient.delete(`/table-categories/${id}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al eliminar categoría:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al eliminar categoría');
      }
    }
  };
  
  // Servicio para Mesas
  export const tablesService = {
    // Obtener todas las mesas
    async getTables(categoryId?: number): Promise<Table[]> {
      try {
        const url = categoryId ? `/tables?categoryId=${categoryId}` : '/tables';
        const { data } = await axiosClient.get(url);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al obtener mesas:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al obtener mesas');
      }
    },
  
    // Obtener mesa por ID
    async getTableById(id: number): Promise<Table> {
      try {
        const { data } = await axiosClient.get(`/tables/${id}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al obtener mesa:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al obtener mesa');
      }
    },
  
    // Crear nueva mesa
    async createTable(tableData: CreateTableData): Promise<Table> {
      try {
        const { data } = await axiosClient.post('/tables', tableData);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al crear mesa:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al crear mesa');
      }
    },
  
    // Actualizar mesa
    async updateTable(id: number, tableData: UpdateTableData): Promise<Table> {
      try {
        const { data } = await axiosClient.put(`/tables/${id}`, tableData);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al actualizar mesa:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al actualizar mesa');
      }
    },
  
    // Eliminar mesa
    async deleteTable(id: number): Promise<{ message: string }> {
      try {
        const { data } = await axiosClient.delete(`/tables/${id}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        console.error('Error al eliminar mesa:', axiosError);
        throw new Error(axiosError.response?.data?.message || 'Error al eliminar mesa');
      }
    }
  }; 