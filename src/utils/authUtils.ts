import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { prisma } from '../app/app';
import { User } from '@prisma/client';

export function createToken(id: number) {
    try {
        const secret: Secret = process.env.MY_SECRET || 'defaultSecret';
        const token = jwt.sign({ id: id }, secret, {
            expiresIn: '1days',
        });

        if (token) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Failed to create token');
    }
}

export async function getUserFromToken(token: string) {
    try {
        const secret: Secret = process.env.MY_SECRET || 'defaultSecret';
        const data = jwt.verify(token, secret);

        if (data) {
            const user: User | null = await prisma.user.findUnique({
                where: { id: (data as JwtPayload).id },
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
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return null;
        } else {
            throw error;
        }
    }
}
