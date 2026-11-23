# Security notes

## Existing controls

The application sends account credentials through Supabase Auth. Application profile storage does not save a password. The SQL enables RLS on all four application tables and checks that profile, wishlist, progress, and review writes belong to the current authenticated UUID. Review constraints require stars from one to five, a non-empty bounded experience, and a unique user/book pair.

Generated markup escapes intended dynamic text with `esc()`. The reader inserts fetched book content with `textContent`. Browser validation helps users complete forms, while database constraints and RLS enforce the defined storage restrictions.

## Configuration

The frontend includes public browser project configuration by design. Never replace it with a service-role/admin key. Auth confirmation, URL allowlists, email delivery, password policies, and abuse controls are separate backend settings. This package does not modify their live values.

## Scope and limitations

Signed-in readers can query community review text and owner UUIDs under the supplied policy. Book IDs and favourite genres have no catalog/enum foreign-key constraint. Local fallback does not supply secure authentication. Some request errors are suppressed or not checked. The source does not include a CSP headers file, custom moderation, or a custom rate limiter. The CDN URL pins the SDK major version rather than one patch. This document describes the source and is not a penetration-test certificate.

Avoid including credentials or private account information in screenshots, issue reports, or commits.
