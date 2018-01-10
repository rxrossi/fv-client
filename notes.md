# Client

## Clients
+ [ ] extract clients containers to make them reusable
+ [ ] clicking the client goes to view one, this view one shows last sales for it
+ [X] needs to change table to match other pages
+ [X] edit cancel button that redirects
+ [X] undo changes on update form should clear put errors
+ [X] delete
  + [X] clicking opens a modal to confirm
  + [X] the modal shows the title of the client
  + [X] the modal warns that sales related to him will be also deleted
  + [X] extract it to a container, it is using List for now

+ [X] Successful client new features
  + [ ] edit also redirects to clients home on error
  + [X] edit needs to clear form fields (reusableCrudRedux)
  + [X] needs to probably redirect or close
  + [X] to fix the above, my reusableCrudRedux action should throw on error
  + [X] add a then on asyncAction.put that redirects
  + [X] container edit should have state.redirect, on successful put, set it to true, on render, user a Redirect
+ [X] update form should adapt if it is updating or creating
  + [X] adptive title
  + [X] adptive save button text
  + [X] clear form needs to become reset form

## General
+ [ ] generalize containers
+ [ ] Implement login
+ [ ] Fuzzy filter for Clients

## Purchases
+ [ ] It seems possible to submit a purchase without stock entries

## Professionals
+ [ ] Show the total profit


# Writing acceptance test

What needs to be tested
- index
  - check if the right components load
- list (view many)
  - check if the right component load
  - check if props are correct (one for empty list, other for many?)
- viewDetail (view one)
  - check if the right component load, check if the props are correct
- edit
  - check if the right component load, check if the props are correct
  - change the values (maybe without using the actual form?), assert if the right API call was made
- delete
  - check if the right component load, check if the props are correct
  - check if that on confirm, the right action is called

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
