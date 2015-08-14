### Grid systém

Pomocí Grid systému lze zajistit **správné posazení elementů** a zajistit tak harmonii prvků a jejich vzdáleností. Následně díky zobrazení pomocné mřížky přes stránku může kdokoliv zkontrolovat, jsou-li text, ovládací a grafické prvky správně posazeny a zarovnány.

Grid systém se skládá ze dvou částí – **Baseline** a **Layout**.

—  

#### Baseline 

Baseline je **horizontální část** mřížky tvořená přímkami ve vzdálenosti 8px, kdy číslo osm slouží jako virtuální jednotka určující velikosti prvků a vzdálenosti mezi nimi. Každý vědomý rozměr je jejím násobkem.

Posazení elementů na Baseline řeší částečně daná [Typografická škála](typography), kde pouze u textového stylu **Chleba** nesedí každý druhý řádek.  

Případy, které [textové styly](typography/#textové-styly) nevyřeší, řešíme **vlastím odsazením** pomocí paddingu a marginu. I přes to se může stát, že ne vždy bude vše sedět dokonale na zobrazené Baseline. Důležité je, aby byl především dodržen vertikální rytmus elementů, které jsou vedle sebe.

—  

#### Layout

Layout je **vertikální část** mřížky tvořena flexibilními sloupci s daným odsazením mezi sebou, slouží především ke stanovení šířky, poměrů a mezer vícesloupcových layoutů a svislému zarovnání dominantních prvků.

Grid systém pracuje ve výchozím stavu se čtyřmi typy vzhledů.  
Každý vzhled má definované vlastnosti:

+ Minimální a maximální šířku - **breakpointy**, 
+ Celkové odsazení mřížky – **padding**,
+ Odsazení jednotlivých flexibilní sloupců – **gutter**.  


|                | **Mobile 1**   | **Mobile 2**   | **Tablet**   |  **Desktop** |
| ——————  | :——————: | :——————: | :—————: | :—————: |
| **Min. šířka** | 320px          | 408px          | 600px        | 1008px       |
| **Max. šířka** | 407px          | 599px          | 1007px       | 1008px       |
| **Padding**    | 8px            | 16px           | 16px         | 32px         |
| **Gutter**     | 8px            | 8px            | 8px          | 16px         |


Hodnoty lze upravit v odpovídajícím souboru v CSS a Javascriptu.  

Jestliže by bylo třeba více vzhledů, tak JS widget je na to připraven a stačí doplnit v hlavním skriptu, nicméně je potřeba projít všechny LESS soubory a doplnit potřebné informace pro dané vzhledy.

— 

#### Responzivní třídy

Návrháři většinou pracují s mřížkou o **24 sloupcích**, proto máme definované třídy pro velikosti až do 24 sloupcového layoutu.  
V praxi ale pravděpodobně budeme využívat třídy pro velikosti pro **max tři čtyři sloupce**.  
Třídy lze vzájemně mixovat dohromady, ale vždy musí velikost dávat 100%.

Třídy se ve většině případech na layoutu menším jak desktop rozšíří na celou šířku obrazovky.  
U vybraných tříd lze použít třídu **no-change** pro zabránění změny při breakpointu.  

![Responzivní třídy](https://gitlab.kancelar.seznam.cz/Dominik.michna/seznam-design-system/uploads/a7906520243570cb5eb3c6bc11e10e87/responsive-class.png)

![Tabulka responzivních tříd](https://gitlab.kancelar.seznam.cz/Dominik.michna/seznam-design-system/uploads/e152e659da67df45705e97dcf3a0878e/size-class.png)

Zdrojový LESS soubor:

```
/web/less/grid/grid.size.less
```

—

#### Elementy

Grid systém se skládá vždy ze svého **obalu**, na kterém je nastavena šířka a padding.  
Sloupce jsou tvořeny **unitami**, které skládáme do **řad**, dle toho, jak chceme, aby se responzivně za sebe řadily.  
Unity do sebe **nezanořujeme**, ale spíše shlukujeme do případných podskupin.

![Jednoduchý příklad Grid systému](https://gitlab.kancelar.seznam.cz/Dominik.michna/seznam-design-system/uploads/dc1e3aead8760e4d6a89d4393306bbd0/grid-examples.png)

```html
<div class=“gr”>
    <div class=“ln”>
        <div class=“unt s1of2”>1/2</div>
        <div class=“unt s1of2”>1/2</div>
    </div>
    <div class=“ln”>
        <div class=“wrp s3of4”>
            <div class=“unt s1of2”>nested unit</div>
            <div class=“unt s1of2”>nested unit</div>
        </div>
	<div class=“unt s1of4”>1/4</div>
    </div>
    <div class=“ln”>
        <div class=“unt 1of1”>1/1</div>
    </div>
</div>
```



—  

Stav: Working Draft  
Verze: 0.1.1  
Inspirace: [UX MailChimp](http://ux.mailchimp.com/patterns), [OOCSS](https://github.com/stubbornella/oocss/wiki/grids#base-classes)  
Kontakt: [Dominik Michna](mailto:dominik.michna@firma.seznam.cz)