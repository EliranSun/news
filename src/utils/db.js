import { put } from "@vercel/blob";


export const foo = async () => {
    const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
    console.log("HI?");
};