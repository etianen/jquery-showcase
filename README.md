jQuery Showcase
===============

A snazzy little showcase widget, built using jQuery.


Getting started
---------------

Download the code, and copy the `src/showcase` folder into your web root.

Add the following code to the `&lt;head&gt;` of your document:

```html
<link rel="stylesheet" href="showcase/showcase.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script src="showcase/jquery.showcase.js"></script>
```

You can then place the showcase markup anywhere in your page.

```html
<section id="showcase" style="display: none">
    <ul>
        <li>
            <article>
                <hgroup>
                    <h1>News</h1>
                    <h2>Slide 1 title goes here</h2>
                </hgroup>
                <img src="demo/slide1.jpg" width=640 height=400 alt="Slide 1">
            </article>
        </li>
        <li>
            <article>
                <hgroup>
                    <h1>News</h1>
                    <h2>Slide 2 title goes here</h2>
                </hgroup>
                <img src="demo/slide2.jpg" width=640 height=400 alt="Slide 2">
            </article>
        </li>
        <li>
            <article>
                <hgroup>
                    <h1>News</h1>
                    <h2>Slide 3 title goes here</h2>
                </hgroup>
                <img src="demo/slide3.jpg" width=640 height=400 alt="Slide 3">
            </article>
        </li>
        <li>
            <article>
                <hgroup>
                    <h1>News</h1>
                    <h2>Slide 4 title goes here</h2>
                </hgroup>
                <img src="demo/slide4.jpg" width=640 height=480 alt="Slide 4">
            </article>
        </li>
    </ul>
</section>

<script>
    $("#showcase").showcase();
</script>
```


What if I want to use XHTML?
----------------------------

Then you're behind the times! Don't worry, there's still an alternative embed code you can use.

```python
<div id="showcase" style="display: none">
    <ul>
        <li>
            <div>
                <div class="title">News</div>
                <div class="subtitle">Slide 1 title goes here</div>
            </div>
            <img src="demo/slide1.jpg" width="640" height="400" alt="Slide 1"/>
        </li>
        <li>
            <div>
                <div class="title">News</div>
                <div class="subtitle">Slide 1 title goes here</div>
            </div>
            <img src="demo/slide2.jpg" width="640" height="400" alt="Slide 2"/>
        </li>
        <li>
            <div>
                <div class="title">News</div>
                <div class="subtitle">Slide 1 title goes here</div>
            </div>
            <img src="demo/slide3.jpg" width="640" height="400" alt="Slide 3"/>
        </li>
        <li>
            <div>
                <div class="title">News</div>
                <div class="subtitle">Slide 1 title goes here</div>
            </div>
            <img src="demo/slide4.jpg" width="640" height="480" alt="Slide 4"/>
        </li>
    </ul>
</div>

<script type="text/javascript">
    $("#showcase").showcase({
        headerSelector: "> div",
        titleSelector: "> div > div.title",
        subtitleSelector: "> div > div.subtitle",
        imageSelector: "> img"
    });
</script>
```


Configuration options
---------------------

You can control the behaviour of the plugin with the following options.

*   **autoPlay:** If true, then the slides will start playing when the page have loaded (default `true`).
*   **duration:** The time to spend on each slide before changing to the next (default `5000`).

You can control how the plugin interprets the markup of the embed code using the following options.

*   **slideSelector:** `"ul > li"`
*   **headerSelector:** `"> article > hgroup"`
*   **titleSelector:** `"> article > hgroup > h1"`
*   **subTitleSelector:** `"> article > hgroup > h2"`
*   **imageSelector:** `"> article > img"`

The two example embed codes above already contain the correct markup selectors, so these options are really only for advanced useage.


More information
----------------

This project was developed by Dave Hall. You can get the code from the
[jquery-showcase project site][].

[jquery-showcase project site]: http://github.com/etianen/jquery-showcase
    "jquery-showcase on GitHub"
    
Dave Hall is a freelance web developer, based in Cambridge, UK. You can usually
find him on the Internet in a number of different places:

*   [Website](http://www.etianen.com/ "Dave Hall's homepage")
*   [Blog](http://www.etianen.com/blog/developers/ "Dave Hall's blog")
*   [Twitter](http://twitter.com/etianen "Dave Hall on Twitter")
*   [Google Profile](http://www.google.com/profiles/david.etianen "Dave Hall's Google profile")