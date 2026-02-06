// 获取元素
const btn = document.querySelector('.btn')
const imgArr = document.querySelectorAll('.img-box')
const showPrize = document.querySelector('.show-prize')

let timer = null // 递归循环的计时器
//包含元素索引和元素名称的数组
const PrizeArr = [
  { key: 0, name: '游戏手柄' },
  { key: 1, name: 'iPad' },
  { key: 2, name: null },
  { key: 4, name: '玩偶' },
  { key: 7, name: '汽车' },
  { key: 6, name: '苹果电脑' },
  { key: 5, name: 'iPhone' },
  { key: 3, name: '鞋子' },
]

// 监听抽奖开始元素的点击事件
btn.addEventListener('click', function () {
  if(!timer){
    startLottery()
  }
})

/**
 * 生成随机数
 * @param {*} max 随机数最大值
 * @param {*} min 随机数最小值
 * @returns 返回规定范围内的随机数
 */
function random(max,min){
  return Math.floor(Math.random()*(max-min+1)+min)
}

/**
 * 抽奖函数
 */
function startLottery(){
  // 循环前先清除奖品信息
  showPrize.style.display = 'none'

  
  let index = random(0,7)  // 随机生成数组的索引(0-7)
  const countsTotal = 4 * 8 + random(0,8) //设置循环总次数=基础的4圈+最后随机的圈数
  let currentCount = 0 //设置当前已循环的次数
  let interval = 100  //设置初始滚动间隔

  /**
   * 递归滚动函数
   */
  function lottery(){
    // 1.排他思想清除样式
    imgArr.forEach((item) => {
      item.classList.remove('select')
    })
    // 2.按顺序点亮当前奖品
    imgArr[PrizeArr[index].key].classList.add('select')
    // 3.循环次数增加
      currentCount++
    // 判断是否停止抽奖
    if(currentCount == countsTotal){
      // 清除并初始化定时器timer
      clearTimeout(timer)
      timer = null
      // 获取抽中的奖品名称,并显示获奖信息
      const str = PrizeArr[index].name
      showPrize.style.display = 'block'
      // 依照奖品名称判断显示文字
      if(str){
        showPrize.innerHTML = `恭喜您抽到了${str}!`
      }else{
        showPrize.innerHTML = '谢谢参与!'
      }
      return
    }
    // 4.动态减速
    if(currentCount < countsTotal-12){
      // 除了最后12步以外都是匀速
      timer = setTimeout(lottery,interval)
    }else{
      // 后面12步动态减速  
      // 每次的时间间隔=上次间隔+n*20(ms)(n为最后12步中的第n步)
      interval += (currentCount-countsTotal+12)*20
      timer = setTimeout(lottery,interval)
    }
    // 数组的索引增加，而且在8个奖品元素间循环
      index++ 
    if (index == 8) {
      index = 0
    }
  }
  // 启动第一次滚动
  lottery()
}

