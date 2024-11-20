"use client"
import React , {useState} from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import Car from '../components/Car'
import { getCars, postCar,deleteCar,putCar } from '@/services/cars'


const Cars = () => {
    const [isMutating, setIsMutating] = useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching } = useQuery({ queryKey: ['cars'], queryFn: getCars })
    const createMutation = useMutation({
        mutationFn: postCar,
        onMutate: async (car: any) => {
            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => [...old, car])
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] }); setIsMutating(false);
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteCar,
        onMutate: async (id: string) => {
            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.filter((car: any) => car._id !== id))
            return { previousCars }
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }); setIsMutating(false)},
    })

    const updateCarMutation = useMutation({
        mutationFn: ({ id, car }: { id: string, car: any }) => putCar(id, car),
        onMutate: async ({ id, car }: { id: string, car: any }) => {
            setIsMutating(true)
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.map((oldCar: any) => oldCar._id === id ? car : oldCar))
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            setIsMutating(false)
        },
    })
    function handleDelete(number: string){
        deleteMutation.mutate(number)
    }
    function handleUpdate(number: string, car: any){
        updateCarMutation.mutate({id: number, car })
    }
    const form = () => {
        return (
            <form onSubmit={handleAddCar}>
                <input type="text" placeholder={data.model} defaultValue={data.model} />
                <input type="text" placeholder={data.color} defaultValue={data.color} />
                <input type="text" placeholder={data.number} defaultValue={data.number} />
                <input type="text" placeholder={data.year} defaultValue={data.year} />
                <input type="text" placeholder={data.company} defaultValue={data.company} />
                <button type="submit">Add Car</button>
            </form>
        );
    }
    
    const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const car = {
            model: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            number: (form[2] as HTMLInputElement).value,
            year: (form[3] as HTMLInputElement).value,
            company : (form[4] as HTMLInputElement).value
        }
        createMutation.mutate(car);
    };

    return (
        <div>
            {(isLoading || isFetching || isMutating) && <p>Loading...</p>}
            {data?.map((car: any) =>
                <Car car={car} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
            )}
            {data && form()}
        </div>
    )
}

export default Cars;
