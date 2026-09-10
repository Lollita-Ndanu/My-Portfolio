# My-Portfolio

A unique creative and mindblowning portfolio designed and brought to life by yours truly.

This is my personal portfolio as a **Full Stack Developer and System Analyst**. It's built to feel less like a static page and more like a small interactive world — a WebGL fluid simulation lives behind the content, follows your cursor, and reacts to music when you turn it on. Everything runs in a purple-and-black neon theme with a full dark/light mode.

Go check it out: https://lollitadev.vercel.app/

---

## Highlights

- **Interactive WebGL fluid background** — the classic WebGL fluid simulation (Pavel Dobryakov) rendered behind the whole site. It follows your cursor and reacts to the music.
- **Music controls (bottom left)** — play/pause the background track, mute, and adjust volume with a slider. Clicking the music button shows the track credit popup.
- **Audio-reactive fluid** — while music plays, the simulation makes pulsing "pops" in sync with the beat instead of only following the cursor.
- **Dark / Light mode** — a neon toggle in the header. Dark mode is black + neon purple; light mode is a soft light-purple canvas.
- **Circular neon profile photo** — my photo sits inside a slowly blinking bright-purple neon ring.
- **Animated header brand** — `Lollita Ndanu` in a heavy display font (Archivo Black) with a soft neon glow animation.
- **Glassmorphism UI** — frosted panels, neon edges, scan-line highlights, and animated text reveals built with Framer Motion.

---

## Tech Stack

Everything here is something I chose (and learned while building) on purpose:

| Layer | Technology |
| --- | --- |
| Framework | **Next.js** (App Router) with **React** |
| Language | **JavaScript** (JSX) |
| Styling | **Tailwind CSS** v4 |
| UI animation | **Framer Motion** |
| Icons | **Lucide React** |
| WebGL fluid | Custom-adapted **WebGL fluid simulation** (2D canvas/GLSL pipeline) |
| Fonts | Space Grotesk (body), JetBrains Mono (code), Archivo Black (header brand) |
| Tooling | ESLint (`eslint-config-next`) |

---

## Project Structure

I documented this folder so it's easy to find things later:

```text
.
├── public/
│   ├── audio/
│   │   └── cloud-jeff-kaale.mp3        # background music (see Credits)
│   ├── fluid/
│   │   ├── fluid.html                  # full-page WebGL fluid host page
│   │   └── script.js                   # adapted fluid simulation (MIT)
│   ├── images/
│   │   ├── lollita.jpg                 # my profile photo (hero ring)
│   │   └── lollita 2.jpg               # extra photo
│   └── lollita-ndanu-resume.pdf        # downloadable resume
├── src/
│   ├── app/
│   │   ├── layout.js                   # root layout + fonts + metadata
│   │   ├── page.js                     # home route
│   │   └── globals.css                 # theme variables + neon utilities
│   ├── components/
│   │   ├── audio/
│   │   │   └── MusicControls.jsx       # play/pause, volume, credit popup
│   │   ├── background/
│   │   │   └── FluidBackground.jsx     # iframe host + pointer/audio bridge
│   │   ├── layout/
│   │   │   ├── Navbar.jsx              # header brand + section links
│   │   │   ├── SiteShell.jsx           # page assembly
│   │   │   └── ThemeToggle.jsx         # dark/light switch
│   │   ├── sections/                   # About, Contact, Education, Experience,
│   │   │                               # Hero, Projects, Skills
│   │   └── ui/                         # reusable GlassPanel, buttons, tabs, cards
│   ├── data/
│   │   ├── profile.js                  # name, bio, links, experience, education
│   │   ├── projects.js                 # featured projects
│   │   └── skills.js                   # grouped skill chips
│   ├── hooks/
│   │   └── useThemeMode.js             # dark/light state + persistence
│   └── lib/
│       └── animationPresets.js         # shared Framer Motion variants
└── package.json
```

**How the data is organized:** almost all of my written content lives in `src/data/`. If I want to change my bio, projects, skills, or timeline later, I edit those files and never have to touch the components or the simulation.

---

## How the Background Works

The site uses two communicating layers:

1. **Fluid host page** (`public/fluid/`) — the simulation runs in its own full-screen iframe so the heavy WebGL work stays isolated from the React UI.
2. **`FluidBackground` component** — mounts the iframe and bridges two messages into it:

- `fluid-pointer` — the cursor position is forwarded from the parent window so the fluid follows the mouse even though the iframe sits *behind* the UI.
- `fluid-audio` — beat intensity is forwarded while music is playing so the fluid can "pop" in rhythm.

**Why an iframe?** If I placed the canvas on top it would capture the cursor but block every button and link on the page. Bridging the pointer position through `postMessage` lets the fluid react *behind* an interface that stays fully clickable.

**Theme handling in the fluid:** I added a tiny, minimal change to the fluid host — it reads a `?theme=` query parameter and sets the canvas background to black (dark) or light purple (light). I deliberately left the simulation physics, colors, and splats untouched.

---

## How the Music Works

The music controller (`MusicControls`) does three things:

1. Plays the Uppbeat track through a hidden HTML `<audio>` element.
2. Routes it through the **Web Audio API** into an `AnalyserNode`.
3. Reads the low-frequency energy each animation frame, detects beat spikes, and broadcasts a `fluid-audio` event with the intensity.

`FluidBackground` picks that event up and relays it to the fluid iframe, which triggers splat bursts proportional to the beat. Turn the music off and the simulation falls back to pure cursor-following mode.

Browsers block autoplay, so music starts only after you click the play button — that's expected.

---

## Theme Colors

I defined the whole look with CSS custom properties so one switch recolors the entire UI (panels, borders, text, glows).

| Token | Light mode | Dark mode |
| --- | --- | --- |
| Background | `#f6e8ff` (soft light purple) | `#000000` |
| Foreground | `#13051f` (near-black purple) | `#fff7ff` |
| Accent | `#7c3aed` | `#a855f7` |
| Accent soft | `#d946ef` | `#f0abfc` |
| Panels | translucent white | translucent black |

The fluid host mirrors these with its own black/light-purple background switch.

---

## Getting Started

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build + start:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

---

## Credits & Licenses

- **Background music:** "Cloud" by Jeff Kaale — Music from #Uppbeat (free for Creators!): https://uppbeat.io/t/jeff-kaale/cloud — License code: YBOJBCJIFHESW1SD
- **WebGL Fluid Simulation:** based on the open-source WebGL-Fluid-Simulation by Pavel Dobryakov (MIT License). The license header is preserved in `public/fluid/script.js`.

---

## Notes

- `node_modules`, `.next`, the original `Fluids-4.1` source folder, and the duplicate music file at the repo root are git-ignored; the site serves its copies from `public/fluid` and `public/audio`.
- Favicons/assets seeded by `create-next-app` (`public/*.svg`, `favicon.ico`) are still in the repo and are safe to delete or replace.
