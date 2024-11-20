"use client"
import React, { useState } from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { deleteCar, putCar } from '@/services/cars'
interface carProps {
    car: any,
    handleDelete(number: string): void,
    handleUpdate(number: string, newCar: any): void
}

const Car: React.FC<carProps> = ({ car, handleDelete, handleUpdate }) => {
    const [updating, setUpdating] = useState(false)
    const form = () => {
        return (
            <form onSubmit={onUpdate}>
                <input type="text" placeholder={car.model} defaultValue={car.model} />
                <input type="text" placeholder={car.color} defaultValue={car.color} />
                <input type="text" placeholder={car.number} defaultValue={car.number} />
                <input type="text" placeholder={car.year} defaultValue={car.year} />
                <input type="text" placeholder={car.company} defaultValue={car.company} />
                <button type="submit">Update</button>
            </form>
        );
    }
    async function onUpdate (e: any) {
        setUpdating(false)
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newCar = {
            model: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            number: (form[2] as HTMLInputElement).value,
            year: (form[3] as HTMLInputElement).value,
            company : (form[4] as HTMLInputElement).value
        }
        handleUpdate(car.number,newCar);
    };
    return (
        <>
            {<div>
                <h1>{car.number}</h1>
                <p>{car.company}</p>
                <p>{car.model}</p>
                <p>{car.color}</p>
                <p>{car.year}</p>
                <button onClick={() => handleDelete(car.number)}>delete</button>
                <button onClick={()=>setUpdating(true)}>edit</button>
            </div>}
            {updating && form()}
        </>
    )
}

export default Car;
