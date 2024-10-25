Task 1: Get the code to comile/run tests

Notes: The initial code was failing to run tests as there was missing code in the index.ts file that 
copied over values from the value returned from the getPlaceAutocomplete

The tests now run, but that does not mean they are working ;-)


Task 2: Initial code review

Notes: 

- The apiKey in getAutoCompleteDetails is not used.
  Was the intention to add in an undefined check so that the app fails rather than always returns a 404 from the TomTom api call.
- getPlaceAutoocmplete does not match the style of the newer ‘await’ style, migrating this is a good option for consistency
- No logging is in place, a good logging strategy should be available. As logging is somewhat dependent on the environment in which it is run, containers or lambdas etc, so this decision can be deferred until a direction is chosen for the runtime deployment. This is especially true given the lack of indication on any infrastructure related files such as a dockerfile in this code.
  Logging should be added with at least console methods if nothing else.
- Exception handling from calling a remote service is missing. What happens if there is a 403? Do we want to continue? If there is a different error such as 404 we should be able to identify that this indicates an error in the code or the API has changed. What do we do with 500 errors
- The values in the test case do not assert that the value that a value is copied from the rest api result.
- The types are mostly defined as ‘any’ using appropriate types should be preferred. (see requirement 5)
- The unit tests make an actual call to the TomTom api. This makes them integration tests that are more likely to fail in the case of connectivity/TomTom outages.
- Npm audit indicates out of date libraries, 2 of which contain high level vulnerabilities.

Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add code for missing API key to throw an error
- Add error code handling for the remote call.
- Add in test cases that returned values are passed down to the test case.
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.
- Create new type for Requirement 5


