# FrontendTemplate

Moja najpoužívanejšia template pre projekty. Ako kompilátor používam webpack a preprocesor SASS (Dart SASS).

Skripty:
	npm run build
	npm run build:dev
	npm run build:prod
	npm run build:watch

- Resources/Fonts – vlastné fonty
- Resources/Icons – vlastné svg ikony
- Resources/Images – obrázky používané na projekte
- Resources/Scripts – vlastné skripty
- Resources/Styles
  - Base – importy pre premenné, mixiny a funkcie, helper classy,…
    - Configs/colors – definície farieb
    - Configs/fonts – nastavenie fontov a typografie
    - Configs/sizes – definície ve¾kostí, medzier, rámèekov,…
    - Functions/colors – funkcie napr. na generovanie správnej farby pri hover
    - Functions/numbers – funkcie na prácu s èíslami
    - Functions/svg – funkcie na prácu s svg ikonamy
  - Components – štýly jednoduchých komponent (tlaèítka, inputy,…)
  - Modules – štýly zložitejších modulov, zložených z viacerých komponent
  - Sites – ZLožka pre štýly konkrétnych stránok
  - style.scss – hlavný štýl, kde sa importujú všetky potrebné súbory v potrebnom poradí (vstup pre kompilátor)

