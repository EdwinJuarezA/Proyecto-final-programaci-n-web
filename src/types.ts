// src/types.ts

export interface Image {
    id: number;
    url: string;
}

export interface Note {
    id: number;
    title: string;
    description: string;
    ubication: string;
    status: number;
    user_name: string;
    images: string[]; 
    url: string;
    category_id: number; 
}

export interface Ubication {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
}
