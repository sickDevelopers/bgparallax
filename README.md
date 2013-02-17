=======
# BGParallax
=======

## Background Parallax effect made easy

BGParallax is a small jQuery plugin to implement a simple parallax effect on 
the background of a web page. The effect can involve any HTML element which 
is displayed as a block on the page.  


## How it works

Download and import the plugin as usual. Remember to import the CSS. If you need 
help on how to import a plugin look at the example given with the download.

### HTML

The HTML needed is just the following

	<div id="bgp-container">
		<div class="parallaxed" data-xrange="10" data-yrange="10" id="layer1">
			<!-- content. May be whatever you want -->
		</div>
		<div class="parallaxed" data-xrange="20" data-yrange="5" id="layer1">
			<!-- content. May be whatever you want -->
		</div>
		<!-- insert as many layers as you need -->
	</div>

The id bgp-container can be changed as you wish. The inner divs MUST have the parallaxed class

### Options

Here are some options you can inject in the HTML via the data attributes

* xrange : it's the maximum horizontal movement allowed to the element

* yrange : I'll let you guess

-----

