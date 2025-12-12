import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CDN_PREFIX = 'https://i.imgur.com/';

const AVATAR_MAP = {
    'Ismael Sanchez': `${CDN_PREFIX}UaGpHqAm.png`,
    'Pesque': `${CDN_PREFIX}RdSDKsRm.png`,
    'Edits De Mierda': `${CDN_PREFIX}Us5nUSJm.png`,
    'Juanda': `${CDN_PREFIX}h6rIkXEm.png`,
    'La Piquiña': `${CDN_PREFIX}RrVhcUZm.png`,
    'KingLuiz': `${CDN_PREFIX}qQOy7Cmm.png`,
    'SoyFrezo': `${CDN_PREFIX}JvQNhAUm.png`,
    'El Agropecuario': `${CDN_PREFIX}NncLW7Em.png`,
    'ElDomi': `${CDN_PREFIX}yon3rMZm.png`,
    'Ness': `${CDN_PREFIX}3UZmzBlm.png`,
    'Natalia Es Mejor': `${CDN_PREFIX}1W1NH2dm.png`,
    'ElCone': `${CDN_PREFIX}uJlFcL3m.png`,
    'Andyysuz': `${CDN_PREFIX}fbiaXogm.png`,
    'Emikukis': `${CDN_PREFIX}eVRMQl0m.png`,
    'May Osorio': `${CDN_PREFIX}vyNXVNVm.png`,
    'Karen Orozco': `${CDN_PREFIX}b8SNllXm.png`,
    'Alejandra Buitrago': `${CDN_PREFIX}3WF7giam.png`,
    'Cami Pulgarin': `${CDN_PREFIX}4JOgnRjm.png`,
    'Malee': `${CDN_PREFIX}RuwqN0fm.png`,
    'Soley': `${CDN_PREFIX}8v0CfNBm.png`,
    'Andyyuz': `${CDN_PREFIX}fbiaXogm.png`,
};

const EXTRA_ASSETS = {
    'kick-logo.svg': 'https://kick.com/img/kick-logo.svg',
};

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
};

const main = async () => {
    const publicDir = path.join(__dirname, 'public', 'avatars');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const [name, url] of Object.entries(AVATAR_MAP)) {
        const filename = url.split('/').pop();
        const filepath = path.join(publicDir, filename);
        try {
            await downloadImage(url, filepath);
            console.log(`Downloaded: ${name} -> ${filename}`);
        } catch (error) {
            console.error(`Failed to download ${name}: ${error.message}`);
        }
    }

    // Download extra assets
    const sponsorsDir = path.join(__dirname, 'public', 'sponsors');
    if (!fs.existsSync(sponsorsDir)) {
        fs.mkdirSync(sponsorsDir, { recursive: true });
    }

    for (const [filename, url] of Object.entries(EXTRA_ASSETS)) {
        const filepath = path.join(sponsorsDir, filename);
        try {
            await downloadImage(url, filepath);
            console.log(`Downloaded: ${filename}`);
        } catch (error) {
            console.error(`Failed to download ${filename}: ${error.message}`);
        }
    }
};

main();
