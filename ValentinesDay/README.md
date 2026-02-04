# Valentine's Day Invite Website 💕

A single-page Valentine's Day invitation: **"Quinn, will you be my valentine?"** with a teddy bear, a **Yes** button that triggers confetti and refresh, and a **No** button that runs away from the cursor.

## Quick start

1. Open `index.html` in a browser (or use a local server).
2. To share online: push this repo to GitHub and enable **GitHub Pages** (Settings → Pages → Source: main branch, `/` or `/root`), then use the provided URL.

## Features

- Teddy bear logo (SVG)
- Exact copy: "Quinn, will you be my valentine?"
- **Yes 💕** button: primary CTA; on click → confetti → page refresh after 4 seconds
- **No** button: runs away from mouse/touch and is hard to click
- Valentine theme (reds, pinks, whites, soft gold)
- Responsive layout

## Tech

- Plain HTML, CSS, and JavaScript
- No build step or external dependencies
- Confetti: lightweight canvas animation

## Get your GitHub link (to send the invite)

1. **Create a new repo on GitHub**  
   Go to [github.com/new](https://github.com/new). Name it e.g. `ValentinesDay` (or anything you like). Do **not** add a README or .gitignore (this project already has them). Create the repo.

2. **Push this folder** (in Terminal, from this project folder):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and the repo name you chose.

3. **Turn on GitHub Pages**  
   In the repo: **Settings** → **Pages** → under **Source** choose **Deploy from a branch** → Branch: **main**, folder: **/ (root)** → Save.

4. **Your shareable link** (after a minute or two) will be:
   ```text
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```
   Example: `https://jane.github.io/ValentinesDay/` — send that link to Quinn.
