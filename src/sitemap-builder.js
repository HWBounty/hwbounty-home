// require("@babel/register");
import SitemapRoutes from './SitemapRoutes';
import { Sitemap } from '../';
const router = require('./SitemapRoutes').default;
const Sitemap = require('../').default;

(
  new Sitemap(router)
    .build('https://hwbounty.help')
    .save('./sitemap.xml')
);