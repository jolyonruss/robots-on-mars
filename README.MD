# Red Badger coding test by Jolyon Russ

The instructions say UI design is not the focus of the test so I wrote a bare bones Node script to calculate the robot's positions. Assuming you have node installed you can run the script like this:

``` $ node index.js```

This reads a file called input.txt and saves an output a file called output.txt

I also quickly created a script to generate more inputs for testing, this can be run like this:

``` $ node instruction-generator.js ```

by default it generates 10 instructions, but it also has an optional parameter to set the number of instructions, so if you want 30 instructions to test against you can do the following:

``` $ node instruction-generator.js 30 ```

If you have any questions please get in touch: jolyonruss@gmail.com
