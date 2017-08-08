!function(e){function t(t){var n=t||window.event,i=[].slice.call(arguments,1),l=0,s=0,o=0;return t=e.event.fix(n),t.type="mousewheel",n.wheelDelta&&(l=n.wheelDelta/120),n.detail&&(l=-n.detail/3),o=l,void 0!==n.axis&&n.axis===n.HORIZONTAL_AXIS&&(o=0,s=-1*l),void 0!==n.wheelDeltaY&&(o=n.wheelDeltaY/120),void 0!==n.wheelDeltaX&&(s=-1*n.wheelDeltaX/120),i.unshift(t,l,s,o),(e.event.dispatch||e.event.handle).apply(this,i)}var n=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var i=n.length;i;)e.event.fixHooks[n[--i]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=n.length;e;)this.addEventListener(n[--e],t,!1);else this.onmousewheel=t},teardown:function(){if(this.removeEventListener)for(var e=n.length;e;)this.removeEventListener(n[--e],t,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(jQuery);

!function(e){function t(t){if("string"==typeof t.data){var a=t.handler,s=t.data.toLowerCase().split(" "),r=["text","password","number","email","url","range","date","month","week","time","datetime","datetime-local","search","color"];t.handler=function(t){if(this===t.target||!(/textarea|select/i.test(t.target.nodeName)||e.inArray(t.target.type,r)>-1)){var i="keypress"!==t.type&&e.hotkeys.specialKeys[t.which],f=String.fromCharCode(t.which).toLowerCase(),o="",l={};t.altKey&&"alt"!==i&&(o+="alt+"),t.ctrlKey&&"ctrl"!==i&&(o+="ctrl+"),t.metaKey&&!t.ctrlKey&&"meta"!==i&&(o+="meta+"),t.shiftKey&&"shift"!==i&&(o+="shift+"),i?l[o+i]=!0:(l[o+f]=!0,l[o+e.hotkeys.shiftNums[f]]=!0,"shift+"===o&&(l[e.hotkeys.shiftNums[f]]=!0));for(var n=0,h=s.length;h>n;n++)if(l[s[n]])return a.apply(this,arguments)}}}}e.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",191:"/",224:"meta"},shiftNums:{"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"}},e.each(["keydown","keyup","keypress"],function(){e.event.special[this]={add:t}})}(jQuery);

!function(t){t.simpleEllipsis=function(e,t){return e.length<t?e:e.substring(0,t)+"..."};var n=!!("ontouchstart"in window),a=function(){var e,n=t(this),a=n.data("options")||n.data("settings");for(e in a)n.parent().removeClass(e)};t.fn.extend({caret:function(t,n){var a,i,s,l=this[0],c=this.val();if(l){if("undefined"==typeof t){if(l.selectionStart)t=l.selectionStart,n=l.selectionEnd;else if(document.selection)return this.focus(),a=document.selection.createRange(),null==a?{start:0,end:e.value.length,length:0}:(i=l.createTextRange(),s=i.duplicate(),i.moveToBookmark(a.getBookmark()),s.setEndPoint("EndToStart",i),{start:s.text.length-(s.text.split("\n").length+1)+2,end:s.text.length+a.text.length-(s.text.split("\n").length+1)+2,length:a.text.length,text:a.text})}else"number"!=typeof n&&(n=-1),("number"!=typeof t||0>t)&&(t=0),n>c.length&&(n=c.length),n=Math.max(t,n),t=Math.min(t,n),l.focus(),l.selectionStart?(l.selectionStart=t,l.selectionEnd=n):document.selection&&(a=l.createTextRange(),a.collapse(!0),a.moveStart("character",t),a.moveEnd("character",n-t),a.select());return{start:t,end:n}}},transformCheckbox:function(e){var n={base:"image",checked:"",unchecked:"",disabledChecked:"",disabledUnchecked:"",tristateHalfChecked:"",changeHandler:function(){},trigger:"self",tristate:0},i=t.extend(n,e),s={setImage:function(){var e,n=t(this),i=n.data("settings");e=n.is(":disabled")?n.is(":checked")?"disabledChecked":"disabledUnchecked":n.hasClass("half-checked")?"tristateHalfChecked":n.is(":checked")?"checked":"unchecked","image"==i.base?n.next().attr("src",i[e]):(a.call(this),n.parent().addClass(e))},setProp:function(e,n,a){t(e).prop(n,a).change(),s.setImage.call(e),"checked"!=n||t(e).data("settings").type||t("[name='"+t(e).attr("name")+"']").each(function(){s.setImage.call(this)})},uncheck:function(){s.setProp(this,"checked",0)},check:function(){s.setProp(this,"checked",1)},disable:function(){s.setProp(this,"disabled",1)},enable:function(){s.setProp(this,"disabled",0)},imageClick:function(){var e=t(this),n=e.data("settings");e.is(":disabled")||(e.is(":checked")&&n.type?(s.uncheck.call(e),i.changeHandler.call(e,1)):(s.check.call(e),i.changeHandler.call(e,0)),s.handleTriState.call(e))},handleTriState:function(){{var e=t(this),n=e.data("settings"),a=e.parent(),i=a.find("ul");a.closest("li")}n.tristate&&(e.hasClass("half-checked")||e.is(":checked")?(e.removeClass("half-checked"),s.check.call(e),i.find("input:checkbox").removeClass("half-checked").each(s.check)):e.not(":checked")&&(e.removeClass("half-checked"),i.find("input:checkbox").each(s.uncheck)),i.find("input:checkbox").each(s.setImage),e.parent().parent().parent().is("li")&&s.handleTriStateLevel.call(e.parent().parent().parent()),e.trigger("transformCheckbox.tristate"))},handleTriStateLevel:function(e){var n=t(this),a=n.find("input:checkbox").first(),i=n.find("ul"),l=i.find("input:checkbox"),c=l.filter(":checked");(e!==!1||l.length)&&(a.removeClass("half-checked"),l.length==c.length?s.check.call(a):c.length?a.addClass("half-checked"):s.uncheck.call(a),s.setImage.call(a),e!==!1&&n.parent().parent().is("li")&&s.handleTriStateLevel.call(n.parent().parent()))}};return this.each(function(){if("string"==typeof e)s[e].call(this);else{var n=t(this);if(!n.data("tf.init"))if(n.data("tf.init",1).data("settings",i),i.type=n.is("[type=checkbox]"),n.hide(),"image"==i.base?n.after("<img />"):n.wrap("<span class='trans-element-"+(i.type?"checkbox":"radio")+"' />"),s.setImage.call(this),e.tristate&&s.handleTriStateLevel.call(n.parent(),!1),"image"==i.base)switch(i.trigger){case"parent":n.parent().click(t.proxy(s.imageClick,this));break;case"self":n.next("img").click(t.proxy(s.imageClick,this))}else switch(i.trigger){case"parent":n.parent().parent().click(t.proxy(s.imageClick,this));break;case"self":n.parent().click(t.proxy(s.imageClick,this))}}})},transformSelect:function(e){var a={dropDownClass:"transformSelect",showFirstItemInDrop:1,acceptManualInput:0,useManualInputAsFilter:0,subTemplate:function(e){return"select-multiple"==t(this)[0].type?"<span><input type='checkbox' value='"+t(e).val()+"' "+(t(e).is(":selected")?"checked='checked'":"")+" name='"+t(this).attr("name").replace("_backup","")+"' />"+t(e).text()+"</span>":"<span>"+t(e).text()+"</span>"},initValue:function(){return t(this).text()},valueTemplate:function(){return t(this).text()},ellipsisLength:null,addDropdownToBody:0},i=t(this).data("settings"),s={init:function(){var e=this,a=t(e),l=0,c=a.find("option:first");a.hide(),a.find("option:selected").length&&"select-multiple"!=e.type&&(c=a.find("option:selected"),l=a.find("option").index(c));var o="<ul class='"+i.dropDownClass+" trans-element'><li>";if(i.acceptManualInput&&!n){var r=a.data("value")||i.initValue.call(c);o+="<ins></ins><input type='text' name='"+a.attr("name").replace("_backup","")+"' value='"+r+"' />",a.attr("name").indexOf("_backup")<0&&a.attr("name",a.attr("name")+"_backup")}else o+=i.ellipsisLength?'<span title="'+c.text()+'">'+t.simpleEllipsis(i.initValue.call(c),i.ellipsisLength)+"</span>":"<span>"+i.initValue.call(c)+"</span>";o+="<ul style='display: none;'>",a.children().each(function(t){(t||i.showFirstItemInDrop)&&(o+=s["OPTION"==this.tagName?"getLIOptionChild":"getLIOptgroupChildren"].call(e,this))}),o+="</ul></li></ul>";var d=t(o),h=d.find("ul li:not(.group)"),p=d.find("input");a.after(d),a.is(":disabled")&&s.disabled.call(e,1),"select-multiple"!=e.type||n?(h.click(s.selectNewValue),p.click(s.openDrop).keydown(function(e){t.inArray(e.which,[9,13])>=0&&s.closeAllDropdowns()}).prev("ins").click(s.openDrop)):(a.attr("name")&&-1==a.attr("name").indexOf("_backup")&&a.attr("name",a.attr("name")+"_backup"),h.click(s.selectCheckbox)),i.useManualInputAsFilter&&p.keyup(s.filterByInput),d.find("span:first").click(s.openDrop),d.find("ul:first").data("trans-element",d).addClass("transformSelectDropdown"),d.data("trans-element-drop",d.find("ul:first")),i.addDropdownToBody&&d.find("ul:first").appendTo("body"),t("html").unbind("click.transformSelect").bind("click.transformSelect",s.closeDropDowns),t.hotkeys&&!t("body").data("trans-element-select")&&(t("body").data("trans-element-select",1),t(document).bind("keydown","up",function(){var e,n,a=t(".trans-focused");return!a.length||a.find("input").length?0:(e=a.prevAll("select").first(),n=e[0].selectedIndex-1,0>n&&(n=e.find("option").length-1),s.selectIndex.call(e,n),0)}).bind("keydown","down",function(){var e,n,a=t(".trans-focused");return!a.length||a.find("input").length?0:(e=a.prevAll("select").first(),n=e[0].selectedIndex+1,n>e.find("option").length-1&&(n=0),s.selectIndex.call(e,n),0)})),n&&(i.showFirstItemInDrop||a.find("option:first").remove(),a.appendTo(d.find("li:first")).show().css({opacity:0,position:"absolute",width:"100%",height:"100%",left:0,top:0}),d.find("li:first").css({position:"relative"}),a.change(s.mobileChange))},getUL:function(){return n?t(this).closest("ul"):t(this).next(".trans-element:first")},getSelect:function(e){return n?e.find("select"):e.prevAll("select:first")},disabled:function(e){s.getUL.call(this)[e?"addClass":"removeClass"]("disabled")},repaint:function(){var e=s.getUL.call(this);e.data("trans-element-drop").remove(),e.remove(),s.init.call(this)},filterByInput:function(){var e=t(this),n=e.val().toLowerCase(),a=e.closest("ul"),i=a.data("trans-element-drop"),s=i.find("li");n?s.each(function(){var e=t(this);e.data("settings").alwaysvisible?e.show():e[e.text().toLowerCase().indexOf(n)<0?"hide":"show"]()}):s.show()},selectIndex:function(e){var n=t(this),a=s.getUL.call(this),i=a.data("trans-element-drop");try{return i.find("li").filter(function(){}).first().trigger("click"),t(this).text()==n.find("option").eq(e).text()}catch(l){}},selectValue:function(e){{var n=t(this),a=s.getUL.call(this);a.data("trans-element-drop")}s.selectIndex.call(this,n.find(e?"option[value='"+e+"']":"option:not([value])").index())},getLIOptionChild:function(e){var n=t(e).attr("data-settings")||"",a=(t(e).attr("class")||"")+(t(e).is(":selected")?" selected":"");return"<li data-settings='"+n+"' class='"+a+"'>"+i.subTemplate.call(this,t(e))+"</li>"},getLIOptgroupChildren:function(e){var n=this,a="<li class='group'><span>"+t(e).attr("label")+"</span><ul>";return t(e).find("option").each(function(){a+=s.getLIOptionChild.call(n,this)}),a+="</ul></li>"},getLIIndex:function(e){var t=0,n=e.closest(".group");return t=n.length?e.closest(".transformSelectDropdown").find("li").index(e)-n.prevAll(".group").length-1:e.parent().find("li").index(e)-e.prevAll(".group").length,i.showFirstItemInDrop||(t+=1),t},selectNewValue:function(){var e=t(this),n=e.closest(".transformSelectDropdown"),a=n.data("trans-element"),l=s.getSelect(a),c=s.getLIIndex(e);l[0].selectedIndex=c,a.find("input").length?a.find("input").val(i.valueTemplate.call(e)):(sel=l.find("option:selected"),a.find("span:first").html(i.ellipsisLength?t.simpleEllipsis(i.valueTemplate.call(sel),i.ellipsisLength):i.valueTemplate.call(sel))),n.find(".selected").removeClass("selected"),e.addClass("selected"),s.closeAllDropdowns(),l.trigger("change"),t(".trans-element").removeClass("trans-focused"),a.addClass("trans-focused"),t.fn.validate&&l.closest("form").length&&l.valid()},mobileChange:function(){var e=t(this),n=s.getUL.call(this),a=e.find("option:selected");"select-multiple"!=this.type&&n.find("span:first").html(i.ellipsisLength?t.simpleEllipsis(i.valueTemplate.call(a),i.ellipsisLength):i.valueTemplate.call(a))},selectCheckbox:function(e){var n,a=t(this),i=a.closest(".transformSelectDropdown"),l=i.data("trans-element"),c=s.getSelect(l),o=a.closest("li"),r=o.find(":checkbox");t(e.target).is("li")&&(o=a),n=s.getLIIndex(o),t(e.target).is(":checkbox")||r.prop("checked",!r.is(":checked")),c.find("option").eq(n).prop("selected",r.is(":checked")),r.data("tfc.init")&&r.transformCheckbox("setImage"),t(e.target).is(":checkbox")||r.change(),c.change()},openDrop:function(){var e=t(this).closest(".trans-element"),n=e.data("trans-element-drop"),a=t(this).parent();return e.hasClass("disabled")?0:(a.hasClass("open")&&!t(this).is("input")?s.closeAllDropdowns():(a.css({"z-index":1200}).addClass("open"),n.css({"z-index":1200}).show(),s.hideAllOtherDropdowns.call(this)),void(i.addDropdownToBody&&n.css({position:"absolute",top:a.offset().top+a.outerHeight(),left:a.offset().left})))},hideAllOtherDropdowns:function(){var e=t("body").find("*"),n=e.index(t(this).parent());t("body").find("ul.trans-element").each(function(){var a=t(this).data("trans-element-drop");n-1!=e.index(t(this))&&a.hide().css("z-index",0).parent().css("z-index",0).removeClass("open")})},closeDropDowns:function(e){t(e.target).closest(".trans-element").length||s.closeAllDropdowns()},closeAllDropdowns:function(){t("ul.trans-element").each(function(){t(this).data("trans-element-drop").hide(),t(this).find("li:first").removeClass("open")}).removeClass("trans-focused")}};return"string"==typeof e?(s[e].apply(this,Array.prototype.slice.call(arguments,1)),this):this.each(function(){var n=t(this);n.data("tfs.init")||(i=t.extend(a,e),n.data("settings",i),n.data("tfs.init",1),s.init.call(this))})},transformFile:function(e){var n={file:function(e,n){return this.each(function(){var a,i=t(this),s=t("<div></div>").appendTo(i).css({position:"absolute",overflow:"hidden","-moz-opacity":"0",filter:"alpha(opacity: 0)",opacity:"0",zoom:"1",width:i.outerWidth()+"px",height:i.outerHeight()+"px","z-index":1}),l=0,c=function(){var t=a=s.html("<input "+(window.FormData?"multiple ":"")+'type="file" style="border:none; position:absolute">').find("input");l=l||t.width(),t.change(function(){t.unbind("change"),c(),e(t[0])})},o=function(e){s.offset(i.offset()),e&&(a.offset({left:e.pageX-l+25,top:e.pageY-10}),r())},r=function(){i.addClass(n+"MouseOver")},d=function(){i.removeClass(n+"MouseOver")};c(),i.mouseover(o),i.mousemove(o),i.mouseout(d),o()})}};return this.each(function(){if(!t(this).data("tff.init")){t(this).data("tff.init",1);var a=t(this).hide(),i=null,s=a.attr("name"),l=e&&e.cssClass?e.cssClass:"customInput",c=e&&e.label?e.label:"Browse...";a.attr("id")||a.attr("id","custom_input_file_"+(new Date).getTime()+Math.floor(1e5*Math.random())),i=a.attr("id"),a.after('<span id="'+i+'_custom_input" class="'+l+'"><span class="inputPath" id="'+i+'_custom_input_path">&nbsp;</span><span class="inputButton">'+c+"</span></span>"),n.file.call(t("#"+i+"_custom_input"),function(e){e.id=i,e.name=s,t("#"+i).replaceWith(e).removeAttr("style").hide(),t("#"+i+"_custom_input_path").html(t("#"+i).val().replace(/\\/g,"/").replace(/.*\//,""))},l)}})}}),t.fn.transformRadio=t.fn.transformCheckbox}(jQuery);

!function(){jQuery(".wpcf7")[0]&&(jQuery(".wpcf7 input:radio").transformRadio({base:"class"}),jQuery(".wpcf7 input:checkbox").transformCheckbox({base:"class"}),jQuery(".wpcf7 select").transformSelect(),jQuery(".wpcf7 input:file").transformFile({label:" "}))}(jQuery);