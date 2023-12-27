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
