import createServer from './app';

const start = async () => {
    const server = createServer();

    try {
        await server.listen(4000);
        server.log.info(`Server up: http://localhost:4000`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
