# Követelmény specifikáció

## Bevezetés

A webalkalmazás célja tulajdonképpen, az egyes vendéglátó egységekben dolgozó felszolgálók feladatainak megkönnyítése, melynek során az alkalmazás megkönnyíti az egyes rendelések
rögzítésének folyamatát, azonban további lehetőségeket is kínál, mint például nap végi összegzések, raktárkészlet áttekintése stb. 
Reméljük, hogy jelen alkalmazás a későbbiekben több vendéglátásban dolgozó számára jelent majd segítséget, mind a tulajdonosok, mind az alkalmazottak tekintetében.

## Jelenlegi helyzet

Az applikáció alapgondolata teljes mértékben öntapasztalatokon alapul. Kezdetben saját felhasználásra terveztünk egy egyszerű webalkalmazást, hogy megkönnyítse a munkánkat.
Szerintünk nagy szükség lehet egy ilyen alkalmazásra, és bízunk benne, hogy olcsóbb és hatékonyabb megoldást találunk a problémára mint a konkurencia. Célunk, hogy egy gyors,
használható, érthető, hasznos, minden igényt kielégítő alkalmazást fejlesszünk.

## Vágyálom rendszer

A cél egy olyan webalkalmazás létrehozása ami a vendéglátásban dolgozók napi munkáját könnyíti meg. Megvalósítás tekintetében az alkalmazást három külön részre oszthatjuk, mégpedig
back-end, front-end, illetve az adatok tárolására szolgáló adatbázisra. A back-end vagy más néven szerveroldali rész implementációjához a Spring keretrendszert fogjuk 
használni, a front-endhez pedig a React keretrendszert fogjuk használni, ugyanis ez számos modern lehetőséget kínál a kinézet megvalósításához. Adatbázis tekintetében egy lokális
MySQL adatbázist használunk. 

A navbar-on található "Rendelés"-re kattintva jutunk el arra a felületre, ahol a rendeléseket tudjuk majd menedzselni (felvétel, törlés stb.). A "Raktár" nevezetű linkre kattintva
lehetőségünk nyílik az adott étteremben lévő alapanyagkészletek nyilvánítására és szükség esetén ezek menedzselésre is. A navigációs sávon található utolsó lehetőségre 
kattintva ("Összegzés"), az adott naphoz tartozó összbevételt láthatjuk, táblázatos formában akár egy hónapra visszamenőleg is.


## Jelenlegi üzleti folyamatok modellje

Az alkalmazást javarészt a felszolgálók fogják kezelni. A webalkalmazás nem fog tartalmazni semmiféle bejelentkezési rendszert, hiszen egyidejűleg több felszolgáló fogja azt használni.
A követelmény listában feltüntetett funkcionális és nem funkcionális követelményeknek megfelelően fog majd elkészülni. A felszolgálók fogják rögzíteni a rendeléseket, 
amelyeket később tudnak módosítani vagy akár törölni is. 

## Igényelt üzleti folyamatok modellje

Az alkalmazást javarészt a felszolgálók fogják kezelni. A webalkalmazás nem fog tartalmazni semmiféle bejelentkezési rendszert, hiszen egyidejűleg több felszolgáló fogja azt használni.
A követelmény listában feltüntetett funkcionális és nem funkcionális követelményeknek megfelelően fog majd elkészülni. A felszolgálók fogják rögzíteni a rendeléseket, 
amelyeket később tudnak módosítani vagy akár törölni is. 



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

## Fogalomszótár

- <b>MySQL</b>: A MySQL egy többfelhasználós, többszálú, SQL-alapú relációs adatbázis-kezelő szerver.<br />

- <b>Backend</b>: A backend réteg feladata a front-end réteg felől érkező adatok feldolgozása, ill. a keletkezett eredmény a front-end számára történő visszajuttatása.<br />

- <b>Front-end</b>: Egy adott rendszer legfelsőbb, a felhasználóval vagy a csatlakoztatott további rendszerrekkel a kapcsolatot tartó rétege.<br />

- <b>User-interface (UI)</b>: A felhasználói felület (angolul user interface, röviden UI) egy berendezés (például a számítógép), vagy egy számítógépes program (például egy operációs rendszer) azon elemeinek összessége, amelyek a felhasználóval való kommunikációért felelősek, és a berendezés vagy program irányítását, vezérlését lehetővé teszik.<br />

- <b>Spring</b>: A Spring egy nyílt forráskódú, "inversion of control"-t megvalósító Java alkalmazás keretrendszer.<br />

- <b>React</b>: A React egy olyan JavaScript könyvtár, amelyet felhasználói felületek programozásához szoktak használni.<br />

- <b>Responsive design</b>: A responsive design egy olyan weboldal készítési eljárás, amely lehetőséget ad arra, hogy ugyanaz a weboldal eszköztől, operációs rendszertől, böngészőtől függetlenül bármilyen környezetben tökéletesen jelenjen meg.<br />

