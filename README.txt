# MesterWeb

Háromnyelvű (HU / EN / ES), GitHub Pages-kompatibilis bemutatkozó weboldal.

## Fájlok
- `index.html` – teljes oldal
- `style.css` – megjelenés és mobilnézet
- `script.js` – nyelvváltás és demo űrlap
- `lang/hu.json` – magyar
- `lang/en.json` – angol
- `lang/es.json` – spanyol
- `images/README.txt` – Unsplash képhivatkozások és kreditek

## GitHub Pages
1. Hozz létre egy új GitHub repositoryt, például `mesterweb`.
2. Töltsd fel a teljes mappa tartalmát.
3. GitHub → Settings → Pages → Deploy from a branch.
4. Branch: `main`, folder: `/root`.
5. Mentés után a GitHub ad egy `github.io` címet.

## Későbbi ügyféloldalak
Ezt az alapot érdemes sablonként megtartani. Egy új ügyfélnél:
- másold a teljes projektet;
- módosítsd a logót és a meta adatokat;
- cseréld a `lang/*.json` szövegeit;
- cseréld a képeket az `images/` mappában;
- állítsd át a telefonszámot, e-mailt, szolgáltatási területet és űrlapot;
- a végleges ügyféloldalon vedd ki a demo jelöléseket.

## Fontos
Az űrlap jelenleg bemutató űrlap, nem küld valódi e-mailt. Később össze lehet kötni például Formspree-vel,
Web3Forms-szal vagy saját backenddel.

A képek jelenleg közvetlen Unsplash URL-ről töltődnek. Ha letöltöd őket, az `images/README.txt` alapján
az index.html-ben egyszerűen átírhatók helyi fájlokra.
