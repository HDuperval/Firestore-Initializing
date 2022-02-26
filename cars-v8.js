import {initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, } from "firebase-admin/firestore";
import credentials from "./credentials-v8.js";

const db = () => {
    
    if(!getApps().length){
        const app = initializeApp({
         credential: cert(credentials)
    })
    }
    return getFirestore()
}

const carCollection = db().collection('cars')

const getAllCars = async () => {

    const result = await carCollection.get()
    const cars = result.docs.map(car => {
        return { id: car.id, ...car.data() }
    })
    console.log(...cars)
    return cars
}
    //createCar
const createCar = async (car) => {
    const result = await carCollection.add(car)
    console.log(result)

}
    //deleteCar
const deletecar = async (carId) => {
    const result = await carCollection.doc(carId).delete()
    console.log(result)
    return "car deleted"
}

deletecar('PnrAHIGEbwNse6BeaZgP')

// createCar({
//     make: "Toyota",
//     model: "Hillux",
//     year: "2018"
// })



const updateCarModel = async (carId, model) => {
    const result = await carCollection.doc(carId).update({
        model: model
    })
}

updateCarModel("np1S6gXiqe2cVlcX2YEx", "Charger")

getAllCars()