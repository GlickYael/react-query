import { NextResponse } from 'next/server';
import cars from '@/data/data'

export async function GET(req: Request) {
    const res = cars;
    return NextResponse.json(res);
}

export async function POST(req: any) {
    const r = await req.json()
    cars.push(r);
    return NextResponse.json(req);
}
