# Comic Weather App

## Projektbeschreibung

Die Comic Weather App ist eine Wetteranwendung, die aktuelle Wetterdaten und Vorhersagen für verschiedene Städte anzeigt. Die App verwendet die OpenWeatherMap API, um Wetterdaten abzurufen, und bietet eine benutzerfreundliche, comicartige Oberfläche mit animierten Hintergründen und Comic-Sprechblasen.

## Installation und Konfiguration

### Voraussetzungen

- Node.js und npm müssen installiert sein.

### Schritte zur Installation

1. **Repository klonen**
   - git clone "repository-url"
   - cd "repository-verzeichnis"

2. **Abhängigkeiten installieren**
   - npm install
   - npm install axios

3. **API-Schlüssel konfigurieren**
   Erstelle eine .env Datei im Stammverzeichnis des Projekts.
   Füge den folgenden Eintrag hinzu und ersetze YOUR_API_KEY_HERE durch deinen OpenWeatherMap API-Schlüssel:
   - VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
   
## Build und Start der Anwendung

### Entwicklungsmodus
   Starte den Entwicklungsserver mit: 
   - yarn dev

   Öffne die angegebene URL (normalerweise http://localhost:3000), um die App in deinem Browser anzuzeigen.

### Produktionsbuild

   Erstelle einen Produktionsbuild mit: 
   - npm run build

   Der Build wird im dist-Verzeichnis erstellt. Verwende einen HTTP-Server, um die Dateien im dist-Verzeichnis zu dienen und die Anwendung zu testen.

# Funktionen/Oberflächen (Oguz Kaan Öztürk, 925670)

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

Verwendung eines comicartigen Designs mit animierten Hintergründen und Sprechblasen, um die App visuell ansprechend und einzigartig zu gestalten.
Einfache und intuitive Benutzeroberfläche, die es dem Nutzer ermöglicht, schnell und einfach Wetterdaten abzurufen.

2. **Effiziente Datenverarbeitung**

These: Eine effiziente Handhabung und Verarbeitung von API-Daten ist entscheidend für die Leistung und Zuverlässigkeit der App.

**Ansatz:**

Implementierung von Funktionen zur Datenabfrage in WeatherService.ts, die asynchrone API-Aufrufe durchführen und Fehler effizient behandeln.
Verwendung von Zustandshooks in React (useState, useEffect), um die API-Daten zu verwalten und die Benutzeroberfläche entsprechend zu aktualisieren.

3. **Erweiterbarkeit und Wartbarkeit**

These: Eine gut strukturierte und modulare Codebasis erleichtert die Wartung und Erweiterung der Anwendung.

**Ansatz:**

Trennung der verschiedenen Komponenten (AnimatedBackground, ComicSpeechBubble, WeatherApp, WeatherService) in separate Dateien, um eine klare Struktur zu gewährleisten.
Einhaltung von Clean Code-Prinzipien und Kommentierung, um den Code verständlich zu machen.

# Wetter-App Testdokumentation(Muhammad Arif 926685)

## Inhaltsverzeichnis
1. [Einleitung](#einleitung)
2. [Installation der Testbibliotheken](#installation-der-testbibliotheken)
3. [WeatherApp Komponententests](#weatherapp-komponententests)
   1. [Test-Suite-Einrichtung](#test-suite-einrichtung)
   2. [Testfälle](#testfälle)
   3. [Hauptüberprüfungen](#hauptüberprüfungen)
4. [ComicSpeechBubble Komponententests](#comicspeechbubble-komponententests)
   1. [Test-Suite-Einrichtung](#test-suite-einrichtung-1)
   2. [Testfälle](#testfälle-1)
   3. [Hauptüberprüfungen](#hauptüberprüfungen-1)
5. [End-to-End (E2E) Tests](#end-to-end-e2e-tests)
   1. [Test-Suite-Einrichtung](#test-suite-einrichtung-2)
   2. [Testfälle](#testfälle-2)
   3. [Hauptüberprüfungen](#hauptüberprüfungen-2)
6. [Fazit](#fazit)

## Einleitung

Dieses Dokument bietet einen Überblick über die Testsuiten für das Wetter-App-Projekt, einschließlich Unit-Tests für einzelne Komponenten und End-to-End (E2E) Tests für die gesamte Anwendung.

## Installation der Testbibliotheken

Bevor Sie mit den Tests beginnen, stellen Sie sicher, dass Sie die erforderlichen Testbibliotheken installiert haben, eigentlich sollte alles durch npm install installiert sein aber sie müssen vielleicht Jest local installieren:npx install jest /Führen Sie die restliche install Befehle nur dann aus, wenn was fehlt, sonst können sie die erstmal überspringen.

# Installation von Jest und React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Installation von Cypress für E2E-Tests
npm install --save-dev cypress

## WeatherApp Komponententests
Diese Tests konzentrieren sich auf die Haupt-`WeatherApp`-Komponente, die für das Abrufen und Anzeigen von Wetterdaten verantwortlich ist, mit dem Befehl:npm test führen sie die mit Test coverage aus.

### Test-Suite-Einrichtung
- Die Tests verwenden React Testing Library und Jest.
- API-Aufrufe werden mit Jest's Mocking-Fähigkeiten simuliert.
- Mock-Daten für Wetter und Vorhersage werden bereitgestellt.

### Testfälle
1. **Render-Prüfung**: Stellt sicher, dass die Komponente ohne Absturz rendert.
2. **Wetterdaten Abruf und Anzeige**: Überprüft, ob Wetterdaten korrekt abgerufen und angezeigt werden.
3. **Fehlerbehandlung**: Prüft, ob eine Fehlermeldung angezeigt wird, wenn der Abruf von Wetterdaten fehlschlägt.
4. **Stündliche Vorhersage-Rendering**: Bestätigt, dass die stündliche Vorhersage korrekt gerendert wird.
5. **Stadt nicht gefunden Fehler**: Stellt sicher, dass Fehler bei unbekannten Städten korrekt behandelt werden.
6. **Initialer Zustand Rendering**: Überprüft die korrekte Darstellung des Anfangszustands.
7. **Ladeindikator**: Prüft, ob der Ladeindikator während des Datenabrufs angezeigt wird.

### Hauptüberprüfungen
- Vorhandensein von Eingabefeld und Suchbutton.
- Korrekte Anzeige von Wetterdaten (Temperatur, Beschreibung, Stadtname).
- Anzeige von Fehlermeldungen bei API-Fehlern.
- Vorhandensein mehrerer Vorhersageelemente.

## ComicSpeechBubble Komponententests
Diese Tests konzentrieren sich auf die `ComicSpeechBubble`-Komponente, die wetterbezogene Phrasen in einer Comic-Sprechblase anzeigt.

### Test-Suite-Einrichtung
- Verwendet React Testing Library und Jest.
- Ein vordefiniertes Array von Wetterphrasen wird für Tests verwendet.

### Testfälle
1. **Render-Prüfung**: Stellt sicher, dass die Komponente ohne Absturz rendert.
2. **Initiale Phrasenanzeige**: Überprüft, ob die anfängliche Phrase korrekt angezeigt wird.
3. **Phraseninhalt-Verifizierung**: Prüft, ob die angezeigte Phrase aus dem vordefinierten Array stammt.
4. **Timer-Bereinigung**: Stellt sicher, dass der Timer beim Unmounten der Komponente bereinigt wird.
5. **Phrasenrotation**: Überprüft, ob die Komponente immer eine der vordefinierten Phrasen anzeigt.

### Hauptüberprüfungen
- Vorhandensein des Sprechblasen-Elements.
- Korrekter Inhalt der Sprechblase.
- Ordnungsgemäße Bereinigung von Timern zur Vermeidung von Speicherlecks.

## End-to-End (E2E) Tests
Diese Tests decken den gesamten Anwendungsablauf ab, simulieren Benutzerinteraktionen und überprüfen die erwarteten Ergebnisse.

### Test-Suite-Einrichtung
- Verwendet Cypress für E2E-Tests.
- Geht davon aus, dass die Anwendung auf `http://localhost:5173` läuft.
- Den Befehl npx cypress open ausführen wenn cypress bereits installiert ist, sonst mit npx cypress install vorher installieren.

### Testfälle
1. **Hauptseiten-Ladung**: Überprüft, ob die Hauptseite korrekt geladen wird.
2. **Fehlerbehandlung unbekannter Städte**: Prüft die Anzeige von Fehlermeldungen für unbekannte Städte.
3. **Ladeindikator**: Stellt sicher, dass der Ladeindikator während des Datenabrufs angezeigt wird.
4. **Wetterdaten-Anzeige**: Überprüft, ob Wetterdaten für eine gültige Stadt angezeigt werden.
5. **Stadt-Aktualisierung**: Prüft, ob sich die Wetterdaten aktualisieren, wenn eine neue Stadt gesucht wird.
6. **Schnelle Suchbehandlung**: Testet das Verhalten der Anwendung bei mehreren schnellen Suchvorgängen.

### Hauptüberprüfungen
- Vorhandensein und Funktionalität von Sucheingabe und -button.
- Korrekte Anzeige von Fehlermeldungen.
- Vorhandensein des Ladeindikators während des Datenabrufs.
- Genaue Anzeige von Wetterdaten für verschiedene Städte.
- Korrekte Behandlung mehrerer aufeinanderfolgender Suchen.

## Fazit
Diese umfassende Testsuite deckt sowohl Unit-Tests einzelner Komponenten als auch End-to-End-Tests der gesamten Anwendung ab. Sie gewährleistet die Zuverlässigkeit und Korrektheit der Funktionalität der Wetter-App, einschließlich Datenabruf, Fehlerbehandlung und Aktualisierungen der Benutzeroberfläche.

# Dokumentation für die Bereitstellung / Deployement der Wetter-App über AWS Amplify (Ibrahima Camara 928727)



## Inhaltsverzeichnis
1. [Einführung](#einführung)
2. [Voraussetzungen](#voraussetzungen)
3. [Einrichten von AWS Amplify](#einrichten-von-aws-amplify)
4. [Erstellen und Konfigurieren der Wetter-App](#erstellen-und-konfigurieren-der-wetter-app)
5. [Bereitstellen der Wetter-App](#bereitstellen-der-wetter-app)
6. [Verwalten der Wetter-App](#verwalten-der-wetter-app)
7. [Fehlerbehebung](#fehlerbehebung)
8. [Ressourcen](#ressourcen)

## Einführung
Diese Dokumentation beschreibt die Schritte zur Bereitstellung der Wetter-App über AWS Amplify unter Verwendung von Visual Studio Code . Der Quellcode der Anwendung befindet sich im [GitHub-Repository](https://github.com/Oguz361/Weather-App).

Die bereitgestellte Wetter-App ist unter folgender URL erreichbar: [Wetter-App](https://main.dgfjo542tgblv.amplifyapp.com/).

## Voraussetzungen
Bevor Sie beginnen, stellen Sie sicher, dass Sie die folgenden Tools und Konten eingerichtet haben:
- Ein AWS-Konto
- AWS CLI installiert und konfiguriert
- Node.js und npm installiert
- Visual Studio Code installiert
- Git installiert
- Ein Klon des Repositories der Wetter-App:
    ```sh
    git clone https://github.com/Oguz361/Weather-App
    cd Weather-App
    ```

## Einrichten von AWS Amplify
1. **AWS CLI Konfiguration**: Öffnen Sie die Eingabeaufforderung (cmd) und führen Sie den Befehl `aws configure` aus. Geben Sie Ihre AWS-Zugangsschlüssel und den gewünschten Standardregion-Code ein.
    ```sh
    aws configure
    ```

2. **Amplify CLI installieren**: Installieren Sie die Amplify CLI global mit npm.
    ```sh
    npm install -g @aws-amplify/cli
    ```

3. **Amplify CLI initialisieren**: Navigieren Sie zu Ihrem Projektordner und führen Sie den Initialisierungsbefehl aus.
    ```sh
    amplify init
    ```

    Folgen Sie den Anweisungen und wählen Sie die entsprechenden Optionen für Ihr Projekt.

## Erstellen und Konfigurieren der Wetter-App
1. **Projekt initialisieren**:
    ```sh
    amplify init
    ```

    Folgen Sie den Anweisungen, um Ihr Projekt mit Amplify zu verbinden. Wählen Sie beispielsweise Ihre bevorzugten Einstellungen für Editor (Visual Studio Code) und Programmiersprache (JavaScript).

2. **Hinzufügen von Kategorien zu Ihrem Amplify-Projekt**:
    Zum Beispiel, um Hosting hinzuzufügen:
    ```sh
    amplify add hosting
    ```

    Wählen Sie die gewünschten Hosting-Optionen (z.B. Amazon S3 and CloudFront) und folgen Sie den Anweisungen zur Konfiguration.

## Bereitstellen der Wetter-App
1. **Hosting hinzufügen und veröffentlichen**:
    ```sh
    amplify add hosting
    amplify publish
    ```

    Wählen Sie die Hosting-Optionen und folgen Sie den Anweisungen zur Bereitstellung.

2. **Build und Deployment**: AWS Amplify wird die Anwendung bauen und bereitstellen. Nach erfolgreicher Bereitstellung erhalten Sie eine URL, unter der Ihre Wetter-App erreichbar ist.

## Verwalten der Wetter-App
1. **Updates bereitstellen**:
    Nach Änderungen an Ihrer Anwendung können Sie die Änderungen mit folgendem Befehl bereitstellen:
    ```sh
    amplify publish
    ```

2. **Umgebungen verwalten**: Sie können verschiedene Umgebungen für Ihre Anwendung erstellen und verwalten (z.B. Entwicklungs- und Produktionsumgebungen).
    ```sh
    amplify env add
    amplify env checkout <environment-name>
    ```

## Fehlerbehebung
1. **Fehlerprotokolle überprüfen**: Bei Problemen während der Bereitstellung oder Nutzung der Anwendung können Sie die Protokolle in der AWS Amplify-Konsole überprüfen.
2. **Amplify CLI Fehler beheben**: Stellen Sie sicher, dass Ihre AWS CLI und Amplify CLI auf dem neuesten Stand sind.
    ```sh
    npm update -g @aws-amplify/cli
    ```

3. **Gemeinsame Probleme**: Überprüfen Sie häufige Probleme und Lösungen in der [AWS Amplify Dokumentation](https://docs.amplify.aws/).

## Ressourcen
- [AWS Amplify Dokumentation](https://docs.amplify.aws/)
- [AWS CLI Dokumentation](https://docs.aws.amazon.com/cli/)
- [Node.js und npm Dokumentation](https://nodejs.org/)
- [Visual Studio Code Dokumentation](https://code.visualstudio.com/docs)
- [Git Dokumentation](https://git-scm.com/doc)

# Dokumentation für die Bereitstellung / Deployen der Wetter-App über Vercel (Ibrahima Camara 928727)

## Inhaltsverzeichnis
1. [Einführung](#einführung)
2. [Voraussetzungen](#voraussetzungen)
3. [Einrichten von Vercel](#einrichten-von-vercel)
4. [Erstellen und Konfigurieren der Wetter-App](#erstellen-und-konfigurieren-der-wetter-app)
5. [Bereitstellen der Wetter-App](#bereitstellen-der-wetter-app)
6. [Verwalten der Wetter-App](#verwalten-der-wetter-app)
7. [Fehlerbehebung](#fehlerbehebung)
8. [Ressourcen](#ressourcen)

## Einführung
Diese Dokumentation beschreibt die Schritte zur Bereitstellung der Wetter-App über Vercel unter Verwendung von Visual Studio Code  Der Quellcode der Anwendung befindet sich im [GitHub-Repository](https://github.com/Oguz361/Weather-App).

## Voraussetzungen
Bevor Sie beginnen, stellen Sie sicher, dass Sie die folgenden Tools und Konten eingerichtet haben:
- Ein Vercel-Konto
- Node.js und npm installiert
- Visual Studio Code installiert
- Git installiert
- Ein Klon des Repositories der Wetter-App:
    ```sh
    git clone https://github.com/Oguz361/Weather-App
    cd Weather-App
    ```

## Einrichten von Vercel
1. **Vercel CLI installieren**: Installieren Sie die Vercel CLI global mit npm.
    ```sh
    npm install -g vercel
    ```

2. **Vercel CLI initialisieren**: Navigieren Sie zu Ihrem Projektordner und führen Sie den Initialisierungsbefehl aus.
    ```sh
    vercel login
    ```

    Folgen Sie den Anweisungen, um sich bei Ihrem Vercel-Konto anzumelden.

## Erstellen und Konfigurieren der Wetter-App
1. **Projekt initialisieren**:
    - Klonen Sie das Repository und navigieren Sie in den Projektordner:
    ```sh
    git clone https://github.com/Oguz361/Weather-App
    cd Weather-App
    ```

2. **Abhängigkeiten installieren**:
    - Installieren Sie die benötigten npm-Pakete:
    ```sh
    npm install
    ```

3. **Umgebungsvariablen konfigurieren**:
    - Erstellen Sie eine `.env`-Datei im Stammverzeichnis des Projekts und fügen Sie Ihre API-Schlüssel und andere Umgebungsvariablen hinzu:
    ```plaintext
    REACT_APP_API_KEY=IhrAPIKey
    ```

## Bereitstellen der Wetter-App
1. **Bereitstellung mit Vercel**:
    - Führen Sie den Befehl `vercel` im Stammverzeichnis Ihres Projekts aus:
    ```sh
    vercel
    ```

    Folgen Sie den Anweisungen, um die Bereitstellung abzuschließen. Wählen Sie ggf. Ihr Vercel-Projekt und die gewünschten Konfigurationsoptionen.

2. **Bestätigung der Bereitstellung**:
    - Nach erfolgreicher Bereitstellung erhalten Sie eine URL, unter der Ihre Wetter-App erreichbar ist.

## Verwalten der Wetter-App
1. **Updates bereitstellen**:
    - Nach Änderungen an Ihrer Anwendung können Sie die Änderungen mit folgendem Befehl bereitstellen:
    ```sh
    vercel --prod
    ```

2. **Umgebungsvariablen verwalten**:
    - Sie können Umgebungsvariablen direkt in der Vercel-Weboberfläche verwalten oder mithilfe der Vercel CLI:
    ```sh
    vercel env add <variable-name> <variable-value>
    ```

## Fehlerbehebung
1. **Fehlerprotokolle überprüfen**: Bei Problemen während der Bereitstellung oder Nutzung der Anwendung können Sie die Protokolle in der Vercel-Konsole überprüfen.
2. **Vercel CLI Fehler beheben**: Stellen Sie sicher, dass Ihre Vercel CLI auf dem neuesten Stand ist.
    ```sh
    npm update -g vercel
    ```

3. **Gemeinsame Probleme**: Überprüfen Sie häufige Probleme und Lösungen in der [Vercel Dokumentation](https://vercel.com/docs).

## Ressourcen
- [Vercel Dokumentation](https://vercel.com/docs)
- [Node.js und npm Dokumentation](https://nodejs.org/)
- [Visual Studio Code Dokumentation](https://code.visualstudio.com/docs)
- [Git Dokumentation](https://git-scm.com/doc)
- [GitHub Repository der Wetter-App](https://github.com/Oguz361/Weather-App)



