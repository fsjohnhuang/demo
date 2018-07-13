'use strict'

function curry(fn , ...args){
  var len = fn.length

  return len <= args.length 
         ? fn.apply(null, args.slice(0, len)) 
         : function next(args){
              return function(...lArgs){
                  var tmpArgs = args.concat(lArgs)
                  return len <= tmpArgs.length ? fn.apply(null, tmpArgs.slice(0, len)) : next(tmpArgs)
              }
           }(args)
}
const compose = (...fns) => {
  const lastFn = fns.pop()
  fns = fns.reverse()
  return a => fns.reduce((p, fn) => fn(p), lastFn(a))
}

$('#fullpage').fullpage({
  anchors: ['firstPage','secondPage'],
  afterLoad: function(anchorLink, index){
    switch(index){
      case 1:
        break
      case 2:
        takeAction()
        break
    }
  }
})

function getMObjs(selector){
  return [...document.querySelectorAll(selector)].map(n => move(n).set('opacity', 1))
}

const showTree = () => {
  const mTrees = getMObjs('.tree')
  const last = mTrees.reduce((p, n) => p ? (p.duration('0.03s').then(n), n) : n, null)
  return {start: mTrees[0], last}
}

const highlight = prev => {
  const ms = getMObjs('.main-building .building__moat-around > *')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.02s')) : n, prev)
}
const shade = prev => {
  const ms = getMObjs('.main-building .building__moat-around--shade > *')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.02s')) : n, prev)
}
const showMainBuilding = compose(shade, highlight)


const vhighlight = prev => {
  const ms = getMObjs('.vice-building .building__moat-around > *')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.03s')) : n, prev)
}
const vshade = prev => {
  const ms = getMObjs('.vice-building .building__moat-around--shade > *')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.03s')) : n, prev)
}
const showViceBuilding = compose(vshade, vhighlight)

const showLeftViceFlatBuilding = prev => {
  const ms = getMObjs('#lvbf .building__moat-around > *')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.02s')) : n, prev)
}
const showRightViceFlatBuilding = prev => {
  const ms = getMObjs('#rvbf .building__moat-around > *')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.02s')) : n, prev)
}

const showFeature = prev => {
  const mF = move(document.querySelector('#features'))
  prev.then(mF.set('opacity', 1).set('right', '80px').duration('0.4s'))
  return mF
}
const showFeatureItems = prev => {
  const ms = getMObjs('#features dd')
  return ms.reduce((p, n) => p ? (p.then(n), n.duration('0.02s')) : n, prev)
}

function takeAction(){
  const {start, last} = showTree()
  compose(showFeatureItems
    , showFeature
    , showLeftViceFlatBuilding
    , showRightViceFlatBuilding
    , showViceBuilding
    , showMainBuilding)(last)
  start.end()
} 
