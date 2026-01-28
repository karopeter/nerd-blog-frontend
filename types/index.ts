export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
  excerpt: string;
  images?: File[]; 
  tags: string[];
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  excerpt: string;
  coverImage?: string; 
  images?: string[]; 
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse {
  data: Post[];
  pagination: PaginationInfo;
}

export interface PostsQueryParams {
  page: number;
  limit: number;
  search: string;
}