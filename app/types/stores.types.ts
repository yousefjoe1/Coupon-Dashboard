export interface Store {
    id: number;
    name: string;
    logoUrl: string;
    websiteUrl: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface CouponFormInput {
    code: string;
    discountPct: number;
    title: string;
    expiryDate: string;
    storeId: string;
    id?: number | string;
    store?: Store;
}