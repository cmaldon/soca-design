(function() {
  var items = [];

  var fetchItems = function(options, callback) {
    if (items.length === 0) {
      fetchActualItems(function(response) {
        items = response;
        setTimeout(function() {
          callback(prepareResponse(options));
        }, 500);
      });
    } else options = options || {};
    setTimeout(function() {
      callback(prepareResponse(options));
    }, 500);
  };

  var fetchActualItems = function(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        callback(JSON.parse(this.responseText));
      }
    };
    xhttp.open('GET', '../resources/distributions.json', true);
    xhttp.send();
  };

  var createComparator = function(options) {
    var qualifier = options.sortingDescending ? -1 : 1;
    var field = options.sortingColumn;
    return function(a, b) {
      return a[field] > b[field] ? qualifier : -qualifier;
    };
  };

  var prepareResponse = function(options) {
    var output = {};
    if (options.filteringText) {
      output.items = items.filter(function(item) {
        for (var prop in item) {
          if (
            item.hasOwnProperty(prop) &&
            item[prop].toLowerCase().indexOf(options.filteringText.toLowerCase()) !== -1
          ) {
            return true;
          }
        }
        return false;
      });
    } else {
      output.items = items.slice();
    }
    if (options.sortingColumn) {
      output.items.sort(createComparator(options));
    }
    if (options.pageSize && options.currentPageIndex) {
      var pageSize = options.pageSize;
      var currentPageIndex = options.currentPageIndex;
      var currentItems = output.items;
      if ((currentPageIndex - 1) * pageSize > currentItems.length) {
        currentPageIndex = 1;
      }

      output.pagesCount = Math.ceil(currentItems.length / pageSize);
      output.currentPageIndex = currentPageIndex;
      output.items = currentItems.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);
    } else {
      output.pagesCount = 1;
      output.currentPageIndex = 1;
    }

    return output;
  };

  window.fetchItems = fetchItems;
})();
