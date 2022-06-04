$( document ).ready(function() {

 
 


$('.demo').minicolors();
$(".demo").on('change', function() {
var color=this.value;

var type=$(".d1").val();
var face= $(".d2").val();

     if(type=="t"){ 
   $(".img0").css("background-color", color);
   $(".img1").css("background-color", color);


 }
  else {
    $(".img2").css("background-color", color);
    $(".img3").css("background-color", color);
  }
});
});

function changed(){

  var type=$(".d1").val();
      var face= $(".d2").val();
var id1=document.getElementById("someId"); 
var id2=document.getElementById("someId2"); 
var id3=document.getElementById("someId3"); 
var id4=document.getElementById("someId4"); 


 
      //alert(type);

      if(type=="t"){ if(face=="0"){
    $(".work_div").show();
    $(".work_div1").hide();
    $(".work_div2").hide();
    $(".work_div3").hide();
     $("#txt").show();
    $("#txt2").hide();
    $("#txt3").hide();
    $("#txt4").hide();
    $("#up").show();
    $("#up2").hide();
    $("#up3").hide();
    $("#up4").hide();
    $("#dwn").show();
    $("#dwn2").hide();
    $("#dwn3").hide();
    $("#dwn4").hide();
    $(".preview").show();
    $(".preview2").hide();
    $(".preview3").hide();
    $(".preview4").hide();
      $("#art").show();
    $("#art2").hide();
    $("#art3").hide();
    $("#art4").hide();
     $(".gallery").hide();
    $(".gallery2").hide();
    $(".gallery3").hide();
    $(".gallery4").hide();

    if(id1){
       $(".pr1").show();
     
  }else{
    $(".pr1").hide();
  }
    $(".pr2").hide();
    $(".pr3").hide();
    $(".pr4").hide();
   
  
  }else{
      $(".work_div").hide();
    $(".work_div1").show();
    $(".work_div2").hide();
    $(".work_div3").hide();
     $("#txt2").show();
    $("#txt").hide();
    $("#txt3").hide();
    $("#txt4").hide();
     $("#up2").show();
    $("#up").hide();
    $("#up3").hide();
    $("#up4").hide();
        $("#dwn2").show();
    $("#dwn").hide();
    $("#dwn3").hide();
    $("#dwn4").hide();
     $(".preview2").show();
    $(".preview").hide();
    $(".preview3").hide();
    $(".preview4").hide();
     $("#art2").show();
    $("#art").hide();
    $("#art3").hide();
    $("#art4").hide();
     $(".gallery2").hide();
    $(".gallery").hide();
    $(".gallery3").hide();
    $(".gallery4").hide();

      if(id2){
       $(".pr2").show();
     
  }else{
    $(".pr2").hide();
  }
    
    $(".pr1").hide();
    $(".pr3").hide();
    $(".pr4").hide();
  } }
  else {
     if(face=="0"){
      $(".work_div").hide();
    $(".work_div1").hide();
    $(".work_div2").show();
    $(".work_div3").hide();
     $("#txt3").show();
    $("#txt").hide();
    $("#txt2").hide();
    $("#txt4").hide();
    $("#up3").show();
    $("#up").hide();
    $("#up2").hide();
    $("#up4").hide();
        $("#dwn3").show();
    $("#dwn2").hide();
    $("#dwn").hide();
    $("#dwn4").hide();
     $(".preview3").show();
    $(".preview2").hide();
    $(".preview").hide();
    $(".preview4").hide();
     $("#art3").show();
    $("#art2").hide();
    $("#art").hide();
    $("#art4").hide();
     $(".gallery3").hide();
    $(".gallery2").hide();
    $(".gallery").hide();
    $(".gallery4").hide();
      if(id3){
       $(".pr3").show();
     
  }else{
    $(".pr3").hide();
  }
   
    $(".pr2").hide();
    $(".pr1").hide();
    $(".pr4").hide();

  }else{
      $(".work_div").hide();
    $(".work_div1").hide();
    $(".work_div2").hide();
    $(".work_div3").show();
     $("#txt4").show();
    $("#txt2").hide();
    $("#txt3").hide();
    $("#txt").hide();
    $("#up4").show();
    $("#up").hide();
    $("#up3").hide();
    $("#up2").hide();
        $("#dwn4").show();
    $("#dwn2").hide();
    $("#dwn3").hide();
    $("#dwn").hide();
     $(".preview4").show();
    $(".preview2").hide();
    $(".preview3").hide();
    $(".preview").hide();
     $("#art4").show();
    $("#art2").hide();
    $("#art3").hide();
    $("#art").hide();
     $(".gallery4").hide();
    $(".gallery2").hide();
    $(".gallery3").hide();
    $(".gallery").hide();
      if(id4){
       $(".pr4").show();
     
  }else{
    $(".pr4").hide();
  }
    
    $(".pr2").hide();
    $(".pr3").hide();
    $(".pr1").hide();
  } 
  }


}

function addText(){
  $(".print").append(" <div class='resizable'>"+
  "<div class='resizers'>"+
    "<div class='resizer top-left'></div>"+
    "<div class='resizer top-right'></div>"+
    "<div class='resizer bottom-left'></div>"+
    "<div class='resizer bottom-right'></div></div></div>");
}









/*function PrintDiv(div)
{
    html2canvas((div), {
        onrendered: function(canvas) {
            var myImage = canvas.toDataURL();
            downloadURI(myImage, "MaSimulation.png");
      }
    });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();   
    //after creating link you should delete dynamic link
    //clearDynamicLink(link); 
}
*/
