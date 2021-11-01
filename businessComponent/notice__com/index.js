function Marquee(wrapper, data, options) {
    if (!wrapper) {
      throw new Error("Not Found Wrapper!!!");
    }
  
    if (arguments.length === 1) {
      options = {};
    }
  
    if (arguments.length === 2) {
      options = data || {};
      data = null;
    }
  
    if (arguments.length === 3) {
      options = options || {};
    }
    var self = this;
  
    this.wrapper = wrapper;
    this.allWidth = 0;
    this.timer = null;
    this.listener = null;
    this._once_listener_ = false;
  
    this.threshold = options.threshold || 200;
    this.speed = options.speed || 10;
    this.delay = 100;
  
    var rect = wrapper.getBoundingClientRect();
    this.wrapperWidth = rect.width;
  
    this.wrapperClassName = "marquee";
    this.listClassName = "marquee--list";
    this.itemClassName = "marquee--item";
  
    this.data = []
  
    this._init();
  
    if (data) {
      this.data = data;
      this.append(this.data);
  
      if (options.autostart) {
        this.start();
      }
    }
  
    if (options.loop) {
      this.on(function () {
        self.append(self.data, true)
      })
    }
  }
  
  Marquee.prototype._init = function () {
    var self = this;
  
    self.wrapper.className = (
      self.wrapper.className +
      " " +
      self.wrapperClassName
    ).trim();
  
    var list = document.createElement("ul");
    list.className = "marquee--list";
    self.wrapper.appendChild(list);
  
    self.list = list;
  
    return this;
  };
  
  Marquee.prototype.on = function (fn) {
    this.listener = fn;
  };
  
  Marquee.prototype.emit = function () {
    if (!this._once_listener_) {
      this._once_listener_ = true;
      this.listener && this.listener();
    }
  };
  
  Marquee.prototype.start = function () {
    var self = this;
  
    // TODO 如果没有数据, ThrowError
    self.timer = setInterval(function () {
      self._marquee();
    }, self.delay);
  
    return this;
  };
  
  Marquee.prototype._marquee = function () {
    var self = this;
  
    var offsetLeft = self.list.offsetLeft;
    if (
      self.allWidth - Math.abs(offsetLeft) - self.wrapperWidth <
      self.threshold
    ) {
      self.emit();
    }
  
    if (
      Math.abs(offsetLeft) + self.wrapperWidth + self.speed >=
      self.allWidth
    ) {
      clearInterval(self.timer);
      self.timer = null;
  
      self.list.style.left =
        -(self.allWidth - self.wrapperWidth) + "px";
    } else {
      self.list.style.left =
        -(Math.abs(offsetLeft) + self.speed) + "px";
    }
  };
  
  Marquee.prototype.stop = function () {
    var self = this;
  
    clearInterval(self.timer);
    self.timer = null;
  
    return this;
  };
  
  Marquee.prototype.append = function (data, restart) {
    var self = this;
  
    this.data = data;
  
    self.stop();
    self._once_listener_ = false;
  
    data.forEach(function (d) {
      var li = document.createElement("li");
      li.className = self.itemClassName;
      // li.innerText = d;
      li.innerHTML = d;
  
      self.list.appendChild(li);
    });
  
    var allWidth = 0;
    var items = self.list.getElementsByClassName(
      self.itemClassName
    );
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var rect = item.getBoundingClientRect();
      var width = rect.width;
      allWidth += width;
    }
  
    self.list.style.width = allWidth + "px";
  
    self.allWidth = allWidth;
  
    if (!!restart) {
      self.start();
    }
  
    return this;
  };
  
  export default Marquee