/*global appendItemsToList,removeItemsFromList,prependItemsToList,chunk,createListItems,requestAnimationFrame*/
/*jslint nomen:true,plusplus:true*/


function InfiniteScroll(options) {
    "use strict";
    
    //Scope safe constructor
    if (!(this instanceof InfiniteScroll)) {
        return new InfiniteScroll(options);
    }
    
    var position = 0,
        prevPosition = 0,
        index = -1,
        items = [],
        watchScrolling = null,
    
        setup = function () {
            
            var itemCollection = options.itemsCollection || [];
            
            items = (options.chunkItems) ? (options.chunkItems)() : chunk();
            
            if (items.length <= 0 || options.wrapper.trim().length <= 0) {
                throw new Error("No items or root element is not set!");
            }
        
            /*
            document.getElementById(options.wrapper).addEventListener("scroll", function () {
                position = this.scrollTop / (this.scrollHeight - this.clientHeight);
            }, false);
            */
            
            index = -1;
            
            appendItemsToList(++index); //0
            appendItemsToList(++index); //1
            
            /*
                Monitoring the scroll position and if there's any change in the position, it will fire the
                respective events!
            
            */
           
            
            var wrapper = document.getElementById(options.wrapper);
            
           
            (function initScroll() {
                watchScrolling = setTimeout(function () {
                    
                    position = wrapper.scrollTop / (wrapper.scrollHeight - wrapper.clientHeight);
                    
                                       
                    if (prevPosition <= position) {

                        if (position > 0.9 && index < items.length && (index + 1) !== items.length) {

                            removeItemsFromList(index);
                            appendItemsToList(++index);
                            
                            document.getElementById(options.wrapper).scrollTop = 
                                document.querySelectorAll("#" + options.wrapper + ">ul>.item" + (index - 1))[0].clientHeight * 70;
                            
                        }

                    } else {

                        if (position < 0.1 && (index - 1 > 0)) {

                            removeItemsFromList(index + 1);
                            --index;
                            prependItemsToList(index - 1);
                            document.getElementById(options.wrapper).scrollTop = 
                                document.querySelectorAll("#" + options.wrapper + ">ul>.item" + (index - 1))[0].clientHeight * 100;
                           
                            
                        }
                    }
                    prevPosition = position;
                    
                    initScroll();

                },250);
               
            }());
            
            
        },
        
        chunk = function () {
            var i = 0,
                arr = [],
                itemsCollection = options.itemsCollection;
            
            while (i < itemsCollection.length) {
                arr.push(itemsCollection.slice(i, i + 100));
                i = i + 100;
            }
            
            return arr;
        },
    
        appendItemsToList = function (chunkIndex) {
            var docFragment = createListItems(chunkIndex);
            document.querySelector("#" + options.wrapper + ">ul").appendChild(docFragment);

        },
        
        removeItemsFromList = function (chunkIndex) {
            var removeIndex = chunkIndex - 1,
                i = 0,
                elements = null;
    
            if (removeIndex >= 0) {
                elements = document.querySelectorAll("#" + options.wrapper + ">ul>.item" + removeIndex);
                for (i = 0; i < elements.length; i = i + 1) {
                    elements[i].parentNode.removeChild(elements[i]);
                    
                }

            }
        },
        
        prependItemsToList = function (chunkIndex) {
            var docFragment = createListItems(chunkIndex);
            document.querySelector("#" + options.wrapper + ">ul").insertBefore(docFragment, 
                    document.querySelectorAll("#" + options.wrapper + ">ul>.item" + (chunkIndex + 1))[0]);
        },
        
        createListItems = function (chunkIndex) {
                        
            var i = 0,
                itemsCount = items[chunkIndex].length,
                elem = null,
                docFragment = document.createDocumentFragment();

            
            for (i = 0; i < itemsCount; i = i + 1) {
                elem = items[chunkIndex][i];
                elem.setAttribute('class', "item" + chunkIndex);
                docFragment.appendChild(elem);
            }
            
            return docFragment;
                    
        },
        
        destroy = function () {
            clearTimeout(watchScrolling);
        };
    
    return {
        init : setup,
        destroy: destroy
    };
}
