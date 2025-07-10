import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  mockUsers, 
  mockGuards, 
  mockServiceRequests, 
  mockQuotes, 
  mockBookings,
  getMockUserByCredentials,
  getMockGuardByUserId,
  getMockAvailableGuards,
  getMockServiceRequestsByClient,
  getMockQuotesByRequest,
  getMockBookingsByClient
} from "./mockData";

// Mock API responses for demo
const mockApiResponses: Record<string, any> = {
  "/api/guards": mockGuards,
  "/api/service-requests": mockServiceRequests,
  "/api/quotes": mockQuotes,
  "/api/bookings": mockBookings
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const body = data ? data as any : null;
  
  // Handle authentication
  if (url === '/api/auth/login' && method === 'POST') {
    const user = getMockUserByCredentials(body.username, body.password);
    if (!user) {
      throw new Error('بيانات الدخول غير صحيحة');
    }
    
    let guard = null;
    if (user.userType === 'guard') {
      guard = getMockGuardByUserId(user.id);
    }
    
    const response = new Response(JSON.stringify({ user, guard }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  }
  
  // Handle user registration
  if (url === '/api/auth/register' && method === 'POST') {
    const newUser = {
      id: Date.now(),
      ...body,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    const response = new Response(JSON.stringify({ user: newUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  }
  
  // Handle service request creation
  if (url === '/api/service-requests' && method === 'POST') {
    const newRequest = {
      id: Date.now(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockServiceRequests.push(newRequest);
    const response = new Response(JSON.stringify(newRequest), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  }
  
  // Handle quote submission
  if (url === '/api/quotes' && method === 'POST') {
    const newQuote = {
      id: Date.now(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockQuotes.push(newQuote);
    const response = new Response(JSON.stringify(newQuote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  }
  
  // Handle other endpoints with success response
  const response = new Response(JSON.stringify({ success: true, message: 'تم بنجاح' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  return response;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Handle specific mock API endpoints
    if (mockApiResponses[url]) {
      return mockApiResponses[url];
    }
    
    // Handle parameterized endpoints
    if (url.startsWith('/api/service-requests/') && url.includes('/quotes')) {
      const requestId = parseInt(url.split('/')[3]);
      return getMockQuotesByRequest(requestId);
    }
    
    if (url.startsWith('/api/clients/') && url.includes('/service-requests')) {
      const clientId = parseInt(url.split('/')[3]);
      return getMockServiceRequestsByClient(clientId);
    }
    
    if (url.startsWith('/api/clients/') && url.includes('/bookings')) {
      const clientId = parseInt(url.split('/')[3]);
      return getMockBookingsByClient(clientId);
    }
    
    // Default empty response for unknown endpoints
    return [];
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
