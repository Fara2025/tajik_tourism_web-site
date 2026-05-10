const API_BASE = process.env.REACT_APP_API_URL || 'https://Farrraa.pythonanywhere.com/api';

export interface Category {
  id: number;
  name: string;
  name_ru: string;
  name_tj: string;
  description: string;
}

export interface Region {
  id: number;
  name: string;
  name_ru: string;
  name_tj: string;
}

export interface ReviewData {
  id: number;
  cultural_object: number;
  author_name: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface CulturalObject {
  id: number;
  title: string;
  title_ru: string;
  title_tj: string;
  category: number;
  category_name: string;
  region: number | null;
  region_name: string;
  description: string;
  description_ru: string;
  description_tj: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  reviews: ReviewData[];
  reviews_count: number;
}

export interface RoutePoint {
  id: number;
  route: number;
  cultural_object: number;
  object_title: string;
  order: number;
  note: string;
}

export interface TouristRoute {
  id: number;
  title: string;
  title_ru: string;
  title_tj: string;
  description: string;
  description_ru: string;
  description_tj: string;
  duration: string;
  price: string;
  image: string | null;
  points: RoutePoint[];
  objects_count: number;
}

export interface InfrastructureItem {
  id: number;
  name: string;
  name_ru: string;
  name_tj: string;
  inf_type: string;
  type_display: string;
  description: string;
  description_ru: string;
  description_tj: string;
  address: string;
  region: number | null;
  region_name: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  website: string;
  image: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface Booking {
  id: number;
  tour_title: string;
  user_name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  status: string;
  created_at: string;
}

// --- API функции ---

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401 && token) {
     // Здесь можно добавить логику обновления токена, 
     // но для начала просто разлогиним пользователя
     localStorage.removeItem('access_token');
     window.location.href = '/login';
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Auth
export async function login(username: string, password: string): Promise<AuthResponse> {
  return fetchJson<AuthResponse>(`${API_BASE}/auth/token/`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function register(userData: any): Promise<User> {
  return fetchJson<User>(`${API_BASE}/auth/register/`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function getMe(): Promise<User> {
  return fetchJson<User>(`${API_BASE}/auth/me/`);
}

// Бронирования пользователя
export async function getUserBookings(): Promise<Booking[]> {
  const data = await fetchJson<PaginatedResponse<Booking>>(`${API_BASE}/bookings/`);
  return data.results;
}

// Существующие функции (обновленные для использования fetchJson с токеном)
export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<PaginatedResponse<Category>>(`${API_BASE}/categories/`);
  return data.results;
}

export async function getRegions(): Promise<Region[]> {
  const data = await fetchJson<PaginatedResponse<Region>>(`${API_BASE}/regions/`);
  return data.results;
}

export async function getCulturalObjects(params?: {
  category?: number;
  region?: number;
  search?: string;
}): Promise<CulturalObject[]> {
  const url = new URL(`${API_BASE}/objects/`);
  if (params?.category) url.searchParams.set('category', String(params.category));
  if (params?.region) url.searchParams.set('region', String(params.region));
  if (params?.search) url.searchParams.set('search', params.search);
  const data = await fetchJson<PaginatedResponse<CulturalObject>>(url.toString());
  return data.results;
}

export async function getCulturalObject(id: number): Promise<CulturalObject> {
  return fetchJson<CulturalObject>(`${API_BASE}/objects/${id}/`);
}

export async function getTouristRoutes(): Promise<TouristRoute[]> {
  const data = await fetchJson<PaginatedResponse<TouristRoute>>(`${API_BASE}/routes/`);
  return data.results;
}

export async function getTouristRoute(id: number): Promise<TouristRoute> {
  return fetchJson<TouristRoute>(`${API_BASE}/routes/${id}/`);
}

export async function getInfrastructure(params?: {
  inf_type?: string;
  region?: number;
  search?: string;
}): Promise<InfrastructureItem[]> {
  const url = new URL(`${API_BASE}/infrastructure/`);
  if (params?.inf_type) url.searchParams.set('inf_type', String(params.inf_type));
  if (params?.region) url.searchParams.set('region', String(params.region));
  if (params?.search) url.searchParams.set('search', params.search);
  const data = await fetchJson<PaginatedResponse<InfrastructureItem>>(url.toString());
  return data.results;
}

export async function getReviews(objectId?: number): Promise<ReviewData[]> {
  const url = new URL(`${API_BASE}/reviews/`);
  if (objectId) url.searchParams.set('cultural_object', String(objectId));
  const data = await fetchJson<PaginatedResponse<ReviewData>>(url.toString());
  return data.results;
}

export async function createReview(review: {
  cultural_object: number;
  author_name: string;
  rating: number;
  text: string;
}): Promise<ReviewData> {
  return fetchJson<ReviewData>(`${API_BASE}/reviews/`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
}

export async function createBooking(booking: any): Promise<any> {
  return fetchJson<any>(`${API_BASE}/bookings/`, {
    method: 'POST',
    body: JSON.stringify(booking),
  });
}

export async function createContactMessage(message: any): Promise<any> {
  return fetchJson<any>(`${API_BASE}/contacts/`, {
    method: 'POST',
    body: JSON.stringify(message),
  });
}
