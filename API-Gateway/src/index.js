const express = require('express');
const {ServerConfig, Logger} = require('./config');
const apiRoutes = require('./routes');
const {createProxyMiddleware}=require('http-proxy-middleware');
const rateLimit =require('express-rate-limit');
const app = express();

const limiter =  rateLimit({
    windowMs:2*60*1000,
    max:30
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(limiter)


app.use('/searchService', createProxyMiddleware({
    target:ServerConfig.SEARCH_SERVICE,changeOrigin:true, 
    pathRewrite:{'/searchService':'/'}
}));

app.use('/bookingService', createProxyMiddleware({
    target:ServerConfig.BOOKING_SERVICE,changeOrigin:true,
    pathRewrite:{'/bookingService':'/'}
}));

app.use('/api',apiRoutes);



app.listen(ServerConfig.PORT, ()=>{
    console.log(`Successfully started the server on port ${ServerConfig.PORT}`);
    //Logger.info("Successfully started the server",{});
});