### Typografická škála

Každý textový styl z Typografické škály má jasně definované vlastnosti. 

Každý styl má svoje jméno a jeho případná změna se děje globálně. 

Každý řádek textu sedí svým účařím na [Baseline](grid#baseline) – s výjimkou textového stylu **Chleba**, kde sedí každý druhý řádek.

[Baseline](grid#baseline) je **horizontální část** mřížky tvořená přímkami ve vzdálenosti 8px, kdy číslo osm slouží jako virtuální jednotka určující velikosti prvků a vzdálenosti mezi nimi. Každý vědomý rozměr je jejím násobkem. 

Posazení elementů na [Baseline](grid#baseline) řeší částečně dané v. 

Případy, které textové styly nevyřeší, řešíme **vlastím odsazením** pomocí paddingu a marginu. I přes to se může stát, že ne vždy bude vše sedět dokonale na zobrazené Baseline. Důležité je, aby byl především dodržen vertikální rytmus elementů, které jsou vedle sebe.

—  

#### Textové styly

V rámci Typografické škály máme sedm textových stylů s definovanou velikostí fontu a prokladem - line-height.

Vybrané textové styly mají **odlišnou velikost** dle [layoutu](grid#layout) kvůli lepší čitelnosti. Je třeba na to dávat pozor při kontrole posazení elementů na Baseline.

V následující tabulce je uveden ke každému textovému stylu název, označení jeho třídy a velikost fontu a prokladu pro vybrané [layouty](grid#layout).


|            | Název       | Označení | Mobile 1, 2 | Tablet      | Desktop     |
| ————  | :———:   | :———: | :————: | :————: | :————: |
| Výloha     | Display     | dspl     | 48px : 56px | 48px : 56px | 48px : 56px |
| Plakát     | Poster      | pstr     | 24px : 31px | 34px : 40px | 34px : 40px |
| Titulek    | Title       | ttl      | 24px : 31px | 24px : 31px | 24px : 31px |
| Nadpis     | Headline    | hl       | 20px : 32px | 20px : 32px | 20px : 32px |
| Podnadpis  | Subheadline | sbhl     | 16px : 24px | 18px : 24px | 16px : 24px |
| Chleba     | Body        | bd       | 14px : 20px | 16px : 14px | 14px : 20px |
| Popisek    | Caption     | cptn     | 12px : 16px | 14px : 20px | 12px : 16px |

Ve zdrojovém souboru jsou velikosti textových stylů uvedeny v relativní jednotce **em**, tím pádem je důležité, abychom jednotlivé textové styly do sebe nezanořovali anebo neovlivňovali ani velikost fontu v nadřazených elementech.

Zdrojový LESS soubor:

```
/web/less/general/general.text.less
```


![Typografická škála](https://gitlab.kancelar.seznam.cz/Dominik.michna/seznam-design-system/uploads/02654c22fedab2583fffda9196a3e97b/typo.png)

—  

Stav: Working Draft  
Verze: 0.1.1  
Kontakt: [Dominik Michna](mailto:dominik.michna@firma.seznam.cz)