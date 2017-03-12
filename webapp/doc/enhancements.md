# Enhancement Requests (in correspondence with Stefan Beck)

---
## UI5 (core)

### DatePicker day exclusion
>We always need the possibility to disallow the selection of specific date.
Inside ERP you have also maintened ordering/working that should only be allowed on ordering.
For this reason we need an aggreagtion/array with exclusion dates.

### SVG Support
>Besides icons i am recently using SVGs to have size independent vector based images.
To be able to style such SVGs using CSS they needed to be converted from referenced notation to embedded code.
I have done this using a custom image control, but this should be part of the whole framework.
The feature still makes sense for button/icons and a global cache would avoid redundantly reading/converting svg from inline to embedded.
The general jQuery implementations caching images and replacing them after rendering, but if a ui5 control rerenders it's content this
task needs to be redone as well. To speed things up, maybe a global cache would be helpful.

### Performance of sap.ui.table.Table using sap.m.Select
>Currently the select always evaluates item aggregation even if it only displaying values. For performance reason, 
the cost/time expensive aggregation stuff has to be only done if using the selection button.

---
## SAPUI5 Smart Controls (in correspondence with Alexander Schmalzhaf)

### General

>Currently the controls use CustomData logic instead of real API to control component specific behavior 
(see SmartFilterBar example and xmlview)

	customData:hasValue="true"
	
>This part needs more legacy control to avoid such implementations.

---
### Smart Field

#### Displaying descriptions for ValueHelps while internally using key
>It should be possible to use displayBehaviour to show description instead of key (Technical Name) the same way controltype selection.
Currently this feature only works for simple selection lists, but ValueHelps does not allow to display text instead of key.
This is a must have and should also be ported down to the input in general!

#### Cascading Comboboxes
>Inside transactional i often needs cascading comboxes where the result of a former selection is used as filter on the second selection.
This works currently only, if the result is part of an outer entity (form) so that the ValueHelp annotation filter can be bound as input.
For more flexibility the annotaions should support real binding to allow binding value outside the entity ex 

	<PropertyValue Property="LocalDataProperty" PropertyPath="ui>/FilterProperty" />
	
>The value help filter binding will also only work in context of a SmartForm with a binded entity.
Using valuehelps inside SmartFilterBar does not allow to bind filter against existing values!
    
#### Controlling/Hiding Filters 
>Currently all available filters will be shown inside ValueHelps. 
For some situations, i need to set one filter from outside, use it inside the ValueHelp via annotation binding,
but the user should not be able to change the filter!
This is currently not possible, but Alexander Schmalzhaf told me, that this will be available end of january!

#### ValueHelp control advanced filterbar
>It should be possible to define that the advanced filterbar opens collapsed by default!
This is the current default behavior for phone/tablet usage, but not for desktop mode

#### TreeControl
>A TreeTable value help control should be part of the library (currently done using custom implementation!).

---
### Smart FilterBar
>controlling of AdvancedFilterArea and hiding of filter (maybe aggregation hiddenFields for example) [DPDHL]

>[Example](https://sapui5.netweaver.ondemand.com/sdk/explored.html#/sample/sap.ui.comp.sample.smartfilterbar/code)
>custom filter example not working!

>custom filter is not applied to entityset and also not cleared.
Optimizations:
>* also add filter clear option to example
* implement custom filter example (described on docu) showing how to use beforeRebindTable

---
## Web IDE
###	HTML5 Deployment
>Currently it is not possible to deploy a HTML5 that is using the cache busting mechanism.
Peter Muessig forwarded this tot he Web IDE team 
eine kurze Info aus Walldorf. Die Web IDE Kollegen werden in Zukunft das Index File für den AppCachebuster erzeugen, wenn eine Anwendung als HTML5 Applikation in HCP deployed wird. 
D.h. das Feature wir gegen Ende des Jahres kommen...
Usage of CacheBuster feature to be able to control cache cycle of updated ressources

### ABAP Deployment
>Delta deployment of changed sources (performance!!!)

---
## ABAP 
### CDS (in correspondence with Ingo Bräuninger)
>Merging/Combining multiple CDS views inside one OData service without using dummy aggregations

---
## HANA
### OData create service 
>CDS view create does not return changed dataset (only errors if catched).
(Thomas Jung told me on TechEd, this should be possible, but i am not convinced and will try it out).