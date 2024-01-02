// import Axios from "axios"
import { utilService } from "./util.service.js"
import { httpService } from "./http.service.js"

// for cookies
// const axios = Axios.create({
//   withCredentials: true,
// })

const BASE_URL = "toy/"
const toyImgs=[
  {
    name:'panda doll',
    url:'https://freepngimg.com/thumb/toy/33571-5-plush-toy-image-thumb.png'
  },
  {
    name:'dog doll',
    url:'https://freepngimg.com/thumb/toy/33908-7-plush-toy-file-thumb.png'
  },
  {
    name:'bear doll',
    url:'https://freepngimg.com/thumb/toy/33785-4-plush-toy-photos-thumb.png'
  },
  {
    name:'lion doll',
    url:'https://freepngimg.com/thumb/toy/123476-plush-hd-image-free-thumb.png'
  },
  {
    name:'lego hero',
    url:'https://freepngimg.com/thumb/toy/134539-minifigure-lego-free-clipart-hd-thumb.png'
  },
  {
    name:'lego ninja',
    url:'https://freepngimg.com/thumb/toy/134504-minifigure-lego-free-download-image-thumb.png'
  },
  {
    name:'lego soldier',
    url:'https://freepngimg.com/thumb/toy/134517-minifigure-lego-png-free-photo-thumb.png'
  },
  {
    name:'lego star wars',
    url:'https://freepngimg.com/thumb/toy/85827-toy-star-lego-wars-ii-game-video-thumb.png'
  },
  {
    name:'buzz',
    url:'https://freepngimg.com/thumb/toy_story/23340-6-toy-story-buzz-photos-thumb.png'
  },
  {
    name:'Jessie',
    url:'https://freepngimg.com/thumb/toy_story/23375-3-toy-story-jessie-file-thumb.png'
  },
  {
    name:'woody',
    url:'https://freepngimg.com/thumb/toy_story/75718-jessie-story-toy-sheriff-buzz-woody-lightyear-thumb.png'
  },
  {
    name:'grey car',
    url:'https://freepngimg.com/thumb/hot_wheels/27933-3-hot-wheels-transparent-image-thumb.png'
  },
  {
    name:'yellow car',
    url:'https://freepngimg.com/thumb/hot_wheels/27927-1-hot-wheels-image-thumb.png'
  },
  {
    name:'blue car',
    url:'https://freepngimg.com/thumb/hot_wheels/27934-1-hot-wheels-transparent-picture-thumb.png'
  },
]

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

export const toyService = {
  query,
  remove,
  getById,
  save,
  getDefaultFilter,
  getEmptyToy,
  addMsg,
  removeMsg,
  getToyImg,
  getLabelCounts,
  getToyLabels,
  getAvgPricePerLabel,
}

async function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

async function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

async function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

async function save(toy) {
  let savedToy
  if (toy._id) {
      savedToy = await httpService.put(BASE_URL + toy._id, toy)
  } else {
      savedToy = await httpService.post(BASE_URL, toy)
  }
  return savedToy
}

async function addMsg(toyId, txt) {
  // console.log('toyId',toyId , txt)
  const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
  return savedMsg
}

async function removeMsg(toyId, msgId) {
  const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
  return removedId
}

function getToyImg(){
  return toyImgs
}

function getDefaultFilter() {
  return { byName: '', inStock: '', byLable: [], sortBy: '' }
}

function getEmptyToy() {
  let labelIdx = utilService.getRandomIntInclusive(0, labels.length - 1)
  return {
      name: '',
      price: '',
      createdAt: Date.now(),
      labels: [labels[labelIdx], 'Art'],
      inStock: true,
      url: "",
      msgs: []
  }
}

function getLabelCounts() {
  const filter=getDefaultFilter()
  return query(filter).then((toys) => {
    const labelCounts = {}

    toys.forEach((toy) => {
      toy.labels.forEach((label) => {
        if (labelCounts[label]) {
          labelCounts[label]++
        } else {
          labelCounts[label] = 1
        }
      })
    })
    const labelCountArray = Object.entries(labelCounts).map(([label, count]) => ({
      label,
      count,
    }))
    return labelCountArray
  })
}

function getAvgPricePerLabel() {
  const filter=getDefaultFilter()
  return query(filter).then((toys) => {
    console.log('toys', toys)
    const labelAvgPrices = toys.reduce((labelMap, item) => {
      item.labels.forEach((label) => {
        if (!labelMap[label]) {
          labelMap[label] = { sum: 0, count: 0 };
        }
        labelMap[label].sum += item.price;
        labelMap[label].count++;
      });
      return labelMap;
    }, {});
    console.log('labelAvgPrices', labelAvgPrices)

    const averagePrices = {};
    for (const label in labelAvgPrices) {
      averagePrices[label] = labelAvgPrices[label].sum / labelAvgPrices[label].count;
    }
    console.log('averagePrices', averagePrices)


    console.log(averagePrices);
    const priceAvgArray = Object.entries(averagePrices).map(([label, avg]) => ({
      label,
      avg,
    }))
    console.log('priceAvgArray', priceAvgArray)

    return priceAvgArray
  })

}

function getToyLabels() {
  return labels
}