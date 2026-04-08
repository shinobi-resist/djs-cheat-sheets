# DJS Brand Cheat Sheets

Searchable brand cheat sheet reference for David Jones Chatswood women's footwear staff.

52 brands across 5 departments: Designer, Contemporary, Fashion 5238, Modern 5288, Concessions.

## Usage

Open `index.html` in a browser or visit the hosted URL. Search by brand name or filter by department.

## Updating a Brand

1. Edit the brand's `.docx` file in the `cheat sheets/` folder
2. Re-run `node extract.js` to regenerate `brands.js`
3. Commit and push

## Adding a New Brand

1. Create the brand's `.docx` cheat sheet following the template
2. Add the filename mapping in `extract.js` (`FILE_TO_NAME` and `DEPT_MAP`)
3. Run `node extract.js`
4. Commit and push

## Tech Stack

- Single-page app: `index.html` + `brands.js` + `m3-bundle.js`
- Material Design 3 web components (bundled locally via rollup)
- Playfair Display (Google Fonts) + Arial
- No server required — static files only
