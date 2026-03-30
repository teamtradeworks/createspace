export {};

declare global {
  interface FeraReview {
    id: number;
    public_id: string;
    heading: string | null;
    body: string;
    rating: number;
    customer_name: string;
    customer_avatar_url: string | null;
    customer_location: string | null;
    created_at: string;
    media: Array<{
      id: string;
      url: string;
      type: "photo" | "video";
    }>;
    photos: Array<{
      id: string;
      url: string;
    }>;
    videos: Array<{
      id: string;
      url: string;
    }>;
  }

  interface FeraProductRating {
    average: number;
    count: number;
  }

  interface FeraReviewsResponse {
    reviews: FeraReview[];
    meta: { total_count: number; page: number; per_page: number };
  }

  interface FeraApi {
    getRating: (productId: string, callback: (rating: FeraProductRating) => void) => void;
    getReviews: (
      options: { product_id: string; page?: number; per_page?: number },
      callback: (response: FeraReviewsResponse) => void,
      errorCallback?: (error: unknown) => void,
    ) => void;
  }

  interface Fera extends Array<unknown> {
    api?: FeraApi;
    push: (...args: unknown[]) => number;
  }

  interface Window {
    fera?: Fera;
  }
}
