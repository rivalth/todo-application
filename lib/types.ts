export type ActionError = {
    error: boolean;
    code: number;
    message?: string;
};

export type Collection = {
    id: string;
    user_id: string;
    name: string;
    icon: string;
    color: string;
    created_at: string;
};
