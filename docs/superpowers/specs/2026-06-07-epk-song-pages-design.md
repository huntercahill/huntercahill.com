# EPK Song Pages — Design Spec
**Date:** 2026-06-07
**Project:** huntercahill.com
**Scope:** Three press kit / song pages for the Estuary Sessions singles

---

## Overview

Three standalone HTML pages — one per Estuary Sessions single — that serve as both press kits and shareable community links. Each page lives at `/music/<slug>/index.html` and follows the press-forward layout: pitch text first, then photo, player, press quotes, lyrics, bio, and contact form.

---

## Pages

| Song | URL | Release Date | Audio Source |
|------|-----|--------------|--------------|
| Getting By | `/music/getting-by/` | July 3, 2026 | `/assets/audio/getting-by.mp3` |
| Don't Take Your Light | `/music/dont-take-your-light/` | August 8, 2026 | `/assets/audio/dont-take-your-light.mp3` |
| When I Fell Asleep | `/music/when-i-fell-asleep/` | September 5, 2026 | `/assets/audio/when-i-fell-asleep.mp3` |

---

## Page Structure (top to bottom)

### 1. Navigation
- Brand link ("Hunter Cahill") → `/`
- Back link ("← huntercahill.com") → `/`
- No full nav menu (press/share context — keep it clean)

### 2. Header
- Eyebrow: `Press Kit · Estuary Sessions · 2026`
- Title: song name in Fraunces display type (~4rem, weight 300)
- Byline: "Hunter Cahill" in italic bone-dim

### 3. Custom Pitch Paragraph
One paragraph per song, written as a press pitch. Leads with the song's subject matter and core image, ends with release date. See pitch copy below.

### 4. Photo
Full-width placeholder (`aspect-ratio: 3/2`) with dashed border, labeled "Photo Placeholder · June 9, 2026 session". Replace `src` with actual photo after the shoot. Once photos are in, use `<img>` with `object-fit: cover`.

### 5. Audio Player
Matches rough-mixes page exactly:
```html
<audio controls preload="auto" src="/assets/audio/<slug>.mp3"></audio>
```
CSS: `height: 40px`, `border-radius: 999px`, `border: 1px solid var(--bone-faint)`, `accent-color: var(--ember)`, `color-scheme: dark`.

### 6. Press Quotes
4 quotes from previous coverage, linked back to press pages where available. Same quotes on all three pages (all from pre-Estuary catalog — establishes credibility). Inline border-bottom list, ember curly quotes.

| Quote | Source | Link |
|-------|--------|-------|
| "Sometimes overwhelming, often heartbreaking, always compelling." | Indie Obsessive · Feb 2022 | `/press/indie-obsessive-laughable-by-hunter-cahill-a-song-feature/` |
| "Fans of Manchester Orchestra and REM, rejoice. This is stunning stuff." | Soundsphere Magazine · Aug 2021 | `/press/soundsphere-magazine-listen-hunter-cahill-never-again/` |
| "Everyone will find themselves in the song." | We Love That Sound · Oct 2021 | `/press/we-love-that-sound-hunter-cahill-falling-down/` |
| "Off-the-cuff, heart-on-your-sleeve." | Unxigned · 2021 | (no internal press page) |

### 7. Lyrics
Full lyrics inline, italic Newsreader, `line-height: 2`, bone-dim color. Stanzas as `<p>` elements with `<br>` line breaks. No modal — lyrics stay on the page.

### 8. About (Artist Bio)
Shared across all three pages. Two paragraphs: wolf mask era → Estuary Sessions. (Full text in pitch copy section below.)

### 9. Contact Form
Same Formspree endpoint as home page: `action="https://formspree.io/f/mpqepdoa"`. Fields: Name, Email, Message. Submit button matches site `.btn` style.

### 10. Footer
Same as site footer: Hunter Cahill name, social links (Instagram, YouTube, SoundCloud, Spotify), copyright line.

---

## Pitch Copy

### Getting By
> *Getting By* is a two-minute song about the gap between presenting fine and not being fine — the morning routine, the mirror you stop looking at, the small acts of management that hold a life together. Hunter Cahill wrote it from the inside. "Some call it a problem. I call it getting by." Lead single from the Estuary Sessions, recorded with engineer Matt Gerhard at Estuary Recording, Austin. Releases July 3, 2026.

### Don't Take Your Light
> *Don't Take Your Light* is a grief song that earns its weight in specifics — hairs in the sink left for weeks, a scent in the sheets, the discipline of not letting yourself think they're coming home. Spare and devastating. Second single from the Estuary Sessions, recorded with engineer Matt Gerhard at Estuary Recording, Austin. Releases August 8, 2026.

### When I Fell Asleep
> *When I Fell Asleep* starts at four years old — awake in bed, begging for a soul, trying to understand why love and the threat of hell feel like the same thing. Cello arrangement. The question the whole record is built around: "If god is love / Why am I afraid?" Third single from the Estuary Sessions, recorded with engineer Matt Gerhard at Estuary Recording, Austin. Releases September 5, 2026.

---

## Artist Bio (shared)

> Hunter Cahill is an Austin, Texas singer-songwriter. His debut collection *Some Things You Don't Know About Me* arrived between 2021 and 2022 — six self-recorded singles, confessional music that kept its distance. The press noticed. Austin Town Hall drew comparisons to David Bazan; Soundsphere called it "stunning." He released all of it wearing a wolf mask.
>
> The Estuary Sessions, recorded with engineer Matt Gerhard, go further back than the coping does — to a religious upbringing where love and fear were the same thing, and the questions it left him asking. Three singles, 2026.

---

## Indexability

Each page includes `<meta name="robots" content="noindex, nofollow">` until its release date. Remove this tag on release day to allow search indexing.

| Page | Remove noindex on |
|------|------------------|
| Getting By | July 3, 2026 |
| Don't Take Your Light | August 8, 2026 |
| When I Fell Asleep | September 5, 2026 |

---

## Implementation Notes

- **File pattern:** Standalone HTML files, same pattern as existing press pages (`/press/*/index.html`)
- **Styles:** Inline `<style>` block in each file — no new CSS file needed. Reuses all existing CSS custom properties from `styles.css`
- **No JS required** — audio player and contact form work without JavaScript
- **Photo swap:** When June 9 photos are ready, replace the `.epk__photo` placeholder div with `<img class="epk__photo-img" src="/assets/img/<filename>" alt="Hunter Cahill">`
- **Add `.superpowers/` to `.gitignore`**

---

## File List to Create

```
huntercahill.com/
  music/
    getting-by/
      index.html
    dont-take-your-light/
      index.html
    when-i-fell-asleep/
      index.html
```
