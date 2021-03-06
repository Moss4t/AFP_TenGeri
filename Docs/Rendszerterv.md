# Rendszerterv

## A rendszer célja
A webalkalmazásunkat azok számára fejlesztjük, akik a vendéglátásban felszolgálóként dolgoznak és szükség esetén a munkájuk megkönnyítésére egy egyszerűen és jól használható rendelések rögzítésére alkalmas alkalmazással szolgáljunk. Több hasznos funkciója, hogy a nap végén az összegzés, a raktárkészlet áttekintése jobban áttekinthető, valamint egszerűbbé teszi a vendéglátóegység rugalmas működését és segíti áthelyezni a hangsúlyt a vendégekre. Többet lehet velük foglalkozni, beszélgetni, lekövetni a kéréseiket és azoknak változását, végül jobb kapcsolatot lehet velük kiépíteni.

## Project terv
+ A project fejlesztésének menetét az alábbi ábra szemlélteti fázisokra és időrendre bontva:
<br>
<img src="https://github.com/Moss4t/AFP_TenGeri/blob/main/Images/Menetrend.jpg">

## Üzleti folyamatok
Mivel ez saját fejlesztésű alkalmazás, így kevés visszajelzésünk van, így minden javaslatot alaposan átnézünk és ezek alapján kezdjük el fejleszteni az aplikációt. Saját gondolatmenetünket finomítva tesztelhető verziót készítünk és gondosan ellenőrizzük a funkciók működését, melyek elkészülte után remélhetőleg a vágyálomrendszerhez közel hasonló végkimenetelünk lesz. A webalkalmazás kizárólag egy helyiség adatait tartalmazza egy olyan felületen, amivel könnyen formálhatjuk az asztalok számát igény szerint. Ezek a szolgáltatások fizetősek, ami annyit tesz, hogy az appstore-ban csak vásárlás után vehetők igénybe.

## Funkcionális terv
Az főoldal menüjéből lehet navigálni az egész alkalmazáson belül. Amint a képernyőterveken is láthatjuk tudunk megrendeléseket rögzíteni asztalokhoz, a tételeket asztalonként, valamint a nap végén is összegezhetjük, és tudjuk a raktártételeket is módosítani. 

## Követelmények
Az oldal megfelel a Magyarországon érvényben lévő jogszabályoknak, különös tekintettel az adatkezelési (GDPR) előírásoknak, valamint az Innovációs és Technológiai Minisztérium ajánlásainak. 

## Fizikai környezet
- A webalaklamazás egyaránt használható minden fajta erre alkalmas eszközön, mivel teljes mértékben reszponzív.
- Nincsennek megvásárolt komponenseink
- Fejlesztő eszközök:
  - MySQL
  - Spring
  - React
	
## Architekturális terv

## Adatbázis terv

## Teszt terv

## Telepítési terv
Az appstore-ban megvásárolt terméket letöltjük és helyileg feltelepítjük az eszközön. Ezek után használatra kész a webalkalmazás.

## Karbantartási terv
A mi oldalunkról nem vállalunk felelősséget, azért ha eltér a felhasználó által bevitt adatok a raktáron szereplő tételektől.
- Az adatbázis frissítése valós tartalmakra a felhasználó dolga.
- A verziószámnak megfelelő frissítések kiadása és esetleges bugfixek.
