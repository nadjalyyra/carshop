import type { Car } from './types';

export const fetchCar = () => {
    return fetch(import.meta.env.VITE_API_URL + "/cars")
    .then(response => {
        if (!response.ok)
          throw new Error("Error when fetching cars");
 
        return response.json();
      })

}

export const saveCar = (car: Car) => {
    return fetch(import.meta.env.VITE_API_URL + "/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(car)
    })
      .then(response => {
        if (!response.ok)
        throw new Error("Error when adding a new car");
        return response.json();
    })
}
