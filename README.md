# Conditional Fields in Sanity Studio

Clean studio created with `sanity init` with a simplest possible schema to showcase conditional fields.

## Usage instructions

1. Prepare the demo:
    * Clone this repository.
    * Run `npm install`.
    * Update `sanity.json` to point to your own Sanity project and data: 
    ```
      "api": {
        "projectId": "iitl24hy",
        "dataset": "example"
      }
    ```

2. Run `sanity start` and open the Sanity Studio on http://localhost:3333/.

3. Try out the conditional field:
    * Add a new document of type **Product** from the Sanity Studio.
    * Set a product name.
    * Select **Price model** 'Paid', and a field for the price will appear.
    * Set a price.
    * Publish the product.\
    \
    ![Product with price](https://github.com/bjornwang/sanity-conditional-fields/blob/master/static/readme/1.png)\
    \
<br><br>

4. Now edit the product.
    * Change the **Price model** to 'Free'. The price field will disappear.
    * Publish the product.\
    \
    ![Product without price](https://github.com/bjornwang/sanity-conditional-fields/blob/master/static/readme/2.png)\
    \
    **NOTE**: The product is now saved in with the 'Free' price model, but **still has a value in the price field**. The field is only hidden.
<br><br>

## Future improvement points

1. Can we remove the value of the conditional field in the stored document every time the field it's hidden?
In other words, in our example, when a 'Paid' product is made 'Free' so that the price field becomes hidden, how can we also unset the price field in the stored document in Sanity.

2. Can we avoid having to specify `inputComponent: ConditionalField` on every single, conditional field, and instead implement an **input resolver**. This would be a much more elegent solution. An input resolver could simply check for the presence of `options.condition` in the field definition, like this:
```
import ConditionalField from './conditional-field/ConditionalField'
export default function resolveInput(type) {
  // For any field that has 'options.condition' set
  if (type.options && type.options.condition) {
    return ConditionalField
  }
}
```
