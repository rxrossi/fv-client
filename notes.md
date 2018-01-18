# Client
## General
+ [X] on delete rename to 'name deactivated at yyyy/mm/dd hh:mm:ss'

## Clients
+ [ ] NoMoreTables is not showing 'th' when screen gets smaller
+ [ ] clicking the client goes to view one, this view one shows last sales for it

## Purchases
+ [ ] Switch select to FilterableSelect
+ [X] Delete
+ [X] make form reusable
  + [X] works for add
  + [X] works for edit
+ [X] make a delete container
+ [X] integrate buttons of delete and edit to List Component
+ [X] Convert HOC
  + [X] List
  + [X] ViewDetail
  + [X] Add
  + [X] Edit
+ [X] It seems possible to submit a purchase without stock entries

## Sales
+ [X] make form reusable
  + [X] works for add
  + [X] works for edit
+ [X] make a delete container
+ [X] integrate buttons of delete and edit to List Component
+ [X] Convert HOC
  + [X] List
  + [X] ViewDetail
  + [X] Add
  + [X] Edit

## General
+ [ ] Implement login
+ [X] Fuzzy filter for Clients

## Products
+ [X] make form reusable
  + [X] works for add
  + [X] works for edit
+ [X] Create a ViewDetails HOC
+ [X] make a delete container
+ [X] integrate buttons of delete and edit to List Component
+ [X] Convert HOC
  + [X] List
  + [X] ViewDetail
  + [X] Add
  + [X] Edit

## Professionals
+ [X] make form reusable
  + [X] works for add
  + [X] works for edit
+ [X] make a delete container
+ [X] integrate buttons of delete and edit to List Component
+ [ ] Show the total profit

# Acceptance, Container and Connected Container tests

## View 
Assert that it calls the correct API Url on mount
Asserts that its dumb component received the response as props

## Form Add 
Assert that it can change the values
Assert that it calls the correct API Url with correct values

## Form Edit
Assert that it calls the correct API Url on mount - it might like clients/1/edit and might be necessary to fetch the data
Asserts that its dumb component received the response as props
Assert that it calls the correct API Url with correct values on submit

## Delete
Assert that the dumb component did mount
Assert that it calls the API correctly

The difference between writing unit tests of containers and acceptance tests
both will need the redux store anyway, the difference is that acceptance adds the react router


# Testing a form 
## Presentational
  - Check if the fields calls handleChange correctly
  - check if submit calls the handleSumit correctly
  - check if clear form will call handleClear correctly
  (basically asserting that the onChange, onClick and onSubmit functions are being called correctly)
## Container
  - pass values
  - assert if the functions of componentDidMount were called correctly
  - check if clicking on submit will call the handleSumit with the given values
  ---
  (assert that the lifeCycle functions are called as expected)
  (assert that its non lifeCycle methods are working as expected, like submit, that uses the values received by props)
## Connected Container
  - mount a store with the values
  - assert that the presentational component has the values of the store
  - assert that the presentational component did receive the correct handleChange, handleSubmit and handleClear actions ?
  ---
  (assert that the Container received the necessary functions and the necessary props not used by the presentational)
  (assert that the Presentational received the necessary props (values and functions not used directly on the container) handleClear does not need to be called on Container for example)
