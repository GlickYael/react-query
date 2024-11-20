import { NextResponse } from "next/server";
import cars, {updateCars} from '@/data/data'

export async function PUT(request: Request, { params }: { params: Promise<{ number: string }> }) {
    const body = await request.json();
    let { number } = await params;
    delete body.number;
    const index = cars.findIndex(c => c.number === number);
    if (index >= 0) {
        cars[index] = { ...cars[index], ...body };
        return new NextResponse(
            "Success",
            { status: 200 });
    }
    return new NextResponse(
        "Faild to update",
        { status: 500 }
    );
}

export async function DELETE(request: Request, { params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;

    // Reassign the filtered array back to `cars`
    updateCars(cars.filter(car => car.number !== number))

    return new NextResponse(
        "Document deleted",
        { status: 200 }
    );
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ number: string }> }  // Wrap params in Promise
) {
    const { number } = await params;  // Await params here since it's a Promise
    const res = cars.find(car => car.number === number);
    return NextResponse.json(res);
}


