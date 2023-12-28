import Axios from "axios"
import { utilService } from "./util.service.js"
import { httpService } from "./http.service.js"

// for cookies
const axios = Axios.create({
  withCredentials: true,
})

const BASE_URL = "toy/"

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getLabels,
  getLabelCounts,
  getToyLabels,
  getAvgPricePerLabel
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy , sort) {
  //   return Promise.resolve([
  //     {
  //       _id: "t101",
  //       name: "Talking Doll",
  //       price: 123,
  //       labels: ["Doll", "Battery Powered", "Baby"],
  //       createdAt: 1631031801011,
  //       inStock: true,
  //     },
  //     {
  //       _id: "t102",
  //       name: "Panda Doll",
  //       price: 123,
  //       labels: ["Doll", "Battery Powered", "Baby"],
  //       createdAt: 1631031801091,
  //       inStock: true,
  //     },
  //     {
  //       _id: "t103",
  //       name: "Muki Doll",
  //       price: 123,
  //       labels: ["Doll", "Battery Powered", "Baby"],
  //       createdAt: 1631035801011,
  //       inStock: false,
  //     },
  //   ])
  return httpService.get(BASE_URL, { params: { filterBy, sort } })
}

function getLabels() {
  return [...labels]
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    name: "",
    price: "",
    labels: [],
    inStock: "",
  }
}

function getDefaultFilter() {
  return {
    txt: "",
    maxPrice: Infinity,
    labels: [],
    inStock: null,
  }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}

function getLabelCounts() {
  const filter=getDefaultFilter()
  const sort=getDefaultSort()
  return query(filter,sort).then((toys) => {
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
  const sort=getDefaultSort()

  return query(filter,sort).then((toys) => {
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