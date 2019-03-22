module.exports = {
  isMergeableObject: function(val) {
    var nonNullObject = val && typeof val === "object";

    return (
      nonNullObject &&
      Object.prototype.toString.call(val) !== "[object RegExp]" &&
      Object.prototype.toString.call(val) !== "[object Date]"
    );
  },

  emptyTarget: function(val) {
    return Array.isArray(val) ? [] : {};
  },

  cloneIfNecessary: function(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return clone && this.isMergeableObject(value)
      ? this.deepmerge(emptyTarget(value), value, optionsArgument)
      : value;
  },

  defaultArrayMerge: function(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach((e, i) => {
      if (typeof destination[i] === "undefined") {
        destination[i] = this.cloneIfNecessary(e, optionsArgument);
      } else if (isMergeableObject(e)) {
        destination[i] = this.deepmerge(target[i], e, optionsArgument);
      } else if (target.indexOf(e) === -1) {
        destination.push(this.cloneIfNecessary(e, optionsArgument));
      }
    });
    return destination;
  },

  mergeObject: function(target, source, optionsArgument) {
    var destination = {};
    if (this.isMergeableObject(target)) {
      Object.keys(target).forEach(key => {
        destination[key] = this.cloneIfNecessary(target[key], optionsArgument);
      });
    }
    Object.keys(source).forEach(key => {
      if (!this.isMergeableObject(source[key]) || !target[key]) {
        destination[key] = this.cloneIfNecessary(source[key], optionsArgument);
      } else {
        destination[key] = this.deepmerge(target[key], source[key], optionsArgument);
      }
    });
    return destination;
  },

  deepmerge: function(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: this.defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
      return Array.isArray(target)
        ? this.arrayMerge(target, source, optionsArgument)
        : this.cloneIfNecessary(source, optionsArgument);
    } else {
      return this.mergeObject(target, source, optionsArgument);
    }
  },

  deepmergeAll: function(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
      throw new Error(
        "first argument should be an array with at least two elements"
      );
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
      return this.deepmerge(prev, next, optionsArgument);
    });
  }
};
