/*
*read()方法加载页码，实现分页功能；（加载框架）
*pageID 框架id或class    （必填）
*pageSize 数据页数    （必填）
*size 当前页码      （必填）
*pagebuttonhtml 设置跳转页码的HTML，pagebutton 跳转页码的button
*跳转页码格式 ：如果要跳转页码，请把跳转页码的html写在这里类似‘<div><input type="text" ><button id="button">确定</button></div>’
*pagenone 省略号HTML
*pageleft 左按钮HTML
*pageright 右按钮HTML
*pagecur   当前页显示状态一半HTML，另一半是pagehtmlright；pagehtmlleft 页码条数一半HTML，另一半也是pagehtmlright
* */
window.onready=function(){
    new pages({
        pageID:'#pages',
        pageSize:20,
        size:1
    });
}

var pages=function (name) {
    var page = {
        page: '.page', /*框架id*/
        pagebutton: '#button', /*如果有指定数值，这个就是input框兄弟的ID*/
        pagebuttonhtml: '',
        maxsize: 10, /*刷新页面分页的个数（包括左右）最小等于10*/
        datalength: 20, /*数据页数=（总数-2）*/
        htm: '', /*分页集合*/
        xs: 1, /*显示指标*/
        maxsizefhd: 11,
        maxsizefnx: 10,
        size: 0,
        pagetab: 'a',
        pagenone: '<a href="javascript:;" class="none">...</a>',
        pageleft: '<a href="javascript:;" class="pre zuo"> &lt;</a>',
        pageright: '<a href="javascript:;" class="pre you"> &gt;</a>',
        pagecur: '<a href="javascript:;" class="cur">',
        pagehtmlleft: '<a href="javascript:;">',
        pagehtmlright: '</a>',
        pagepduan: function () {
            return this.maxsize < this.datalength ? this.maxsize : this.datalength;
        },
        readfn: function () {
            this.htm = '';
            /*页面加载数据*/
            for (var i = 0; i < this.pagepduan(); i++) {
                if (i == 0) {
                    /*左击按钮*/
                    this.htm += this.pageleft;
                } else if (i == this.pagepduan() - 1) {
                    /*右击按钮*/
                    this.htm += this.pageright;
                } else if (i == this.pagepduan() - 4 && this.datalength >= 10) {
                    /*中间虚化*/
                    this.htm += this.pagenone;
                } else if (i == this.pagepduan() - 3 && this.datalength >= 10) {
                    /*末尾指针第1个*/
                    this.htm += this.pagehtmlleft + (this.datalength - 3) + this.pagehtmlright;
                } else if (i == this.pagepduan() - 2 && this.datalength >= 10) {
                    /*末尾指针第2个*/
                    this.htm += this.pagehtmlleft + (this.datalength - 2) + this.pagehtmlright;
                } else {
                    /*内容架构*/
                    this.htm += this.pagehtmlleft + i + this.pagehtmlright;
                }
            }
        },
        maxlistfn: function (e) {
            this.htm = '';
            for (var i = 0; i < this.pagepduan(); i++) {
                if (i == 0) {
                    /*左击按钮*/
                    this.htm += this.pageleft;
                } else if (i == this.pagepduan() - 1) {
                    /*右击按钮*/
                    this.htm += this.pageright;
                } else if (i == 3 && this.datalength >= 10) {
                    /*中间虚化*/
                    this.htm += this.pagenone;
                } else if (i == 1 && this.datalength >= 10) {
                    /*末尾指针第1个*/
                    this.htm += this.pagehtmlleft + 1 + this.pagehtmlright;
                } else if (i == 2 && this.datalength >= 10) {
                    /*末尾指针第2个*/
                    this.htm += this.pagehtmlleft + 2 + this.pagehtmlright;
                } else {
                    /*内容架构*/
                    if (this.datalength < 10) {
                        this.htm += this.pagehtmlleft + (i) + this.pagehtmlright;
                    } else {
                        this.htm += this.pagehtmlleft + (this.datalength - this.maxsize + i) + this.pagehtmlright;
                    }
                }
            }
        },
        listfn: function (e, index) {
            this.htm = '';
            for (var i = 0; i < this.pagepduan(); i++) {
                if (i == 0) {
                    /*左击按钮*/
                    this.htm += this.pageleft;
                } else if (i == this.pagepduan() - 1) {
                    /*右击按钮*/
                    this.htm += this.pageright;
                } else if (i == (e < 3 ? (this.pagepduan() - 4) : 3) && this.datalength >= 10) {
                    /*中间虚化*/
                    if (e < 3 && index < this.datalength - 5) {
                        this.htm += this.pagenone;
                    } else if (e < 3) {
                        this.htm += this.pagehtmlleft + (this.datalength - 4) + this.pagehtmlright;
                    } else if (e > 3 && index > 4) {
                        this.htm += this.pagenone;
                    } else if (e > 3) {
                        this.htm += this.pagehtmlleft + 3 + this.pagehtmlright;
                    }

                } else if (i == (e < 3 ? this.pagepduan() - 3 : 2) && this.datalength >= 10) {
                    /*末尾指针第1个*/
                    if (e < 3) {
                        this.htm += this.pagehtmlleft + (this.datalength - 3) + this.pagehtmlright;
                    } else {
                        this.htm += this.pagehtmlleft + 2 + this.pagehtmlright;
                    }
                } else if (i == (e < 3 ? this.pagepduan() - 2 : 1) && this.datalength >= 10) {
                    /*末尾指针第2个*/
                    if (e < 3) {
                        this.htm += this.pagehtmlleft + (this.datalength - 2) + this.pagehtmlright;
                    } else {
                        this.htm += this.pagehtmlleft + 1 + this.pagehtmlright;
                    }
                } else {
                    /*内容架构*/
                    if (e < 3) {
                        if (index > 4) {
                            if (i < 3) {
                                this.htm += this.pagehtmlleft + i + this.pagehtmlright;
                            } else {
                                if (i == 3) {
                                    this.htm += this.pagenone;
                                } else if (i == 4) {
                                    if (index > this.datalength - 5) {
                                        this.htm += this.pagehtmlleft + (index - 2) + this.pagehtmlright;
                                    } else {
                                        this.htm += this.pagehtmlleft + (index - 1) + this.pagehtmlright;
                                    }
                                } else if (i == 5) {
                                    if (index > this.datalength - 5) {
                                        this.htm += this.pagehtmlleft + (index - 1) + this.pagehtmlright;
                                    } else {
                                        this.htm += this.pagehtmlleft + index + this.pagehtmlright;
                                    }
                                } else if (i == 6 && index < this.datalength - 5) {
                                    this.htm += this.pagehtmlleft + (parseInt(index) + 1) + this.pagehtmlright;
                                }
                            }
                        } else {
                            this.htm += this.pagehtmlleft + i + this.pagehtmlright;
                        }
                    } else {
                        if (index < this.datalength - 5) {
                            if (i > this.maxsize - 4) {
                                this.htm += this.pagehtmlleft + (this.datalength - (this.maxsize - i)) + this.pagehtmlright;
                            } else {
                                if (i == 7) {
                                    this.htm += this.pagenone;
                                } else if (i == 4 && index > 4) {
                                    this.htm += this.pagehtmlleft + (index * 1 - 1) + this.pagehtmlright;
                                } else if (i == 5) {
                                    if (index > 3) {
                                        this.htm += this.pagehtmlleft + (index * 1) + this.pagehtmlright;
                                    } else {
                                        this.htm += this.pagehtmlleft + (index * 1 + 1) + this.pagehtmlright;
                                    }
                                } else if (i == 6) {
                                    if (index > 3) {
                                        this.htm += this.pagehtmlleft + (index * 1 + 1) + this.pagehtmlright;
                                    } else {
                                        this.htm += this.pagehtmlleft + (index * 1 + 2) + this.pagehtmlright;
                                    }
                                }
                            }
                        } else {
                            this.htm += this.pagehtmlleft + (this.datalength - this.maxsize + i) + this.pagehtmlright;
                        }
                    }
                }
            }
        },
        click: function () {
            var This = this;
            /*按钮绑定点击事件*/
            $(this.page).on('click', '.zuo', function () {
                /*左事件*/
                var zhib = parseInt($('.cur').text());
                if (zhib == 1) {
                    alert('已经是第一页了！');
                    return false;
                } else {
                    This.clickfn(zhib - 1);
                }
            });
            $(this.page).on('click', '.you', function () {
                /*右事件*/
                var zhib = parseInt($('.cur').text());
                if (zhib == This.datalength - 2) {
                    alert('已经是最后一页了！');
                    return false;
                } else {
                    This.clickfn(zhib + 1);
                }
            });
            $(this.page).on('click', this.pagetab, function () {
                /*指标事件*/
                if ($(this).hasClass('pre') || $(this).hasClass('none') || $(this).hasClass('cur')) {
                    return false;
                } else {
                    This.clickfn($(this).text());
                }
            });
            $(this.page).on('click', this.pagebutton, function () {
                var zhib = $(this).siblings('input[type="text"]').val();
                if (zhib < 1) {
                    alert('页数不能等于1！');
                    $(this).siblings('input[type="text"]').val(1);
                } else if (zhib > this.datalength - 2) {
                    alert('页数超出了最大页数值！');
                    $(this).siblings('input[type="text"]').val(this.datalength - 2);
                } else {
                    This.clickfn(zhib);
                }
            })
        },
        clickfn: function (e) {
            /*按钮点击运行方法,只要运行体*/
            if (this.datalength < 10) {
                this.maxlistfn(e);
                this.dataxy(e);
            } else {
                if (e >= this.datalength - 3) {
                    this.maxsize = this.maxsizefnx;
                    this.maxlistfn(e);
                    this.dataxy(e);
                    this.size = this.datalength;
                } else if (e < 3) {
                    this.maxsize = this.maxsizefnx;
                    this.readfn();
                    this.dataxy(e);
                    this.size = 0;
                } else {
                    if (e > 4 && e < this.datalength - 5) {
                        this.maxsize = this.maxsizefhd;
                    }
                    this.listfn(this.size, e);
                    this.dataxy(e);
                }
            }
        },
        dataxy: function (e) {
            $(this.page).html(this.htm + this.pagebuttonhtml);
            $(this.page).find(this.pagetab).eq(this.eachfn(e)).addClass('cur').siblings(this.pagetab).removeClass('cur');
        },
        eachfn: function (e) {
            var index1;
            $(this.page).find(this.pagetab).each(function (index) {
                if ($(this).text() == e) {
                    return index1 = index;
                }
            });
            return index1;
        },
        read: function (e) {
            this.readfn();
            this.click();
            this.dataxy(1);
            this.clickfn(e)
        }
    };

    page.page = name.pageID;
    page.datalength = name.pageSize;
    page.pagebuttonhtml = name.pagebuttonhtml != undefined ? name.pagebuttonhtml : page.pagebuttonhtml;
    page.pagebutton = name.pagebutton != undefined ? name.pagebutton : page.pagebutton;
    page.pagenone = name.pagenone != undefined ? name.pagenone : page.pagenone;
    page.pageleft = name.pageleft != undefined ? name.pageleft : page.pageleft;
    page.pageright = name.pageright != undefined ? name.pageright : page.pageright;
    page.pagecur = name.pagecur != undefined ? name.pagecur : page.pagecur;
    page.read(name.size);
}