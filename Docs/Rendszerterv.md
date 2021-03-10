# Rendszerterv

## A rendszer célja
A webalkalmazásunkat azok számára fejlesztjük, akik a vendéglátásban felszolgálóként dolgoznak és szükség esetén a munkájuk megkönnyítésére egy egyszerűen és jól használható rendelések rögzítésére alkalmas alkalmazással szolgáljunk. Több hasznos funkciója, hogy a nap végén az összegzés, a raktárkészlet áttekintése jobban áttekinthető, valamint egszerűbbé teszi a vendéglátóegység rugalmas működését és segíti áthelyezni a hangsúlyt a vendégekre. Többet lehet velük foglalkozni, beszélgetni, lekövetni a kéréseiket és azoknak változását, végül jobb kapcsolatot lehet velük kiépíteni.

## Project terv
+ A project fejlesztésének menetét az alábbi ábra szemlélteti fázisokra és időrendre bontva:
<br>
<img src="https://github.com/Moss4t/AFP_TenGeri/blob/main/Images/Menetrend.jpg">

## Üzleti folyamatok
Az alkalmazás alapgondolatának megalkotója az egyik fejlesztő kollégánk, akinek saját tapasztalatai a vendéglátásban szerzett területeken valamint további ilyen területen dolgozó személy elmondása megerősíti, hogy egy ilyen jellegű alkalmazás megléte minden szempontból előnyt jelent. Másik szempontból nézve a dolgot, nem igazán mondható ehhez hasonló webes alkalmazás megléte a jelenlegi piacon ami kimondottan a pincérek és tulajok számára nyújt előnyt.

## Funkcionális terv
Az főoldal menüjéből lehet navigálni az egész alkalmazáson belül. Amint a [képernyőterveken](https://github.com/Moss4t/AFP_TenGeri/blob/main/Docs/Funkcionalis_Specifikacio.md#Képernyőterv) is láthatjuk tudunk megrendeléseket rögzíteni asztalokhoz, a tételeket asztalonként, valamint a nap végén is összegezhetjük, és tudjuk a raktártételeket is módosítani. 

## Követelmények
Az oldal megfelel a Magyarországon érvényben lévő jogszabályoknak, különös tekintettel az adatkezelési (GDPR) előírásoknak, valamint az Innovációs és Technológiai Minisztérium ajánlásainak. 

## Fizikai környezet
Az alkalmazásunk készítése során nagy hangsúlyt fektetünk a responsive design megalkotására,
ezzel máris előkészítve az alkalmazást egy akár kisebb felbontású eszközön történő problémamentes felhasználásra amihez csupán egy böngészőre van még szükség.
Nincsenek megvásárolt komponenseink.

A fejlesztéshez használt szoftverek és technológiák:
 - WebStorm (Front-end)
 - IntelliJ IDEA Ultimate (Backend)
 - MySQL (Adatbázis)
 - Java Spring (Back-end)
 - React, BootStrap (Front-end)
	
## Architekturális terv
Fontos megemlíteni, hogy a webalkalmazás működése egy bizonyos mennyiségű felhasználó vagy adatmennyiség megléte után kissé instabillá válhat gyorsaság szempontjából,
ezért a szerver kapacitása folyamatosan fejlesztés alatt áll, hogy elkerüljük az efféle működésbeli ingadozásokat és a későbbiek folyamán problémamentesen 
tudjuk biztosítani az alkalmazás gyors és megbízható működését egyaránt.

## Adatbázis terv

Az alkalmazást kiszolgáló adatbázis a következőképpen épül fel:
<br>
<img src="https://github.com/Moss4t/AFP_TenGeri/blob/main/Images/adatb%C3%A1zis_terv.png">
+ Summary tábla

| Mező név | Típus | Megszorítás |
|----------|-------|-------------|
| SummaryID | int(11) | PrimaryKey, AutoIncrement |
| RendelesCount | int(11) | |
| Date | datetime | ForeignKey |
| Summary | double | |

+ Rendeles tábla

| Mező név | Típus | Megszorítás |
|----------|-------|-------------|
| RendID | int(11) | PrimaryKey, AutoIncrement |
| ProdName | varchar(255) | ForeignKey |
| TableID | int(11) | UNIQUE |
| Date | datetime | ForeignKey, AutoIncrement |
| Price | double | |
| Status | enum | Active, Closed |

+ Raktar tábla

| Mező név | Típus | Megszorítás |
|----------|-------|-------------|
| ProdID | int(11) | PrimaryKey, AutoIncrement |
| ProdName | varchar(255) | ForeignKey |
| ProdCount | double | |
| WarehouseName | varchar(255) | |


## Teszt terv
A tesztterv célja a webalkalmazásunk teljes átvizsgálása mind Back-end mind Front-end szintjén.

### Alfa teszt:

Az alfa tesztünk célja a korábban megalkotott összes funkció teljes körű letesztelése, még az előtt, hogy a tesztelés következő fázisára lépnénk, ahol már a tényleges felhasználó visszajelzéseiből tudunk további esetleges hibákat kiküszöbölni. Időintervallumban meghatározva ez körülbelül egy teljes hetet fog igénybe venni majd.

### Béta teszt:

A béta teszt során a tényleges felhasználók végzik a program minden egyes funkciójának tesztelését amit egy esetleges hiba esetén képernyőképpel alátámasztva elküldi a fejlesztő csapatnak, így még a tényleges használat előtt fény derülhet néhány esetleges hibára amit még az alkalmazás működésbe helyezése előtt szükséges kijavítani. Akárcsak az alfa teszt esetében ennek a tesztnek is körülbelül egy teljes hét lesz az időtartama. 

## Telepítési terv
Mivel egy webalkalmazásról beszélünk így a használatához csupán megfelelő internet kapcsolat és egy böngésző kell, semmilyen más külső szoftverre nincs szükségünk!

## Karbantartási terv
A mi oldalunkról nem vállalunk felelősséget, azért ha eltér a felhasználó által bevitt adatok a raktáron szereplő tételektől.
- Az adatbázis frissítése valós tartalmakra a felhasználó dolga.
- A verziószámnak megfelelő frissítések kiadása és esetleges bugfixek.
