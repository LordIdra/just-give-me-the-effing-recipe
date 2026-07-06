export interface Recipe {
    id: number;
    link: string;
    title: string;
    description: string;
    date: string;
    rating_count: string;
    prep_time_seconds: string;
    cook_time_seconds: string;
    total_time_seconds: string;
    keywords: string[];
    authors: string[];
    images: string[];
    ingredients: string[];
    instructions: string[];
    calories?: string;
    carbohydrates?: string;
    cholesterol?: string;
    fat?: string;
    fiber?: string;
    protein?: string;
    saturated_fat?: string;
    sodium?: string;
    sugar?: string;
}

export interface ElasticSearchResponse {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number;
        hits: Array<{
            _index: string;
            _id: string;
            _score: number;
            _source: Recipe;
        }>;
    };
}

export interface AppState {
    query: string;
    results: Recipe[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
}