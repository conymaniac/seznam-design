### Seznam Design

Základní třídy + widget pro jednodušší práci s návrhy a komunikaci s Návrháři.  
Widget psán v čistém Javascriptu, zatím řešeno pouze pro moderní prohlížeče.  
Budu rád, když se ozvete s připomínkami či případnými problémy – [Dominik Michna](mailto:dominik.michna@firma.seznam.cz).

### Použití

Na dané službě si nahrajeme potřebné soubory z odpovídající složky.

#### Základní verze

Složka obsahuje základní CSS soubor, JS soubor pro widget a iconfont.  
Součástí stylopisů jsou resety, třídy pro grid, textové styly a nastavení iconfontu pro widget.    
CSS třídy předpokládájí, že složka s fonty je na stejné úrovni jako složka s CSS.  

```
/build/base/css/style.min.css
/build/base/js/grid.min.js
/build/base/fonts/
```

#### Rozšířená verze

Složka obsahuje rozšířený CSS soubor, JS soubor pro widget a iconfont.  
Součástí stylopisů jsou resety, třídy pro grid, textové styly a nastavení iconfontu pro widget.  
Navíc jsou obsažený základní třídy a Seznamácký font TriviaSeznam.  
CSS třídy předpokládájí, že složka s fonty je na stejné úrovni jako složka s CSS.  

```
/build/extended/css/style.min.css
/build/extended/js/grid.min.js
/build/extended/fonts/
```

#### Inicializace

Jednotlivé soubory pak vložíme do HTML a inicializujeme Grid widget. 

```html
<link type=“text/css” rel=“stylesheet” href=“/static/css/style.min.css”>
<script type=“text/javascript” src=“/static/js/grid.min.js”></script>
<script type=“text/javascript”>
	Grid.cfg();
</script>
```

#### Demo

Defaultní složka obsahuje vždy aktuálně vybuilděné demo.    
Lze možné spusit pomocí jednoduché express serveru.  
Pomocí Gruntu lze vybuildit jednoduché nebo pokročilé demo.

```
grunt demo-base         // jednoduché demo
grunt demo-extended     // pokročilé demo
npm start               // start express serveru
```

Při builděni se současně vždy vytvoří kopie souborů do vlastní složky pro rychlý přístup.  

```
/build/demo/            // defaultní složka, nastavena pro express server
/build/demo-base        // kopie jednoduchého dema
/build/demo-extended    // kopie pokročilejšího dema
```


#### Layout & breakpointy

Seznam Design pracuje se čtyřmi typy layoutů: mobile 1, mobile 2, tablet a desktop.

Breakpointy jsou předdefinované, ale lze je upravit v odpovídajícím souboru v CSS a Javascriptu.  

``` 
/web/scripts/grid.js        // nastavení breakpointů pro JS widget
/web/less/grid/grid.less    // nastavení breakpointů pro LESS
```

Výchozí nastavení breakpointů, gutteru a celkového paddingu gridu:

``` css
/* layout – mobil 1 */
@m1-minWidth: 20em; 			/* 320px */
@m1-maxWidth: 25.4375em;		/* 407px */
@m1-padding: 0.5em;				/* 8px */
@m1-gutter: 0.5em;				/* 8px */

/* layout – mobil 2 */
@m2-minWidth: 25.5em;			/* 408px */
@m2-maxWidth: 37.4375em;		/* 599px */
@m2-padding: 1em;				/* 16px */
@m2-gutter: 0.5em;				/* 8px */

/* layout – tablet */
@tb-minWidth: 37.5em;			/* 600px */
@tb-maxWidth: 62.9375em;		/* 1007px */
@tb-padding: 1em;				/* 16px */
@tb-gutter: 0.5em; 				/* 8px */

/* layout – desktop */
@dk-minWidth: 63em; 			/* 1008px */
@dk-maxWidth: 63em;				/* 1008px */
@dk-padding: 2em;				/* 32px */
@dk-gutter: 1em; 				/* 16px */
```

—  

Stav: Working Draft  
Verze: 0.1.1  
Využívá:  npm, grunt, less, browserify  
Kontakt: [Dominik Michna](mailto:dominik.michna@firma.seznam.cz)