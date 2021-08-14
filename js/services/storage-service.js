'use strict'

const saveToStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

const loadFromStorage = key => JSON.parse(localStorage.getItem(key))