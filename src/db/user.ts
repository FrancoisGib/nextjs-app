import prisma from "./db";

export const getUsers = async () => {
    await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            password: true,
        },
    });
}

export const getUserIds = async () => {
    return await prisma.user.findMany({ select: { id: true } });
}

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({ where: {id: id}, select: {name: true, email: true, id: true} });
}

export const getUserByName = async (name: string) => {
    return await prisma.user.findUnique({ where: {name: name}, select: {name: true, email: true, id: true} });
}

export const getUserByIdWithPassword = async (id: number) => {
    return await prisma.user.findUnique({ where: {id: id} });
}