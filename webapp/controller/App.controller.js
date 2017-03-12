sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/model/json/JSONModel"
], function(Controller, jQuery, JSONModel) {
	"use strict";

	return Controller.extend("de.blogspot.openui5.showdown.controller.App", {
		
		onInit : function() {
			var sMarkdownSrc = "doc/readme.md",
				sPageTitle = this.getResourceBundle().getText("title"),
				sDoc = jQuery.sap.getUriParameters().get("doc");
				
			if (sDoc && sDoc.length > 0) {
				sMarkdownSrc = "doc/" + sDoc + ".md";
				sPageTitle = jQuery.sap.camelCase("-" + sDoc.trim());
			}
			
			// ui model
			var oViewModel = new JSONModel({
				pageTitle : sPageTitle,
				markdownSrc : sMarkdownSrc
			});
			this.getView().setModel(oViewModel, "ui");
		},
		
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		}
		
	});
});