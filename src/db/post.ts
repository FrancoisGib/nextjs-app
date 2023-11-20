import prisma from "./db";

export const getPosts = async () => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: {
            author: true,
            title: true,
            id: true,
        },
    });
    return posts.map(post => {
        return {
            author: { name: post.author.name },
            title: post.title,
            id: post.id
        }
    });
}

export const getPostById = async (id: number) => {
    return await prisma.post.findUnique({ where: { id: id } }).catch(error => console.log(error))
}

export const getPostByUserId = async (id: number) => {
    return await prisma.post.findMany({
        where: { authorId: id }, select: {
            author: true, title: true, id: true,
        }
    }).catch(error => console.log(error))
}