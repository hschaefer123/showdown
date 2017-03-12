// https://github.com/showdownjs/showdown
// https://github.com/google/code-prettify

/* global showdown */
sap.ui.define([
		"sap/ui/core/HTML",
		"jquery.sap.global",
		"sap/m/MessageToast",
		"./3rd/showdown.min",
		"./3rd/showdown-prettify.min"
	],
	function(Control, jQuery, MessageToast) {
		"use strict";

		return Control.extend("de.blogspot.openui5.showdown.control.Showdown", {

			bInitial: true,

			metadata: {
				properties: {
					/**
					 * markdown text
					 */
					markdown: {
						type: "string"
					},

					/**
					 * Relative or absolute path to URL where the markdown can be found
					 */
					src: {
						type: "sap.ui.core.URI",
						group: "Data",
						defaultValue: null
					}
				}
			},

			init: function() {
				// shortcuts
				this.sControlId = this.getId();

				// load prettify extension using skin sunburst
				jQuery.sap.includeScript("https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst");

				// init showdown converter
				this.fnConverter = new showdown.Converter({
					extensions: ["prettify"]
				});
				this.fnConverter.setFlavor("github");
				//this.fnConverter.setOption("tables", true);
				//this.fnConverter.setOption("tasklists", true);

				// set addtional options
				//console.log("defaultOptions", showdown.getDefaultOptions());
			},

			/* add nothing, just inherit the ButtonRenderer as is; 
			 ** In this case (since the renderer is not changed) you could also specify this explicitly with:  renderer:"sap.ui.commons.ButtonRenderer"
			 **(means you reuse the ButtonRenderer instead of creating a new view */
			renderer: {},

			setMarkdown: function(sMarkdown) {
				this.setProperty("markdown", sMarkdown);
				this.setContent(this.fnConverter.makeHtml(sMarkdown));
			},

			setSrc: function(sSrc) {
				var that = this;

				// store value
				this.setProperty("src", sSrc);

				// ajax call 
				$.ajax({
					url: sSrc,
					success: function(sMarkdown) {
						that.setMarkdown(sMarkdown);
					},
					error: function(xhr, ajaxOptions, thrownError) {
						MessageToast.show("Markdown '" + sSrc + "' has not been found!");
					}
				});
			}

		});
	});