# FrontendTemplate

Moja najpou��vanej�ia template pre projekty. Ako kompil�tor pou��vam webpack a preprocesor SASS (Dart SASS).

Skripty:
	npm run build
	npm run build:dev
	npm run build:prod
	npm run build:watch

- Resources/Fonts � vlastn� fonty
- Resources/Icons � vlastn� svg ikony
- Resources/Images � obr�zky pou��van� na projekte
- Resources/Scripts � vlastn� skripty
- Resources/Styles
  - Base � importy pre premenn�, mixiny a funkcie, helper classy,�
    - Configs/colors � defin�cie farieb
    - Configs/fonts � nastavenie fontov a typografie
    - Configs/sizes � defin�cie ve�kost�, medzier, r�m�ekov,�
    - Functions/colors � funkcie napr. na generovanie spr�vnej farby pri hover
    - Functions/numbers � funkcie na pr�cu s ��slami
    - Functions/svg � funkcie na pr�cu s svg ikonamy
  - Components � �t�ly jednoduch�ch komponent (tla��tka, inputy,�)
  - Modules � �t�ly zlo�itej��ch modulov, zlo�en�ch z viacer�ch komponent
  - Sites � ZLo�ka pre �t�ly konkr�tnych str�nok
  - style.scss � hlavn� �t�l, kde sa importuj� v�etky potrebn� s�bory v potrebnom porad� (vstup pre kompil�tor)

