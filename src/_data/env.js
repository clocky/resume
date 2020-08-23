const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = 'prod';
const prodUrl = 'https://markmclaughlin.info';
const devUrl = 'http://localhost:8080';
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl;
const isProd = environment === PROD_ENV;

const folder = {
    assets: '_assets',
};

const dir = {
    img: `/${folder.assets}/img/`,
}

module.exports = {
    siteName: 'Portfolio of Mark McLaughlin',
    author: 'Mark McLaughlin',
    environment,
    isProd,
    folder,
    tracking: {
        gtag: 'UA-122852-11',
    },
    base: {
        site: baseUrl,
        img: `${baseUrl}${dir.img}`,
    },
};