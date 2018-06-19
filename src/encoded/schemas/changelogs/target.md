## Changelog for target.json

### Schema version 8

* Move status property to standard_status mixin.
* Added "targeted_genes" property for the list of genes targeted by assay or antibody associated with the target.
* Added calculated property "computed_name" to reflect gene name (and name changes) in target name.
* Added "modification" property to facilitate automatic name calculation.
* The "label" property is modified to clarify that it is a DCC defined only, human friendly, free textual target name. Target prefers "label" to "computed_name".

### Schema version 7

* Remove *histone modification* from investigated_as enum.

### Schema version 6

* Remove *proposed* from status enum.

### Schema version 5

* *aliases* now must be properly namespaced according lab.name:alphanumeric characters with no leading or trailing spaces
* unsafe characters such as " # @ % ^ & | ~ ; ` [ ] { } and consecutive whitespaces will no longer be allowed in the alias

### Schema version 4

* Array properties *aliases*, *dbxref*, and *investigated* were updated to allow for only unique elements within them.

### Schema version 3

* *investigated_as* property was backfilled to assign existing targets the appropriate enums according to what the target was being investigated as within an assay

### Schema version 2

* *status* values were changed to be lowercase
