# Velocity11 marketing attribution

Use lowercase values and underscores for multi-word names.

## UTM convention

`utm_source=[platform]&utm_medium=[social|email|referral]&utm_campaign=[campaign]&utm_content=[specific_post_or_cta]`

| Channel | `utm_source` | `utm_medium` |
|---|---|---|
| X | `x` | `social` |
| Reddit | `reddit` | `social` |
| Instagram | `instagram` | `social` |
| Facebook | `facebook` | `social` |
| Pinterest | `pinterest` | `social` |
| YouTube | `youtube` | `social` |
| Product Hunt | `product_hunt` | `referral` |
| Email | `email` | `email` |

Campaign names use `yyyy_mm_topic`, for example `2026_08_own_your_tools`. Content identifies the exact asset, for example `invoicepro_demo_01`.

Example:

`https://velocity11.in/?utm_source=x&utm_medium=social&utm_campaign=2026_08_own_your_tools&utm_content=invoicepro_demo_01`

Website-to-Gumroad links preserve incoming source, medium, and campaign values. When no incoming attribution exists they use `velocity11`, `website`, and `evergreen`. Each CTA supplies its own `utm_content`.

## GA4 events

- `view_product`: first 50% viewport appearance for each product in a page view.
- `click_product_cta`: product CTA click.
- `click_gumroad`: Gumroad-bound product CTA click.
- `email_signup_start`: first focus in the email field.
- `email_signup`: Brevo success message becomes visible.
- `click_social`: X, GitHub, or Product Hunt outbound click.

Product events use `product_name`, `product_price`, `CTA_location`, `destination`, and `page_path` where applicable. No email address or other personal data is sent to GA4.

