;(function ($, undefined, document, window) {
    $.fn.bgparallax = function () {

        var elements = [];

        var docDim = {
            height: $(document).height(),
            width: $(document).width()
        };

        this.find('.parallaxed').each(function () {

            var obj = $(this);
            elements.push(obj);

            obj.initialCoords = {
                left: obj.css('left'),
                top: obj.css('top')
            };

            obj.css({
                height: String(docDim.height + 'px'),
                width: String(docDim.width + 'px')
            });


            // obj.fadeIn(400);\
        });

        $(document).mousemove(function (ev) {

            // distanza dal centro dello schermo alla posizione del mouse
            var x = (docDim.width / 2) - ev.pageX;
            var y = (docDim.height / 2) - ev.pageY;

            $.map(elements, function (el) {

                var stepx = (docDim.width / 2) / el.data('xrange');
                var stepy = (docDim.height / 2) / el.data('yrange');

                var movX = -el.data('xrange') + (x / stepx);
                var movY = -el.data('yrange') + (y / stepy);

                el.css({
                    left: parseInt(el.initialCoords.left, 10) + movX,
                    top: parseInt(el.initialCoords.top, 10) + movY
                });

            });
        });

        $(window).resize(function (ev) {

            docDim.height = $(document).height();
            docDim.width = $(document).width();

        });

    };
}(jQuery, undefined, document, window));