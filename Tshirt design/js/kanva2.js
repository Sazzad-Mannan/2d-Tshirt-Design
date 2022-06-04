   var type=$(".d1").val();
var face= $(".d2").val();


  var width2 = 500;
      var height2 = 500;

      var stage2 = new Konva.Stage({
        container: 'container2',
        width: width2,
        height: height2
      });
      var layer2 = new Konva.Layer();
      stage2.add(layer2);



    

      

$("#txt2").on('click', function() {


 
  var textNode = new Konva.Text({
        text: 'Some text here',
        x: 50,
        y: 80,
        fontSize: 20,
        //fill:'red',
        draggable: true,
        //width: 100,
      });

      layer2.add(textNode);

      var tr = new Konva.Transformer({
        node: textNode,
         keepRatio: false,
        enabledAnchors: [
          'top-left',
          'top-right',
          //'middle-left',
          //'middle-right',
          'bottom-left',
          'bottom-right',
          //'bottom-center',
          //'top-center'
        ],
        //enabledAnchors: ['middle-left', 'middle-right'],
        // set minimum width of text
        boundBoxFunc: function (oldBox, newBox) {
          //newBox.width = Math.max(30, newBox.width);
          //return newBox;
        },
      });

      layer2.add(tr);

      layer2.draw();

      textNode.on('dblclick dbltap', () => {
        // hide text node and transformer:
        textNode.hide();
        tr.hide();
        layer2.draw();

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = textNode.absolutePosition();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
          x: stage2.container().offsetLeft + textPosition.x-10,
          y: stage2.container().offsetTop + textPosition.y,
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.getElementById("container2").appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height =
          textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
          px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
          textarea.parentNode.removeChild(textarea);
          window.removeEventListener('click', handleOutsideClick);
          textNode.show();
          tr.show();
          tr.forceUpdate();
          layer2.draw();
        }

        function setTextareaWidth(newWidth) {
          if (!newWidth) {
            // set width for placeholder
            newWidth = textNode.placeholder.length * textNode.fontSize();
          }
          // some extra fixes on different browsers
          var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
          if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
          }

          var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
          if (isEdge) {
            newWidth += 1;
          }
          textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
          // hide on enter
          // but don't hide on shift + enter
          if (e.keyCode === 13 && !e.shiftKey) {
            textNode.text(textarea.value);
            removeTextarea();
          }
          // on esc do not set value back to node
          if (e.keyCode === 27) {
            removeTextarea();
          }
        });

        textarea.addEventListener('keydown', function (e) {
          scale = textNode.getAbsoluteScale().x;
          setTextareaWidth(textNode.width() * scale);
          textarea.style.height = 'auto';
          textarea.style.height =
            textarea.scrollHeight + textNode.fontSize() + 'px';
        });

  
        function handleOutsideClick(e) {
          if (e.target !== textarea) {
            textNode.text(textarea.value);
            removeTextarea();
            //tr.hide();
            //tr.forceUpdate();
          //layer.draw();
          }
          // if click on empty area - remove all selections
      
        }
        setTimeout(() => {
          window.addEventListener('click', handleOutsideClick);
          //window.addEventListener('click', handleOutsideClick);
        });
  stage2.on('click tap', function (e) {
      if (e.target === stage2 ) {
          //textNode.hide();

          tr.hide();
         tr.forceUpdate();
          layer2.draw();
        
        }
         if (e.target !== textNode ) {
          //textNode.hide();

          tr.hide();
         tr.forceUpdate();
          layer2.draw();
        
        }

        if (e.target === textNode) {
          //textNode.hide();

          tr.show();
         tr.forceUpdate();
          layer2.draw();
        
        }
  });



      });
     layer2.draw();  
    });

// listen for the file input change event and load the image.
$("#file_input2").change(function(e){

    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.src = url;


    img.onload = function() {

      var img_width = img.width;
      var img_height = img.height;

      // calculate dimensions to get max 300px
      var max = 300;
      var ratio = (img_width > img_height ? (img_width / max) : (img_height / max))

      // now load the Konva image
      var theImg = new Konva.Image({
        image: img,
        x: 50,
        y: 30,
        name:'img',
        width: img_width/ratio,
        height: img_height/ratio,
        draggable: true
        //rotation: 20
      });
       layer2.add(theImg);

      var tr = new Konva.Transformer();
      layer2.add(tr);

      // by default select all shapes
      tr.node(theImg);

      // at this point basic demo is finished!!
      // we just have several transforming nodes
      layer2.draw();

      // add a new feature, lets add ability to draw selection rectangle
      var selectionRectangle2 = new Konva.Rect({
        fill: 'rgba(0,0,255,0.5)',
      });
      layer2.add(selectionRectangle2);

      var x1, y1, x2, y2;
      stage2.on('mousedown touchstart', (e) => {
        // do nothing if we mousedown on any shape
        if (e.target !== stage2) {
          return;
        }
        x1 = stage2.getPointerPosition().x;
        y1 = stage2.getPointerPosition().y;
        x2 = stage2.getPointerPosition().x;
        y2 = stage2.getPointerPosition().y;

        selectionRectangle2.visible(true);
        selectionRectangle2.width(0);
        selectionRectangle2.height(0);
        layer2.draw();
      });

      stage2.on('mousemove touchmove', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle2.visible()) {
          return;
        }
        x2 = stage2.getPointerPosition().x;
        y2 = stage2.getPointerPosition().y;

        selectionRectangle2.setAttrs({
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
        });
        layer2.batchDraw();
      });

      stage2.on('mouseup touchend', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle2.visible()) {
          return;
        }
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
          selectionRectangle2.visible(false);
          layer2.batchDraw();
        });

        var shapes = stage2.find('.img').toArray();
        var box = selectionRectangle2.getClientRect();
        var selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        tr.nodes(selected);
        layer2.batchDraw();
      });

      // clicks should select/deselect shapes
      stage2.on('click tap', function (e) {
        // if we are selecting with rect, do nothing
        if (selectionRectangle2.visible()) {
          return;
        }

        // if click on empty area - remove all selections
        if (e.target === stage2) {
          tr.nodes([]);
          layer2.draw();
          return;
        }

        // do nothing if clicked NOT on our rectangles
        if (!e.target.hasName('img')) {
          return;
        }

        // do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = tr.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
          // if no key pressed and the node is not selected
          // select just one
          tr.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          // if we pressed keys and node was selected
          // we need to remove it from selection:
          const nodes = tr.nodes().slice(); // use slice to have new copy of array
          // remove node from array
          nodes.splice(nodes.indexOf(e.target), 1);
          tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          // add the node into selection
          const nodes = tr.nodes().concat([e.target]);
          tr.nodes(nodes);
        }
          });

        
      layer2.draw();
    }


});


   $(".gallery2 img").on('click', function() {

$(".gallery2").hide();
var url = $(this).attr('src');

//alert(url);
  //var URL = window.webkitURL || window.URL;
    //var url = URL.createObjectURL(e.target.files[0]);
    var img2 = new Image();
    img2.src = url;


    img2.onload = function() {

      var img2_width = img2.width;
      var img2_height = img2.height;

      // calculate dimensions to get max 300px
      var max = 300;
      var ratio = (img2_width > img2_height ? (img2_width / max) : (img2_height / max))

      // now load the Konva image
      var theimg2 = new Konva.Image({
        image: img2,
        x: 50,
        y: 30,
        name:'img2',
        width: img2_width/ratio,
        height: img2_height/ratio,
        draggable: true
        //rotation: 20
      });
       layer2.add(theimg2);

      var tr = new Konva.Transformer();
      layer2.add(tr);

      // by default select all shapes
      tr.node(theimg2);

      // at this point basic demo is finished!!
      // we just have several transforming nodes
      layer2.draw();

      // add a new feature, lets add ability to draw selection rectangle
      var selectionRectangle2 = new Konva.Rect({
        fill: 'rgba(0,0,255,0.5)',
      });
      layer2.add(selectionRectangle2);

      var x1, y1, x2, y2;
      stage2.on('mousedown touchstart', (e) => {
        // do nothing if we mousedown on any shape
        if (e.target !== stage2) {
          return;
        }
        x1 = stage2.getPointerPosition().x;
        y1 = stage2.getPointerPosition().y;
        x2 = stage2.getPointerPosition().x;
        y2 = stage2.getPointerPosition().y;

        selectionRectangle2.visible(true);
        selectionRectangle2.width(0);
        selectionRectangle2.height(0);
        layer2.draw();
      });



      stage2.on('mousemove touchmove', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle2.visible()) {
          return;
        }
        x2 = stage2.getPointerPosition().x;
        y2 = stage2.getPointerPosition().y;

        selectionRectangle2.setAttrs({
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
        });
        layer2.batchDraw();
      });


      stage2.on('mouseup touchend', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle2.visible()) {
          return;
        }
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
          selectionRectangle2.visible(false);
          layer2.batchDraw();
        });

        var shapes = stage2.find('.img2').toArray();
        var box = selectionRectangle2.getClientRect();
        var selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        tr.nodes(selected);
        layer2.batchDraw();
      });

      // clicks should select/deselect shapes
      stage2.on('click tap', function (e) {
        // if we are selecting with rect, do nothing
        if (selectionRectangle2.visible()) {
          return;
        }

        // if click on empty area - remove all selections
        if (e.target === stage2) {
          tr.nodes([]);
          layer2.draw();
          return;
        }

        // do nothing if clicked NOT on our rectangles
        if (!e.target.hasName('img2')) {
          return;
        }

        // do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = tr.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
          // if no key pressed and the node is not selected
          // select just one
          tr.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          // if we pressed keys and node was selected
          // we need to remove it from selection:
          const nodes = tr.nodes().slice(); // use slice to have new copy of array
          // remove node from array
          nodes.splice(nodes.indexOf(e.target), 1);
          tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          // add the node into selection
          const nodes = tr.nodes().concat([e.target]);
          tr.nodes(nodes);
        }
          });

 
      layer2.draw();

    
    }

 });



let currentShape2;
var menuNode = document.getElementById('menu');
        document.getElementById('delete-button').addEventListener('click', () => {
          const tr = layer2.find('Transformer').toArray().find(tr => tr.nodes()[0] === currentShape2);
          tr.remove();
          currentShape2.remove();
          layer2.draw();
        });

        window.addEventListener('click', () => {
          // hide menu
          menuNode.style.display = 'none';
        });

        stage2.on('contextmenu', function (e) {
          // prevent default behavior
          e.evt.preventDefault();
          if (e.target === stage2) {
            // if we are on empty place of the stage we will do nothing
            return;
          }
          currentShape2 = e.target;
          console.log(currentShape2);
          // show menu
          menuNode.style.display = 'initial';
          var containerRect = stage2.container().getBoundingClientRect();
          menuNode.style.top =
            containerRect.top + stage2.getPointerPosition().y + 4 + 'px';
          menuNode.style.left =
            containerRect.left + stage2.getPointerPosition().x + 4 + 'px';
        });

 $("#dwn2").on('click', function() {

html2canvas(document.querySelector(".work_div1")).then(canvas => {
  canvas.id = 'someId2';
    document.querySelector(".preview2").prepend(canvas)
});
  $(".pr2").show();
    
 });

download_img2 = function(el) {
var canvas=document.getElementById("someId2");
  //document.querySelector('.preview canvas');//$('.preview').get(0);//
 
 
   var image=canvas.toDataURL("image/jpg");
  el.href = image;
};

$("#art2").on('click', function() {

$(".gallery2").toggle();
 });

function draw1Canvas(){

}
/*

  $("#art").on('click', function() {
var rect1 = new Konva.Rect({
        x: 0,
        y: 0,
        width: 100,
        height: 90,
        fill: 'red',
        name: 'rect',
        draggable: true,
      });
      layer.add(rect1);

      

     

      var tr = new Konva.Transformer();
      layer.add(tr);

      // by default select all shapes
      tr.node(rect1);

      // at this point basic demo is finished!!
      // we just have several transforming nodes
      layer.draw();

      // add a new feature, lets add ability to draw selection rectangle
      var selectionRectangle = new Konva.Rect({
        fill: 'rgba(0,0,255,0.5)',
      });
      layer.add(selectionRectangle);

      var x1, y1, x2, y2;
      stage.on('mousedown touchstart', (e) => {
        // do nothing if we mousedown on any shape
        if (e.target !== stage) {
          return;
        }
        x1 = stage.getPointerPosition().x;
        y1 = stage.getPointerPosition().y;
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
        layer.draw();
      });

      stage.on('mousemove touchmove', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
          return;
        }
        x2 = stage.getPointerPosition().x;
        y2 = stage.getPointerPosition().y;

        selectionRectangle.setAttrs({
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
        });
        layer.batchDraw();
      });

      stage.on('mouseup touchend', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
          return;
        }
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
          selectionRectangle.visible(false);
          layer.batchDraw();
        });

        var shapes = stage.find('.rect').toArray();
        var box = selectionRectangle.getClientRect();
        var selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        tr.nodes(selected);
        layer.batchDraw();
      });

      // clicks should select/deselect shapes
      stage.on('click tap', function (e) {
        // if we are selecting with rect, do nothing
        if (selectionRectangle.visible()) {
          return;
        }

        // if click on empty area - remove all selections
        if (e.target === stage) {
          tr.nodes([]);
          layer.draw();
          return;
        }

        // do nothing if clicked NOT on our rectangles
        if (!e.target.hasName('rect')) {
          return;
        }

        // do we pressed shift or ctrl?
        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = tr.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
          // if no key pressed and the node is not selected
          // select just one
          tr.nodes([e.target]);
        } else if (metaPressed && isSelected) {
          // if we pressed keys and node was selected
          // we need to remove it from selection:
          const nodes = tr.nodes().slice(); // use slice to have new copy of array
          // remove node from array
          nodes.splice(nodes.indexOf(e.target), 1);
          tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          // add the node into selection
          const nodes = tr.nodes().concat([e.target]);
          tr.nodes(nodes);
        }
          });

        layer.draw();
          });*/