### Seznam Design

Základní třídy + widget pro jednodušší práci s návrhy a komunikaci s Návrháři.  
Widget psán v ES5 vanille, zatím řešeno hlavně pro moderní prohlížeče.  
Budu rád, když se ozvete s připomínkami či případnými problémy – [Dominik Michna](mailto:dominik.michna@firma.seznam.cz).

### Použití a instalace

Na dané službě si nainstalujeme Seznam Design pomocí Boweru

```
bower install --save seznam-design
```

Podrobnější nastavení Seznam Designu v aplikaci založené na IMA.js pak dále ve wiki.

[Nastavení Seznam Design v IMA.js](https://gitlab.kancelar.seznam.cz/webmasters-common/seznam-design/wikis/imajs).

#### Distribuční verze

Složka obsahuje základní i rozšíření CSS soubor, JS soubor pro widget, včetně minifikovaných verzí.  
Součástí stylopisů jsou resety, třídy pro grid, textové styly a nastavení iconfontu pro widget.
V rozšířené verzi obsauje i základní třídy a Seznamácký font TriviaSeznam.  
CSS třídy defaultně předpokládájí, že složka s fonty je na stejné úrovni jako složka s CSS.  

```
/dist/css/szd.min.css
/dist/js/szd.min.js
```

#### Mixiny

Součástí CSS stylů jsou i základní mixiny.
Některé mixiny jsou přejaty z LESS Hat, jiné vlastní.
Mixiny jsou obaleny ve vlastním namespace #szd.  
Pro použití je ale třeba importovat původní LESS soubor  
a také změnit cestu v odpovídajících souborech v nastavení.  

```
/src/less/szd.settings.less

@szd-lib-path-import: ''; 			/* cesta pro LESS soubory */
@szd-lib-path-static: '../'; 		/* cesta ke statickým souborům */
```

``` javascript
#szd.opacity(0.4); 			// příklad použití mixinu pro průhlednost
```

#### Inicializace

Jednotlivé soubory pak vložíme do HTML a inicializujeme Grid widget. 

```html
<link type="text/css" rel="stylesheet" href="/static/bower/seznam-design/dist/css/szd.min.css">
<script type="text/javascript" src="/static/bower/seznam-design/dist/js/szd.min.js"></script>
<script type="text/javascript">
	Grid.cfg();
</script>
```

#### Konfigurace widgetu

Javascriptový widget má několik konfigurovatelných možností s defaultními hodnotami.

```javascript
content: 'body', 		// selector, element reprezentující hlavní obsah 
directlyCfg: false, 	// konfigurovat a nečekat na DOMContentLoaded
directlyShrink: true,   // přímo zmenšená verze widgetu
directlyManager: true,  // zapnout zobrazení widgetu – ovládacích prvků
directlyGrid: false,    // rovnou zapnout a zobrazit mřížku
units: 24               // počet sloupců v layoutu
```


#### Layout & breakpointy

Seznam Design pracuje se čtyřmi typy layoutů: mobile 1, mobile 2, tablet a desktop.

Breakpointy jsou předdefinované, ale lze je upravit v odpovídajícím souboru v CSS a Javascriptu.  

Při práci s LESS soubory lze nastavení přetížit vlastním nastavením, 
ale prozatím není možné jednoduché přetížení pro JS widget.

``` 
/src/scripts/grid.js                 // nastavení breakpointů pro JS widget
/src/less/grid/szd.settings.less     // nastavení breakpointů pro LESS
```

Výchozí nastavení breakpointů, gutteru a celkového paddingu gridu:

``` css
/* layout – mobil 1 */
@szd-mobile1-minWidth: 20em; 			/* 320px */
@szd-mobile1-maxWidth: 25.4375em;		/* 407px */
@szd-mobile1-padding: 0.5em;				/* 8px */
@szd-mobile1-gutter: 0.5em;				/* 8px */

/* layout – mobil 2 */
@szd-mobile2-minWidth: 25.5em;			/* 408px */
@szd-mobile2-maxWidth: 37.4375em;		/* 599px */
@szd-mobile2-padding: 1em;				/* 16px */
@szd-mobile2-gutter: 0.5em;				/* 8px */

/* layout – tablet */
@szd-tablet-minWidth: 37.5em;			/* 600px */
@szd-tablet-maxWidth: 62.9375em;		/* 1007px */
@szd-tablet-padding: 1em;				/* 16px */
@szd-tablet-gutter: 0.5em; 				/* 8px */

/* layout – desktop */
@szd-desktop-minWidth: 63em; 			/* 1008px */
@szd-desktop-maxWidth: 63em;			/* 1008px */
@szd-desktop-padding: 2em;				/* 32px */
@szd-desktop-gutter: 1em; 				/* 16px */
```

---  

Stav: Working Draft  
Verze: 0.2.1  
Využívá:  npm, grunt, less, browserify  
Kontakt: [Dominik Michna](mailto:dominik.michna@firma.seznam.cz)