

export type Article = {
    title: string | null;
    story_title: string | null;
    story_url: string | null;
    url: string | null;
    author: string;
    created_at: number;
    num_comments: number;
}

export type User = {
    username: string; 
    about: string | null;
    updated_at: string;
}