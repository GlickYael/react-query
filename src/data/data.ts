let cars = [
    { company: 'tesla',
        number:'6280666',
        model:'Model 3',
        color:'red',
        year:2021
    }
    ,
    {
        company: 'ford',
        number:'123456789',
        model:'Mustang',
        color:'blue',
        year:2010
    }
    ,
    {
        company: 'bmw',
        number:'987654321',
        model:'X5',
        color:'black',
        year:2022
    },
    {
        company: 'audi',
        number:'0987654321',
        model:'A6',
        color:'white',
        year:2015
    }
]
export default cars;
export const updateCars = (newCars:any) => {
    cars.length = 0; // Clear the array while keeping the reference
    cars.push(...newCars); // Add new elements
};