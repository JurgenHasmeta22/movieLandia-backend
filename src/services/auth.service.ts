import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.config';
import { PrismaClient, User } from '@prisma/client';

class AuthService {
    private prisma: PrismaClient;

    constructor(prismaInstance: typeof prisma) {
        this.prisma = prismaInstance;
    }

    public async signUp(userData: { email: string; password: string; userName: string }): Promise<User | null> {
        const { email, password, userName } = userData;

        const existingUser: User | null = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return null;
        } else {
            const hash = bcrypt.hashSync(password);
            const user: User | null = await this.prisma.user.create({
                data: { email, password: hash, userName },
                include: {
                    favMovies: { include: { movie: true } },
                    favSeries: { include: { serie: true } },
                    movieReviews: { include: { movie: true } },
                    serieReviews: { include: { serie: true } },
                    upvotedMovies: { include: { movieReview: true, movie: true } },
                    downvotedMovies: { include: { movieReview: true, movie: true } },
                    upvotedSeries: { include: { serieReview: true, serie: true } },
                    downvotedSeries: { include: { serieReview: true, serie: true } },
                },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        }
    }

    public async login(email: string, password: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { email },
            include: {
                favMovies: { include: { movie: true } },
                favSeries: { include: { serie: true } },
                movieReviews: { include: { movie: true } },
                serieReviews: { include: { serie: true } },
                upvotedMovies: { include: { movieReview: true, movie: true } },
                downvotedMovies: { include: { movieReview: true, movie: true } },
                upvotedSeries: { include: { serieReview: true, serie: true } },
                downvotedSeries: { include: { serieReview: true, serie: true } },
            },
        });

        if (user) {
            const passwordMatches: boolean = bcrypt.compareSync(password, user.password);

            if (passwordMatches) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

export default new AuthService(prisma);
