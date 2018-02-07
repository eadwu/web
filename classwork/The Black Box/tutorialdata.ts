var tutorialTitle = "How To Make a Black Box Data Gallery";
var pages = [
  {
    pageTitle: "Introduction",
    pageInfo:
      "Welcome to the Black Box tutorial.  You should have been given a folder called <b>Black Box Data Gallery</b> which includes 2 files (<i>bbdg.html</i> and <i>itemdata.js</i>) and an images folder.  Please back these up so that you have clean copies...just in case.  When you are ready, open up both bbdg.html and itemdata.js in your favorite editor.",
    keyPoints: [],
    imageBank: []
  },
  {
    pageTitle: "Get Comfortable With the Code",
    pageInfo:
      "bbdg.html contains a skeletonized version of what will become our Black Box Data Gallery.  There are some important pieces to the code that you should familiarize yourself with before you begin.",
    keyPoints: [],
    imageBank: []
  },
  {
    pageTitle: "The Body",
    pageInfo:
      "The body contains absolutely all of the HTML elements being used in this page.",
    keyPoints: [
      "The pagetitle element will hold the title of your page.",
      "The mainimg element will show a large version of the thumbnail image the user clicks on.",
      "The caption element will display a name associated with the selected image.",
      "The info element will display information regarding the selected image.",
      "The 2 arrow elements will give the user the ability to scroll forwards and backwards through the bank of images, no matter how many there are.",
      "The 3 thumb images will hold any three of the images available to the page.  The user will be able to update these by scrolling through them using the backward and forward images."
    ],
    // imageBank: [ "thebody.png" ]
    imageBank: [ "https://www.dropbox.com/s/ulf6h8n7q7hgjcl/thebody.PNG?raw=1" ]
  },
  {
    pageTitle: "Initialize",
    pageInfo:
      "The initialize function currently serves to put all of the necessary HTML elements into global Javascript objects.  We will be accessing these later on.",
    keyPoints: [
      "The itemThumbs list contains the 3 images that show the current thumbnails.",
      "Since the title of the page is set once at the very beginning, there is no need for a global object.  Instead, it is accessed anonymously and pageTitle, from the javascript data file, is used to populate its innerHTML."
    ],
    // imageBank: [ "initialize.png" ]
    imageBank: [ "https://www.dropbox.com/s/a9mr8d1yrpo496i/initialize.PNG?raw=1" ]
  },
  {
    pageTitle: "Item Data",
    pageInfo:
      "The itemdata.js file holds all of the information we need in order to populate our page.",
    keyPoints: [
      "The constants help us identify the indices that will be created when we start splitting up the string containing the items.",
      "The pageTitle tells us how to head the page.",
      "Finally, the items string is the most important part.  It contains a series of semi-colon delimited strings, each one containing the parts of an &quot;item&quot;.  Each of these item strings is colon delimited so that we can easily break it up into its 3 parts."
    ],
    // imageBank: [ "itemdata.png" ]
    imageBank: [ "https://www.dropbox.com/s/omebczpebk2f0oi/itemdata.PNG?raw=1" ]
  },
  {
    pageTitle: "Our Variables",
    pageInfo:
      "Okay.  Let's get coding.  The first thing we need to do is identify what information we need to keep track of.  We'll be working with objects, specifically data objects.  Without worrying how to build them at the moment, let's just realize that we don't know how many of them there will be.  The only way we can represent them, then, is through an array.  For this step, we'll work in initialize.",
    keyPoints: [
      "Create an array called <b>itemList</b>.",
      "Since we'll always need to know which item, from the list, has been selected, create a variable called <b>currentItemIdx</b> and set that to 0.",
      "Finally, we're going to need an offset for the scrolling images.  Don't worry about how that works just yet.  Just create the variable, <b>offset</b> and set that to 0."
    ],
    imageBank: []
  },
  {
    pageTitle: "Setup Functions",
    pageInfo:
      "When the page loads for the first time, we're going to pull all of the data from the data file and port it into our list.  We also need to initialize those thumbnails so that the user can see what (s)he is selecting.  All of this happens in initialize, after our variables have been created and set.  We're going to all a few of our functions.  We'll get to writing them in a minute.",
    keyPoints: [
      "Call buldData().",
      "Call setThumbnails().",
      "Call display().  The call to display will populate all of that empty HTML that we have in the skeleton.  This is very important or the first loading of the page will show the user blanks."
    ],
    imageBank: []
  },
  {
    pageTitle: "The buildData Function",
    pageInfo:
      "This function has a single purpose.  Take the data string, break it up into chunks, and load those chunks into an array.  Doing this gives us the ability to work with the data throughout the lifespan of our page.",
    keyPoints: [
      "Split the items string around a semi-colon and store in a temporary variable called <b>itemArray</b>.  Remember how the data file is structured.  Each complete item is delimited by a semi-colon so we've now created an array that holds raw items.",
      "With that array built, the next step is to create a loop that will iterate through each of the items in itemArray.  Make it a standard for loop."
    ],
    // imageBank: [ "itemArray.png" ]
    imageBank: [ "https://www.dropbox.com/s/7bv5ioujjdr546r/itemArray.PNG?raw=1" ]
  },
  {
    pageTitle: "The Loop",
    pageInfo:
      "In this loop, we are going to break up each individual item and store it as an object.  Then we're going to put that object into the itemList array.  This absolutely <b><i>has</i></b> to be done inside of a loop because we don't know how many items are in the list.  Remember that the format of the data file is what we code for, not the number of items.",
    keyPoints: [
      "The first line of your loop creates a temporary object.  Call it <b>item</b> and set it to be an empty object '{}'",
      "Next, we need to split our raw item around a colon.  Remember that each raw item was colon delimited so that its 3 parts are distinguishable.  Split itemArray[i] around the colon and store the resulting array in a temporary variable called <b>itemParts</b>.",
      "Now we'll populate the fields of the object.  There are 3 fields and they each get a piece of the data.",
      "item.itemName = itemParts[NAME]",
      "item.itemInfo = itemParts[INFO]",
      "item.itemImage = itemParts[IMAGE]",
      "The constants are just numbers that remind us which parts of the array have which pieces of data.",
      "With the object populated, we can push it into the global itemList array for safe keeping.",
      "If you wrote this loop correctly, it will iterate through each item, storing them all into individual objects and putting them into the array."
    ],
    // imageBank: [ "itemList.png" ]
    imageBank: [ "https://www.dropbox.com/s/zviykfxzmlnwjcg/itemList.PNG?raw=1" ]
  },
  {
    pageTitle: "The setThumbnails Function",
    pageInfo:
      "Our data gallery is going to include a series of images.  These images need to appear as thumbnails so that the user can click on them.  We don't know how many images will be included.  We also don't know which 3 images will be shown.  The setThumbnails function takes all of that into account.",
    keyPoints: [
      "We need to loop through the list of image elements that represent the thumbnails.  That list was created in initialize.  Code that for loop.",
      "Inside that loop is a single line of code.  Set the src of the current image thumbnail to the image filename of the corresponding item object.",
      "itemThumbs[i].src = 'images/' + itemList[i + offset].itemImage;",
      "The concatenation handles the path structure.  The object only holds the filenames so that the programmer can set whatever path (s)he wants.",
      "The offset is the key.  We're starting i at 0.  If the offset is 0, we'll be showing the first 3 images (0, 1, and 2).  If the offset changes, as it will when the user clicks on the arrows, we'll show different images."
    ],
    imageBank: []
  },
  {
    pageTitle: "The Display Function",
    pageInfo:
      "The display function populates the screen elements with the current information, that is the information corresponding to the selected image.  We call display at the end of initialize so that the page shows the first item in the list.  We will also call display every time the user makes a change in selection.",
    keyPoints: [
      "Each of these screen elements will get its information from the <i>current item</i>.  We access all of the items from the itemList.  In order to access the current item, we index the list using currentItemIdx, which we created in initialize.",
      "Set the src of the main image to match the itemImage of the current item.  Remember tp concatenate the proper path onto the jtemImage.",
      "Set the innerHTML of the captionOutput element to match the itemName for the current item.",
      "Set the innerHTML of the infoOutput element to match the itemInfo for the current item."
    ],
    imageBank: []
  },
  {
    pageTitle: "The selectItem Function",
    pageInfo:
      "There are two pieces of user interactivity associated with the data gallery.  One is the selection of an image.  When the user selects an image, the page needs to populate the screen elements with all of data relevant to that image.  Fortunately, we already wrote that code in display().  Display, though, is dependent on the currentItemIdx, so when the user clicks on an image, the currentItemIdx is what we need to change.",
    keyPoints: [
      "There are 3 calls to selectItem(), each passing an index that matches the position of the thumbnail in the itemThumbs list.",
      "The selectImage function receives that index in the <b>idx</b> parameter.",
      "Set the currentItemIdx equal to the value in that parameter <b><i>plus</i></b> the offset.  The offset is key here because, though the click sends in 0, 1, or 2, the images shown do not necessarily represent the items in those positions in the itemList array.  The offset keeps the scrolling images in balance with the array.",
      "Call display().  If you forget this call, the user won't see the changes."
    ],
    imageBank: []
  },
  {
    pageTitle: "The moveOffset Function",
    pageInfo:
      "The other interactive piece is the user's ability to scroll through the images.  This changes the offset so that we can always access the proper image through a click.",
    keyPoints: [
      "There are 2 calls to the moveOffset function.  One passes a -1 as the argument and is meant to scroll backwards.  The other passes a 1 as the argument and is meant to scroll forwards.",
      "The <b>mod</b> parameter receives the value.",
      "Take that value and add it to the offset.",
      "Since we don't want the offset to move outside the bounds of the array, we need to check the value.",
      "First, if it's less than 0, set it back to 0.",
      "Next, if it's greater than the length of the itemList array minus 3, set it to the length of the itemList array minus 3.  The reason we subtract 3 is because our scroll allows for 3 images.  Our third image can be the last one in the array, but our first image cannot be anything after the third from last.",
      "Call setThumbnails()."
    ],
    imageBank: []
  },
  {
    pageTitle: "Testing",
    pageInfo:
      "Does it work?  Probably not, but that's okay.  You'll have made mistakes here and there.  It's time to start debugging.",
    keyPoints: [
      "Go into the debugger and look for syntax errors.",
      "Step through the page and make sure all of your information is where it's supposed to be.",
      "Compare your code with someone else's.",
      "Finally, when it works, create a new data file.  Make sure you stick to the format and naming from the original file.  All that should be different is the actual data.  Does your page work with the new data file?"
    ],
    imageBank: []
  },
  {
    pageTitle: "Conclusion",
    pageInfo:
      "If all has gone according to plan, you now have a black box data gallery.  That means you can include it as part of any website as long as you create a data file that works with the page.",
    keyPoints: [],
    imageBank: []
  }
];
