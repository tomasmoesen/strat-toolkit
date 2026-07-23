/*
 * Root Analyst · bouwscript voor research-rapporten (Cartel-huisstijl).
 *
 * Gebruik: dit is de vaste opmaak. Kopieer het `styles`-blok en de helpers, en vul
 * `sectionChildren` met de inhoud van het rapport. Zo hebben summary en dossier telkens
 * hetzelfde format: Aptos, ingebouwde Word-stijlen (Titel/Kop 1/Kop 2/Kop 3), geen
 * inhoudstafel, geen horizontale lijnen. De INHOUD wisselt per case, het FORMAT niet.
 *
 * Draaien (in de sandbox, docx is beschikbaar):
 *   node bouw-rapport.js
 */
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
} = require('docx');

const APTOS = "Aptos";
const INK = "1A1A1A", GREY = "595959", ACCENT = "111111";

// --- VASTE STIJLEN. Niet wijzigen: dit is de huisstijl. ---
// De built-in stijlen Title/Heading1..3 verschijnen in Word als Titel/Kop 1..3 in het
// deelvenster Stijlen, en zijn allemaal Aptos (geërfd van de default document-run).
const styles = {
  default: {
    document: { run: { font: APTOS, size: 22, color: INK } },              // body 11pt
    title:    { run: { font: APTOS, size: 52, bold: true, color: ACCENT },  // 26pt
                paragraph: { spacing: { after: 120 } } },
    heading1: { run: { font: APTOS, size: 32, bold: true, color: ACCENT },  // 16pt = pijler
                paragraph: { spacing: { before: 320, after: 120 }, keepNext: true } },
    heading2: { run: { font: APTOS, size: 26, bold: true, color: INK },     // 13pt = bevinding
                paragraph: { spacing: { before: 240, after: 80 }, keepNext: true } },
    heading3: { run: { font: APTOS, size: 22, bold: true, color: INK },     // 11pt = subkop
                paragraph: { spacing: { before: 160, after: 40 }, keepNext: true } },
  },
  paragraphStyles: [
    { id: "Subtitel", name: "Subtitel", basedOn: "Normal", next: "Normal",
      run: { font: APTOS, size: 22, color: GREY }, paragraph: { spacing: { after: 240 } } },
    { id: "Bijschrift", name: "Bijschrift", basedOn: "Normal", next: "Normal",
      run: { font: APTOS, size: 18, color: GREY, italics: true } },
  ],
};

// --- Helpers ---
const link = (text, url) => new Paragraph({ children: [ new ExternalHyperlink({
  link: url, children: [ new TextRun({ text, style: "Hyperlink" }) ] }) ] });
const bullet = (text) => new Paragraph({ bullet: { level: 0 }, children: [ new TextRun(text) ] });
const para = (text) => new Paragraph({ children: [ new TextRun(text) ] });

const B = { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" };
const cellBorders = { top: B, bottom: B, left: B, right: B };
const cell = (text, head, w) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: head ? { type: ShadingType.CLEAR, fill: "F2F2F2", color: "auto" } : undefined,
  margins: { top: 60, bottom: 60, left: 100, right: 100 }, borders: cellBorders,
  children: [ new Paragraph({ children: [ new TextRun({ text, bold: head }) ] }) ],
});
// table(cols, [ [rij], [rij] ]) — eerste rij = koprij. Kolombreedtes samen = 9070 (DXA).
function table(colWidths, rows) {
  return new Table({
    width: { size: colWidths.reduce((a,b)=>a+b,0), type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map((cells, i) => new TableRow({
      tableHeader: i === 0,
      children: cells.map((t, c) => cell(t, i === 0, colWidths[c])),
    })),
  });
}

// --- INHOUD: vul dit per case. ---
// Vaste volgorde: Briefing/recap → Research plan → Vragen aan de klant → 4M → Openstaande vragen.
// Geen inleidende zin onder een pijlerkop: begin meteen met de eerste bevinding.
// Geen duidingsregel ("wat dit raakt") onder een bron, tabel of case.
const sectionChildren = [
  new Paragraph({ text: "[Klant] · Research-dossier", heading: HeadingLevel.TITLE }),
  new Paragraph({ style: "Subtitel", children: [ new TextRun("[Onderwerp] · Cartel · research-fase · [datum]") ] }),

  new Paragraph({ text: "Briefing", heading: HeadingLevel.HEADING_1 }),
  bullet("Context van de vraag (kort, uit de briefing)."),
  bullet("Doelstellingen en KPI's."),
  bullet("Budget en doelgroep."),

  new Paragraph({ text: "Research plan", heading: HeadingLevel.HEADING_1 }),
  new Paragraph({ text: "Maatschappij", heading: HeadingLevel.HEADING_3 }),
  bullet("Researchvraag 1 uit gate 1."),
  new Paragraph({ text: "Markt", heading: HeadingLevel.HEADING_3 }),
  bullet("Researchvraag 2 uit gate 1."),
  new Paragraph({ text: "Mens", heading: HeadingLevel.HEADING_3 }),
  bullet("Researchvraag 3 uit gate 1."),
  new Paragraph({ text: "Merk", heading: HeadingLevel.HEADING_3 }),
  bullet("Researchvraag 4 uit gate 1."),

  new Paragraph({ text: "Vragen aan de klant", heading: HeadingLevel.HEADING_1 }),
  bullet("Interne data die je nodig hebt en niet zelf kon vinden (cijfers, opt-ins, onderzoek)."),

  new Paragraph({ text: "Maatschappij", heading: HeadingLevel.HEADING_1 }),
  new Paragraph({ text: "Kop is de bevinding, niet een label", heading: HeadingLevel.HEADING_2 }),
  link("Statbel, [titel bron] (2025)", "https://statbel.fgov.be/..."),
  bullet("Concreet cijfer of letterlijke vaststelling uit de bron."),
  bullet("Tweede bullet met data."),
  table([3020, 3020, 3030], [ ["Parameter","Speler A","Speler B"], ["Marktaandeel","87,5%","12,5%"] ]),

  new Paragraph({ text: "Markt", heading: HeadingLevel.HEADING_1 }),
  new Paragraph({ text: "Mens", heading: HeadingLevel.HEADING_1 }),
  new Paragraph({ text: "Merk", heading: HeadingLevel.HEADING_1 }),

  new Paragraph({ text: "Openstaande vragen en to do's", heading: HeadingLevel.HEADING_1 }),
  bullet("Wat nog uitgezocht moet worden."),
  bullet("To do's, vragen voor diepte-interviews, hypotheses die nog getoetst moeten worden."),
];

const doc = new Document({ styles, sections: [{
  properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
  children: sectionChildren,
}]});

Packer.toBuffer(doc).then(b => { fs.writeFileSync("Rapport.docx", b); console.log("geschreven:", b.length); });
