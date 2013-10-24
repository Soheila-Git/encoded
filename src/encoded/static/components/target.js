/** @jsx React.DOM */
define(['exports', 'react', 'globals', 'jsx!dbxref'],
function (target, React, globals, dbxref) {
    'use strict';

    var DbxrefList = dbxref.DbxrefList;

    var Panel = target.Panel = React.createClass({
        render: function() {
            var context = this.props.context;
            var itemClass = globals.itemClass(context, 'view-detail panel key-value');
           
            return (
                <dl className={itemClass}>
                    <dt>Target name</dt>
                    <dd className="no-cap">{context.label}</dd>

                    <dt>Target gene</dt>
                    <dd><a href={globals.dbxref_prefix_map.HGNC + context.gene_name}>{context.gene_name}</a></dd>

                    <dt>External resources</dt>
                    <dd>
                        {context.dbxref.length ? 
                            <DbxrefList values={context.dbxref} target_gene={context.gene_name} />
                        : <em>None submitted</em> }
                    </dd>
                </dl>
            );
        }
    });

    globals.panel_views.register(Panel, 'target');

    return target;
});
