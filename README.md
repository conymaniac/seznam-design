### Seznam Design Systém

Základní třídy + widget pro jednodušší práci s návrhy a komunikaci s Návrháři.  
Widget psán v čistém Javascriptu, zatím řešeno pouze pro moderní prohlížeče.  
Za připomínky či případné problémy budu rád – [Dominik Michna](mailto:dominik.michna@firma.seznam.cz).

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
<link type="text/css" rel="stylesheet" href="/static/css/style.min.css">
<script type="text/javascript" src="/static/js/grid.min.js"></script>
<script type="text/javascript">
	Grid.cfg();
</script>
```

#### Demo

Defaultně složka obsahuje jednoduché demo s použitím Seznam Design Systému.  
Lze možné spusit pomocí jednoduché express serveru.  
Pomocí Gruntu lze vybuildit jednoduché nebo pokročilé demo.

```
grunt demo-base         // jednoduché demo
grunt demo-extended     // pokročilé demo
npm start               // start express serveru
```

#### Další informace

Stav: Working Draft  
Verze: 0.1.1  
Kontakt: [Dominik Michna](mailto:dominik.michna@firma.seznam.cz)


