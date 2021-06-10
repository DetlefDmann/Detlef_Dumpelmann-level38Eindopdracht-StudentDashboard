# Eindopdracht-StudentDashboard

## Inleiding:

Ik heb bij deze opdracht gekozen voor de "redux-toolkit" template voor create-react-app.

Voor data-visualisatie heb ik D3 gebruikt. Ik heb wel geprobeerd om dit op een React achtige manier te doen.
In plaats van op de "traditionele" manier telkens alles als een lange functie te schrijven, heb ik er waar mogelijk componenten van gemaakt.

Uiteindelijk heeft het best lang geduurd om alles op te bouwen, ik heb wel weer geprobeerd alle bonus requirements te realiseren.

## Redux toolkit:

Ik had Redux Toolkit al eens eerder gebruikt en het leek me nu ook weer een goede keuze.
Redux was al een van de bonus requirements en de toolkit levert ook nog eens andere nuttige pakketten mee.


## D3:

D3 is een van de meest gebruikte tools voor data-visualisatie en veel populaire libraries maken ook gebruik van D3.
Normaal gesproken is het vooral veel aaneenrijgen van methods, wat er uit ziet als "vanilla JavaScript".
Ik zag in een video van Curran Kelleher dat je dat ook anders kunt doen.
Omdat de code er dan veel meer uitziet als React code en je onderdelen eventueel ook weer kunt hergebruiken zoals bij React,
besloot ik die aanpak te gebruiken.
In eerste instantie ging dat heel goed. 
Ik kwam er na een tijdje achter dat er eigenlijk bijna geen documentatie is voor die manier van werken.
Daarom moest ik veel dingen zelf uitproberen en kwam ik ook dingen tegen die niet echt goed op te lossen waren.
Een voorbeeld daarvan zijn de tooltips. Ik heb het wel werkend, maar niet zoals ik had gewild.

## Data:

De data uit het google-sheet heb ik in een [gist](https://gist.github.com/DetlefDmann/c602c97a486964da1f267bb665d8479b) op github geplaatst, nadat ik het iets bewerkt heb.
Met een "async thunk" wordt de data opgehaald en in de redux-store opgeslagen.

## Design:

Op een superklein scherm ziet alles er niet perfect uit.
De website is beter op een tablet-formaat of groter scherm.

## Samenvatting:

Ook dit was weer een leuke en interessante opdracht om te maken.
Het was een flinke kluif, maar ik heb er weer veel van geleerd.
