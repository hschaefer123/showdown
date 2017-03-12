[sd-logo]: https://raw.githubusercontent.com/showdownjs/logo/master/dist/logo.readme.png
[releases]: https://github.com/showdownjs/showdown/releases
[atx]: http://www.aaronsw.com/2002/atx/intro
[setext]: https://en.wikipedia.org/wiki/Setext

![Showdown][sd-logo]

Showdown is a Javascript Markdown to HTML converter, based on the original works by John Gruber. It can be used client side (in the browser) or server side (with Node or io). 


# Installation

## Download tarball

You can download the latest release tarball directly from [releases][releases]

## Bower

    bower install showdown

## npm (server-side)

    npm install showdown

## CDN

You can also use one of several CDNs available: 

* rawgit CDN

        https://cdn.rawgit.com/showdownjs/showdown/<version tag>/dist/showdown.min.js

* cdnjs

        https://cdnjs.cloudflare.com/ajax/libs/showdown/<version tag>/showdown.min.js


---------

# Syntax


## Introduction

Showdown was created by John Fraser as a direct port of the original parser written by markdown's creator, John Gruber. Although Showdown has evolved since its inception, in "vanilla mode", it tries to follow the [original markdown spec][md-spec] (henceforth refereed as vanilla) as much as possible. There are, however, a few important differences, mainly due to inconsistencies in the original spec, which we addressed following the author's advice as stated in the [markdown's "official" newsletter][md-newsletter].

Showdown also support "extra" syntax not defined in the original spec as opt-in features. This means new syntax elements are not enabled by default and require users to enable them through options.

This document provides a quick description the syntax supported and the differences in output from the original markdown.pl implementation.

## Paragraphs

Paragraphs in Showdown are just **one or more lines of consecutive text** followed by one or more blank lines.

```md
On July 2, an alien mothership entered Earth's orbit and deployed several dozen 
saucer-shaped "destroyer" spacecraft, each 15 miles (24 km) wide.
    
On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, 
participated in an assault on a destroyer near the city of Los Angeles.
```

The implication of the “one or more consecutive lines of text” is that Showdown supports 
“hard-wrapped” text paragraphs. This means the following examples produce the same output:

```md
A very long line of text
```

```md
A very
long line
of text
```

If you DO want to add soft line breaks (which translate to `<br>` in HTML) to a paragraph, 
you can do so by adding to space characters to the end of the line (`  `).

## Headings

You can create a heading by adding one or more # symbols before your heading text. The number of # you use will determine the size of the heading. This is similar to [**atx style**][atx].

```md
# The largest heading (an <h1> tag)
## The second largest heading (an <h2> tag)
…
###### The 6th largest heading (an <h6> tag)
```

You can also use [**setext style**][setext] headings.

```md
This is an H1
=============
    
This is an H2
-------------
```

Showdown generates bookmarks anchors in titles automatically, by adding an id property to an heading.
This behavior can be modified or disabled with options. See the option section in the README.md file
for more information.

**Note:**    
In live preview editors, when a paragraph is followed by a list it can cause an awkward effect.

![awkward effect](http://i.imgur.com/YQ9iHTL.gif)

You can prevent this by enabling the option "smoothPreview".


## Blockquotes

You can indicate blockquotes with a >.

```md
In the words of Abraham Lincoln:
    
> Pardon my french
```

Blockquotes can have multiple paragraphs and can have other block elements inside.

```md
> A paragraph of text
>
> Another paragraph
>
> - A list
> - with items
```

## Bold and Italic

You can make text bold or italic.

    *This text will be italic*
    **This text will be bold**

Both bold and italic can use either a \* or an \_ around the text for styling. This allows you to combine both bold and italic if needed.

    **Everyone _must_ attend the meeting at 5 o'clock today.**

## Strikethrough

With the option "strikethrough" enabled, Showdown supports strikethrough elements.
The syntax is the same as GFM, that is, by adding two tilde (`~~`) characters around
a word or groups of words.

```md
a ~~strikethrough~~ element
```

## Code formatting

### Inline formats

Use single backticks (`) to format text in a special monospace format. Everything within the backticks appear as-is, with no other special formatting.

    Here's an idea: why don't we take `SuperiorProject` and turn it into `**Reasonable**Project`.

### Multiple lines

To create blocks of code you should indent it by four spaces.

```
    this is a piece
    of
    code
```

If the options `ghCodeBlocks` is activated (which is by default), you can use triple backticks (```) to format text as its own distinct block.

    Check out this neat program I wrote:

    ```
    x = 0
    x = 2 + 2
    what is x
    ```

## Lists

Showdown supports ordered (numbered) and unordered (bulleted) lists.

### Unordered lists

You can make an unordered list by preceding list items with either a *, a - or a +. Markers are interchangeable too.

```md
* Item
+ Item
- Item
```

### Ordered lists

You can make an ordered list by preceding list items with a number.

```md
1. Item 1
2. Item 2
3. Item 3
```

It’s important to note that the actual numbers you use to mark the list have no effect on the HTML output Markdown produces. So you can use the same number in all items if you wish to.

### List syntax

List markers typically start at the left margin, but may be indented by up to three spaces. 

```md
   * this is valid
   * this is too  
```

List markers must be followed by one or more spaces or a tab.

To make lists look nice, you can wrap items with hanging indents:

```md
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
```

But if you want to be lazy, you don’t have to

If one list item is separated by a blank line, Showdown will wrap the items in `<p>` tags in the HTML output.
So this input:

```md
* Bird

* Magic
* Johnson
```

Results in:

```html
<ul>
<li><p>Bird</p></li>
<li><p>Magic</p></li>
<li><p>Johnson</p></li>
</ul>
```

This behavior differs from other markdown implementations such as GFM (github) or commonmark.

### Nested blocks

List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:

```md
1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.
```

This is valid for other block elements such as blockquotes:

```md
*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.
```

or event other lists.

### Nested lists

You can create nested lists by indenting list items by **four** spaces.

```md
1.  Item 1
    1. A corollary to the above item.
    2. Yet another point to consider.
2.  Item 2
    * A corollary that does not need to be ordered.
    * This is indented four spaces
    * You might want to consider making a new list.
3.  Item 3
```

This behavior is consistent with the original spec but differs from other implementations suck as GFM or commonmark. Prior to version 1.5, you just needed to indent two spaces for it to be considered a sublist.

To nest a third (or more) sublist level, you need to indent 4 extra spaces (or 1 extra tab) for each level.

```
1.  level 1
    1.  Level 2
        *   Level 3
    2.  level 2
        1.  Level 3
1.  Level 1
```

### Nested code blocks

You can nest fenced codeblocks the same way you nest other block elements, by indenting by fours spaces or a tab:

```md
1.  Some code:

    ```js
    var foo = 'bar';
    console.log(foo);
    ```
```

To put a *indented style* code block within a list item, the code block needs to be indented twice — 8 spaces or two tabs:

```md
1.  Some code:

        var foo = 'bar';
        console.log(foo);
```

## Links

### Simple

If you wrap a valid URL or email in `<>` it will be turned into a link whose text is the link itself.

```md
link to <http://www.google.com/>

this is my email <somedude@mail.com>
```

In the case of email addreses, Showdown will also perform a bit of randomized decimal and hex entity-encoding to help obscure your address from address-harvesting spambots

With the option "simplifiedAutoLink" enabled, Showdown will turn every valid URL it finds in the text body
to links automatically for you, without the need to wrap them in `<>`.

```md
link to http://www.google.com/

this is my email somedude@mail.com
```

### Inline

You can create an inline link by wrapping link text in brackets ( `[ ]` ), and then wrapping the link in parentheses ( `( )` ).

For example, to create a hyperlink to github.com/showdownjs/showdown, with a link text that says, Get Showdown!, you'd write this in Markdown: `[Get Showdown!](https://github.com/showdownjs/showdown)`.

### Reference Style

You can also use the reference style, like this:

```
this is a [link to google][1]

some other text

[1]: www.google.com
```

## Images

Markdown uses an image syntax that is intended to resemble the syntax for links, also allowing for two styles: inline and reference.

### Inline

Inline image syntax looks like this:

    ![Alt text](/path/to/img.jpg)

    ![Alt text](/path/to/img.jpg "Optional title")

That is:

 + An exclamation mark: !;
 + followed by a set of square brackets, containing the alt attribute text for the image;
 + followed by a set of parentheses, containing the URL or path to the image, and an optional title attribute enclosed in double or single quotes.

![Image 50%](doc/showdown.png =50%x50%)

### Reference Style

Reference-style image syntax looks like this:

    ![Alt text][id]

Where “id” is the name of a defined image reference. Image references are defined using syntax identical to link references:

    [id]: url/to/image  "Optional title attribute"

### Image dimensions

When the option `parseImgDimension`is activated, you can also define the image dimensions, like this:

    ![Alt text](/path/to/img.jpg =250x250 "Optional title")

## Tables

Tables aren't part of the core Markdown spec, but they are part of GFM and Showdown supports them by turning on the option `tables`.

Colons can be used to align columns.

In the new version, the outer pipes (`|`) are optional, matching GFM spec. 

You also don't need to make the raw Markdown line up prettily.

You can also use other markdown syntax inside them.

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |
```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |

## Escaping markdown entities

Showdown allows you to use backslash (`\`) escapes to generate literal characters which would otherwise have special meaning in markdown’s syntax. For example, if you wanted to surround a word with literal underscores (instead of an HTML `<em>` tag), you can use backslashes before the unserscores, like this:

```md
\_literal underscores\_
```

Showdown provides backslash escapes for the following characters:

```
\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark
```


## Known differences and Gotchas

In most cases, Showdown's output is identical to that of Perl Markdown v1.0.2b7.  What follows is a list of all known deviations.  Please file an issue if you find more.

* **Since version 1.4.0, showdown supports the markdown="1" attribute**, but for older versions, this attribute is ignored. This means:

        <div markdown="1">
             Markdown does *not* work in here.
        </div>


* You can only nest square brackets in link titles to a
    depth of two levels:

        [[fine]](http://www.github.com/)
        [[[broken]]](http://www.github.com/)

    If you need more, you can escape them with backslashes.


* A list is **single paragraph** if it has only **1 line-break separating items** and it becomes **multi paragraph if ANY of its items is separated by 2 line-breaks**:

   ```md
    - foo
   
    - bar
    - baz
   ```
   becomes

    ```html
    <ul>
      <li><p>foo</p></li>
      <li><p>bar</p></li>
      <li><p>baz</p></li>
    </ul>
    ```

    This new ruleset is based on the comments of Markdown's author John Gruber in the [Markdown discussion list][md-newsletter].



* Markdown.pl creates empty title attributes for
    inline-style images:

        Here's an empty title on an inline-style
        ![image](http://w3.org/Icons/valid-xhtml10).

    Showdown doesn't


* With crazy input, Markdown will mistakenly put `<strong>` or `<em>` tags in URLs:

    ```html
    <a href="<*Markdown adds em tags in here*>">
    improbable URL
    </a>
    ```
    
    Showdown won't (for most cases anyway).  But still, don't do that.

[md-spec]: http://daringfireball.net/projects/markdown/
[md-newsletter]: https://pairlist6.pair.net/mailman/listinfo/markdown-discuss
[atx]: http://www.aaronsw.com/2002/atx/intro
[setext]: https://en.wikipedia.org/wiki/Setext