# Root Scout — korte handleiding

## Wat is Root Scout?

Root Scout is een agent die **volledig automatisch** in de cloud draait. Elke werkdag speurt hij het web
af naar verse, inspirerende campagnes per klant. Elke maandag kiest hij daaruit de sterkste tegen het
merkplatform van die klant en mailt hij een gestyled rapport naar het strategieteam. Niemand hoeft iets
te installeren; je ontvangt gewoon het wekelijkse rapport.

Alles wat per klant instelbaar is, leeft in **Notion → Scout Config**: één rij per klant, met de
keywords, de rationale, de landen en de ontvangers. De code hoef je daar niet voor aan te raken.

## Een nieuwe klant toevoegen met de setup-skill

1. Zorg dat de **Notion-connector** aanstaat en dat je bij de Scout Config-database kunt.
2. Start de skill **root-scout-setup** (typ `/` of klik **+** in een gesprek en kies ze).
3. Beantwoord de vragen. De skill vraagt naar: klantnaam, sector, merkplatform, rationale (wat een
   campagne wél en niet relevant maakt), keywords, landen en de ontvangers (e-mailadressen).
4. De skill vat samen en vraagt bevestiging. Klopt het? Dan zet hij de klant als één rij in Scout Config
   en vinkt hem op **Actief**.
5. Zit de klant **buiten food/retail**? Dan waarschuwt de skill dat de gedeelde zoekbronnen in de code
   (`config.yaml`) nog food/retail-gericht zijn en door Tomas bijgesteld moeten worden voor die sector.
   De klant-eigen keywords werken wel al.

## Hoe het daarna loopt

- De klant draait mee vanaf de eerstvolgende run: **scout** elke dag ~06:00, **rapport** elke maandag
  ~09:00 (Belgische tijd).
- Meteen testen? Ga in GitHub naar **Actions → Root Scout → Run workflow**, eerst **scout**, dan
  **strategist**.
- Het rapport gaat in fase 1 **eerst intern** ter review; pas bij bewezen kwaliteit richting de klant.

## Iets aanpassen achteraf

Rechtstreeks in de rij in **Scout Config**, zonder skill en zonder code:

| Ik wil… | Waar |
|---|---|
| keywords toevoegen | kolom **Keywords** (één per regel) |
| de rationale/criteria bijstellen | kolom **Rationale** |
| een land toevoegen | kolom **Landen** (enkel Belgie, Nederland, Frankrijk, Duitsland, Italie) |
| wie het rapport ontvangt | kolom **Ontvangers** (één adres per regel) |
| de scout pauzeren | vink **Actief** uit |
| goedkoper draaien | kolom **Model** = `claude-haiku-4-5-20251001` |

De zoekbronnen zelf (globale zoekopdrachten en vakpers-feeds) en de rapport-opmaak zitten in de code
(`config/config.yaml` en `src/report_template.py`). Die aanpassen loopt via GitHub Desktop.
