import axios from 'axios';
import { PaginatedResponse, PostsQueryParams, Post } from '../types/index'
import { paginatedResponseSchema } from  '../Schema/schema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    if (config.data && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const postsApi = {
  /**
   * Fetch paginated posts with optional search
   */
  getPosts: async (params: PostsQueryParams): Promise<PaginatedResponse> => {
    try {
      const { data } = await apiClient.get('/posts', {
        params: {
          page: params.page,
          limit: params.limit,
          search: params.search || undefined,
        },
      });

      // Validate response with Zod
      const validatedData = paginatedResponseSchema.parse(data);
      return validatedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch posts');
      }
      throw error;
    }
  },

  /**
   * Fetch single post by ID
   */
  getPostById: async (id: string) => {
    try {
      const { data } = await apiClient.get(`/posts/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch post');
      }
      throw error;
    }
  },

  /**
   * Create new post with FormData (includes images)
   */
  createPost: async (formData: FormData): Promise<Post> => {
    try {
      const { data } = await apiClient.post('/posts', formData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to create post');
      }
      throw error;
    }
  },
};

export default apiClient;