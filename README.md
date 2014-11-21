InfiniteScroll
================
It's a plug-in built using ECMAScript5 features and has NO dependency on any DOM manipulation libraries.

If you have a collection if items and you wish to display using <li> tags ex: twitter feed, then this plug-in will help you to reduce the DOM size.

Just imagine, you have 10000 items to display without pagination at once. What if the web app is accessed on Mobile, it increases the size of the DOM.

App will crash incase if the same scenario happens in Hybrid Mobile Application developed using Adobe PhoneGap.

So, in this scenario, InifiteScroll will be handy!

What InifiteScroll is doing?
=============================
It chunks the list items and display each chuck at a time based on the scroll position.

Scroll Up: We remove elements from the top and add elements down in the list
Scroll Down: Viceversa operation of Scroll Up

With this at any point of time, we have fixed number of DOM elements is available in the browser inside the list.

We are using DOMFragments to append the items to the list, so, DOM access will be minimal.


Usage
===============
Initialize the InfiniteScroll
var infiScroll = new InfiniteScroll({
    wrapper:'container',    /*Manadatory : Parent element of the list, where the list is nested */
    itemsCollection:stack,  /*Mandatory: Array holds the li items */
    chunkItems:null         /*optional : function reference to chunk the items */
});

infiScroll.init();

What's Next
================
1. Ajax integration - live pulling of data from the server and appending to the list
2. Integration with BackboneJS framework etc.,
3. NodeJS compatability

Connecy with me
=================
Feel free to bug me incase of any issues!


