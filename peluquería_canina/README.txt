MANCS & MÓKA — WHITE LABEL, HU / EN / ES

A sablon célja: új kutyakozmetika ügyfélnél lehetőleg csak a config.js fájlt kelljen módosítani.

FŐ BEÁLLÍTÁSOK A config.js-BEN:
- brandName
- phone
- whatsapp
- email
- address
- instagram
- primaryColor
- heroImage
- aboutImage
- beforeImage / afterImage
- galleryImages
- openingHours
- services
- prices

A services és prices mezők HU/EN/ES szövegeket is kezelnek.
Az időpontkérő űrlap statikus tárhelyen is használható: WhatsApp üzenetet készít elő, és ha nincs WhatsApp megadva, e-mailre vált.

Képforrások: kepforrasok.html
MesterWeb: https://mesterweb-nco7.onrender.com


NYELVI FÁJLOK
--------------
HU: lang/hu.js
EN: lang/en.js
ES: lang/es.js
A három fájl normál script tagekkel töltődik be a fő script előtt, ezért nincs fetch/CORS függőség.


NYELVI RENDSZER – JAVÍTOTT VERZIÓ
--------------------------------
A lang/hu.json, lang/en.json és lang/es.json valódi JSON fájlok.
A script.js fetch() segítségével tölti be őket.
A nyelvváltó gombok oldalfrissítés nélkül váltanak.
A fő képek betöltése független a nyelvi fájloktól, így egy fordítási hiba nem tünteti el a képeket.
A képforrások link új böngészőfülön nyílik meg.
