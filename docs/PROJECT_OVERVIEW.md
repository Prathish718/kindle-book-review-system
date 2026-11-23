# Project overview

## Connection flow

`index.html` loads `style.css`, the external Supabase SDK, and the deferred `app.js`. JavaScript generates Home, wishlist, or dashboard markup inside `#app`. Delegated document listeners handle new buttons after each redraw.

The reader maps each catalog ID to `books/ID.txt`, fetches that same-site file, checks its START marker, and assigns the result using `textContent`. It restores `scrollTop` from a saved relative fraction.

The Supabase client handles sessions and database queries. The schema separately defines `profiles`, `reviews`, `wishlists`, and `reading_progress`. All application rows connect to the managed Auth user's UUID. Book IDs match the JavaScript catalog by convention rather than by a database foreign key.

## Core source references

| Responsibility | Source |
| --- | --- |
| Initial catalog and state | app.js 1-229 |
| Average and sort comparator | app.js 259-272 |
| Recommendation category and top candidate | app.js 328-337 |
| View generation and rendering | app.js 338-472 |
| Session and database loading | app.js 473-545 |
| Reader and progress | app.js 546-601 |
| Delegated events | app.js 619-775 |
| Authentication and form saves | app.js 776-898 |
| Realtime and startup | app.js 899-916 |
| Schema and RLS | supabase-schema.sql 1-79 |
| Signup trigger and publication | supabase-schema.sql 81-116 |

## Limitations to explain accurately

The recommendation uses arithmetic averages with a review-count tie-break. It is deterministic. The dashboard infers finished books from reviews. Reading completion is a user action rather than verified text coverage. Updated timestamps have insertion defaults but no automatic update trigger. Modal focus trapping, Escape handling, and focus restoration are not implemented. Some progress/database error results are not surfaced, and the rating dialog resets its numeric selection without explicitly clearing old filled-star text. These observations do not alter the preserved application source.

## Checks made for this package

The application JavaScript passed syntax checking. The catalog has twenty unique IDs and twenty corresponding book files with the expected START marker. HTML, CSS, and JavaScript match the saved deployment source copy. ZIP integrity and exact file-byte checks verify packaging. No new live account/session test or security penetration test is claimed.
