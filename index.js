window.onload = function() {
waterfall("main", "box");
var dataInt = {
    "data": [{
        "src": "1.jpeg"
    }, {
        "src": "2.jpeg"
    }, {
        "src": "3.jpeg"
    }, {
        "src": "4.jpeg"
    }, {
        "src": "5.jpeg"
    }, {
        "src": "6.jpeg"
    }, {
        "src": "7.jpeg"
    }, {
        "src": "8.jpeg"
    }, {
        "src": "9.jpeg"
    }, {
        "src": "10.jpeg"
    }, {
        "src": "11.jpeg"
    }, {
        "src": "12.jpeg"
    }, {
        "src": "13.jpeg"
    }, {
        "src": "14.jpeg"
    }, {
        "src": "15.jpeg"
    }, {
        "src": "16.jpeg"
    }, {
        "src": "17.jpeg"
    }, {
        "src": "18.jpeg"
    }, {
        "src": "20.jpg"
    }]
}
window.onscroll = function() {
    if (checkScrollSlide()) {
        var oParent = document.getElementById("main");
        // 将数据块渲染后当前页面的尾部
        for (var i = 0; i < dataInt.data.length; i++) {
            var oBox = document.createElement("div"); //添加元素节点
            oBox.className = "box"; //添加类名
            oParent.appendChild(oBox); //将该节点加入到父节点中
            var oPic = document.createElement("div");
            oPic.className = "pic";
            oBox.appendChild(oPic);
            var oImg = document.createElement("img");
            oImg.src = "img/" + dataInt.data[i].src;
            oPic.appendChild(oImg);
        }
        waterfall("main", "box");
    }
}
}

function waterfall(parent, box) {
    // 将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent); //取得父级div，最外层的元素
    var oBoxes = getByClass(oParent, box); //获得所有class为box的div
    // 计算整个页面显示的列数（页面宽/box的宽）
    var oBoxWidth = oBoxes[0].offsetWidth; // 等宽不等高,offsetWidth获得元素总的宽度，包括内外间距和边框
    var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth); //前者是浏览器窗口可视区宽度
    // 设置main的宽度，固定每行摆放个数和上下左右的边距
    oParent.style.cssText = "width:" + oBoxWidth * cols + "px;margin:0 auto;";
    // 存放第一列高度的数组
    var heightArr = [];
    for (var i = 0; i < oBoxes.length; i++) {
        if (i < cols) {
            heightArr.push(oBoxes[i].offsetHeight); //获得元素的高度
        } else {
            var minHeight = Math.min.apply(null, heightArr);
            var index = getMinHeightIndex(heightArr, minHeight); // 获取最小高度的索引
            oBoxes[i].style.position = "absolute";
            //得到下一章图片应放的高度
            oBoxes[i].style.top = minHeight + "px";
            //得到下一张图片应放置在哪个位置
            oBoxes[i].style.left = oBoxWidth * index + "px";
            //将两张图片高度相加得到一个新的高度用来进行下一次的计算
            heightArr[index] = minHeight + oBoxes[i].offsetHeight; // 改变当前列的高度
        }
    }
}

// 根据class获取元素
function getByClass(parent, className) {
    var boxArr = new Array(), // 用来存储获取到的所有class为box的元素
        oElements = parent.getElementsByTagName("*"); //获得所有的标签

    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == className) {
            boxArr.push(oElements[i]);
        }
    }

    return boxArr;
}

// 获取最小高度的下标
function getMinHeightIndex(arr, value) {
    for (var i in arr) {
        if (arr[i] == value) {
            return i;
        }
    }
}

// 检测是否具备了滚条加载数据块的条件
function checkScrollSlide() {
    var oParent = document.getElementById("main");
    var oBoxes = getByClass(oParent, "box");
    var lastBoxHeight = oBoxes[oBoxes.length - 1].offsetTop + Math.floor(oBoxes[oBoxes.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientWidth || document.documentElement.clientHeight;

    return (lastBoxHeight < scrollTop + height) ? true : false;
}