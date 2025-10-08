Single-page personal site. Edit `index.html` to add or change project + writing links.

Structure:
```
index.html
assets/
	css/style.css
```

Edit lists:
- Projects: <ul id="projects"> in `index.html`
- Writing:  <ul id="writing"> in `index.html`

Deploy: Push to `main` (GitHub Pages for Sam-Bieberich.github.io serves automatically at https://Sam-Bieberich.github.io/).

Local preview (optional):
```
python -m http.server 8000
```
Open http://localhost:8000/