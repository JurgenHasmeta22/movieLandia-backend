async function trackLastPageMiddleware(request: any, reply: any, next: any) {
    if (request.session) {
        request.session.lastPage = request.raw.url;
    }
    
    next();
}

export default trackLastPageMiddleware;
