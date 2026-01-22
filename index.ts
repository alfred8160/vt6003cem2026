// index.ts
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';

// 初始化應用
const app = new Koa.default();
const router = new Router.default();

// ============== GET Request Handler ==============
router.get('/', async (ctx: Router.RouterContext, next: any) => {
    ctx.body = { 
        message: 'Hello World!',
        timestamp: new Date().toISOString(),
        status: 'success'
    };
    await next();
});

// ============== POST Request Handler ==============
router.post('/', async (ctx: Router.RouterContext, next: any) => {
    const data = ctx.request.body;
    ctx.body = {
        message: 'POST request received successfully',
        receivedData: data,
        timestamp: new Date().toISOString(),
        status: 'success'
    };
    await next();
});

// ============== Additional GET endpoints ==============
router.get('/test', async (ctx: Router.RouterContext, next: any) => {
    ctx.body = {
        message: 'Test endpoint working',
        endpoints: ['/', '/test', '/api'],
        serverTime: new Date().toISOString()
    };
    await next();
});

router.get('/api/status', async (ctx: Router.RouterContext, next: any) => {
    ctx.body = {
        status: 'online',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    };
    await next();
});

// ============== Use Middleware ==============
app.use(json.default());
app.use(Logger.default());
app.use(bodyParser.default());
app.use(router.routes()).use(router.allowedMethods());

// ============== Start Server ==============
const PORT = 10888;
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Koa Server Started Successfully!');
    console.log('='.repeat(50));
    console.log(`📍 Server URL: http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('Available Endpoints:');
    console.log(`  GET  /           - Home page`);
    console.log(`  POST /           - Test POST request`);
    console.log(`  GET  /test       - Test endpoint`);
    console.log(`  GET  /api/status - Server status`);
    console.log('='.repeat(50));
    console.log('Usage:');
    console.log('  1. Test GET with browser');
    console.log('  2. Test POST with Postman or curl');
    console.log('='.repeat(50));
});