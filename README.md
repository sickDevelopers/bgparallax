FullParallax 
=======

## Parallax based on mouse movement

FullParallax is a small jQuery plugin to implement a simple parallax effect of images based on mouse movement. It loads images and set them on background only if javascript is available, so it does not affect web spiders for page load time. 

Tested only on Google Chrome.


## How it works

Download and import the plugin as usual. Remember to import the CSS. If you need 
help on how to import a plugin look at the example given with the download.

### Options

You can pass some options during initialization

* frame_per_second : the plugin checks for mouse movement but is set to update screen only on a defined interval. This is for best performance even on old machines (and IE). A value of 15 is a good compromise. 

### HTML Options

Here are some options you can inject in the HTML via data attributes

* src : (mandatory) data source of the image you want to show 

* x-range : it's the maximum horizontal movement allowed to the element

* y-range : the maximum vertical movement allowed

* size : (in % or px) of the element. Use CSS syntax here (ex: width:100%;height:200px; [order MATTERS]).  

## Contacts

You can contact me for any information at oscar.chinellato (at) sickdevelopers (dot) com, or @sick_oscar

## License

Released under MIT License by SickDevelopers.

-----

