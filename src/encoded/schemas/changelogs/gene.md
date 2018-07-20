## Changelog for gene.json

### Schema version 1

* The Gene object is isolated from the Target object which will hold metadata from Target and replace some properties of Target. It is initially created by adopting the schema and type of target object. It has five essential properties:
  - geneid: NCBI Entrez GeneID.
  - symbol: gene symbol approved by official nomenclature such as HGNC, MGI, FlyBase, WormBase.
  - synonyms: Alternative symbols/names referring to the gene.
  - dbxrefs: external resources related to the gene. As for now, only the following databases are allowed:
    * HGNC
    * MGI
    * FlyBase
    * WormBase
    * ENSEMBL
    * MIM
    * RefSeq
    * UniProtKB
    * Vega
    * miRBase
  - organism: the embedded Organism object.

* Genes on the ENCODE portal are imported from and synced with NCBI Entrez Gene database. Only a subset of genes, which have Entrez GeneID as well as ID and symbol from official nomenclature, are used and maintained here. New genes to be added should comply with this requirement. Current Entrez genes are under "released" status; replaced Entrez genes are under "archived" status; discontinued Entrez genes are under "deleted" status.
