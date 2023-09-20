const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config)=>{
        config.module.rules.push({
            test: /\.html$/,
            include: [path.resolve(__dirname, 'src/app/api')],
            use: 'raw-loader', // to load file as string
          });
      
          return config;
    }
}

module.exports = nextConfig
