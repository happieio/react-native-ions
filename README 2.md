# csdemo
csdemo


App Stack
- React Native (For comparison discussion of existing native implementations)
- Redux (state management)
- Redux-Saga (endpoint management)
- Native Base (Picker Component)

General Approach to Endpoint implementation:
- Endpoint transactions are abstracted into a general purpose redux middleware using sagas
- multi endpoint transactions are sagas consuming the general endpoint saga for very light weight composition
- endpoint data is housed in Redux. It is managed in 4 reducer slices (auth, product, inventory, order)

UI Approach:
- Used tab interface (Products, Inventory, Orders)
- Screens backed by paged endpoints use the redux record count, total from the endpoint response and the next page to be requested as component state details
- Entity Create/View/Edit/Delete are implemented in a single nav screen that can be recursively called with a layout flag to indicate which layout to render

Other Explorations
- Use Typescript
- Use React hooks

Implementation Notes:
- added the redux actions for the colors endpoint, but didn't expose them to the UI since the post/put product endpoints do not consume color
- not sure if  after the PUT request resolves, the subsequent get response is pulling the updated data, it doesn't seem to reflect updates to the product?