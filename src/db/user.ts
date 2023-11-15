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