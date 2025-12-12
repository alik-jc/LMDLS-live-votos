export const GENDER_MAP: Record<string, 'M' | 'F'> = {
    'May Osorio': 'F',
    'Ness': 'F',
    'Alejandra Buitrago': 'F',
    'Cami Pulgarin': 'F',
    'Natalia Es Mejor': 'F',
    'Andyysuz': 'F',
    'La Piquiña': 'M',
    'Karen Orozco': 'F',
    'Soley': 'F',
    'Emikukis': 'F',
    'Ismael Sanchez': 'M',
    'El Agropecuario': 'M',
    'Juanda': 'M',
    'El Cone': 'M',
    'Edits De Mierda': 'M',
    'El Domi': 'M',
    'Male': 'F',
    'Soy Frezo': 'M',
    'SoyFrezo': 'M',
    'SoyFreso': 'M',
    'KingLuiz': 'M',
    'Pesque': 'M',
    'Soy Freso': 'M',
};

// URLs directas de Imgur con thumbnails (evita rate limiting)
// Sufijos: s=small (90x90), b=big (160x160), t=thumbnail (160x160), m=medium (320x320), l=large (640x640)

export const AVATAR_MAP: Record<string, string> = {
    'Ismael Sanchez': '/avatars/UaGpHqAm.png',
    'Pesque': '/avatars/RdSDKsRm.png',
    'Edits De Mierda': '/avatars/Us5nUSJm.png',
    'Juanda': '/avatars/h6rIkXEm.png',
    'La Piquiña': '/avatars/RrVhcUZm.png',
    'KingLuiz': '/avatars/qQOy7Cmm.png',
    'SoyFrezo': '/avatars/JvQNhAUm.png',
    'El Agropecuario': '/avatars/NncLW7Em.png',
    'ElDomi': '/avatars/yon3rMZm.png',
    'Ness': '/avatars/3UZmzBlm.png',
    'Natalia Es Mejor': '/avatars/1W1NH2dm.png',
    'ElCone': '/avatars/uJlFcL3m.png',
    'Andyysuz': '/avatars/fbiaXogm.png',
    'Emikukis': '/avatars/eVRMQl0m.png',
    'May Osorio': '/avatars/vyNXVNVm.png',
    'Karen Orozco': '/avatars/b8SNllXm.png',
    'Alejandra Buitrago': '/avatars/3WF7giam.png',
    'Cami Pulgarin': '/avatars/4JOgnRjm.png',
    'Vita Celestine': '/avatars/vita_celestine.png',
};

export const KICK_ICON = 'https://cdn.bfldr.com/M71JT1XM/at/6c67ckf9pnxjstxf286xk7kp/Wordmark_Black.png?auto=webp&format=png';

export type SocialPlatform = 'instagram' | 'tiktok' | 'twitter' | 'facebook' | 'twitch' | 'kick' | 'youtube';

export interface SocialMedia {
    platform: SocialPlatform;
    url: string;
}

export const SOCIAL_MAP: Record<string, SocialMedia[]> = {
    'May Osorio': [
        { platform: 'instagram', url: 'https://www.instagram.com/may_osorio25' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@may_osorio21' }
    ],
    'Ness': [
        { platform: 'instagram', url: 'https://www.instagram.com/ness.zv' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@justnesszv' }
    ],
    'Alejandra Buitrago': [
        { platform: 'instagram', url: 'https://www.instagram.com/alejandrabuitragoarias' }
    ],
    'Cami Pulgarin': [
        { platform: 'instagram', url: 'https://www.instagram.com/camipulgarin' }
    ],
    'Natalia Es Mejor': [
        { platform: 'instagram', url: 'https://www.instagram.com/nataliaeslamejorl' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@nataliaeslamejorl' }
    ],
    'Andyysuz': [
        { platform: 'instagram', url: 'https://www.instagram.com/andyys_suz' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@angiesuzlives' }
    ],
    'La Piquiña': [
        { platform: 'instagram', url: 'https://www.instagram.com/lapiquina_' },
        { platform: 'kick', url: 'https://kick.com/lapiquina' }
    ],
    'Karen Orozco': [
        { platform: 'instagram', url: 'https://www.instagram.com/karen_orozco_05' }
    ],
    'Soley': [
        { platform: 'instagram', url: 'https://www.instagram.com/soley' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@soleyoficial' }
    ],
    'Emikukis': [
        { platform: 'instagram', url: 'https://www.instagram.com/emikukiss' },
        { platform: 'kick', url: 'https://kick.com/emikukis' }
    ],
    'Ismael Sanchez': [
        { platform: 'instagram', url: 'https://www.instagram.com/ismael_sanchez18' },
        { platform: 'kick', url: 'https://kick.com/ismaelsanchez18' }
    ],
    'El Agropecuario': [
        { platform: 'instagram', url: 'https://www.instagram.com/elreydelosagropecuarios_' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@juandavidtejadaoficial' }
    ],
    'Juanda': [
        { platform: 'instagram', url: 'https://www.instagram.com/juand4aaa' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@juand4aaa' },
        { platform: 'kick', url: 'https://kick.com/juand4aaa' }
    ],
    'El Cone': [
        { platform: 'instagram', url: 'https://www.instagram.com/el_c0ne' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@clips.elc0ne2' },
        { platform: 'kick', url: 'https://kick.com/elc0ne' }
    ],
    'Edits De Mierda': [
        { platform: 'instagram', url: 'https://www.instagram.com/soyedits_oficial' },
        { platform: 'kick', url: 'https://kick.com/editsdemrd' }
    ],
    'El Domi': [
        { platform: 'instagram', url: 'https://www.instagram.com/xeldomi_' },
        { platform: 'kick', url: 'https://kick.com/eldomi' }
    ],
    'Male': [
        { platform: 'instagram', url: 'https://www.instagram.com/soymale.gonzalez' },
        { platform: 'kick', url: 'https://kick.com/soymalegonzalez' }
    ],
    'Soy Frezo': [
        { platform: 'instagram', url: 'https://www.instagram.com/soyfrezo' },
        { platform: 'kick', url: 'https://kick.com/soyfrezo' }
    ],
    'SoyFrezo': [
        { platform: 'instagram', url: 'https://www.instagram.com/soyfrezo' },
        { platform: 'kick', url: 'https://kick.com/soyfrezo' }
    ],
    'SoyFreso': [
        { platform: 'instagram', url: 'https://www.instagram.com/soyfrezo' },
        { platform: 'kick', url: 'https://kick.com/soyfrezo' }
    ],
    'KingLuiz': [
        { platform: 'instagram', url: 'https://www.instagram.com/kingluiz' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@kingluiz' }
    ],
    'Pesque': [
        { platform: 'instagram', url: 'https://www.instagram.com/xpesque' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@xpesque' },
        { platform: 'kick', url: 'https://kick.com/pesque' }
    ],
    'Soy Freso': [
        { platform: 'instagram', url: 'https://www.instagram.com/soyfrezo' },
        { platform: 'kick', url: 'https://kick.com/soyfrezo' }
    ],
};
