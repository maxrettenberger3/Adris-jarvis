# Adris Jarvis – Anleitung für Claude

Diese App ist Adris persönlicher Assistent. Sie gehört Adri (Adriana). Max hilft beim Bauen.
Lies diese Datei ganz, bevor du etwas änderst. Adri ist keine Entwicklerin: erkläre ihr alles in einfachen Worten, Schritt für Schritt.

## Was die App ist
- Eine Web-App (PWA), die auf iPhone und MacBook als App installiert wird. Gehostet über GitHub Pages aus dem Hauptzweig (`main`).
- Jede Änderung, die du auf `main` hochlädst, ist nach etwa einer Minute in Adris App.
- KI: Google Gemini, direkt aus dem Browser, mit Adris eigenem Schlüssel. Der Schlüssel liegt nur in ihrem Gerät (localStorage), niemals im Code.

## Dateien
| Datei | Wofür |
|---|---|
| `index.html` | Startseite für Adri (Willkommen, Download-Knöpfe für MacBook und iPhone) |
| `app/index.html` | Der „Lader“: startet die Version, die Adri angenommen hat, und zeigt neue Updates NUR beim Öffnen an (Infoseite + Annehmen/Ablehnen). Selten ändern. |
| `app/v/<nummer>/index.html` | Die eigentliche App in dieser Version: Aussehen (CSS), Inhalt und Logik (JavaScript) in einer Datei |
| `app/updates.json` | Liste aller Versionen mit Infos für Adri (was neu, Vorteile, Nachteile, was bleibt) |
| `app/manifest.webmanifest` | Name, Farben und Symbol der App |
| `app/sw.js` | Hält die App offline startbar. Bei jeder Änderung `CACHE` hochzählen (`adri-jarvis-v1` → `v2` …) |
| `app/icon-*.png` | App-Symbole |
| `CHANGELOG.md` | Was wann geändert wurde |

## Jarvis' Regeln (nie aufweichen)
Adri hat ADHS. Jarvis' wichtigste Aufgabe ist Struktur. Diese Regeln stehen in `ROLLE` in `app/index.html` und gelten immer:
1. Jede Antwort hat dieselbe feste Struktur (JSON: `ueberschrift`, `beruhigung`, `jetzt`, `danach`, `inhalt`, `empfehlung`, `parkplatz`, `frage`).
2. Genau EIN nächster Schritt, unter 10 Minuten, sofort startbar.
3. Danach höchstens 3 Schritte.
4. Alles andere kommt auf den Gedanken-Parkplatz. Nichts geht verloren.
5. Als Berater eine klare Empfehlung mit Begründung geben, nicht nur Optionen.
6. Warm, locker, nie belehrend, nie beschämend. Kurz.
7. Bei Überforderung erst beruhigen, dann das Kleinste, was hilft. Pausen, Essen, Trinken mitdenken.
8. Keine Termine, Zahlen oder Fakten erfinden.

Neue Funktionen müssen zu diesen Regeln passen. Wenn ein Wunsch dagegen geht (zum Beispiel "zeig mir 20 Aufgaben auf einmal"), sag Adri freundlich, warum, und schlag eine Variante vor, die passt.

## Was nie kaputtgehen darf
- Die Einrichtung (Schlüssel eintragen, testen, speichern) und das Zahnrad.
- Gespeicherte Daten: alle Schlüssel in localStorage beginnen mit `aj-` (`aj-key`, `aj-park`, `aj-verlauf`, `aj-done`, `aj-fokus`, `aj-ueber`, `aj-mode`, `aj-modell`, `aj-version`, `aj-version-naechste`, `aj-update-nein`). Nie umbenennen oder löschen, sonst verliert Adri ihren Parkplatz und Verlauf.
- Das Antwortformat (JSON). `lesen()` und `karte()` hängen davon ab.
- Datenschutz: keine Schlüssel, Passwörter oder privaten Daten ins Repo. Keine Daten an andere Server als Google Gemini schicken.
- iPhone: Schriftgröße in Eingabefeldern mindestens 16px (sonst zoomt Safari), `env(safe-area-inset-*)` beachten.

## Updates: Adri entscheidet (wichtig!)
Adri arbeitet in Projekten und will nicht, dass mitten drin etwas geändert oder ersetzt wird. Darum:
- Eine bestehende Version (`app/v/<n>/`) wird **nie** verändert. Jede Änderung wird eine **neue Version**:
  `app/v/<n>/` nach `app/v/<n+1>/` kopieren, dort ändern.
- In `app/updates.json` einen Eintrag ergänzen: `v`, `datum`, `titel`, `von`, `dauer` (optional) und in einfachen, ehrlichen Worten
  `neu` (was ist neu), `vorteile`, `nachteile` (auch kleine: z. B. „Knopf sitzt jetzt woanders“), `bleibt` (was sich nicht ändert).
- Die App zeigt das Update nur **beim Öffnen**, nie während der Arbeit. Adri kann: beim nächsten Öffnen annehmen, sofort annehmen,
  später entscheiden oder ablehnen. Unter Zahnrad → „Updates & Versionen“ kann sie jederzeit zurück zu einer alten Version.
- Ihre Daten (`aj-…`) müssen in jeder Version weiter funktionieren. Nichts umbenennen, nichts löschen.
- Max' Jarvis darf Updates nur nach Max' Freigabe vorschlagen – annehmen tut immer Adri.

## So arbeitest du
1. Vor jeder Änderung den neuesten Stand holen.
2. Klein ändern, eine Sache auf einmal.
3. Testen: `app/` im Browser öffnen (Lader + neue Version), einmal schmal (iPhone, ca. 390 px) und einmal breit (MacBook) ansehen. Prüfen: Einrichtung, eine Antwort, Parkplatz, "Geschafft".
4. In `app/sw.js` die `CACHE`-Version hochzählen.
5. Eine Zeile in `CHANGELOG.md` oben ergänzen: Datum · was · warum.
6. Hochladen (commit + push auf `main`) mit einer verständlichen Nachricht.
7. Adri in einfachen Worten sagen, was neu ist und dass sie die App einmal schließen und neu öffnen soll.

## Rückgängig machen
Wenn Adri sagt "mach Jarvis wieder wie vorher": den letzten Commit mit `git revert` zurücknehmen (nicht löschen), hochladen, Bescheid sagen.

## Später: Jarvis als Mac-App
Ziel (von Max und Adri gewünscht): Jarvis soll auf Adris MacBook genauso arbeiten wie Max' Jarvis auf seinem PC.
- Vorlage ist Max' Jarvis (Python-App mit lokalem Server, Telegram-Bot, Clipper). Max legt den Code dafür in ein eigenes privates Repo.
- Geplante Stufen: Grundversion für macOS (Fenster, Stimme, Menüleiste, Autostart, Obsidian-Gedächtnis, eigener Telegram-Bot) → Ordner und Bilder sortieren → Clip-Radar für Adris eigene Streams → Posten über Adris eigenes Postiz.
- Feste Regeln: Jarvis löscht nie selbst Dateien (nur verschieben, erst nach Adris OK). Er postet nie ohne Adris Freigabe.
- Am besten mit Claude Code direkt auf Adris MacBook bauen und testen. Vorher freien Speicher prüfen (der Clipper braucht 20–30 GB).
