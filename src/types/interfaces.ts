export interface IArticle {
    _id: string;
    label: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    body: string;
    authorName: string;
    author: string;
    created: string | Date;
    status: string;
    __v: number;
}