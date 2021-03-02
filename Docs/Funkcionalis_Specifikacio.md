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
[A Követelmény specifikációban kifejtettük korábban.](https://github.com/Moss4t/AFP_TenGeri/blob/main/Docs/Kovetelmeny_Specifikacio.md#Követelménylista)

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
