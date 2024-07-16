# Comic Weather App

## Projektbeschreibung

Die Comic Weather App ist eine Wetteranwendung, die aktuelle Wetterdaten und Vorhersagen für verschiedene Städte anzeigt. Die App verwendet die OpenWeatherMap API, um Wetterdaten abzurufen, und bietet eine benutzerfreundliche, comicartige Oberfläche mit animierten Hintergründen und Comic-Sprechblasen.

## Installation und Konfiguration

### Voraussetzungen

- Node.js und npm müssen installiert sein.

### Schritte zur Installation

1. **Repository klonen**
   git clone <repository-url>
   cd <repository-verzeichnis>

2. **Abhängigkeiten installieren**
   npm install

3. **API-Schlüssel konfigurieren**
   Erstelle eine .env Datei im Stammverzeichnis des Projekts.
   Füge den folgenden Eintrag hinzu und ersetze YOUR_API_KEY_HERE durch deinen OpenWeatherMap API-Schlüssel: VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
   
## Build und Start der Anwendung

### Entwicklungsmodus
   Starte den Entwicklungsserver mit: yarn dev

   Öffne die angegebene URL (normalerweise http://localhost:3000), um die App in deinem Browser anzuzeigen.

### Produktionsbuild

   Erstelle einen Produktionsbuild mit: npm run build

   Der Build wird im dist-Verzeichnis erstellt. Verwende einen HTTP-Server, um die Dateien im dist-Verzeichnis zu dienen und die Anwendung zu testen.

## Komponenten der Anwendung

1. **AnimatedBackground.tsx**

Erstellt einen animierten Hintergrund mit Wolken und einer Sonne.

2. **ComicSpeechBubble.tsx**

Zeigt in regelmäßigen Abständen wechselnde, wetterbezogene Phrasen in einer Comic-Sprechblase an.

3. **WeatherApp.tsx**

Hauptkomponente der App, die die Benutzeroberfläche für die Wetteranzeige und Vorhersage enthält.

4. **WeatherService.ts**

Enthält Funktionen zum Abrufen von Wetterdaten und Vorhersagen von der OpenWeatherMap API.

## Thesen und Ansätze

1. **Design und Benutzerfreundlichkeit**

These: Eine ansprechende und benutzerfreundliche Oberfläche verbessert die Benutzererfahrung und erhöht die Nutzungshäufigkeit der App.

**Ansatz:**

    - Verwendung eines comicartigen Designs mit animierten Hintergründen und Sprechblasen, um die App visuell ansprechend und einzigartig zu gestalten.

    - Einfache und intuitive Benutzeroberfläche, die es dem Nutzer ermöglicht, schnell und einfach Wetterdaten abzurufen.

2. **Effiziente Datenverarbeitung**

These: Eine effiziente Handhabung und Verarbeitung von API-Daten ist entscheidend für die Leistung und Zuverlässigkeit der App.

**Ansatz:**

    Implementierung von Funktionen zur Datenabfrage in WeatherService.ts, die asynchrone API-Aufrufe durchführen und Fehler effizient behandeln.
    Verwendung von Zustandshooks in React (useState, useEffect), um die API-Daten zu verwalten und die Benutzeroberfläche entsprechend zu aktualisieren.

3. **Erweiterbarkeit und Wartbarkeit**

These: Eine gut strukturierte und modulare Codebasis erleichtert die Wartung und Erweiterung der Anwendung.

**Ansatz:**

    Trennung der verschiedenen Komponenten (AnimatedBackground, ComicSpeechBubble, WeatherApp, WeatherService) in separate Dateien, um eine klare Struktur und Verantwortlichkeit zu gewährleisten.
    Einhaltung von Clean Code-Prinzipien und umfassende Kommentierung, um den Code verständlich und leicht wartbar zu machen.

