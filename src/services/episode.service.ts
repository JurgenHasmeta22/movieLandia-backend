import { Episode, Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../config/prisma.config';

interface EpisodeServiceParams {
    sortBy: string;
    ascOrDesc: 'asc' | 'desc';
    perPage: number;
    page: number;
    title?: string | null;
    filterValue?: number | string;
    filterNameString?: string | null;
    filterOperatorString?: '>' | '=' | '<' | 'gt' | 'equals' | 'lt';
}

class EpisodeService {
    private prisma: PrismaClient;

    constructor(prismaInstance: typeof prisma) {
        this.prisma = prismaInstance;
    }

    public async getEpisodes({
        sortBy,
        ascOrDesc,
        perPage,
        page,
        title,
        filterValue,
        filterNameString,
        filterOperatorString,
    }: EpisodeServiceParams): Promise<Episode[] | null> {
        const filters: any = {};
        const skip = perPage ? (page ? (page - 1) * perPage : 0) : page ? (page - 1) * 20 : 0;
        const take = perPage || 20;

        if (title) filters.title = { contains: title };

        if (filterValue !== undefined && filterNameString && filterOperatorString) {
            const operator = filterOperatorString === '>' ? 'gt' : filterOperatorString === '<' ? 'lt' : 'equals';
            filters[filterNameString] = { [operator]: filterValue };
        }

        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        }

        const episodes = await this.prisma.episode.findMany({
            where: filters,
            include: { season: true },
            orderBy: orderByObject,
            skip,
            take,
        });

        if (episodes) {
            return episodes;
        } else {
            return null;
        }
    }

    public async getEpisodeById(episodeId: number): Promise<Episode | null> {
        const result = await this.prisma.episode.findFirst({
            where: { id: episodeId },
            include: { season: true },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async getEpisodeByTitle(title: string): Promise<Episode | null> {
        const result = await this.prisma.episode.findFirst({
            where: { title },
            include: { season: true },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async updateEpisodeById(episodeParam: Prisma.EpisodeUpdateInput, id: string): Promise<Episode | null> {
        const episode: Episode | null = await this.prisma.episode.findUnique({
            where: { id: Number(id) },
        });

        if (episode) {
            const episodeUpdated = await this.prisma.episode.update({
                where: { id: Number(id) },
                data: episodeParam,
                include: { season: true },
            });

            if (episodeUpdated) {
                return episodeUpdated;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async addEpisode(episodeParam: Episode): Promise<Episode | null> {
        const existingSeason = await this.prisma.season.findUnique({
            where: { id: episodeParam.seasonId },
        });

        if (existingSeason) {
            const episodeCreated = await this.prisma.episode.create({
                data: {
                    ...episodeParam,
                    season: { connect: { id: existingSeason.id } },
                } as Prisma.EpisodeCreateInput,
                include: { season: true },
            });

            if (episodeCreated) {
                return episodeCreated;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async deleteEpisodeById(id: number): Promise<string | null> {
        const episode: Episode | null = await this.prisma.episode.findUnique({
            where: { id },
        });

        if (episode) {
            const result = await this.prisma.episode.delete({
                where: { id },
            });

            if (result) {
                return 'Episode deleted successfully';
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async searchEpisodesByTitle(title: string, page: number): Promise<Episode[] | null> {
        const query = {
            where: {
                title: { contains: title },
            },
            include: { season: true },
            skip: page ? (page - 1) * 20 : 0,
            take: 20,
        };

        const episodes = await this.prisma.episode.findMany(query);

        if (episodes) {
            return episodes;
        } else {
            return null;
        }
    }
}

export default new EpisodeService(prisma);
