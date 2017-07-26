# node-destroyable-listener

The package provides a simplist API to extend Node.js's event listener creators. What eventually changes is that creator functions will return an Object with a `destroy` method so that you don't have to have a reference to event listener's function in order to remove the listener.

That text :point_up: sounds confusing? Check the comparison below.

### Removing a listener with the conventional way:

    const Events = require('events')

    // Create your event bus as usual.
    let eb = Events()

    // Assign your listener to a variable.
    let foo = (bar) => {
        // stuff...
    }

    // OR
    // Create a named function.
    function foo(bar) {
        // stuff...
    }

    // Start listening to an event.
    eb.addListener('change', foo)   // eb.on() is an alias for eb.addListener()

    // You need to have the reference to `foo` function to do this:
    eb.removeListener('change', foo)

### Removing a listener with this package:

    const Events = require('events')

    // Create your event bus as usual.
    let eb = Events()

    // Start listening to an event.
    let changeListener = eb.addListener('change', bar => {

    })

    // You *do not* need the reference to `foo` function. Simply call the destroy method on the returned listener object.
    changeListener.destroy()

# Installing

    $ npm install destroyable-listener

# Contribution

Any pull requests, ideas or issue creations are welcome.

Also, for god's sake, someone rewrite that confusing intro text up there. I don't know how else to put it. :sweat_smile: