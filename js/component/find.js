define(["dojo/_base/declare","dojo/_base/lang","esri/tasks/query","esri/tasks/QueryTask","dojo/text!esricdTmpl/find/findPanel.html","dojo/text!esricdTmpl/find/findRuleAbout.html"],function(e,t,n,i,a,o){return e(null,{app:null,constructor:function(e){this.app=e,this.bindDomEvents()},startup:function(){console.log("startup");var e=baidu.template(a,this.app.config.itemInfo.itemData);$("#findDiv").html(e),this.refreshRulesDivByLayer()},bindDomEvents:function(){$("#findDiv").delegate("[node-type=removeRole]","click",$.proxy(function(e){$(e.currentTarget).parents(".well").remove()},this)),$("#findDiv").delegate("[node-type=addRole]","click",$.proxy(function(e){$("[node-type=rulesBox]").append($("[node-type=ruleItemTmpl]").children().clone())},this)),$("#findDiv").delegate("[node-type=findLayerSelect]","change",$.proxy(function(e){this.refreshRulesDivByLayer()},this)),$("#findDiv").delegate("[node-type=find]","click",$.proxy(function(e){this.executeFind()},this))},executeFind:function(){var e=new n;e.returnGeometry=!1,e.outSpatialReference=this.app.map.spatialReference,e.outFields=["*"],e.where=this.getRules();var t=$("#findDiv [node-type=findLayerSelect]").val(),a=new i(t);this.app.dataTable.showLoading(),a.execute(e).then($.proxy(function(e){this.app.dataTable.showQueryResult(e,t)},this),$.proxy(function(e){this.app.dataTable.showError(e)},this))},refreshRulesDivByLayer:function(){var e=$("#findDiv [node-type=findLayerSelect]").val();console.log("layer changed:",e),$.ajax({data:{f:"json"},type:"GET",url:e,dataType:"jsonp"}).then(function(e){var t=baidu.template(o,e);$("#findDiv [node-type=rulesAboutDiv]").html(t)})},getRules:function(){var e=$("#findDiv [node-type=findRulesUnion]").val(),t="",n=$("#findDiv [node-type=rulesBox] .well");return n.each(function(i,a){var o=$(a).find("[node-type=ruleItemField]").val(),l=$(a).find("[node-type=ruleItemJudge]").val(),d=$(a).find("[node-type=ruleItemValue]").val(),r=o+""+l+d;"like"==l&&(r=o+" like '%"+d+"%'"),t+=r,i<n.length-1&&(t+=" "+e+" ")}),t},test:""})});