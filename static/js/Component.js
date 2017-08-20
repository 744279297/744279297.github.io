/**
 * Created by chizhang on 2017/8/16.
 */
function Page(node) {
    if (typeof node === 'string') {
        this.page = document.querySelector(node)
    } else {
        this.page = node
    }
    var self = this

}

Page.prototype = {

    translateUp: function () {
        DomUtil.withNode(this.page).addClass('pre-container').removeClass('current-container')
        return this
    },
    translateDown: function () {
        DomUtil.withNode(this.page).addClass('next-container').removeClass('current-container')
        return this
    },
    translateCurrent: function () {
        DomUtil.withNode(this.page).addClass('current-container').removeClass('next-container pre-container')
        this.startAnimate()
        return this
    },
    setAnimate: function (animations) {
        this.animations = animations
        return this
    },
    startAnimate: function () {
        if (this.animations) this.animations.run()()
        return this
    },
    stopanimate: function () {
        this.animations.block()
        return this
    },
    reStartAnimate: function () {
        this.animations.blockEnd()
        return this
    }
}

function Container(id, items) {
    var self = this
    this.container = document.getElementById(id)
    this.items = items
    this.currentIndex = 0
    this.buttons = Array.from(this.container.querySelectorAll('.control ul li'))
    var startTime = 0, endTime = 0
    DomUtil.withNode(this.container).scrollPage(this.scrollToPrevious.bind(this), this.scrollToNext.bind(this))

    // items.forEach(item => item.page.addEventListener('mousewheel', function (node, e) {
    //     startTime = new Date().getTime()
    //
    //     var delta = event.detail || (-event.wheelDelta)
    //     console.log(startTime)
    //     console.log(endTime)
    //     if ((endTime - startTime) < -1000) {
    //         console.log(delta)
    //         if (delta > 2) {
    //             self.scrollToNext()
    //         }
    //         if (delta < -2) {
    //             self.scrollToPrevious()
    //         }
    //         endTime = new Date().getTime();
    //
    //     } else {
    //         e.preventDefault()
    //     }
    //
    // }, false))

}
Container.prototype = {
    setClickedIndex: function (index) {
        this.clickedIndex = index
    },
    getClickedIndex: function () {
        return this.clickedIndex
    },
    getCurrentIndex: function () {
        return this.currentIndex
    },
    getNextItem: function () {
        return this.items[this.currentIndex + 1]
    },
    getPreItem: function () {
        return this.items[this.currentIndex - 1]
    },
    getCurrentItem: function () {
        return this.items[this.currentIndex]
    },
    scrollStep: function (index) {
        var ever = this.getCurrentIndex()

        var everdom = DomUtil.withNode(this.getCurrentItem()).removeClass('current-container')
        var nowDom = DomUtil.withNode(this.items[index]).addClass('current-container')
        var now = this.getCurrentIndex()
        if (now > ever) {
            everdom.addClass('pre-container')
            nowDom.removeClass('next-container')
        } else {
            everdom.addClass('next-container')
            nowDom.removeClass('pre-container')
        }
    },
    scrollIndex: function (index) {
        var self = this
        var steps = index - this.getCurrentIndex()
        if (steps > 0) {
            while (steps > 0) {
                self.scrollToNext()
                steps--
            }
        } else {
            while (steps < 0) {
                self.scrollToPrevious()
                steps++
            }
        }
    },
    scrollToNext: function () {
        var currentIndex = this.getCurrentIndex()
        if (currentIndex < this.items.length-1) {
            this.getCurrentItem().translateUp()
            this.getNextItem().translateCurrent()
            this.currentIndex = this.currentIndex + 1
        }
    },
    scrollToPrevious: function () {
        var currentIndex = this.getCurrentIndex()
        if (currentIndex >= 1) {
            this.getCurrentItem().translateDown()
            this.getPreItem().translateCurrent()
            this.currentIndex = this.currentIndex - 1
        }


    },
    buttonMove: function (index) {
        if (index === this.getClickedIndex()) {
            this.buttons.forEach(function (button) {
                DomUtil.withNode(button).removeClass('hover')
            })
            DomUtil.withNode(this.buttons[index]).addClass('hoverNoText')
        } else {
            this.buttons.forEach(function (button) {
                DomUtil.withNode(button).removeClass('hover')
            })
            DomUtil.withNode(this.buttons[index]).addClass('hover')
        }
    }
}