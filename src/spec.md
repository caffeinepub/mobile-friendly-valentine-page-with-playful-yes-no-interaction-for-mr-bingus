# Specification

## Summary
**Goal:** Build a single mobile-friendly Valentine prompt page for Mr. Bingus with playful “Yes/No” interaction and a cute success reveal.

**Planned changes:**
- Create a single interactive page that asks: “Mr. Bingus, will you be my Valentine?” with exactly two buttons: “Yes” and “No”.
- Implement an evasive “No” button that moves to a new on-screen position on each interaction attempt and spawns multiple “🥺” emojis around the screen.
- Implement a “Yes” success state that replaces the prompt/buttons with a meme image (static asset) and the exact text: “aww good choice 🥰”.
- Apply a coherent Valentine theme using pink/white/red styling with a simple, card-like layout and playful (non-distracting) animations.
- Add the required generated image(s) under `frontend/public/assets/generated/` and reference them directly in the success view.

**User-visible outcome:** On mobile, the user sees the Valentine question with “Yes” and “No”; “No” becomes effectively unclickable by dodging and spawning 🥺 emojis, and tapping “Yes” shows a cute meme image plus “aww good choice 🥰”.
