// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Importing conditional field input component
import ConditionalField from '../plugins/conditionalField.js'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([

    
    // PRODUCT SCHEMA TO SHOWCASE CONDITIONAL FIELDS
    // =============================================

    {
      name: 'product',
      title: 'Product',
      type: 'document',
      fields: [

        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },

        // Price model field - Controls whether 'price' field is shown
        {
          name: 'priceModel',
          title: 'Price model',
          type: 'string',
          options: {
            list: [
              {title: 'Free', value: 'free'},
              {title: 'Paid', value: 'paid'},
            ]
          }
        },

        // Price field is shown only for 'paid' price models
        {
          name: 'price',
          title: 'Price',
          type: 'number',

          // Invokes conditional field input component
          inputComponent: ConditionalField,
          options: {
            condition: (document, parent) => parent.priceModel == "paid"
          }
        }

      ]
    },
    
  ])
})
