## Task 1: Get the code to compile/run tests

Notes: The initial code was failing to run tests as there was missing code in the index.ts file that 
copied over values from the value returned from the getPlaceAutocomplete

The tests now run, but that does not mean they are working ;-)


## Task 2: Initial code review

**Notes**: 

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

### Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add code for missing API key to throw an error
- Add error code handling for the remote call.
- Add in test cases that returned values are passed down to the test case.
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.
- Create new type for Requirement 5


## Task 3: Fix tests to ensure values are copied from axios and tested in the test case

Added new test asserts to detect invalid values being copied between layers of the code.

**Notes**:

maps-api.ts was updated to map the values from the TomTom response to a new return type
index.ts was updated to re-map those values. This is somewhat strange and can be addressed when a new type is added to satisfy requirement 5.
The street number field can not be tested with the original request, this can be addressed when migrating to unit tests.


### Resolved tasks:

- Add in test cases that returned values are passed down to the test case.

### Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add code for missing API key to throw an error
- Add error code handling for the remote call.
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.
- Create new type for Requirement 5


## Task 4: Create new internal type for use within the app. Requirement 5

**Notes**:

adding in a new AddressSuggestion type for use as the internal API as per requirement 5.
The data from the TomTom API is mapped directly into the appropriate type so there is no longer any need to do any 
secondary mapping in index.ts. This file may be required for error handling so it will be left at this point.

### Resolved tasks:

- Add in test cases that returned values are passed down to the test case.
- Create new type for Requirement 5

### Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add code for missing API key to throw an error
- Add error code handling for the remote call.
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.


## Task 5: Add in protection for undefined api key

**Notes**:

If an API key is not provided, most likely due to configuration error, then an error is thrown rather than hitting the TomTom
api and getting a potentially confusing 403
This is relevant when the app is packaged up for runtime which is a decision to be deferred until later.
It was noted that the errors for 400/403 were not included in the test cases for invalid parameters and invalid search terms.

### Resolved tasks:

- Add in test cases that returned values are passed down to the test case.
- Create new type for Requirement 5
- Add code for missing API key to throw an error

### Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add error code handling for the remote call.
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.




## Task 6: Migrate the tests to use mocks rather than actual calls

**Notes**:

The existing tests relied on making actual calls out to the TomTom API. This is not ideal as
it causes a dependency on an external service that may be unavailable due to an outage.

Jest has a mocking mechanism that can be used to mock out the Axios calls. This allows for tesing
of calling parameters, one of which is mentioned in requirement 2

The unit tests for testing the call parameters identified an extra character in the Axios URL that was probably a typo but did not 
affect the call. This character was removed with no affect on the call. 


### Resolved tasks:

- Add in test cases that returned values are passed down to the test case.
- Create new type for Requirement 5
- Add code for missing API key to throw an error
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.

### Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add error code handling for the remote call.
- Add in parameters to limit search results to just Australian addresses



## Task 7: Requirement 2, only make requests for Australian addresses

**Notes**:

Added request parameter to limit the countrySet as per TomTom api documentation


## Task 8: Requirement 2, only make requests for Australian addresses

**Notes**:

A review of the TomTom api documentation shows that if addresses are the only required result types then
there a new parameter required to limit results to 'Addr' types.



### Resolved tasks:

- Add in test cases that returned values are passed down to the test case.
- Create new type for Requirement 5
- Add code for missing API key to throw an error
- Migrate test cases to be unit tests to remove the dependencies on Axios remote calls.
- Add in parameters to limit search results to just Australian addresses


### Outstanding tasks:

- Update the libraries to the latest versions - deal with breaking changes
- Add error code handling for the remote call.