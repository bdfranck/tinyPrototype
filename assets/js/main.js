"use strict";

requirejs.config({
   baseUrl: "assets/js",
   paths: {
      "text": "vendor/text",
      "jquery": "vendor/jquery",
      "knockout": 'vendor/knockout',
      "komapping": "vendor/komapping",
      "data": "../../data/prototype.data.json",
      "templates": "../../data/prototype.templates.html"
   }
});

requirejs(["jquery", "knockout", "komapping", "text!data", "text!templates", "text"], function($, ko, komapping, data, templates) {
   
   ko.mapping = komapping;

   $("body").append(templates);

   var vm;

   if ( sessionStorage ) {
      var vmData;
      if ( sessionStorage.vm ) {
         vmData = sessionStorage.vm;
      }
      else {
         vmData = data;
      }
      vm = ko.mapping.fromJSON(vmData);   
   }
   else {
      vm = ko.mapping.fromJSON(data); 
   }

   window.vm = vm;

   var updateStorage = function(e) {
      if ( sessionStorage) {
         sessionStorage.vm = ko.mapping.toJSON(vm);
      }
   }

   $(document).on("click", function(e){
      updateStorage();
   })

   window.onbeforeunload = function (e) {
      updateStorage();
   };

   vm.updateAbout = function(){ vm.menu.items()[0].label('Check Us Out'); }

   $(function(){
      ko.applyBindings(vm);
   });
}); 