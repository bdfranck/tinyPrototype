"use strict";

requirejs.config({
   baseUrl: "assets/js",
   paths: {
      "text": "vendor/text",
      "jquery": "vendor/jquery",
      "knockout": "vendor/knockout",
      "komapping": "vendor/komapping",
      "data": "../../data/prototype.data.json",
      "templates": "../../data/prototype.templates.html"
   }
});

requirejs(["jquery", "knockout", "komapping", "text!data", "text!templates", "text"], function($, ko, komapping, jsonData, templates) {
   
   ko.mapping = komapping;

   $("body").append(templates);

   var vm;

   if ( sessionStorage ) {
      var vmData;
      if ( sessionStorage.vm ) {
         vmData = sessionStorage.vm;
      }
      else {
         vmData = jsonData;
      }
      vm = ko.mapping.fromJSON(vmData);   
   }
   else {
      vm = ko.mapping.fromJSON(jsonData); 
   }

   window.vm = vm;

   var updateStorage = function() {
      if ( sessionStorage) {
         sessionStorage.vm = ko.mapping.toJSON(vm);
      }
   };

   $(document).on("click", function(){
      updateStorage();
   });

   window.onbeforeunload = function () {
      updateStorage();
   };

   vm.updateAbout = function(){ vm.data.menu.items()[0].label("All About Us"); };

   $(function(){
      ko.applyBindings(vm);
   });

   window.console.log("test");
}); 