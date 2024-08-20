export interface loginInterface{
    email: string
    name: string
}

export interface signupInterface{
    email: string,
    userName: string,
    password:string
}

export interface getDressInterface {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    category: string;
    image: string;
    sale: boolean;
    rating: number;
 }

 export interface AddToCart {
    _id: string;
    price: number;
    name: string;
    image: string;
 }

 export interface getReviewInterface {
    _id: string;
    postId: string;
    rating: number;
    comment: string;
    userId: string;
    userImage: string;
    userName: string;
    createdAt: string;
 }

 export interface AddToCart {
    _id: string;
    price: number;
    name: string;
    image: string;
    quantity: number;
 }