# Rapport-opmaak (Cartel-huisstijl)

De **inhoud** wisselt per case, het **format** niet. Dit bestand legt het format vast, zodat beide
Word-documenten er telkens hetzelfde uitzien als de voorbeeldrapporten.

Er staat een kant-en-klaar bouwscript naast: **`assets/bouw-rapport.js`**. Kopieer daaruit het
`styles`-blok en de helpers, en vul `sectionChildren` met de inhoud. Er staat ook een visueel
voorbeeld: **`assets/Rapport-sjabloon.docx`**. Open dat eerst even om te zien waar je naartoe werkt.

## De vaste regels

- **Lettertype: Aptos**, overal (titel, koppen, body, tabellen). Niets anders.
- **Ingebouwde Word-stijlen gebruiken**, niet handmatig groot/vet maken:
  - **Titel** voor de documenttitel (`HeadingLevel.TITLE`).
  - **Kop 1** voor de vier pijlers en de hoofdsecties (`HEADING_1`).
  - **Kop 2** voor elke bevinding (`HEADING_2`) — de kop is de bevinding zelf.
  - **Kop 3** voor subkoppen binnen een bevinding (`HEADING_3`).
  - Zo verschijnen ze ook netjes in het deelvenster Stijlen van Word, en blijft opmaak consistent.
- **Geen inhoudstafel.** Niet genereren.
- **Geen horizontale lijnen of alinearanden** als scheiding. Witruimte tussen secties volstaat; de
  koppen structureren het document. Tabellen krijgen wel een lichte grijze rand (zit in het script).
- **Tabellen** voor vergelijkende data (marktaandelen, bekendheidscijfers, operationele vergelijking).
  Lichte grijze randen, grijze koprij. Nooit zwart ingekleurde cellen.
- **Klikbare bronnen** als losse linkregel onder de kop (stijl `Hyperlink`), zoals in de
  voorbeeldrapporten.
- **Geen gedachtestreepjes** (`—` / `–`) in de tekst; zie §5 van SKILL.md. Ook niet in koppen of
  tabellen. Zoek er letterlijk op vóór je oplevert.

## Twee documenten, zelfde stijl

- **`[Klant]_Research-Summary.docx`** — de compacte synthese (structuur in `output-structuur.md`, §1).
- **`[Klant]_Research-Dossier.docx`** — het bronmateriaal per 4M (structuur in `output-structuur.md`, §2).

Beide gebruiken exact dezelfde `styles` uit het bouwscript.

## Verifieer vóór je oplevert

Render het document en kijk ernaar (de docx-skill legt uit hoe):

```bash
python scripts/office/soffice.py --headless --convert-to pdf Rapport.docx
pdftoppm -jpeg -r 100 Rapport.pdf pg && ls pg-*.jpg   # daarna de beelden bekijken
```

Controleer: één duidelijke titel, koppen in de juiste hiërarchie, geen inhoudstafel, geen horizontale
lijnen, klikbare bronnen, en nergens een gedachtestreepje.

> **Let op bij het renderen:** op een machine zonder Aptos valt de preview terug op een ander
> lettertype. Dat is enkel de preview; in het Word-bestand zelf staat Aptos correct ingesteld. Je
> hoeft daar niets aan te doen.
