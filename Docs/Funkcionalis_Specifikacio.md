# Funkcionális specifikáció

## Áttekintés
Az alkalmazás célja tulajdonképpen, az egyes vendéglátó egységekben dolgozó felszolgálók feladatainak megkönnyítése, melynek során az alkalmazás segítségével rögzíthetik az egyes asztalonkénti rendeléseket, emellett számos további lehetőséget is kínál, mint például nap végi összegzések, raktárkészlet áttekintése stb. Reméljük, hogy alkalmazásunk a későbbiekben több vendéglátóiparban dolgozó számára jelent majd segítséget, mind a tulajdonosok, mind az alkalmazottak tekintetében.

## Jelenlegi helyzet
Az applikáció alapgondolata teljes mértékben öntapasztalatokon alapul. Kezdetben saját felhasználásra terveztünk egy egyszerű webalkalmazást, hogy megkönnyítse a munkánkat. Szerintünk nagy szükség lehet egy ilyen alkalmazásra, és bízunk benne, hogy olcsóbb és hatékonyabb megoldást találunk a problémára mint a konkurencia. Célunk, hogy egy gyors, használható, érthető, hasznos, minden igényt kielégítő alkalmazást fejlesszünk.

## Jelenlegi üzleti folyamatok modellje
Manapság a vendéglátásban sok helyen papírra jegyzetelik a vendégek fogyasztását, amely nagyon sok időt elvesz, és káros a környezetnek. A végösszeg kiszámítása hosszú és macerás lehet, amíg az árlistáról megkeresik, és hozzáadják a számokat a teljes összeghez. Ennek kiküszöbölése érdekében szükség van egy olyan akalmazásra, amely minden asztalt elektronikusan követ, és automatikusan összeadja a számokat, hogy időt és papírt spóroljunk vele. 

## Igényelt üzleti folyamatok modellje
Az alkalmazást javarészt a felszolgálók fogják kezelni. A webalkalmazás nem fog tartalmazni semmiféle bejelentkezési rendszert, hiszen egyidejűleg több felszolgáló fogja azt használni. A követelmény listában feltüntetett funkcionális és nem funkcionális követelményeknek megfelelően fog majd elkészülni. A felszolgálók fogják rögzíteni a rendeléseket, amelyeket később tudnak módosítani vagy akár törölni is.

## Használati esetek
+ Nem különböztetünk meg felhasználókat, így nincs szükség bejelentkező felületre, mint az alábbi ábra szemlélteti.
<br>
<img src="https://github.com/Moss4t/AFP_TenGeri/blob/main/Images/UseCase.png">


## Követelménylista
|    <b>Modul</b>              |    <b>ID</b>     |    <b>Megnevezés</b>                   |    <b>Leírás</b>                                                                                                                                                                                                                                       |
|----------------------------|-----------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
|    Backend            |    <b>F1</b>     |    Adatbázis                     |   A webalkalmazás egy lokális adatbázist használ a rendelések és a raktáron lévő adatok tárolására.|
|    Backend            |    <b>F2</b>     |    Rendelés felvétele            |   Az alkalmazás használatával lehetőségünk van egy adott rendelést felvinni a rendszerbe.       |
|    Backend            |    <b>F3</b>     |    Rendelések listázása          |    A már felvitt rendeléseket nyomon tudjuk majd követni.                                        |
|    Backend            |    <b>F4</b>     |    Rendelések  módosítása        |    Lehetőségünk van egy adott rendelést lezárni olya módon, hogy a hozzá tartozó státusz mezőt "fizetve" állítjuk.   |
|    Backend            |    <b>F5</b>     |   Részletes rendelés megjelenítés    |    Amint egy asztalra kattintunk, egy külön felületen megjelenik a rendelés minden egyes részletével.    |                                                                                          
|    Backend            |    <b>F6</b>     |    Raktáron levő termékek listázása   |    Az adatbázisban szereplő termékek nyomonkövethetősége végett szükséges.        |                 
|    Backend            |    <b>F7</b>     |    Raktáron levő termékek törlése     |   Ha esetleg egy alapanyag már nem szükséges a továbbiakban akkor kitöröljük a rendszerből.   |
|    Backend            |    <b>F8</b>     |    Raktáron levő termékek módosítása  |   Amennyiben egy alapanyag rossz információkkal rendelkezik ezt lehetőségünk van javítani.   |
|    Backend            |    <b>F9</b>     |    Raktáron levő termékek hozzáadása  |    Ha egy termék kifogyóban van akkor ezzel a funkcióval a kívánt mennyiséget tudjuk megrendelni. |
|    Backend            |    <b>F10</b>    |   Napi összegzés                      |   Minden egyes napi bevétel egy táblázatban lesz megjelenítve dátummal ellátva.   |
|    Backend            |    <b>F11</b>    |    Havi összegzés                     |  Egy hónapon belöli konkrét bevétel megjelenítése egy táblázatban a hónap nevével feltüntetve.   |
|    Backend            |    <b>F12</b>    |    Összegzések törlése                |  Amennyiben már nincs szükség a korábbi összegzési adatokra szimplán kitöröljük az adatbázisból.   |
|    Frontend           |    <b>F13</b>    |    Rendelések felület                 |    Ez a felület szolgál a rendelések és a hozzá tartozó funkciók  megjelenítésére.           |
|    Frontend           |    <b>F14</b>    |    Raktár felület                     |    A raktár készlet menedzseléséhez szükséges felület.   |
|    Frontend           |    <b>F15</b>    |    Összegzés felület                  |   Az az oldal ahol egy táblázatban felsorolva láthatjuk a már korábban említett F10 és F11 azonosítóval ellátott funkció eredményeit.  |
|    Frontend           |    <b>F16</b>    |   Navigációs bár                      |   Az alkalmazáson belüli könnyebb navigáció végett (Rendelések,Raktár,Összegzés,Logo) -val megjelölve.   |
|    Frontend           |    <b>F17</b>    |   Responsive design                 |   Fontos, hogy a webalkalmazás egy kisebb méretű képernyőre is fell legyen készítve. |
|    Frontend           |    <b>F18</b>    |    Modern UI elemek használata      |   A modern kinézet megalkotásához fontos, hogy a különböző elemek (Card,Dropdown List stb) és a színek is összhangban legyenek a végeredményben.  |

## Képernyőterv

 + A megrendelés rögzítésére alkalmas felület:
 
![FullWebsite](https://github.com/Moss4t/AFP_TenGeri/blob/Funkspec01/Images/1.JPG)

+ A raktáron lévő termékek menedzselésére szolgáló felület:

![FullWebsite](https://github.com/Moss4t/AFP_TenGeri/blob/Funkspec01/Images/2.JPG)

+ Ezen a felületen a napi megrendelések számát és a bevételeket láthatjuk dátummal ellátva: 

![FullWebsite](https://github.com/Moss4t/AFP_TenGeri/blob/Funkspec01/Images/3.JPG)

## Forgatókönyv
A pincér betölti az alkalmazást, miután előfizetett rá, így használatra kész lesz. A pincér kimegy az asztalhoz. A pincér felveszi a rendelést, melyet az alkalmazásban, a megfelelő asztalt kiválasztva felvezet. Az asztalra rákattintva tudja megtekinteni, hogy eddig az adott asztal mit fogyasztott, valamint módosítani (hozzáadni/eltávolítani) tudja ezt a rendelést. Ha a vendégek távozásra ítélik a helyzetet, akkor a "Fizet" gombra kattintva autómatikusan összegzi a gép a fogyasztást, valamint kiállítja a számlát, és menti az adatbázisba későbbi statisztikák lekérése érdekében. A gép a fogyasztás alapján kiszámolja, hogy raktáron mennyi termék maradt. Raktári készlet módosítását a pincér manuálisan kezeli, melyre külön felület van kialakítva. Itt van lehetőség hozzáadni, törölni és módosítani a készletet. 

## Fogalomszótár
- <b>Termékkulcs: </b> A termékkulcs, vagy más néven szoftverkulcs, egy speciális szoftveralapú kulcs egy számítógépes programhoz. Igazolja, hogy a program másolata eredeti.
- <b>Előfizetés: </b> Aki ezt az aplikációt használni akarja, a termékkulcsot fizetés ellenében kapja meg. Bármilyen fizetőszköznek megfelelő valutát elfogadunk.
