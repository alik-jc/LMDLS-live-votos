# 🏰 La Mansión - Votación en Vivo

<div align="center">

Visualizador en tiempo real y plataforma de resultados para **La Mansión de los Streamers I** de Westcol.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

> **🎉 ESTADO ACTUAL: EVENTO FINALIZADO**
> 
> Los ganadores han sido anunciados y la votación ha concluido.

</div>

---

## 📑 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Tecnologías](#️-tecnologías)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Componentes](#-componentes)
- [Funciones de Utilidad](#-funciones-de-utilidad)
- [Tipos TypeScript](#-tipos-typescript)
- [Scripts de Utilidad](#-scripts-de-utilidad)
- [API y SSR](#-api-y-ssr)
- [Variables de Entorno](#-variables-de-entorno)
- [Flujo de Datos](#-flujo-de-datos)
- [Características Técnicas](#-características-técnicas)
- [Comandos de Desarrollo](#-comandos-de-desarrollo)
- [Dependencias Principales](#-dependencias-principales)
- [Integración con Kick.com](#-integración-con-kickcom)
- [Deployment](#-deployment)
- [Roadmap y Features](#-roadmap-y-features)
- [Créditos y Licencia](#-créditos-y-licencia)

---

## 📖 Descripción General

**La Mansión - Votación en Vivo** es una aplicación web interactiva desarrollada para la comunidad de Westcol, diseñada para visualizar y gestionar en tiempo real el sistema de votación del evento "La Mansión de los Streamers I".

### Contexto del Proyecto

El evento "La Mansión de los Streamers" es un reality show donde participantes compiten por el favor del público a través de votaciones. Esta aplicación sirve como:

- **Dashboard en tiempo real** para seguir los votos de cada participante
- **Plataforma de información** con perfiles, redes sociales y estado de transmisión en vivo
- **Sistema de análisis** con detección de patrones de votación sospechosos
- **Landing page** celebrando a los ganadores al finalizar el evento

### Flujo de la Aplicación

1. **Inicio**: Los usuarios acceden al dashboard principal
2. **Votación**: Durante el evento, pueden ver actualizaciones en tiempo real cada 30 segundos
3. **Análisis**: Visualizan rankings, participantes en peligro y estadísticas
4. **Interacción**: Acceden a streams en vivo integrados desde Kick.com
5. **Finalización**: Al concluir el evento, se muestra la landing page de ganadores

---

## 🚀 Características Principales

### 🏆 Sistema de Votación en Tiempo Real
- Actualización automática cada 30 segundos
- Visualización de votos totales y porcentajes
- Indicadores de cambios y tendencias

### 🎨 UI/UX Premium
- **Modo oscuro** optimizado para visualización prolongada
- **Diseño responsive** adaptado a móvil, tablet y desktop
- **Avatares personalizados** para todos los participantes
- **Animaciones fluidas** con Tailwind CSS
- **Glassmorphism** y efectos visuales modernos

### 📊 Dashboard Completo
- **Tabla de clasificación** (LeaderBoard) con ranking en tiempo real
- **Zona de peligro** destacando participantes con menos votos
- **Podio de campeones** mostrando el top 3
- **Grid de participantes** con información detallada

### 📺 Integración con Kick.com
- Reproductor embebido para ver streams en vivo
- Detección automática de estado en vivo
- Controles de chat integrados
- Modo teatro para visualización inmersiva

### 🤖 Detector de Bots
- Análisis de patrones de votación
- Identificación de actividad sospechosa
- Visualización de porcentaje de votos anómalos

### 🎯 Features Adicionales
- **Version Checker**: Notifica cuando hay actualizaciones disponibles
- **Cache Busting**: Sistema de versionado para evitar cachés obsoletos
- **SSR (Server-Side Rendering)**: Mejora SEO y tiempo de carga inicial
- **Showcase de Ganadores**: Landing page celebrando a los campeones
- **Patrocinadores**: Integración visual de sponsors oficiales

---

## 🛠️ Tecnologías

### Stack Principal

\`\`\`json
{
  "Frontend": "React 19.2.0",
  "Build Tool": "Vite 5.4.21",
  "Styling": "Tailwind CSS 3.4.17",
  "Language": "TypeScript 5.9.3",
  "Icons": "Lucide React 0.556.0",
  "SSR": "vite-plugin-ssr 0.4.142"
}
\`\`\`

### Dependencias Clave

- **react** & **react-dom**: Biblioteca principal para UI
- **vite**: Herramienta de build ultra rápida
- **tailwindcss**: Framework CSS utility-first
- **typescript**: Superset de JavaScript con tipado estático
- **lucide-react**: Iconos SVG modernos
- **vite-plugin-ssr**: Soporte para Server-Side Rendering
- **react-player**: Reproductor multimedia embebido
- **hls.js**: Streaming HLS para video en vivo

---

## 📂 Arquitectura del Proyecto

\`\`\`
LMDLS-live-votos/
├── api/                           # Serverless functions para SSR
│   └── ssr.js                    # Handler de Vercel para renderizado
│
├── public/                        # Assets estáticos
│   ├── avatars/                  # Imágenes de participantes
│   ├── lamansion-logo.svg       # Logo del evento
│   ├── manifest.json            # PWA manifest
│   └── version.json             # Control de versiones
│
├── scripts/                       # Scripts de utilidad
│   └── generate-version.js      # Genera timestamp para cache busting
│
├── src/
│   ├── components/               # Componentes React
│   │   ├── Header.tsx           # Navegación principal
│   │   ├── HeroSection.tsx      # Sección héroe con stats
│   │   ├── LeaderBoard.tsx      # Tabla de clasificación
│   │   ├── ParticipantsGrid.tsx # Grid de participantes
│   │   ├── PossibleChampions.tsx # Podio top 3
│   │   ├── DangerZone.tsx       # Participantes en riesgo
│   │   ├── KickPlayer.tsx       # Reproductor de streaming
│   │   ├── EventFinishedLanding.tsx # Página de ganadores
│   │   ├── CommunityPage.tsx    # Página de comunidad
│   │   ├── AboutSection.tsx     # Información del evento
│   │   ├── VersionChecker.tsx   # Verificador de versiones
│   │   ├── StatsPanel.tsx       # Panel de estadísticas
│   │   ├── FilterButtons.tsx    # Filtros de género
│   │   ├── SuspiciousActivityPanel.tsx # Detector de bots
│   │   └── BotLeaderBoard.tsx   # Ranking de actividad sospechosa
│   │
│   ├── data/                     # Datos estáticos y fallback
│   │   └── fallbackData.ts      # Datos de respaldo
│   │
│   ├── types/                    # Definiciones TypeScript
│   │   └── index.ts             # Interfaces y types
│   │
│   ├── utils/                    # Funciones de utilidad
│   │   ├── constants.ts         # Mapeos (género, avatares, redes)
│   │   ├── helpers.ts           # Funciones auxiliares
│   │   └── enrichment.ts        # Enriquecimiento de datos
│   │
│   ├── renderer/                 # Configuración SSR
│   │   ├── _default.page.server.tsx # Renderizado servidor
│   │   ├── _default.page.client.tsx # Hidratación cliente
│   │   ├── _error.page.tsx      # Página de error
│   │   ├── PageShell.tsx        # Shell de página
│   │   └── usePageContext.tsx   # Contexto de página
│   │
│   ├── pages/                    # Páginas de la aplicación
│   │   └── index/
│   │       └── index.page.tsx   # Página principal
│   │
│   ├── App.tsx                   # Componente raíz
│   └── main.tsx                  # Entry point
│
├── download_avatars.js           # Script para descargar avatares
├── vercel.json                   # Configuración de Vercel
├── vite.config.ts               # Configuración de Vite
├── tailwind.config.js           # Configuración de Tailwind
└── tsconfig.json                # Configuración de TypeScript
\`\`\`

### Descripción de Directorios

| Directorio | Propósito |
|------------|-----------|
| \`api/\` | Serverless functions para Server-Side Rendering en Vercel |
| \`public/\` | Assets estáticos servidos directamente (avatares, logos, iconos) |
| \`scripts/\` | Scripts de utilidad para desarrollo y build |
| \`src/components/\` | Componentes React reutilizables |
| \`src/data/\` | Datos estáticos y de fallback para desarrollo |
| \`src/types/\` | Definiciones TypeScript para type safety |
| \`src/utils/\` | Funciones de utilidad, constantes y helpers |
| \`src/renderer/\` | Configuración para SSR con vite-plugin-ssr |
| \`src/pages/\` | Páginas de la aplicación (routing) |


## 🧩 Componentes

### Componentes Principales

#### 1. **App.tsx**
**Componente raíz de la aplicación**

**Responsabilidades:**
- Gestión del estado global (candidatos, votaciones, countdown)
- Navegación entre vistas (dashboard, community, about)
- Configuración de variables de entorno
- Fetching y actualización de datos en tiempo real
- Polling cada 30 segundos para votos
- Control de tema (modo oscuro/claro)
- Lógica de filtrado (todos, masculino, femenino)

**Props:** Ninguna (componente raíz)

**Estado Principal:**
```typescript
{
  candidates: Candidate[],      // Lista de participantes
  lastFetchTime: string,        // Última actualización
  totalVotes: number,           // Total de votos
  countdown: string,            // Tiempo restante
  isTheaterMode: boolean,       // Modo teatro
  showChat: boolean,            // Mostrar chat
  currentView: string,          // Vista actual
  currentFilter: FilterType,    // Filtro activo
  loading: boolean              // Estado de carga
}
```

---

#### 2. **Header.tsx**
**Barra de navegación principal**

**Props:**
```typescript
{
  currentView: string,           // Vista activa
  onNavigate: (view: string) => void  // Callback de navegación
}
```

**Funcionalidad:**
- Navegación responsive con menú hamburguesa en móvil
- Enlaces a GitHub del proyecto
- Logo y branding del evento
- Menú sticky que permanece visible al hacer scroll
- Transiciones suaves entre secciones

---

#### 3. **HeroSection.tsx**
**Sección héroe con información destacada**

**Props:**
```typescript
{
  timeLeft: string,              // Tiempo restante
  totalVotes: number,            // Total de votos
  activeParticipants: number,    // Participantes activos
  isTheaterMode: boolean,        // Modo teatro
  toggleTheaterMode: () => void, // Toggle modo teatro
  showChat: boolean,             // Mostrar chat
  toggleChat: () => void,        // Toggle chat
  isDark: boolean,               // Tema oscuro
  isNoVotingState: boolean,      // Estado sin votación
  voteUrl: string,               // URL de votación
  currentDay: number,            // Día actual
  totalDays: number,             // Total de días
  isFinal: boolean               // Es el día final
}
```

**Funcionalidad:**
- **Contador regresivo** dinámico actualizado cada segundo
- **Cards de estadísticas** con glassmorphism:
  - Participantes activos
  - Total de votos
  - Tiempo restante
- **Botones de acción**:
  - Ver stream en vivo
  - Ir a votar
- **Integración con KickPlayer** para streaming
- **Modo teatro** para visualización inmersiva

---

#### 4. **LeaderBoard.tsx**
**Tabla de clasificación interactiva**

**Props:**
```typescript
{
  candidates: Candidate[],       // Lista de candidatos
  dangerList: string[],          // Participantes en peligro
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Ranking visual** con posiciones numeradas
- **Barras de progreso** proporcionales a los votos
- **Indicadores especiales**:
  - 🥇 Medalla de oro para el 1er lugar
  - 🥈 Medalla de plata para el 2do lugar
  - 🥉 Medalla de bronce para el 3er lugar
  - ⚠️ Alerta roja para zona de peligro
- **Información detallada**:
  - Avatar del participante
  - Nombre y género
  - Número de votos
  - Porcentaje de votos
  - Enlaces a redes sociales
- **Colores dinámicos** según posición y estado

---

#### 5. **ParticipantsGrid.tsx**
**Grid de tarjetas de participantes**

**Props:**
```typescript
{
  candidates: Candidate[],       // Lista de candidatos
  filter: FilterType,            // Filtro activo
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Vista de tarjetas** en grid responsive
- **Información por participante**:
  - Avatar personalizado
  - Nombre y género
  - Ranking actual
  - Votos y porcentaje
- **Enlaces a redes sociales**:
  - Instagram
  - TikTok
  - Twitch
  - Kick
  - OnlyFans
- **Indicador de estado en vivo** con badge animado
- **Filtrado** por género (todos, masculino, femenino)
- **Hover effects** y transiciones suaves

---

#### 6. **PossibleChampions.tsx**
**Podio de los 3 primeros lugares**

**Props:**
```typescript
{
  candidates: Candidate[],       // Top 3 candidatos
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Diseño de podio** con diferentes alturas según posición
- **Sistema de puntos** visual
- **Información destacada**:
  - Avatar grande
  - Nombre del participante
  - Número de votos
  - Porcentaje
- **Colores temáticos**:
  - Oro para 1er lugar
  - Plata para 2do lugar
  - Bronce para 3er lugar
- **Animaciones** de entrada

---

#### 7. **DangerZone.tsx**
**Sección de participantes en riesgo**

**Props:**
```typescript
{
  dangerList: string[],          // Nombres en peligro
  maleCandidates: Candidate[],   // Candidatos masculinos
  femaleCandidates: Candidate[], // Candidatos femeninos
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Alerta visual** con colores de advertencia
- **Listado separado por género** (hombres y mujeres)
- **Información de participantes en riesgo**:
  - Avatar
  - Nombre
  - Votos actuales
- **Mensaje de urgencia** para votar
- **Diseño llamativo** para captar atención

---

#### 8. **KickPlayer.tsx**
**Reproductor de streaming integrado**

**Props:**
```typescript
{
  channelSlug: string,           // Slug del canal de Kick
  isDark: boolean,               // Tema oscuro
  isOpen: boolean,               // Reproductor abierto
  onClose: () => void,           // Callback para cerrar
  embedded?: boolean,            // Modo embebido
  showChat?: boolean,            // Mostrar chat
  onToggleChat?: () => void      // Toggle chat
}
```

**Funcionalidad:**
- **Integración con Kick.com API** para verificar estado en vivo
- **Iframe embebido** del reproductor de Kick
- **Detección automática** de estado en vivo
- **Controles personalizados**:
  - Minimizar reproductor
  - Cerrar reproductor
  - Toggle de chat
  - Abrir en nueva ventana
- **Modo minimizado** que se mantiene visible al hacer scroll
- **Indicador de señal** mostrando si el stream está en vivo
- **Loader** durante la verificación de estado
- **CORS Proxy** para evitar problemas de cross-origin

---

#### 9. **EventFinishedLanding.tsx**
**Página de evento finalizado**

**Props:**
```typescript
{
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Showcase de ganadores** con diseño premium:
  - Natalia Es Mejor (Mujer ganadora)
  - Edits De Mierda (Hombre ganador)
- **Sección de patrocinadores** con logos:
  - Stake
  - Dynamo
  - Amper
  - Humo Barriles
- **Información del evento**:
  - Fecha de inicio y fin
  - Total de participantes
  - Total de votos
- **Mensaje de agradecimiento** a la comunidad
- **Botón para ver todos los participantes**
- **Diseño celebratorio** con confetti effect (opcional)

---

#### 10. **CommunityPage.tsx**
**Página de comunidad con ranking final**

**Props:**
```typescript
{
  candidates: Candidate[],       // Todos los candidatos
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Ranking final completo** de todos los participantes
- **Grid de integrantes** con tarjetas
- **Información de cada participante**:
  - Avatar
  - Nombre
  - Posición final
  - Total de votos
  - Enlaces a redes sociales
- **Sección "Todos los Integrantes"** con diseño de galería
- **Filtros opcionales** (si aplica)

---

#### 11. **AboutSection.tsx**
**Sección informativa del evento**

**Props:**
```typescript
{
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Explicación del formato** del evento
- **Reglas y mecánicas** de votación
- **Información sobre eliminaciones**
- **Cronología del evento** (días, etapas)
- **FAQ** (preguntas frecuentes)
- **Enlaces** a recursos adicionales

---

### Componentes de Utilidad

#### 12. **VersionChecker.tsx**
**Verificador automático de versiones**

**Props:**
```typescript
{
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Polling cada minuto** del archivo `version.json`
- **Comparación de versiones** (timestamp)
- **Notificación visual** cuando hay actualizaciones
- **Banner sticky** en la parte superior
- **Botón de recarga** para aplicar actualización
- **Auto-hide** después de cierto tiempo

---

#### 13. **StatsPanel.tsx**
**Panel compacto de estadísticas**

**Props:**
```typescript
{
  totalVotes: number,            // Total de votos
  activeParticipants: number,    // Participantes activos
  countdown: string,             // Tiempo restante
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Resumen de estadísticas** en formato compacto
- **Iconos** para cada métrica
- **Actualización en tiempo real**
- **Diseño responsive**

---

#### 14. **FilterButtons.tsx**
**Botones de filtrado**

**Props:**
```typescript
{
  currentFilter: FilterType,     // Filtro activo
  onFilterChange: (filter: FilterType) => void, // Callback
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Tres opciones de filtro**:
  - Todos
  - Hombres
  - Mujeres
- **Indicador visual** del filtro activo
- **Toggle buttons** con estados
- **Iconos de género**

---

#### 15. **SuspiciousActivityPanel.tsx**
**Panel de detección de actividad sospechosa**

**Props:**
```typescript
{
  candidates: Candidate[],       // Lista de candidatos
  isDark: boolean                // Tema oscuro
}
```

**Funcionalidad:**
- **Análisis de patrones** de votación
- **Detección de bots** mediante algoritmos
- **Cálculo de porcentaje** de votos sospechosos
- **Visualización de datos**:
  - Porcentaje de votos normales vs sospechosos
  - Lista de participantes con mayor actividad anómala
- **Alertas** si se detectan patrones inusuales
- **Gráficos y métricas** (opcional)


## 🔧 Funciones de Utilidad

### `src/utils/helpers.ts`

Funciones auxiliares para procesamiento de datos.

#### `getDisplayName(name: string): string`
Mapea nombres de API a nombres de visualización personalizados.

```typescript
// Ejemplo
getDisplayName('Soley') // Returns: 'Sopley'
getDisplayName('Juanda') // Returns: 'Juanda'
```

**Uso:** Normalización de nombres para mostrar correctamente en UI.

---

#### `getGender(name: string): Gender`
Obtiene el género de un participante basado en su nombre.

```typescript
// Ejemplo
getGender('Natalia Es Mejor') // Returns: 'F'
getGender('Edits De Mierda') // Returns: 'M'
getGender('Unknown') // Returns: 'U'
```

**Uso:** Filtrado y clasificación por género.

---

#### `getAvatar(name: string): string`
Retorna la URL del avatar del participante.

```typescript
// Ejemplo
getAvatar('Ismael Sanchez') // Returns: '/avatars/UaGpHqAm.png'
getAvatar('Unknown') // Returns: 'https://via.placeholder.com/80?text=?'
```

**Uso:** Mostrar avatares personalizados en UI.

---

#### `findLowest(candidates: Candidate[], gender: Gender): Candidate[]`
Encuentra los participantes con menos votos por género.

```typescript
// Ejemplo
findLowest(candidates, 'M') // Returns: Array de hombres con menos votos
findLowest(candidates, 'F') // Returns: Array de mujeres con menos votos
```

**Uso:** Identificar participantes en zona de peligro.

---

#### `formatTime(date: Date): string`
Formatea una fecha a hora local en formato HH:MM.

```typescript
// Ejemplo
formatTime(new Date()) // Returns: '14:30'
```

**Uso:** Mostrar la hora de última actualización.

---

### `src/utils/enrichment.ts`

#### `enrichCandidateData(candidate: Candidate): Candidate`
Enriquece los datos de un candidato con información adicional.

```typescript
// Proceso:
// 1. Obtiene redes sociales desde SOCIAL_MAP
// 2. Extrae usernames de URLs
// 3. Determina estado de transmisión en vivo
// 4. Identifica plataforma de streaming activa
```

**Transformación:**
```typescript
// Input
{
  name: 'Ismael Sanchez',
  votes: 15420
}

// Output
{
  name: 'Ismael Sanchez',
  votes: 15420,
  socials: {
    instagram: 'ismaelsanchez',
    kick: 'ismaelsanchez',
    twitch: 'ismaelsanchez'
  },
  isLive: false,
  livePlatform: undefined
}
```

**Uso:** Preparar datos completos para visualización.

---

### `src/utils/constants.ts`

Constantes y mapeos estáticos del proyecto.

#### **GENDER_MAP**
Mapeo de nombres a géneros (M/F).

```typescript
export const GENDER_MAP: Record<string, 'M' | 'F'> = {
  'May Osorio': 'F',
  'Ness': 'F',
  'Natalia Es Mejor': 'F',
  'Ismael Sanchez': 'M',
  'Edits De Mierda': 'M',
  // ... más participantes
};
```

---

#### **AVATAR_MAP**
URLs de avatares locales de participantes.

```typescript
export const AVATAR_MAP: Record<string, string> = {
  'Ismael Sanchez': '/avatars/UaGpHqAm.png',
  'Pesque': '/avatars/RdSDKsRm.png',
  'Edits De Mierda': '/avatars/Us5nUSJm.png',
  // ... más avatares
};
```

---

#### **SOCIAL_MAP**
Enlaces de redes sociales por participante.

```typescript
export const SOCIAL_MAP: Record<string, SocialLink[]> = {
  'Ismael Sanchez': [
    { platform: 'instagram', url: 'https://instagram.com/ismaelsanchez' },
    { platform: 'kick', url: 'https://kick.com/ismaelsanchez' },
    // ... más redes
  ],
  // ... más participantes
};
```

---

## 📘 Tipos TypeScript

### `src/types/index.ts`

Definiciones de tipos para type safety.

#### **Candidate**
Interfaz principal para participantes.

```typescript
export interface Candidate {
  name: string;              // Nombre del participante
  votes: number;             // Número de votos
  percentage?: string;       // Porcentaje de votos
  botPercentage?: string;    // Porcentaje de votos sospechosos
  gender?: 'M' | 'F';        // Género
  eliminated?: boolean;      // Si fue eliminado
  socials?: {                // Redes sociales
    instagram?: string;
    tiktok?: string;
    twitch?: string;
    kick?: string;
    of?: string;
  };
  isLive?: boolean;          // Está transmitiendo en vivo
  livePlatform?: 'tiktok' | 'twitch' | 'kick' | 'instagram'; // Plataforma activa
}
```

---

#### **VotesData**
Estructura de respuesta de la API de votación.

```typescript
export interface VotesData {
  payload: {
    candidates?: Array<{
      id: number;
      name: string;
      [key: string]: unknown;
    }>;
    settings: {
      results: {
        visual_data: Array<Record<string, number>>;
      };
    };
  };
}
```

---

#### **Tipos de Utilidad**

```typescript
export type Gender = 'M' | 'F' | 'U';        // Género (M=Masculino, F=Femenino, U=Desconocido)
export type FilterType = 'all' | 'M' | 'F';  // Filtros de visualización
```

---

## 📜 Scripts de Utilidad

### `download_avatars.js`

Script para descargar avatares desde CDN de Imgur a carpeta local.

#### **Funciones Principales**

##### `downloadImage(url, filepath): Promise`
Descarga una imagen con headers personalizados para evitar rate limiting.

```javascript
// Proceso:
// 1. Crea directorio si no existe
// 2. Realiza request HTTPS con User-Agent
// 3. Pipe del stream a archivo local
// 4. Maneja errores y redirecciones
```

**Parámetros:**
- `url`: URL de la imagen en Imgur
- `filepath`: Ruta local donde guardar

---

##### `main(): void`
Ejecuta la descarga de todos los avatares y assets adicionales.

```javascript
// Proceso:
// 1. Itera sobre AVATAR_MAP
// 2. Descarga cada avatar a /public/avatars/
// 3. Descarga assets extra (logos, iconos)
// 4. Log de progreso
```

**Uso:**
```bash
node download_avatars.js
```

---

### `scripts/generate-version.js`

Genera archivo `version.json` con timestamp único para cache busting.

#### **Funcionalidad**

```javascript
// Genera:
{
  "version": "1706123456789",    // Timestamp en ms
  "timestamp": "2024-01-24T..."  // ISO string
}
```

**Propósito:** 
- Evitar cachés obsoletos en navegadores
- Forzar recarga cuando hay actualizaciones
- Usado por VersionChecker.tsx

**Uso:**
```bash
node scripts/generate-version.js
```

---

## 🌐 API y SSR

### `api/ssr.js`

Vercel Serverless Function para Server-Side Rendering.

#### **Función handler**

```javascript
export default async function handler(req, res) {
  const { url } = req;
  const pageContextInit = { urlOriginal: url };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  
  if (!httpResponse) {
    res.statusCode = 404;
    res.end();
    return;
  }
  
  const { body, statusCode, contentType } = httpResponse;
  res.statusCode = statusCode;
  res.setHeader('content-type', contentType);
  res.end(body);
}
```

**Funcionalidad:**
- Recibe requests HTTP en Vercel
- Renderiza páginas con `vite-plugin-ssr`
- Retorna HTML pre-renderizado
- Maneja errores 404
- Establece headers apropiados

**Beneficios del SSR:**
- Mejor SEO (motores de búsqueda pueden indexar)
- Tiempo de carga inicial más rápido
- Preview correcto en redes sociales
- Funciona sin JavaScript

---

## 🔐 Variables de Entorno

Configuración mediante variables de entorno en `.env`.

### Estado del Evento

```env
# Indica si el evento ha finalizado
VITE_EVENT_FINISHED=true/false

# Indica si es el día final del evento
VITE_IS_FINAL=true/false
```

---

### Configuración de Días

```env
# Día actual del evento (1-7)
VITE_CURRENT_DAY=1

# Total de días del evento
VITE_TOTAL_DAYS=7
```

---

### URLs de API

```env
# URL de la API principal (si aplica)
VITE_API_URL=https://api.example.com

# URL del endpoint de votación
VITE_VOTE_URL=https://votacion.example.com/votes
```

---

### Estado de Votación

```env
# Indica si la votación está pausada temporalmente
VITE_VOTING_PAUSED=true/false

# Mensaje opcional durante pausa
VITE_PAUSE_MESSAGE="La votación se reanudará pronto"

# Estado sin votación (solo visualización)
VITE_NO_VOTING_STATE=true/false
```

---

### Ejemplo Completo

Ver archivo `.env.example`:

```env
# Voting State
VITE_VOTING_PAUSED=false
VITE_EVENT_FINISHED=true

# Event Configuration
VITE_CURRENT_DAY=7
VITE_TOTAL_DAYS=7
VITE_IS_FINAL=true

# API URLs
VITE_API_URL=https://api.example.com
VITE_VOTE_URL=https://votacion.example.com/votes
```


## 📊 Flujo de Datos

### 1. Inicialización (App.tsx)

```
Inicio de App
  ↓
Carga variables de entorno
  ↓
Inicializa estado con FALLBACK_CANDIDATES
  ↓
Configura polling cada 30 segundos
  ↓
Primer fetch de datos
```

---

### 2. Fetching de Datos

```
Timer de 30 segundos se dispara
  ↓
Fetch a VITE_VOTE_URL
  ↓
Parseo de respuesta JSON (VotesData)
  ↓
Extracción de visual_data
  ↓
Mapeo de nombres a votos
  ↓
Creación de Candidate[]
  ↓
Enriquecimiento con enrichCandidateData()
  ├─ Agrega socials desde SOCIAL_MAP
  ├─ Agrega gender desde GENDER_MAP
  ├─ Agrega avatar desde AVATAR_MAP
  └─ Determina isLive y livePlatform
  ↓
Ordenamiento por votos (mayor a menor)
  ↓
Actualización de estado (setCandidates)
```

---

### 3. Actualización de UI

La UI se actualiza mediante diferentes timers:

```javascript
// Actualización de votos
useEffect(() => {
  const interval = setInterval(fetchData, 30000); // 30 segundos
  return () => clearInterval(interval);
}, []);

// Countdown timer
useEffect(() => {
  const interval = setInterval(updateCountdown, 1000); // 1 segundo
  return () => clearInterval(interval);
}, []);

// Version checker
useEffect(() => {
  const interval = setInterval(checkVersion, 60000); // 1 minuto
  return () => clearInterval(interval);
}, []);

// Stream status checker
useEffect(() => {
  const interval = setInterval(checkStreamStatus, 60000); // 1 minuto
  return () => clearInterval(interval);
}, []);
```

---

### 4. Renderizado Condicional

```
isEventFinished?
  ├─ true → Renderizar EventFinishedLanding
  └─ false → Renderizar Dashboard normal
              ↓
          currentView?
            ├─ 'dashboard' → HeroSection + LeaderBoard + etc.
            ├─ 'community' → CommunityPage
            └─ 'about' → AboutSection
```

---

### 5. Diagrama de Flujo Completo

```
Usuario accede a la app
  ↓
[SSR] Vercel renderiza HTML inicial
  ↓
[Cliente] Hidratación de React
  ↓
[App.tsx] Inicialización
  ├─ Verifica VITE_EVENT_FINISHED
  │   ├─ true → Muestra EventFinishedLanding
  │   └─ false → Continúa
  ├─ Carga FALLBACK_CANDIDATES
  ├─ Inicia polling de votos (30s)
  ├─ Inicia countdown (1s)
  └─ Inicia version checker (60s)
  ↓
[Fetch] Obtiene datos de votación
  ├─ Parsea respuesta
  ├─ Enriquece con enrichCandidateData()
  └─ Actualiza estado
  ↓
[Render] Actualiza componentes
  ├─ Header (navegación)
  ├─ HeroSection (stats + stream)
  ├─ PossibleChampions (top 3)
  ├─ LeaderBoard (ranking)
  ├─ DangerZone (en riesgo)
  ├─ ParticipantsGrid (todos)
  └─ SuspiciousActivityPanel (bots)
  ↓
[Interacción] Usuario navega/filtra/ve streams
  ↓
[Loop] Vuelve a fetch cada 30 segundos
```

---

## ⚡ Características Técnicas

### Optimizaciones

#### **Lazy Loading de Imágenes**
```typescript
// Imágenes se cargan solo cuando son visibles
<img loading="lazy" src={avatar} alt={name} />
```

#### **Memoización de Componentes**
```typescript
// Evita re-renders innecesarios
const MemoizedLeaderBoard = React.memo(LeaderBoard);
```

#### **Polling Inteligente**
```typescript
// Detiene polling cuando el tab no está activo
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(pollInterval);
  } else {
    pollInterval = setInterval(fetchData, 30000);
  }
});
```

#### **Cache Busting con Versiones**
```typescript
// Agrega timestamp a requests
fetch(`${VOTE_URL}?v=${Date.now()}`);
```

---

### Responsive Design

#### **Mobile-First Approach**
Diseño optimizado primero para móvil, luego escalado a desktop.

#### **Breakpoints**
```javascript
// Tailwind CSS breakpoints
{
  'sm': '640px',   // Tablets pequeñas
  'md': '768px',   // Tablets
  'lg': '1024px',  // Laptops
  'xl': '1280px',  // Desktops
  '2xl': '1536px'  // Pantallas grandes
}
```

#### **Menú Hamburguesa en Móvil**
```typescript
// Header.tsx - Toggle menu
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

#### **Grid Adaptativo**
```html
<!-- ParticipantsGrid: 1 col en móvil, 2 en tablet, 3+ en desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

---

### Animaciones

#### **Tailwind CSS Animations**
```css
/* Spin para loaders */
.animate-spin

/* Pulse para elementos destacados */
.animate-pulse

/* Bounce para botones */
.animate-bounce
```

#### **Transitions Suaves**
```css
/* Todas las propiedades */
.transition-all .duration-300

/* Solo colores */
.transition-colors .duration-200

/* Solo transform */
.transition-transform .duration-500
```

#### **Hover Effects**
```html
<!-- Escala al hacer hover -->
<div class="hover:scale-105 transition-transform">

<!-- Cambia opacidad -->
<button class="hover:opacity-80 transition-opacity">

<!-- Cambia fondo -->
<div class="hover:bg-gray-800 transition-colors">
```

#### **Loading States**
```typescript
// Spinner mientras carga
{loading && (
  <div class="animate-spin">
    <Loader2 />
  </div>
)}
```

---

### Glassmorphism

Efecto de vidrio esmerilado moderno:

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

Usado en:
- Cards de estadísticas (HeroSection)
- Tarjetas de participantes
- Modales y overlays
- Header con sticky

---

## 💻 Comandos de Desarrollo

### Instalación

```bash
# Instalar dependencias
npm install
```

---

### Desarrollo

```bash
# Iniciar servidor de desarrollo (con hot reload)
npm run dev

# El servidor estará disponible en http://localhost:5173
```

---

### Build

```bash
# Compilar para producción
npm run build

# Genera carpeta dist/ con:
# - dist/client/  → Assets del cliente
# - dist/server/  → Código SSR
```

---

### Preview

```bash
# Preview del build de producción localmente
npm run preview
```

---

### Linting

```bash
# Ejecutar ESLint para verificar código
npm run lint

# ESLint con auto-fix
npm run lint -- --fix
```

---

### Utilidades

```bash
# Descargar todos los avatares desde Imgur
node download_avatars.js

# Generar archivo de versión (cache busting)
node scripts/generate-version.js
```

---

### Comandos Útiles de Git

```bash
# Ver estado del repositorio
git status

# Ver cambios
git diff

# Agregar cambios
git add .

# Commit
git commit -m "mensaje"

# Push a GitHub
git push origin main
```


## 📦 Dependencias Principales

### Dependencias de Producción

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| `react` | ^19.2.0 | Biblioteca principal para construir UI |
| `react-dom` | ^19.2.0 | Renderizado de React en el DOM |
| `lucide-react` | ^0.556.0 | Iconos SVG modernos y personalizables |
| `vite-plugin-ssr` | ^0.4.142 | Plugin para Server-Side Rendering |
| `react-player` | ^3.4.0 | Reproductor de video/audio embebido |
| `hls.js` | ^1.6.15 | Biblioteca para streaming HLS |

---

### Dependencias de Desarrollo

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| `vite` | ^5.4.21 | Build tool ultra rápido |
| `typescript` | ~5.9.3 | Superset de JavaScript con tipos |
| `tailwindcss` | ^3.4.17 | Framework CSS utility-first |
| `@vitejs/plugin-react` | ^5.1.1 | Plugin de Vite para React |
| `eslint` | ^9.39.1 | Linter para JavaScript/TypeScript |
| `autoprefixer` | ^10.4.22 | PostCSS plugin para prefijos CSS |
| `postcss` | ^8.5.6 | Herramienta para transformar CSS |

---

### Explicación de Dependencias Clave

#### **react** & **react-dom**
Core de la aplicación. React 19 trae mejoras en performance y nuevas features.

#### **vite**
Build tool que reemplaza a webpack/parcel. Características:
- Hot Module Replacement (HMR) instantáneo
- Build optimizado con Rollup
- Soporte nativo para TypeScript
- Dev server ultra rápido

#### **tailwindcss**
Framework CSS utility-first. Ventajas:
- Clases utilitarias para construir UI rápidamente
- Purge automático de CSS no usado
- Responsive design fácil
- Personalización completa

#### **typescript**
Agrega tipado estático a JavaScript:
- Detección de errores en tiempo de desarrollo
- Autocompletado inteligente
- Refactoring seguro
- Mejor documentación del código

#### **lucide-react**
Iconos SVG modernos:
- Más de 1000 iconos disponibles
- Totalmente personalizables
- Tree-shakeable (solo importa los que usas)
- Accesibles

#### **vite-plugin-ssr**
Habilita SSR (Server-Side Rendering):
- Mejora SEO
- Carga inicial más rápida
- Compatible con Vercel

#### **react-player**
Reproductor embebido versátil:
- Soporta YouTube, Vimeo, Twitch, etc.
- Controles personalizables
- API consistente

---

## 🎮 Integración con Kick.com

### API Endpoint

```
https://kick.com/api/v2/channels/{slug}
```

**Parámetros:**
- `{slug}`: Username del canal de Kick

**Respuesta:**
```json
{
  "id": 123456,
  "user_id": 789012,
  "slug": "westcol",
  "playback_url": "https://...", // Solo si está en vivo
  "is_live": true,
  // ... más campos
}
```

---

### Player Embed

#### **URL del Player**
```
https://player.kick.com/{slug}
```

#### **Implementación**

```typescript
// KickPlayer.tsx
const playerUrl = `https://player.kick.com/${channelSlug}`;

<iframe 
  src={playerUrl}
  allowFullScreen
  allow="autoplay; fullscreen"
/>
```

---

### Verificación de Estado en Vivo

```typescript
const checkStreamStatus = async () => {
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://kick.com/api/v2/channels/${channelSlug}?_=${Date.now()}`
    );
    const data = await response.json();
    
    if (data && data.playback_url) {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  } catch (error) {
    console.error('Error checking stream status:', error);
    setIsLive(false);
  }
};
```

---

### Proxy CORS

#### **Problema**
API de Kick bloquea requests desde otros dominios (CORS).

#### **Solución**
Usar proxy CORS:

```
https://corsproxy.io/?{url}
```

**Ejemplo:**
```typescript
const proxyUrl = `https://corsproxy.io/?https://kick.com/api/v2/channels/westcol`;
```

---

### Características de la Integración

✅ **Detección automática** de estado en vivo
✅ **Player embebido** con iframe
✅ **Chat integrado** (opcional)
✅ **Modo minimizado** que persiste
✅ **Link externo** para abrir en nueva pestaña
✅ **Indicador visual** de señal en vivo
✅ **Auto-refresh** cada minuto para verificar estado

---

## 🚀 Deployment

### Vercel

La aplicación está configurada para deployment en Vercel.

#### **Configuración: vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "rewrites": [
    {
      "source": "/((?!assets/|.*\\.svg|.*\\.png|.*\\.ico|.*\\.xml|.*\\.txt).*)",
      "destination": "/api/ssr"
    }
  ]
}
```

**Explicación:**
- `buildCommand`: Comando para compilar la app
- `outputDirectory`: Carpeta con archivos estáticos
- `rewrites`: Redirige requests a función SSR, excepto assets

---

#### **Pasos para Deployment**

1. **Conectar Repositorio**
```bash
# Desde Vercel Dashboard, importar proyecto desde GitHub
```

2. **Configurar Variables de Entorno**
En Vercel Dashboard → Settings → Environment Variables:
```
VITE_EVENT_FINISHED=true
VITE_IS_FINAL=true
VITE_CURRENT_DAY=7
VITE_TOTAL_DAYS=7
VITE_VOTE_URL=https://...
```

3. **Deploy**
```bash
# Automático en cada push a main
git push origin main
```

4. **Vercel CLI (opcional)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

#### **Características de Deployment**

✅ **Deploy automático** en cada push
✅ **Preview deployments** para PRs
✅ **SSL/HTTPS** automático
✅ **CDN global** para assets
✅ **Serverless functions** para SSR
✅ **Rollback** instantáneo
✅ **Analytics** integrados

---

### Otras Plataformas

#### **Netlify**
1. Conectar repositorio
2. Build command: `npm run build`
3. Publish directory: `dist/client`
4. Configurar redirects para SSR

#### **Railway**
1. Crear proyecto
2. Conectar GitHub repo
3. Auto-detecta configuración
4. Deploy automático

#### **Cloudflare Pages**
1. Conectar repositorio
2. Framework preset: Vite
3. Build command: `npm run build`
4. Build output: `dist/client`

---

## 🗺️ Roadmap y Features

### ✅ Implementado

- ✅ Sistema de votación en tiempo real
- ✅ Detector de bots y actividad sospechosa
- ✅ Integración con Kick.com
- ✅ Modo oscuro (tema dark por defecto)
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ SSR con Vercel
- ✅ Version checking automático
- ✅ Live status detection
- ✅ Leaderboard con ranking
- ✅ Zona de peligro
- ✅ Podio de campeones
- ✅ Grid de participantes
- ✅ Filtrado por género
- ✅ Enlaces a redes sociales
- ✅ Countdown timer
- ✅ Landing page de ganadores
- ✅ Showcase de patrocinadores
- ✅ Avatares personalizados
- ✅ Glassmorphism y animaciones
- ✅ KickPlayer con controles
- ✅ Modo teatro para streaming
- ✅ Cache busting

---

### 🔮 Posibles Mejoras Futuras

#### **Funcionalidades**
- [ ] Sistema de notificaciones push
- [ ] Gráficos históricos de votación
- [ ] Modo claro (light theme)
- [ ] PWA completo (offline support)
- [ ] Chat en vivo integrado
- [ ] Sistema de predicciones
- [ ] Compartir en redes sociales
- [ ] Generador de imágenes para compartir
- [ ] Timeline de eventos
- [ ] Búsqueda de participantes
- [ ] Comparación entre participantes
- [ ] Export de datos (CSV, JSON)

#### **Optimizaciones**
- [ ] Service Worker para caching
- [ ] Image optimization con next-gen formats (WebP, AVIF)
- [ ] Code splitting más agresivo
- [ ] Lazy loading de componentes
- [ ] Virtual scrolling para listas largas
- [ ] Optimistic UI updates
- [ ] WebSocket para updates en tiempo real
- [ ] GraphQL para queries más eficientes

#### **UX/UI**
- [ ] Modo compacto/expandido
- [ ] Personalización de dashboard
- [ ] Favoritos de participantes
- [ ] Atajos de teclado
- [ ] Tour guiado para nuevos usuarios
- [ ] Tooltips informativos
- [ ] Modo accesibilidad mejorado
- [ ] Soporte multi-idioma

#### **Analytics**
- [ ] Dashboard de estadísticas avanzado
- [ ] Heatmaps de votación
- [ ] Patrones de comportamiento
- [ ] Reportes exportables
- [ ] API pública de datos

---

## 👥 Créditos y Licencia

### Créditos

**Desarrollado para:**
- Comunidad de **Westcol**
- Evento: **La Mansión de los Streamers I**

**Tecnologías:**
- React Team por React
- Evan You por Vite
- Tailwind Labs por Tailwind CSS
- Vercel por hosting y SSR
- Kick.com por la plataforma de streaming

**Íconos:**
- Lucide Icons

**Inspiración:**
- Reality shows y competencias en vivo
- Comunidad de streamers hispanohablantes

---

### Licencia

Este proyecto es de código abierto bajo la licencia MIT.

```
MIT License

Copyright (c) 2024 La Mansión de los Streamers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

### Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

### Contacto

Para preguntas, sugerencias o reportar bugs:

- **GitHub Issues:** [Crear issue](https://github.com/alik-jc/LMDLS-live-votos/issues)
- **Comunidad:** Westcol Discord/Redes Sociales

---

### Agradecimientos

Agradecimientos especiales a:

- 🏆 **Westcol** por organizar el evento
- 🎮 **Los participantes** por su contenido
- 💬 **La comunidad** por su apoyo
- 🛠️ **Contribuidores** del código

---

<div align="center">

**¡Gracias por usar La Mansión - Votación en Vivo!**

⭐ Si te gusta el proyecto, dale una estrella en GitHub

🔗 [Ver en Vivo](#) | [Reportar Bug](https://github.com/alik-jc/LMDLS-live-votos/issues) | [Solicitar Feature](https://github.com/alik-jc/LMDLS-live-votos/issues)

---

*Hecho con ❤️ para la comunidad de Westcol*

</div>
