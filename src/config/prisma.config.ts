import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    private static instance: PrismaSingleton;
    public prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    public static getInstance(): PrismaSingleton {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaSingleton();
        }
        return PrismaSingleton.instance;
    }
}

export const prisma = PrismaSingleton.getInstance().prisma;
